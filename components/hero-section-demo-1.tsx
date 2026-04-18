"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { FlowerDrop } from "./FlowerDrop";

export default function HeroSectionOne() {
  return (
    <div className="flex flex-col items-center justify-center px-6 w-full max-w-4xl min-h-screen">
      
      {/* Navbar */}
      <nav className="fixed top-0 flex w-full max-w-7xl items-center justify-between py-8 px-6 z-40">
        <h1 className="text-xl font-bold tracking-tight text-foreground">Senyas.IO</h1>
        <ThemeToggle />
      </nav>

      {/* Hero Content */}
      <div className="flex flex-col items-center text-center mt-20">
        <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-7xl">
          <span className="text-primary">Senyas.IO</span><br/>
          Where silence finds a voice.
        </h1>

        <p className="mt-8 text-lg text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed">
          A camera-based system interpreting sign language to empower deaf and mute 
          
          <FlowerDrop>
            <span className="font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-4 ml-1">
              Women
            </span>
          </FlowerDrop>.
        </p>

        {/* Action Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex flex-col items-center gap-4 w-full"
        >
          {/* Breathing CTA */}
          <Link href="/lab" className="w-full max-w-xs">
            <button className="w-full rounded-full bg-primary px-8 py-4 text-lg font-bold text-rose-950 animate-btn-breathe transition-transform hover:scale-[1.02] active:scale-[0.98]">
              Try Senyas.IO
            </button>
          </Link>
          
          {/* Glassmorphic Secondary Buttons */}
          <div className="flex gap-4 mt-2">
            <button className="glass px-8 py-3 rounded-full text-foreground font-medium text-sm transition-all duration-300 hover:scale-110 hover:border-foreground/20">
              Explore
            </button>
            <button className="glass px-8 py-3 rounded-full text-foreground font-medium text-sm transition-all duration-300 hover:scale-110 hover:border-foreground/20">
              Support
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}