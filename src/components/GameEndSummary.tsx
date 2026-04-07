import { motion } from 'motion/react';
import { RotateCcw, Home, Zap, Brain, Trophy } from 'lucide-react';
import { GameMode, Team, Player } from '../types';
import { AchievementBadge } from './AchievementBadge';

interface GameEndSummaryProps {
  gameId: string;
  mode: GameMode;
  teams: Team[];
  players: Player[];
  scores: Record<string, number>;
  onPlayAgain: () => void;
  onBack: () => void;
}

interface ScoreItem {
  id: string;
  name: string;
  level: number;
  xp: number;
}

export function GameEndSummary({ 
  gameId, 
  mode, 
  teams, 
  players, 
  scores, 
  onPlayAgain, 
  onBack 
}: GameEndSummaryProps) {
  const items: ScoreItem[] = mode === 'TEAM' 
    ? teams.map(t => ({ id: t.id, name: t.name, level: t.level, xp: t.xp }))
    : players.map(p => ({ id: p.id, name: p.name, level: p.level, xp: p.xp }));

  const sortedItems = [...items].sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0)).reverse();
  const winner = sortedItems[0];
  const isSolo = mode === 'INDIVIDUAL';

  const getGameStats = (): { label: string; value: string | number } => {
    switch(gameId) {
      case 'rapid-fire':
        const totalPoints = Object.values(scores).reduce((a, b) => a + b, 0);
        return { label: 'Questions Answered', value: Math.floor(totalPoints / 10) };
      case 'tug-of-war':
        return { label: 'Rope Intensity', value: 'High' };
      case 'emoji-guess':
        return { label: 'Puzzles Solved', value: Object.values(scores).length };
      default:
        return { label: 'Total Rounds', value: '10' };
    }
  };

  const getOutcomeText = (): string => {
    if (isSolo) return `Challenge Complete! You scored ${scores[winner.id] || 0} points.`;
    if (gameId === 'tug-of-war') {
      return `${winner.name} dominated the pull!`;
    }
    if (gameId === 'rapid-fire') {
      return `An intense 60 seconds of action!`;
    }
    return `A hard-fought battle for glory!`;
  };

  const stats = getGameStats();

  const achievements = [
    { icon: Zap, title: 'Quick Thinker', description: 'Fastest response time', color: 'bg-amber-500 text-white border-amber-600' },
    { icon: Brain, title: 'Creative Genius', description: 'Most unique answers', color: 'bg-indigo-500 text-white border-indigo-600' },
    { icon: Trophy, title: 'Team MVP', description: 'Highest score contributor', color: 'bg-emerald-500 text-white border-emerald-600' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto py-12 text-center"
    >
      <div className="bg-zinc-900 rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden winner-bg border border-white/5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-500/20 to-transparent pointer-events-none" />
        
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="relative z-10 mb-8"
        >
          <Trophy size={100} className="mx-auto text-amber-400 drop-shadow-[0_0_30px_rgba(251,191,36,0.5)]" />
        </motion.div>

        <h2 className="text-6xl font-black mb-2 font-display relative z-10 tracking-tight">
          {isSolo ? 'CHALLENGE COMPLETE!' : 'VICTORY!'}
        </h2>
        <p className="text-zinc-400 text-xl mb-2 relative z-10">{getOutcomeText()}</p>
        <p className="text-zinc-500 text-sm mb-8 uppercase tracking-widest font-black relative z-10">Results for {gameId.replace(/-/g, ' ')}</p>
        
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 rounded-full text-xs font-black uppercase tracking-widest mb-12 relative z-10 border border-white/10">
          <span className="text-zinc-500">{stats.label}:</span>
          <span className="text-indigo-400">{stats.value}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-12 relative z-10">
          <div className="space-y-4">
            <h3 className="text-left text-[10px] font-black text-zinc-500 uppercase tracking-widest">Final Standings & Progress</h3>
            {sortedItems.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col p-6 rounded-[2rem] border-2 ${index === 0 ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10'}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xl ${index === 0 ? 'bg-amber-500 text-white' : 'bg-zinc-800 text-zinc-500'}`}>
                      {index + 1}
                    </div>
                    <div className="text-left">
                      <span className="text-2xl font-black block">{item.name}</span>
                      <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">LV. {item.level || 1}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black text-indigo-400">{scores[item.id] || 0}</span>
                    <span className="text-[10px] block font-black text-zinc-500 uppercase tracking-widest">Points</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.xp % 100)}%` }}
                    className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[6px] font-black uppercase tracking-tighter text-white/40">XP Progress</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-left text-[10px] font-black text-zinc-500 uppercase tracking-widest">Achievements</h3>
            <div className="grid gap-4">
              {achievements.map((ach, i) => (
                <AchievementBadge 
                  key={i} 
                  icon={ach.icon} 
                  title={ach.title} 
                  description={ach.description} 
                  color={ach.color} 
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
          <button onClick={onPlayAgain} className="bg-indigo-600 hover:bg-indigo-500 text-white px-12 py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-3">
            <RotateCcw size={24} /> Play Again
          </button>
          <button onClick={onBack} className="bg-white/10 border border-white/20 text-white hover:bg-white/20 px-12 py-5 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3">
            <Home size={24} /> Dashboard
          </button>
        </div>
      </div>
    </motion.div>
  );
}
