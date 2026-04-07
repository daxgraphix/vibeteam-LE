import { motion } from 'motion/react';
import { Trophy, Medal, Crown, ChevronRight, User } from 'lucide-react';
import { Theme } from '../types';
import { LEADERBOARD_DATA } from '../constants';

interface LeaderboardProps {
  theme: Theme;
  onClose: () => void;
}

export function Leaderboard({ theme, onClose }: LeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown size={24} className="text-amber-400" />;
      case 2: return <Medal size={20} className="text-zinc-300" />;
      case 3: return <Medal size={20} className="text-amber-600" />;
      default: return null;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-amber-500/20 border-amber-500/50';
      case 2: return 'bg-zinc-500/20 border-zinc-500/50';
      case 3: return 'bg-amber-600/20 border-amber-600/50';
      default: return theme === 'dark' ? 'bg-zinc-800/50 border-zinc-700' : 'bg-white border-zinc-200';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`p-6 rounded-[2rem] ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'} shadow-xl border ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-100'}`}
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Trophy size={28} className="text-amber-500" />
          <h2 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>Leaderboard</h2>
        </div>
        <button 
          onClick={onClose}
          className={`p-2 rounded-xl transition-colors ${theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-500'}`}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Top 3 Podium */}
      <div className="flex items-end justify-center gap-4 mb-8">
        {LEADERBOARD_DATA.slice(0, 3).map((entry, index) => (
          <motion.div
            key={entry.rank}
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex flex-col items-center ${index === 0 ? 'order-2' : index === 1 ? 'order-1' : 'order-3'}`}
          >
            <div className="relative mb-2">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${getRankStyle(entry.rank)} border-2`}>
                {entry.avatar}
              </div>
              <div className="absolute -bottom-1 -right-1">
                {getRankIcon(entry.rank)}
              </div>
            </div>
            <p className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{entry.name}</p>
            <p className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>{entry.score.toLocaleString()} pts</p>
            <div className={`w-16 mt-2 rounded-t-lg flex items-end justify-center ${
              index === 0 ? 'h-20 bg-amber-500' : index === 1 ? 'h-16 bg-zinc-400' : 'h-12 bg-amber-600'
            }`}>
              <span className="text-white font-black text-sm mb-2">{entry.rank}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Rest of leaderboard */}
      <div className="space-y-2">
        {LEADERBOARD_DATA.slice(3).map((entry, index) => (
          <motion.div
            key={entry.rank}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className={`flex items-center gap-4 p-4 rounded-2xl ${theme === 'dark' ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}
          >
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
              theme === 'dark' ? 'bg-zinc-700 text-zinc-400' : 'bg-zinc-200 text-zinc-600'
            }`}>
              {entry.rank}
            </span>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl bg-zinc-100 dark:bg-zinc-700">
              {entry.avatar}
            </div>
            <div className="flex-1">
              <p className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{entry.name}</p>
            </div>
            <p className={`font-black ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>
              {entry.score.toLocaleString()}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
