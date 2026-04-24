"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Simple", "Fast", "Accessible"];

export const HeroTextSwitcher = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center gap-2 text-2xl md:text-5xl font-bold text-foreground">
      <span>Senyas.IO is</span>
      <AnimatePresence mode="wait">
        <motion.div
          key={words[index]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          <span className="relative inline-block px-2 pb-1 rounded-lg bg-gradient-to-r from-pink-300 to-pink-500 text-white">
            {words[index]}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};