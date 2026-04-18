'use client';

import { useState, useCallback } from 'react';
import Sidebar from '@/components/dashboard/Sidebar'; 
import HandTracker from '@/components/dashboard/HandTracker'; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function SenyasIO() {
  const [activeTab, setActiveTab] = useState('translator'); 
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(320);

  // Omni Sense States
  const [detectedWord, setDetectedWord] = useState("Awaiting Gesture...");
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);

  // Added string type to word
  const speakWord = (word: string) => {
    setDetectedWord(word);
    if (voiceEnabled && typeof window !== 'undefined') {
      const speech = new SpeechSynthesisUtterance(word);
      speech.rate = 0.9; 
      window.speechSynthesis.speak(speech);
    }
  };

  const startResizing = useCallback((mouseDownEvent: React.MouseEvent) => {
    mouseDownEvent.preventDefault();
    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth >= 250 && newWidth <= 500) {
        setSidebarWidth(newWidth);
      }
    };
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto'; 
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none'; 
  }, []);

  return (
    <main className={`flex h-screen w-full overflow-hidden transition-colors duration-500 font-sans ${isDarkMode ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
      
      {/* MAIN CONTENT (LEFT) */}
      <section className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-[1200px] animate-in fade-in zoom-in-95 duration-700">
          
          {activeTab === 'translator' ? (
            <Card className={`w-full backdrop-blur-2xl shadow-2xl rounded-[40px] overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-neutral-200'}`}>
              <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-white/5">
                <CardTitle className="text-xs font-bold tracking-[0.2em] text-neutral-500 uppercase">Sign Translator System</CardTitle>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium opacity-50">Audio</span>
                  <Switch checked={voiceEnabled} onCheckedChange={setVoiceEnabled} className="data-[state=checked]:bg-purple-500" />
                </div>
              </CardHeader>
              <CardContent className="p-10 flex flex-col items-center gap-10">
                
                {/* HAND TRACKER COMPONENT */}
                <HandTracker setDetectedWord={setDetectedWord} />

                <div className={`w-full flex flex-col items-center py-8 rounded-[32px] border ${isDarkMode ? 'bg-black/40 border-white/5' : 'bg-neutral-100 border-neutral-200'}`}>
                  <p className="text-4xl font-bold tracking-tight">{detectedWord}</p>
                </div>
                
                <Button 
                  onClick={() => { 
                    setIsDetecting(true); 
                    speakWord("Help Needed"); 
                    setTimeout(() => setIsDetecting(false), 2000); 
                  }} 
                  className="w-full max-w-md h-16 rounded-full text-lg font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-purple-900/20 shadow-2xl transition-transform active:scale-95"
                >
                  Test Assistance
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col items-center justify-center h-[600px] text-center">
              <div className="w-20 h-20 rounded-full bg-purple-500/20 animate-bounce mb-6 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.8)]"></div>
              </div>
              <h2 className="text-5xl font-black tracking-tighter mb-4 uppercase">Loading {activeTab}</h2>
              <p className="text-neutral-500 max-w-sm">Filter {activeTab} is currently under development.</p>
            </div>
          )}
        </div>
      </section>

      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        sidebarWidth={sidebarWidth}
        startResizing={startResizing}
      />

    </main>
  );
}