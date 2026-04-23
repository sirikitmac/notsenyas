'use client';

import { useState, useEffect } from 'react';
import { Navbar } from "@/components/Navbar";
import HeroSectionOne from "@/components/hero-section-demo-1";
import { DashboardStats } from "@/components/DashboardStats";
import { HowItWorks } from "@/components/HowItWorks";
import HoverFooter from "@/components/ui/HoverFooter";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <main className="relative w-full min-h-screen flex flex-col items-center bg-background text-foreground pb-10">
      <Navbar />
      <div className="pt-20 w-full"><HeroSectionOne /></div>
      <section className="w-full relative z-10 flex flex-col items-center py-10"><DashboardStats /></section>
      <HowItWorks />
      <HoverFooter />
    </main>
  );
}