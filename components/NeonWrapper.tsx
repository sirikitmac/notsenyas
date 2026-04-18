import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NeonWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function NeonWrapper({ children, className }: NeonWrapperProps) {
  return (
    <div className={cn(
      "neon-wrapper",
      // Match the rounded corners defined in globals.css
      "rounded-3xl", 
      // Ensure the inner content stays pure black
      "bg-black", 
      // Drop shadow for that "floating on noir" feel
      "shadow-[0_0_60px_-15px_rgba(236,72,153,0.3)]",
      className
    )}>
      {children}
    </div>
  );
}