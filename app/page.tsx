'use client';

import { useState, useEffect } from 'react';
import HeroSectionOne from "@/components/hero-section-demo-1";
import { DashboardStats } from "@/components/DashboardStats";
import HoverFooter from "@/components/ui/HoverFooter" // This will now light up
import { useTheme } from "next-themes";

export default function LandingPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative w-full min-h-screen flex flex-col items-center bg-background text-foreground transition-colors duration-500 overflow-hidden pb-10">
      
      {/* 1. Hero Content */}
      <HeroSectionOne />

      {/* 2. Logo Placeholder + Dashboard Stats */}
      <section className="w-full relative z-10 flex flex-col items-center">
        <div className="h-16 w-16 mb-8 flex items-center justify-center">
           {/* Space reserved for logo */}
        </div>

        <DashboardStats />
      </section>

      {/* 3. ADD FOOTER HERE */}
      <HoverFooter />
      
    </main>
  );
}