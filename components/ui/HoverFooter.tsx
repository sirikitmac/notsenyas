"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Mail, Globe, Send, Link, Rss } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── TextHoverEffect ───────────────────────────────────────────────
export const TextHoverEffect = ({
  text,
  duration,
  className,
}: {
  text: string;
  duration?: number;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({ cx: `${cxPercentage}%`, cy: `${cyPercentage}%` });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 500 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("select-none uppercase cursor-pointer", className)}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#80eeb4" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>

        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>

      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-[#3ca2fa] font-[helvetica] text-7xl font-bold dark:stroke-[#3ca2fa99]"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      >
        {text}
      </motion.text>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
      >
        {text}
      </text>
    </svg>
  );
};

// ─── FooterBackgroundGradient ──────────────────────────────────────
export const FooterBackgroundGradient = () => (
  <div
    className="absolute inset-0 z-0"
    style={{
      background:
        "radial-gradient(125% 125% at 50% 10%, #0F0F1166 50%, #ffb3c633 100%)",
    }}
  />
);

// ─── HoverFooter ───────────────────────────────────────────────────
export default function HoverFooter() {
  const socialLinks = [
    { icon: <Globe size={20} />, label: "Website", href: "#" },
    { icon: <Mail size={20} />, label: "Email", href: "#" },
    { icon: <Send size={20} />, label: "Telegram", href: "#" },
    { icon: <Link size={20} />, label: "Link", href: "#" },
    { icon: <Rss size={20} />, label: "RSS", href: "#" },
  ];

  return (
    <footer className="bg-[#0F0F11]/10 relative h-fit rounded-3xl overflow-hidden m-8 border border-white/10">

      {/* Main content */}
      <div className="max-w-7xl mx-auto p-14 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">

          {/* Brand */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-extrabold text-[#ffb3c6]">
                &hearts;
              </span>
              <span className="text-white text-3xl font-bold">Senyas.IO</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Bridging the gap through sign language technology.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Product</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-[#ffb3c6] transition-colors">How it Works</a></li>
              <li><a href="#" className="hover:text-[#ffb3c6] transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-[#ffb3c6] transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Support</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-[#ffb3c6] transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-[#ffb3c6] transition-colors">Get Help</a></li>
              <li className="relative">
                <a href="#" className="hover:text-[#ffb3c6] transition-colors">Live Chat</a>
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#ffb3c6] animate-pulse" />
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-[#ffb3c6]" />
                <a href="mailto:hello@senyas.io" className="hover:text-[#ffb3c6] transition-colors">
                  hello@senyas.io
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 space-y-4 md:space-y-0">
          <div className="flex space-x-6">
            {socialLinks.map(({ icon, label, href }) => (
              <a key={label} href={href} aria-label={label} className="hover:text-[#ffb3c6] transition-colors">
                {icon}
              </a>
            ))}
          </div>
          <p>&copy; {new Date().getFullYear()} Senyas.IO. All rights reserved.</p>
        </div>
      </div>

      {/* TextHoverEffect — bottom, fully interactive */}
      <div className="lg:flex hidden h-[12rem] -mt-4 -mb-4 relative z-10">
        <TextHoverEffect text="SENYAS.IO" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}