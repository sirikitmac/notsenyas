"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  // Use resolvedTheme for accurate icon switching
  const { resolvedTheme, setTheme } = useTheme();

  // Prevents hydration mismatch
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="size-5 text-white" />
      ) : (
        <Moon className="size-5 text-neutral-900" />
      )}
    </button>
  );
}