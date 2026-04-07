import { motion } from 'motion/react';
import { Check, Lock, Star, Trophy, Target, Flame, Zap, Brain, Users, Award } from 'lucide-react';
import { Mission, Theme } from '../types';

interface MissionProgressProps {
  missions: Mission[];
  theme: Theme;
}

const getMissionIcon = (title: string) => {
  if (title.includes('Trivia')) return Brain;
  if (title.includes('Speed') || title.includes('Rapid')) return Zap;
  if (title.includes('Team')) return Users;
  if (title.includes('Emoji')) return Target;
  if (title.includes('Word')) return Star;
  if (title.includes('Brain')) return Brain;
  if (title.includes('Streak')) return Flame;
  if (title.includes('Tug')) return Users;
  if (title.includes('Would')) return Award;
  return Trophy;
};

const getMissionColor = (index: number) => {
  const colors = [
    'bg-indigo-500',
    'bg-pink-500',
    'bg-violet-500',
    'bg-amber-500',
    'bg-emerald-500',
    'bg-cyan-500',
    'bg-red-500',
    'bg-blue-500',
    'bg-purple-500',
    'bg-orange-500',
  ];
  return colors[index % colors.length];
};

export function MissionProgress({ missions, theme }: MissionProgressProps) {
  const activeMissions = missions.filter(m => !m.completed);
  const completedMissions = missions.filter(m => m.completed);

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className={`p-4 rounded-2xl ${theme === 'dark' ? 'bg-zinc-800/50' : 'bg-indigo-50'} border ${theme === 'dark' ? 'border-zinc-700' : 'border-indigo-100'}`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-bold ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
            Mission Progress
          </span>
          <span className="text-sm font-black text-indigo-500">
            {completedMissions.length}/{missions.length}
          </span>
        </div>
        <div className={`h-3 rounded-full ${theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-200'} overflow-hidden`}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(completedMissions.length / missions.length) * 100}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
          />
        </div>
      </div>

      {/* Active Missions */}
      {activeMissions.length > 0 && (
        <div>
          <h3 className={`text-xs font-black uppercase tracking-widest mb-4 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
            Active Missions
          </h3>
          <div className="grid gap-3">
            {activeMissions.slice(0, 4).map((mission, index) => {
              const Icon = getMissionIcon(mission.title);
              const progress = (mission.current / mission.target) * 100;
              
              return (
                <motion.div
                  key={mission.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-2xl border transition-all ${
                    theme === 'dark' 
                      ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700' 
                      : 'bg-white border-zinc-100 hover:border-indigo-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getMissionColor(index)} bg-opacity-20`}>
                      <Icon size={20} className={getMissionColor(index).replace('bg-', 'text-')} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                          {mission.title}
                        </h4>
                        <span className={`text-xs font-black ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>
                          +{mission.reward} XP
                        </span>
                      </div>
                      <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        {mission.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className={`flex-1 h-2 rounded-full ${theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-100'} overflow-hidden`}>
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                            className={`h-full ${getMissionColor(index)} rounded-full`}
                          />
                        </div>
                        <span className={`text-xs font-bold ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                          {mission.current}/{mission.target}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Completed Missions */}
      {completedMissions.length > 0 && (
        <div>
          <h3 className={`text-xs font-black uppercase tracking-widest mb-4 ${theme === 'dark' ? 'text-emerald-500' : 'text-emerald-600'}`}>
            ✓ Completed
          </h3>
          <div className="space-y-2">
            {completedMissions.map((mission, index) => (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  theme === 'dark' ? 'bg-emerald-500/10' : 'bg-emerald-50'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Check size={16} className="text-emerald-500" />
                </div>
                <div className="flex-1">
                  <p className={`font-bold text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    {mission.title}
                  </p>
                </div>
                <span className="text-xs font-black text-emerald-500">
                  +{mission.reward} XP
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
