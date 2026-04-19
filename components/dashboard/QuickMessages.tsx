'use client';

// REMOVED the import { Button } from "@/components/ui/button";
// We are using a native <button> to bypass shadcn's theme variables.

const MESSAGES = [
  { label: "Help Needed", text: "I need help, please assist me." },
  { label: "Emergency", text: "Emergency! Please call for help." },
  { label: "Yes", text: "Yes." },
  { label: "No", text: "No." },
  { label: "Need Water", text: "I need some water." },
  { label: "Thank You", text: "Thank you so much." },
];

export default function QuickMessages() {
  const speak = (text: string) => {
    if (typeof window !== 'undefined') {
      const speech = new SpeechSynthesisUtterance(text);
      speech.rate = 0.9;
      window.speechSynthesis.speak(speech);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {MESSAGES.map((msg) => (
        <button
          key={msg.label}
          onClick={() => speak(msg.text)}
          // Using a native button element here ensures NO theme variables interfere with your text color.
          className="h-24 rounded-3xl transition-all border-2 shadow-sm font-bold text-lg 
            /* Light Mode: White card, forced black text, rose border */
            bg-white border-rose-200 text-black hover:bg-rose-50
            /* Dark Mode: Dark glass, forced white text, subtle border */
            dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
        >
          {msg.label}
        </button>
      ))}
    </div>
  );
}