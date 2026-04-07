import { motion } from 'motion/react';
import { LucideIcon, X, Lock, Zap, Brain, Image, MessageSquare, Sparkles, PenTool, Users, Hash, Grid, Type, Award, Search, Eye, Heart, Layers, Smile, Sword, Flame, Shield, Target } from 'lucide-react';
import { Theme, Game } from '../types';
import { GAME_COLORS } from '../constants';

interface GameCardProps {
  game: Game;
  onClick: () => void;
  index: number;
  theme: Theme;
  isLocked?: boolean;
  requiredLevel?: number;
  isPopular?: boolean;
  isNew?: boolean;
  key?: string;
}

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Image,
  MessageSquare,
  Sparkles,
  Zap,
  PenTool,
  Users,
  Hash,
  Grid,
  Type,
  Award,
  Search,
  Eye,
  Heart,
  Layers,
  Smile,
  Sword,
  Flame,
  Shield,
  Target
};

export function GameCard({ 
  game, 
  onClick, 
  index, 
  theme, 
  isLocked = false, 
  requiredLevel = 1,
  isPopular = false,
  isNew = false
}: GameCardProps) {
  const IconComponent = iconMap[game.icon] || Zap;
  const colorClass = GAME_COLORS[game.id as keyof typeof GAME_COLORS] || 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400';

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 300 }}
      whileHover={isLocked ? {} : { y: -6, scale: 1.02 }}
      whileTap={isLocked ? {} : { scale: 0.98 }}
      onClick={onClick}
      disabled={isLocked}
      className={`relative flex flex-col items-start p-4 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl border-2 transition-all text-left w-full group shadow-lg hover:shadow-2xl overflow-hidden ${
        theme === 'dark' 
          ? 'bg-zinc-900/80 border-zinc-800 hover:border-indigo-500/60' 
          : 'bg-white/90 border-zinc-200 hover:border-indigo-400'
      } ${isLocked ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
    >
      {/* Animated Background Gradient */}
      {!isLocked && (
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-indigo-500/3 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />
      )}

      {/* Badges */}
      <div className="absolute top-4 right-4 flex gap-2">
        {isNew && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full shadow-lg"
          >
            ✨ NEW
          </motion.span>
        )}
        {isPopular && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-lg"
          >
            🔥 HOT
          </motion.span>
        )}
        {isLocked && (
          <div className="flex flex-col items-end">
            <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
              <Lock size={14} className="text-zinc-400" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mt-1">LV. {requiredLevel}</span>
          </div>
        )}
      </div>

      {/* Icon with Enhanced Design */}
      <div className={`relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 transition-all duration-300 group-hover:scale-110 ${
        colorClass 
      } ${isLocked ? 'bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600' : ''}`}>
        <div className="absolute inset-0 bg-white/20 rounded-2xl" />
        <IconComponent size={24} strokeWidth={2} className="sm:size-28 lg:size-32" />
      </div>

      {/* Content */}
      <h3 className={`text-lg sm:text-xl font-black mb-1 sm:mb-2 group-hover:text-indigo-500 transition-all duration-200 ${
        theme === 'dark' ? 'text-white' : 'text-zinc-900'
      }`}>
        {game.title}
      </h3>
      <p className={`text-sm leading-relaxed mb-4 ${
        theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
      }`}>
        {game.description}
      </p>

      {/* Mode Badge with Enhanced Design */}
      <div className={`mt-auto px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
        game.mode === 'TEAM' 
          ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white'
          : 'bg-gradient-to-r from-pink-500 to-rose-600 text-white'
      }`}>
        {game.mode === 'TEAM' ? '👥 Team Play' : '👤 Solo Play'}
      </div>

      {/* Corner Accent */}
      <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-tl from-indigo-500/10 to-transparent rounded-full" />
    </motion.button>
  );
}
