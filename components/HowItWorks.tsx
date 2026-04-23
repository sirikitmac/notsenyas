"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Highlight } from "@/components/ui/highlight";

const words = ["Simple", "Fast", "Accessible"];

export function HowItWorks() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-20 px-6 max-w-7xl mx-auto">
      
      {/* Dynamic Header with Stability Wrapper */}
      <div className="flex flex-col items-center justify-center mb-16 text-center">
        <div className="text-3xl md:text-5xl font-bold text-foreground flex items-center justify-center">
          <span>Senyas.IO is&nbsp;</span>
          
          {/* This container prevents the layout jump */}
          <div className="min-w-[180px] text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={words[index]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Highlight className="text-black dark:text-white">
                  {words[index]}
                </Highlight>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <SpotlightCard className="p-8 h-full flex flex-col gap-4" spotlightColor="rgba(255, 179, 198, 0.2)">
          <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-[#ffb3c6]/10 border border-[#ffb3c6]/20">
            <svg className="text-[#ffb3c6] h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          </div>
          <h3 className="text-xl font-semibold text-white">Capture</h3>
          <p className="text-sm text-neutral-400">Use your camera or choose a quick message to get started.</p>
        </SpotlightCard>

        <SpotlightCard className="p-8 h-full flex flex-col gap-4" spotlightColor="rgba(168, 85, 247, 0.2)">
          <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-purple-900/20 border border-purple-800/50">
            <svg className="text-purple-400 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.016 9A18.022 18.022 0 0018.384 9M12 21a9.002 9.002 0 009-9H3a9.002 9.002 0 009 9z"/></svg>
          </div>
          <h3 className="text-xl font-semibold text-white">Translate</h3>
          <p className="text-sm text-neutral-400">The system interprets complex gestures in real-time with high accuracy.</p>
        </SpotlightCard>

        <SpotlightCard className="p-8 h-full flex flex-col gap-4" spotlightColor="rgba(14, 165, 233, 0.2)">
          <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-sky-900/20 border border-sky-800/50">
            <svg className="text-sky-400 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
          </div>
          <h3 className="text-xl font-semibold text-white">Communicate</h3>
          <p className="text-sm text-neutral-400">Display translated text or use optional voice output to bridge the gap.</p>
        </SpotlightCard>
      </div>
    </section>
  );
}