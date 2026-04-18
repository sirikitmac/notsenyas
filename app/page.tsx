import HeroSectionOne from "@/components/hero-section-demo-1"; // <-- THIS IS THE MISSING LINE!
import AuroraBackground from "@/components/AuroraBackground";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-6 bg-background transition-colors duration-500 overflow-hidden">
      <AuroraBackground />
      <HeroSectionOne />
    </main>
  );
}