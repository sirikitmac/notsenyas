"use client"

import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/ThemeToggle"; // Import your toggle

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  sidebarWidth, 
  startResizing 
}: any) {
  
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const GlowingButton = ({ id, label, colorClass, glowColor }: any) => (
    <div className="relative group w-full mb-3 px-1">
      {activeTab === id && (
        <div className={`absolute inset-0 rounded-xl blur-lg opacity-60 animate-pulse ${glowColor}`}></div>
      )}
      <Button 
        onClick={() => setActiveTab(id)}
        variant="ghost"
        className={`relative w-full justify-start text-sm h-12 rounded-xl transition-all duration-300 border 
          ${activeTab === id 
            ? 'bg-white text-black border-transparent shadow-xl' 
            : 'bg-transparent text-neutral-500 border-neutral-200 dark:border-white/5 hover:text-black dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/5'
          }
        `}
      >
        <div className={`w-2 h-2 rounded-full mr-3 ${colorClass} ${activeTab === id ? 'animate-ping' : ''}`}></div>
        <span className="font-bold">{label}</span>
      </Button>
    </div>
  );

  return (
    <>
      {/* THE DRAGGABLE HANDLE */}
      <div 
        onMouseDown={startResizing}
        className={`w-1.5 flex-shrink-0 cursor-col-resize transition-colors flex items-center justify-center 
          bg-neutral-200 dark:bg-white/5 hover:bg-purple-500`}
      >
        <div className={`h-12 w-0.5 rounded-full pointer-events-none bg-neutral-400 dark:bg-white/20`} />
      </div>

      {/* NEON SIDEBAR */}
      <aside 
        style={{ width: `${sidebarWidth}px` }} 
        className={`flex-shrink-0 flex flex-col p-8 transition-colors duration-500 
          bg-white dark:bg-black/40 border-l border-neutral-200 dark:border-white/5`}
      >
        <div className="mb-10">
          <h1 className={`text-xl font-black tracking-tighter mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Senyas.IO</h1>
          <p className="text-[10px] font-bold text-neutral-500 tracking-[0.3em] uppercase">Interaction Lab</p>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <p className="text-[10px] font-bold text-neutral-400 dark:text-neutral-600 tracking-widest mb-4 uppercase">Main System</p>
          <GlowingButton id="translator" label="Senyas.IO" colorClass="bg-purple-500" glowColor="bg-purple-500" />
          
          <div className="h-px bg-neutral-200 dark:bg-white/5 my-6" />
          
          <p className="text-[10px] font-bold text-neutral-400 dark:text-neutral-600 tracking-widest mb-4 uppercase">Camera Filters</p>
          <GlowingButton id="air_canvas" label="Air Canvas" colorClass="bg-blue-500" glowColor="bg-blue-500" />
          <GlowingButton id="face_mesh" label="Face Mesh" colorClass="bg-emerald-500" glowColor="bg-emerald-500" />
          <GlowingButton id="finger_distort" label="Finger Tap Distortion" colorClass="bg-orange-500" glowColor="bg-orange-500" />
          <GlowingButton id="interactive_poly" label="Interactive Poly" colorClass="bg-pink-500" glowColor="bg-pink-500" />
          <GlowingButton id="interactive_water" label="Interactive Water" colorClass="bg-cyan-500" glowColor="bg-cyan-500" />
          <GlowingButton id="ripple_snap" label="Ripple Filter Snap" colorClass="bg-yellow-500" glowColor="bg-yellow-500" />
          <GlowingButton id="sparkler" label="Sparkler" colorClass="bg-red-500" glowColor="bg-red-500" />
        </div>

        {/* Theme Toggle at Bottom */}
        <div className={`mt-8 p-4 rounded-2xl border flex items-center justify-between flex-shrink-0 
          ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-neutral-100 border-neutral-200'}`}>
          <span className="text-xs font-bold uppercase tracking-wider opacity-60">Theme</span>
          <ThemeToggle />
        </div>
      </aside>
    </>
  )
}