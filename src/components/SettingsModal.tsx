import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Moon, Sun, Zap, RotateCcw, ChevronRight, Trophy, Target, Brain } from 'lucide-react';
import { Theme, Difficulty } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  difficulty: Difficulty;
  onChangeDifficulty: (difficulty: Difficulty) => void;
}

const difficultyInfo: Record<Difficulty, { icon: ReactNode; description: string; multiplier: string; color: string }> = {
  EASY: {
    icon: <Trophy size={20} />,
    description: 'Perfect for beginners',
    multiplier: '1x points',
    color: 'from-green-500 to-emerald-600'
  },
  MEDIUM: {
    icon: <Target size={20} />,
    description: 'Balanced challenge',
    multiplier: '1.5x points',
    color: 'from-amber-500 to-orange-600'
  },
  HARD: {
    icon: <Brain size={20} />,
    description: 'For expert players',
    multiplier: '2x points',
    color: 'from-red-500 to-rose-600'
  }
};

export function SettingsModal({ 
  isOpen, 
  onClose, 
  onReset, 
  theme, 
  onToggleTheme, 
  difficulty, 
  onChangeDifficulty 
}: SettingsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/70 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-sm bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-800"
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-black text-white">Settings</h2>
                <button onClick={onClose} className="p-1.5 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <motion.div 
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-2xl border border-zinc-700/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-zinc-700/50 text-zinc-300 rounded-lg">
                      {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                    </div>
                    <span className="text-sm font-medium text-white">Theme</span>
                  </div>
                  <button 
                    onClick={onToggleTheme}
                    className={`w-11 h-6 rounded-full transition-colors relative ${theme === 'dark' ? 'bg-indigo-600' : 'bg-zinc-600'}`}
                  >
                    <motion.div 
                      animate={{ x: theme === 'dark' ? 22 : 4 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"
                    />
                  </button>
                </motion.div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-1">
                    <Zap size={16} className="text-amber-400" />
                    <span className="text-sm font-medium text-white">Difficulty</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {(['EASY', 'MEDIUM', 'HARD'] as Difficulty[]).map((level) => {
                      const info = difficultyInfo[level];
                      const isSelected = difficulty === level;
                      return (
                        <motion.button
                          key={level}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onChangeDifficulty(level)}
                          className={`relative p-3 rounded-xl transition-all border ${
                            isSelected 
                              ? 'bg-zinc-800 border-zinc-600' 
                              : 'bg-zinc-800/50 border-zinc-700/50 hover:border-zinc-600'
                          }`}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-r ${info.color} opacity-0 ${isSelected ? 'opacity-10' : ''} rounded-xl`} />
                          <div className="relative">
                            <div className={`w-8 h-8 mx-auto mb-2 rounded-lg bg-gradient-to-r ${info.color} flex items-center justify-center`}>
                              {info.icon}
                            </div>
                            <p className={`text-xs font-bold text-center ${isSelected ? 'text-white' : 'text-zinc-400'}`}>
                              {level}
                            </p>
                            {isSelected && (
                              <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
                              >
                                <ChevronRight size={10} className="text-white" />
                              </motion.div>
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  <motion.div 
                    key={difficulty}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-zinc-800/30 rounded-xl border border-zinc-700/30"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-zinc-400">{difficultyInfo[difficulty].description}</p>
                      </div>
                      <span className="text-xs font-bold text-amber-400">{difficultyInfo[difficulty].multiplier}</span>
                    </div>
                  </motion.div>
                </div>

                <motion.div 
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-2xl border border-zinc-700/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-zinc-700/50 text-zinc-300 rounded-lg">
                      <RotateCcw size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white">Reset Data</span>
                      <span className="text-[10px] text-zinc-500">Clear all progress</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      if (confirm('Reset all data? This cannot be undone.')) {
                        onReset();
                        onClose();
                      }
                    }}
                    className="px-3 py-1.5 bg-red-500/20 text-red-400 text-xs font-semibold rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    Reset
                  </button>
                </motion.div>
              </div>

              <div className="mt-5 pt-4 border-t border-zinc-800 text-center">
                <p className="text-[10px] text-zinc-600">VibeTeam v2.0</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}