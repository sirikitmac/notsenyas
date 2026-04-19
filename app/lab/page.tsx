'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Sidebar from '@/components/dashboard/Sidebar'; 
import QuickMessages from '@/components/dashboard/QuickMessages'; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

// Stable HandTracker Import
const HandTracker = dynamic(() => import('@/components/dashboard/HandTracker'), {
  ssr: false,
});

export default function SenyasIO() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Hydration fix: ensures theme is ready before rendering
  useEffect(() => setMounted(true), []);

  const [activeTab, setActiveTab] = useState('translator'); 
  const [sidebarWidth, setSidebarWidth] = useState(320);

  const [isCameraOn, setIsCameraOn] = useState(true);
  const [showQuickMessages, setShowQuickMessages] = useState(false);
  const [detectedWord, setDetectedWord] = useState("Awaiting Gesture...");
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  const startResizing = useCallback((mouseDownEvent: React.MouseEvent) => {
    mouseDownEvent.preventDefault();
    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth >= 250 && newWidth <= 500) setSidebarWidth(newWidth);
    };
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'col-resize';
  }, []);

  if (!mounted) return null; // Prevents theme flicker

  const isDarkMode = theme === 'dark';

  return (
    <main className={`flex h-screen w-full overflow-hidden transition-colors duration-500 font-sans 
      ${isDarkMode ? 'bg-neutral-950 text-white' : 'bg-rose-50 text-neutral-900'}`}>
      
      <section className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-[800px] animate-in fade-in zoom-in-95 duration-700">
          
          {activeTab === 'translator' && (
            <div className="space-y-6">
              <Card className={`w-full backdrop-blur-xl shadow-2xl rounded-[40px] overflow-hidden transition-colors duration-500 
                ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-rose-100'}`}>
                
                <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-rose-100/20 dark:border-white/5">
                  <CardTitle className="text-xs font-bold tracking-[0.2em] text-neutral-500 uppercase">Sign Translator System</CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-xs font-medium opacity-50">Camera</span>
                        <Switch checked={isCameraOn} onCheckedChange={setIsCameraOn} />
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-xs font-medium opacity-50">Audio</span>
                        <Switch checked={voiceEnabled} onCheckedChange={setVoiceEnabled} className="data-[state=checked]:bg-purple-500" />
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-10 flex flex-col items-center gap-8">
                  <HandTracker setDetectedWord={setDetectedWord} isVisible={isCameraOn} />

                  {/* Detected Word Display - Forced colors for contrast */}
                  <div className={`w-full flex flex-col items-center py-6 rounded-[32px] border 
                    ${isDarkMode ? 'bg-black/40 border-white/5' : 'bg-rose-100/50 border-rose-200'}`}>
                    <p className={`text-3xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                      {detectedWord}
                    </p>
                  </div>

                  {/* Glowing Quick Message Button */}
                  <button 
                    onClick={() => setShowQuickMessages(!showQuickMessages)}
                    className={`group relative w-full h-16 rounded-full font-black text-white text-lg transition-all duration-300 
                      bg-green-500 shadow-[0_0_30px_rgba(34,197,94,0.4)] animate-pulse hover:animate-none hover:scale-[1.02] active:scale-95
                      ${showQuickMessages ? 'bg-green-600' : ''}`}
                  >
                    {showQuickMessages ? "Hide Quick Messages" : "Quick Message"}
                  </button>
                </CardContent>
              </Card>

              {showQuickMessages && (
                <div className="animate-in slide-in-from-top-4 duration-300">
                  <QuickMessages />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarWidth={sidebarWidth}
        startResizing={startResizing}
      />
    </main>
  );
}