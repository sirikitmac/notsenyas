import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Senyas.IO | Interaction Lab",
  description: "Real-time Sign Language Translator & Gesture Recognition",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(
      "h-full antialiased", 
      geistSans.variable, 
      geistMono.variable, 
      inter.variable,
      "font-sans"
    )}>
      <head>
        {/* MediaPipe Scripts: BEFORE INTERACTIVE ensures they load BEFORE your tracker code runs */}
        <Script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js" strategy="beforeInteractive" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem={false} 
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}