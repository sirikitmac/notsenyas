"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FlowerDrop } from "./FlowerDrop";

export default function HeroSectionOne() {
  return (
    <div className="flex flex-col items-center justify-center px-6 w-full max-w-4xl mx-auto pt-32 pb-16 text-center">
      
      {/* Floating animation wrapper */}
      <div className="flex flex-col items-center text-center animate-float">
        <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-7xl mb-8">
          <span className="text-[#ffb3c6]">Senyas.IO</span><br/>
          Communication Made Simple
        </h1>

        <p className="mt-8 text-lg text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed">
          A camera-based system interpreting sign language to empower Deaf 
          <FlowerDrop>
            <span className="font-semibold text-foreground underline decoration-[#ffb3c6] decoration-2 underline-offset-4 ml-1">
              Women
            </span>
          </FlowerDrop>.
        </p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex flex-col items-center gap-4 w-full"
        >
          <Link href="/login" className="w-full max-w-xs">
            <button className="w-full rounded-full bg-[#ffb3c6] px-8 py-4 text-lg font-bold text-black animate-btn-breathe transition-transform hover:scale-[1.02] active:scale-[0.98]">
              Try Senyas.IO
            </button>
          </Link>
          
          <div className="flex gap-4 mt-2">
            <button className="glass px-8 py-3 rounded-full text-foreground font-medium text-sm transition-all duration-300 hover:scale-110 border border-transparent hover:border-foreground/10">
              Explore
            </button>
            <button className="glass px-8 py-3 rounded-full text-foreground font-medium text-sm transition-all duration-300 hover:scale-110 border border-transparent hover:border-foreground/10">
              Support
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}