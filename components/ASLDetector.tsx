"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Landmark { x: number; y: number; z: number; }

// MediaPipe indices
const WRIST = 0;
const THUMB_MCP = 2, THUMB_IP = 3, THUMB_TIP = 4;
const INDEX_MCP = 5, INDEX_PIP = 6, INDEX_TIP = 8;
const MIDDLE_MCP = 9, MIDDLE_PIP = 10, MIDDLE_TIP = 12;
const RING_MCP = 13, RING_PIP = 14, RING_TIP = 16;
const PINKY_MCP = 17, PINKY_PIP = 18, PINKY_TIP = 20;

// ── Helpers ────────────────────────────────────────────
const dist = (a: Landmark, b: Landmark) =>
  Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

const handSize = (lm: Landmark[]) => dist(lm[WRIST], lm[MIDDLE_MCP]) || 1;
const nd = (a: Landmark, b: Landmark, lm: Landmark[]) => dist(a, b) / handSize(lm);

// Finger up = tip is clearly above pip AND pip above mcp
const up = (tip: Landmark, pip: Landmark, mcp: Landmark) =>
  tip.y < pip.y - 0.01 && pip.y < mcp.y + 0.02;

// Finger curled = tip below or at pip level
const down = (tip: Landmark, pip: Landmark) => tip.y > pip.y - 0.03;

// ── Classifier ─────────────────────────────────────────
function classify(lm: Landmark[]): { letter: string; score: number } {
  const iUp = up(lm[INDEX_TIP], lm[INDEX_PIP], lm[INDEX_MCP]);
  const mUp = up(lm[MIDDLE_TIP], lm[MIDDLE_PIP], lm[MIDDLE_MCP]);
  const rUp = up(lm[RING_TIP], lm[RING_PIP], lm[RING_MCP]);
  const pUp = up(lm[PINKY_TIP], lm[PINKY_PIP], lm[PINKY_MCP]);

  const iDn = down(lm[INDEX_TIP], lm[INDEX_PIP]);
  const mDn = down(lm[MIDDLE_TIP], lm[MIDDLE_PIP]);
  const rDn = down(lm[RING_TIP], lm[RING_PIP]);
  const pDn = down(lm[PINKY_TIP], lm[PINKY_PIP]);

  const hs = handSize(lm);

  // Thumb: is it sticking out sideways?
  const thumbSide = Math.abs(lm[THUMB_TIP].x - lm[THUMB_MCP].x) > 0.06;
  const thumbUp2 = lm[THUMB_TIP].y < lm[THUMB_IP].y - 0.02;

  // Proximity (normalized)
  const tiClose = nd(lm[THUMB_TIP], lm[INDEX_TIP], lm) < 0.13;  // thumb-index
  const tmClose = nd(lm[THUMB_TIP], lm[MIDDLE_TIP], lm) < 0.13; // thumb-middle
  const imClose = nd(lm[INDEX_TIP], lm[MIDDLE_TIP], lm) < 0.09; // index-middle close
  const imSpread = nd(lm[INDEX_TIP], lm[MIDDLE_TIP], lm) > 0.11; // index-middle spread

  // ── A: Fist, thumb on side ──
  if (iDn && mDn && rDn && pDn && thumbSide && !thumbUp2)
    return { letter: "A", score: 92 };

  // ── B: All 4 up, thumb tucked ──
  if (iUp && mUp && rUp && pUp && !thumbSide)
    return { letter: "B", score: 90 };

  // ── C: Curved open hand, palm facing camera ──
  if (!iUp && !mUp && !rUp && !pUp && !iDn && !mDn && !rDn && !pDn)
    return { letter: "C", score: 72 };

  // ── D: Index up, thumb touches middle ──
  if (iUp && mDn && rDn && pDn && tmClose)
    return { letter: "D", score: 87 };

  // ── E: All curled, thumb under fingers ──
  if (iDn && mDn && rDn && pDn && !thumbSide &&
    lm[THUMB_TIP].y > lm[INDEX_MCP].y)
    return { letter: "E", score: 84 };

  // ── F: Thumb+index touch, middle+ring+pinky up ──
  if (tiClose && !iUp && mUp && rUp && pUp)
    return { letter: "F", score: 87 };

  // ── G: Index sideways, thumb parallel ──
  if (iUp && !mUp && !rUp && !pUp && thumbSide &&
    Math.abs(lm[INDEX_TIP].y - lm[THUMB_TIP].y) < 0.09)
    return { letter: "G", score: 79 };

  // ── H: Index + middle up, side by side, thumb tucked ──
  if (iUp && mUp && !rUp && !pUp && !thumbSide && imClose)
    return { letter: "H", score: 81 };

  // ── I: Pinky only up ──
  if (!iUp && !mUp && !rUp && pUp && iDn && mDn && rDn)
    return { letter: "I", score: 91 };

  // ── K: Index + middle up, thumb out between ──
  if (iUp && mUp && !rUp && !pUp && thumbSide &&
    lm[THUMB_TIP].y < lm[INDEX_MCP].y)
    return { letter: "K", score: 77 };

  // ── L: Index up + thumb out and up (L shape) ──
  if (iUp && !mUp && !rUp && !pUp && thumbSide && thumbUp2)
    return { letter: "L", score: 93 };

  // ── M: Index+middle+ring folded over thumb ──
  if (iDn && mDn && rDn && pDn &&
    nd(lm[THUMB_TIP], lm[INDEX_MCP], lm) < 0.18 &&
    lm[THUMB_TIP].y > lm[WRIST].y + 0.1)
    return { letter: "M", score: 77 };

  // ── N: Index+middle folded over thumb ──
  if (iDn && mDn && !rDn && pDn &&
    lm[THUMB_TIP].y > lm[INDEX_MCP].y)
    return { letter: "N", score: 75 };

  // ── O: Circle — all tips converge ──
  if (tiClose && !iUp && !mUp && !rUp && !pUp &&
    nd(lm[INDEX_TIP], lm[MIDDLE_TIP], lm) < 0.1 &&
    nd(lm[MIDDLE_TIP], lm[RING_TIP], lm) < 0.12)
    return { letter: "O", score: 84 };

  // ── R: Index + middle crossed (very close tips) ──
  if (iUp && mUp && !rUp && !pUp && !thumbSide &&
    nd(lm[INDEX_TIP], lm[MIDDLE_TIP], lm) < 0.05)
    return { letter: "R", score: 81 };

  // ── S: Tight fist, thumb over fingers ──
  if (iDn && mDn && rDn && pDn && !thumbSide &&
    lm[THUMB_TIP].y < lm[INDEX_MCP].y + 0.04 &&
    lm[THUMB_TIP].y > lm[WRIST].y)
    return { letter: "S", score: 82 };

  // ── T: Thumb pokes between index + middle ──
  if (iDn && mDn && rDn && pDn && tiClose &&
    lm[THUMB_TIP].y < lm[INDEX_PIP].y)
    return { letter: "T", score: 78 };

  // ── U: Index + middle up, close (parallel) ──
  if (iUp && mUp && !rUp && !pUp && !thumbSide && imClose)
    return { letter: "U", score: 84 };

  // ── V: Index + middle up, spread (peace ✌) ──
  if (iUp && mUp && !rUp && !pUp && !thumbSide && imSpread)
    return { letter: "V", score: 89 };

  // ── W: Index + middle + ring up ──
  if (iUp && mUp && rUp && !pUp && !thumbSide)
    return { letter: "W", score: 87 };

  // ── X: Index hooked (partially bent) ──
  if (!iUp && !iDn && mDn && rDn && pDn && !thumbSide)
    return { letter: "X", score: 74 };

  // ── Y: Thumb + pinky out (shaka 🤙) ──
  if (thumbSide && !iUp && !mUp && !rUp && pUp && iDn && mDn && rDn)
    return { letter: "Y", score: 91 };

  return { letter: "?", score: 0 };
}

// ── Constants ──────────────────────────────────────────
const HOLD_SECONDS = 2.0;
const FPS = 30;
const HOLD_FRAMES = HOLD_SECONDS * FPS; // 60 frames
// Grace: how many consecutive "?" frames before we reset the hold
const GRACE_FRAMES = 8;

export default function ASLDetector() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [letter, setLetter] = useState("—");
  const [sentence, setSentence] = useState("");
  const [score, setScore] = useState(0);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Refs for frame logic (no re-render)
  const lockedLetterRef = useRef(""); // the letter currently being held
  const holdCountRef = useRef(0);     // frames held
  const graceCountRef = useRef(0);    // frames of bad detection before reset

  const drawLandmarks = useCallback((
    ctx: CanvasRenderingContext2D,
    lm: Landmark[], w: number, h: number
  ) => {
    const connections = [
      [0,1],[1,2],[2,3],[3,4],
      [0,5],[5,6],[6,7],[7,8],
      [0,9],[9,10],[10,11],[11,12],
      [0,13],[13,14],[14,15],[15,16],
      [0,17],[17,18],[18,19],[19,20],
      [5,9],[9,13],[13,17],
    ];
    ctx.strokeStyle = "rgba(255,179,198,0.45)";
    ctx.lineWidth = 2;
    for (const [a, b] of connections) {
      ctx.beginPath();
      ctx.moveTo(lm[a].x * w, lm[a].y * h);
      ctx.lineTo(lm[b].x * w, lm[b].y * h);
      ctx.stroke();
    }
    for (const p of lm) {
      ctx.beginPath();
      ctx.arc(p.x * w, p.y * h, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#ffb3c6";
      ctx.fill();
    }
  }, []);

  useEffect(() => {
    let hands: any, camera: any;

    const load = async () => {
      const s1 = Object.assign(document.createElement("script"), {
        src: "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js",
        crossOrigin: "anonymous",
      });
      const s2 = Object.assign(document.createElement("script"), {
        src: "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js",
        crossOrigin: "anonymous",
      });
      document.head.append(s1, s2);
      await new Promise<void>((res) => { s2.onload = () => res(); });

      // @ts-ignore
      hands = new window.Hands({
        locateFile: (f: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}`,
      });
      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.7,
      });

      hands.onResults((results: any) => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (!canvas || !video) return;

        const ctx = canvas.getContext("2d")!;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Mirror draw
        ctx.save();
        ctx.scale(-1, 1);
        ctx.translate(-canvas.width, 0);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        ctx.restore();

        if (results.multiHandLandmarks?.length > 0) {
          const lm: Landmark[] = results.multiHandLandmarks[0].map(
            (p: any) => ({ x: 1 - p.x, y: p.y, z: p.z })
          );
          drawLandmarks(ctx, lm, canvas.width, canvas.height);

          const { letter: det, score: sc } = classify(lm);
          setLetter(det);
          setScore(sc);

          if (det !== "?") {
            graceCountRef.current = 0; // reset grace since we got a valid letter

            if (det === lockedLetterRef.current) {
              // Same letter — keep counting
              holdCountRef.current++;
              const pct = Math.min((holdCountRef.current / HOLD_FRAMES) * 100, 100);
              setHoldProgress(pct);

              if (holdCountRef.current >= HOLD_FRAMES) {
                // ✅ Commit letter to sentence
                setSentence((prev) => prev + det);
                setJustAdded(true);
                setTimeout(() => setJustAdded(false), 400);
                holdCountRef.current = 0;
                lockedLetterRef.current = "";
                setHoldProgress(0);
              }
            } else {
              // New letter detected — lock onto it, reset count
              lockedLetterRef.current = det;
              holdCountRef.current = 1;
              setHoldProgress(0);
            }
          } else {
            // "?" detected — use grace period before resetting
            graceCountRef.current++;
            if (graceCountRef.current > GRACE_FRAMES) {
              holdCountRef.current = 0;
              lockedLetterRef.current = "";
              setHoldProgress(0);
            }
            // During grace period: keep progress where it was
          }
        } else {
          // No hand at all — reset everything immediately
          ctx.save();
          ctx.scale(-1, 1);
          ctx.translate(-canvas.width, 0);
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          ctx.restore();
          setLetter("—");
          setScore(0);
          holdCountRef.current = 0;
          graceCountRef.current = 0;
          lockedLetterRef.current = "";
          setHoldProgress(0);
        }
      });

      // @ts-ignore
      camera = new window.Camera(videoRef.current, {
        onFrame: async () => { await hands.send({ image: videoRef.current }); },
        width: 640, height: 480,
      });
      await camera.start();
      setIsLoading(false);
      setIsReady(true);
    };

    load().catch(console.error);
    return () => { hands?.close?.(); camera?.stop?.(); };
  }, [drawLandmarks]);

  // SVG ring
  const R = 40;
  const C = 2 * Math.PI * R;
  const ringOffset = C - (holdProgress / 100) * C;

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-black tracking-tighter text-[#ffb3c6] mb-1">Senyas.IO</h1>
        <p className="text-zinc-400 text-sm tracking-widest uppercase">ASL Alphabet Detector</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-5xl">

        {/* Camera */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 flex-1 aspect-video">
          <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover opacity-0" autoPlay muted playsInline />
          <canvas ref={canvasRef} className="w-full h-full object-cover" />

          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900">
              <div className="w-10 h-10 border-2 border-[#ffb3c6] border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-zinc-400 text-sm">Loading MediaPipe...</p>
            </div>
          )}
          {isReady && (
            <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/50 backdrop-blur px-3 py-1 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-zinc-300">Live</span>
            </div>
          )}

          {/* Hold progress bar on camera */}
          {holdProgress > 0 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/60 backdrop-blur px-5 py-2 rounded-full">
              <div className="w-36 h-2 bg-zinc-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#ffb3c6] rounded-full"
                  style={{ width: `${holdProgress}%`, transition: "width 0.08s linear" }}
                />
              </div>
              <span className="text-xs text-[#ffb3c6] font-bold tabular-nums">
                {((1 - holdProgress / 100) * HOLD_SECONDS).toFixed(1)}s
              </span>
            </div>
          )}
        </div>

        {/* Right panel */}
        <div className="flex flex-col gap-4 w-full lg:w-64">

          {/* Letter ring */}
          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-3">
            <p className="text-xs uppercase tracking-widest text-zinc-500">Detected</p>
            <div className="relative w-[100px] h-[100px] flex items-center justify-center">
              <svg width="100" height="100" className="absolute inset-0">
                <circle cx="50" cy="50" r={R} fill="none" stroke="#27272a" strokeWidth="5" />
                <circle
                  cx="50" cy="50" r={R} fill="none"
                  stroke="#ffb3c6" strokeWidth="5"
                  strokeDasharray={C} strokeDashoffset={ringOffset}
                  strokeLinecap="round"
                  style={{
                    transition: "stroke-dashoffset 0.08s linear",
                    transform: "rotate(-90deg)",
                    transformOrigin: "50% 50%",
                  }}
                />
              </svg>
              <span
                className="text-6xl font-black text-[#ffb3c6] z-10 select-none"
                style={{
                  transform: justAdded ? "scale(1.35)" : "scale(1)",
                  transition: "transform 0.2s ease",
                  display: "inline-block",
                }}
              >
                {letter}
              </span>
            </div>
            <p className="text-xs text-zinc-500">
              {score > 0 ? `${score}% match` : "No hand detected"}
            </p>
            {holdProgress > 0 && (
              <p className="text-xs text-[#ffb3c6] animate-pulse">
                Hold {((1 - holdProgress / 100) * HOLD_SECONDS).toFixed(1)}s more...
              </p>
            )}
          </div>

          {/* Sentence */}
          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-4 flex-1 flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-zinc-500">Sentence</p>
            <div className="flex-1 min-h-[80px] text-2xl font-bold text-white break-all">
              {sentence || <span className="text-zinc-700">Hold a letter to type...</span>}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setSentence((p) => p.slice(0, -1))}
                className="flex-1 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-sm transition-colors">
                ⌫ Delete
              </button>
              <button onClick={() => setSentence("")}
                className="flex-1 py-2 rounded-xl bg-zinc-800 hover:bg-red-900/50 text-sm transition-colors text-red-400">
                Clear
              </button>
            </div>
            <button onClick={() => setSentence((p) => p + " ")}
              className="w-full py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-sm transition-colors">
              Space
            </button>
          </div>

          {/* Tips */}
          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Tips</p>
            <ul className="text-xs text-zinc-400 space-y-1">
              <li>• Hold steady 2s — watch the ring fill</li>
              <li>• Small glitches won't reset your progress</li>
              <li>• Good lighting = better accuracy</li>
              <li>• Palm facing the camera</li>
              <li>• Hand centered in frame</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
