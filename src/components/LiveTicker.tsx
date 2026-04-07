import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Theme } from '../types';
import { LIVE_TICKER_EVENTS } from '../constants';

interface LiveTickerProps {
  theme: Theme;
}

export function LiveTicker({ theme }: LiveTickerProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % LIVE_TICKER_EVENTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`w-full py-2 overflow-hidden border-y transition-colors ${theme === 'dark' ? 'bg-zinc-900/50 border-zinc-800' : 'bg-zinc-50 border-zinc-100'}`}>
      <div className="max-w-5xl mx-auto px-8">
        <AnimatePresence mode="wait">
          <motion.p 
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 text-center"
          >
            {LIVE_TICKER_EVENTS[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
