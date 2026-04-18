"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FlowerDrop({ children }: { children: React.ReactNode }) {
  const [flowers, setFlowers] = useState<{ id: number; delay: number; left: string; emoji: string }[]>([]);

  const dropFlowers = () => {
    if (flowers.length > 0) return;

    const newFlowers = Array.from({ length: 4 }).map((_, i) => ({
      id: Date.now() + i,
      delay: i * 0.5,
      left: `${10 + Math.random() * 80}%`,
      emoji: ["🌸", "🌷", "🌺", "🌼"][Math.floor(Math.random() * 4)],
    }));
    
    setFlowers(newFlowers);
    setTimeout(() => setFlowers([]), 4000); 
  };

  return (
    <span className="relative inline-block cursor-help" onMouseEnter={dropFlowers}>
      {children}
      <AnimatePresence>
        {flowers.map((f) => (
          <motion.span // <--- CHANGED FROM div TO span
            key={f.id}
            initial={{ y: -20, opacity: 0, rotate: 0 }}
            animate={{ 
              y: 150, 
              opacity: [0, 1, 1, 0],
              rotate: [0, 20, -20, 0] 
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 2.5, 
              delay: f.delay, 
              ease: "easeInOut" 
            }}
            className="absolute top-0 pointer-events-none text-2xl z-50"
            style={{ left: f.left }}
          >
            {f.emoji}
          </motion.span> // <--- CHANGED FROM div TO span
        ))}
      </AnimatePresence>
    </span>
  );
}