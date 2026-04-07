import { useState } from 'react';
import { motion } from 'motion/react';
import { Gamepad2, Settings, Zap, Menu } from 'lucide-react';
import { Theme, Difficulty } from '../types';
import { SettingsModal } from './SettingsModal';

interface HeaderProps {
  onReset: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  difficulty: Difficulty;
  onChangeDifficulty: (difficulty: Difficulty) => void;
  onOpenSidebar?: () => void;
}

export function Header({ 
  onReset, 
  theme, 
  onToggleTheme, 
  difficulty, 
  onChangeDifficulty,
  onOpenSidebar
}: HeaderProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <header className={`sticky top-0 z-50 flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border-b backdrop-blur-xl transition-all ${
        theme === 'dark' 
          ? 'bg-zinc-950/90 border-zinc-800/50' 
          : 'bg-white/90 border-zinc-200/50'
      }`}>
        <div className="flex items-center gap-2 sm:gap-3">
          {onOpenSidebar && (
            <motion.button 
              whileTap={{ scale: 0.92 }}
              onClick={onOpenSidebar}
              className={`p-1.5 sm:p-2 rounded-lg transition-all ${
                theme === 'dark' 
                  ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/50' 
                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <Menu size={18} />
            </motion.button>
          )}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Gamepad2 size={16} className="text-white" />
            </div>
            <h1 className={`text-base sm:text-lg font-bold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-zinc-900'
            }`}>
              VibeTeam
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 sm:gap-2">
          <motion.div 
            whileTap={{ scale: 0.92 }}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wide ${
              theme === 'dark' 
                ? 'bg-zinc-800/60 text-zinc-400' 
                : 'bg-zinc-100 text-zinc-500'
            }`}
          >
            <Zap size={12} className="text-amber-500" />
            <span>{difficulty}</span>
          </motion.div>
          
          <motion.button 
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsSettingsOpen(true)}
            className={`p-1.5 sm:p-2 rounded-lg transition-all ${
              theme === 'dark' 
                ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/50' 
                : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <Settings size={18} />
          </motion.button>
        </div>
      </header>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        onReset={onReset}
        theme={theme}
        onToggleTheme={onToggleTheme}
        difficulty={difficulty}
        onChangeDifficulty={onChangeDifficulty}
      />
    </>
  );
}