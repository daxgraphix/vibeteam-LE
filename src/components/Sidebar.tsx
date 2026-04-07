import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Gamepad2, Award, BookOpen, Crown, Trophy, 
  Target, Zap, Rocket, Settings, RotateCcw, X, Sun, Moon,
  ChevronRight, Star, Flame, Shield, Clock, Snowflake, 
  Shuffle, Clover, Ghost, Hash, Palette, Brain,
  MessageCircle, Image, Pen, Type, Search, Eye, Globe, MapPin,
  Music, Palmtree, Sword, Sparkles, Lightbulb
} from 'lucide-react';
import { Theme, Difficulty, GameMode, Team, Player, Mission } from '../types';
import { useState } from 'react';

interface SidebarProps {
  theme: Theme;
  setSidebarOpen: (open: boolean) => void;
  setActiveSidebarTab: (tab: string | null) => void;
  startGame: (gameId: string) => void;
  resetGame: () => void;
  toggleTheme: () => void;
  difficulty: Difficulty;
  setDifficulty: (d: Difficulty) => void;
  mode: GameMode | null;
  teams: Team[];
  players: Player[];
  scores: Record<string, number>;
  dailyChallenge: string | null;
  missions: Mission[];
  GAMES: { id: string; title: string; icon: string }[];
  view: string;
  setView: (v: string) => void;
}

export function Sidebar({ 
  theme, setSidebarOpen, setActiveSidebarTab, startGame, resetGame, 
  toggleTheme, difficulty, setDifficulty, mode, teams, players, scores,
  dailyChallenge, missions, GAMES, view, setView 
}: SidebarProps) {
  
  const [activeSection, setActiveSection] = useState<string>('tournaments');
  const [hoveredBooster, setHoveredBooster] = useState<string | null>(null);

  const handleStartGame = (gameId: string) => {
    startGame(gameId);
    setSidebarOpen(false);
  };

  const handleNavigation = (targetView: string) => {
    setView(targetView);
    setSidebarOpen(false);
  };

  const tournaments = [
    { id: 'trivia-championship', name: 'Weekly Trivia Championship', icon: '🧠', games: ['Trivia'], players: 45, maxPlayers: 100, color: 'from-purple-500 to-indigo-600' },
    { id: 'africa-tournament', name: 'Africa Special', icon: '🌍', games: ['Africa Trivia', 'Tanzania', 'Culture'], players: 28, maxPlayers: 50, color: 'from-amber-500 to-orange-600' },
    { id: 'speed-challenge', name: 'Speed Challenge', icon: '⚡', games: ['Rapid Fire', 'Memory'], players: 0, maxPlayers: 75, color: 'from-yellow-500 to-red-500' },
    { id: 'safari-championship', name: 'Safari Championship', icon: '🦁', games: ['Wildlife', 'Trivia'], players: 15, maxPlayers: 60, color: 'from-green-500 to-emerald-600' },
    { id: 'swahili-sprint', name: 'Swahili Sprint', icon: '📚', games: ['Swahili', 'Culture'], players: 20, maxPlayers: 80, color: 'from-cyan-500 to-blue-600' },
    { id: 'precision-tournament', name: 'Precision Tournament', icon: '🎯', games: ['Trivia', 'Emoji'], players: 10, maxPlayers: 50, color: 'from-pink-500 to-rose-600' },
    { id: 'brain-battle', name: 'Brain Battle', icon: '🧩', games: ['Teasers', 'Would You'], players: 5, maxPlayers: 70, color: 'from-violet-500 to-purple-600' },
    { id: 'ultimate-championship', name: 'Ultimate Championship', icon: '🏆', games: ['All Games'], players: 8, maxPlayers: 30, color: 'from-yellow-500 to-amber-600' },
    { id: 'word-wizard', name: 'Word Wizard Cup', icon: '🌟', games: ['Word Relay', 'Scramble'], players: 12, maxPlayers: 90, color: 'from-sky-500 to-blue-600' },
    { id: 'memory-masters', name: 'Memory Masters', icon: '🎮', games: ['Memory', 'Emoji'], players: 18, maxPlayers: 85, color: 'from-teal-500 to-cyan-600' },
  ];

  const vibeBoosters = [
    { id: 'turbo', name: 'Turbo', icon: '🚀', desc: '2x timer, 2x points!', color: 'from-red-500 to-orange-500' },
    { id: 'jackpot', name: 'Jackpot', icon: '💰', desc: 'Random 5x points!', color: 'from-yellow-500 to-amber-500' },
    { id: 'double', name: 'Double', icon: '⚡', desc: '2x next answer', color: 'from-orange-500 to-yellow-500' },
    { id: 'triple', name: 'Triple', icon: '🎯', desc: '3x next answer', color: 'from-purple-500 to-pink-500' },
    { id: 'zen', name: 'Zen', icon: '🧘', desc: 'No timer, 0.5x pts', color: 'from-green-500 to-emerald-500' },
    { id: 'timewarp', name: 'Time Warp', icon: '⏪', desc: '+30 seconds', color: 'from-blue-500 to-cyan-500' },
    { id: 'freeze', name: 'Freeze', icon: '❄️', desc: 'Pause 10s', color: 'from-cyan-400 to-sky-500' },
    { id: 'shield', name: 'Shield', icon: '🛡️', desc: '1 free wrong', color: 'from-indigo-500 to-violet-500' },
    { id: 'lucky', name: 'Lucky', icon: '🍀', desc: '3 auto-correct!', color: 'from-emerald-500 to-green-500' },
    { id: 'steal', name: 'Steal', icon: '🦝', desc: 'Steal 10 pts', color: 'from-amber-600 to-orange-600' },
    { id: 'swap', name: 'Swap', icon: '🔄', desc: 'Swap answer', color: 'from-pink-500 to-rose-500' },
    { id: 'chaos', name: 'Chaos', icon: '🌀', desc: 'Random 1-50 pts', color: 'from-violet-500 to-fuchsia-500' },
    { id: 'fire', name: 'On Fire', icon: '🔥', desc: '+50% streak', color: 'from-orange-600 to-red-600' },
    { id: 'phoenix', name: 'Phoenix', icon: '🦅', desc: 'Revive streak', color: 'from-red-600 to-rose-600' },
  ];

  const quickGames = [
    { id: 'trivia', name: 'Trivia', icon: Brain, color: 'bg-purple-500' },
    { id: 'memory-match', name: 'Memory', icon: Eye, color: 'bg-blue-500' },
    { id: 'word-scramble', name: 'Word Scramble', icon: Type, color: 'bg-green-500' },
    { id: 'emoji-guess', name: 'Emoji Guess', icon: Sparkles, color: 'bg-pink-500' },
    { id: 'rapid-fire', name: 'Rapid Fire', icon: Zap, color: 'bg-yellow-500' },
    { id: 'number-crunch', name: 'Number Crunch', icon: Hash, color: 'bg-red-500' },
    { id: 'brain-teasers', name: 'Brain Teasers', icon: Lightbulb, color: 'bg-amber-500' },
    { id: 'would-you-rather', name: 'Would You Rather', icon: MessageCircle, color: 'bg-cyan-500' },
    { id: 'africa-trivia', name: 'Africa Trivia', icon: Globe, color: 'bg-emerald-500' },
    { id: 'swahili-words', name: 'Swahili', icon: BookOpen, color: 'bg-orange-500' },
  ];

  const getMissionIcon = (type: string) => {
    const icons: Record<string, string> = {
      'SCORE': '🎯', 'STREAK': '🔥', 'ACCURACY': '🎯', 'TIME': '⏱️',
      'COLLECT': '⭐', 'CHALLENGE': '🏆', 'STORY': '📖', 'BOSS': '👑',
      'DAILY': '📅', 'WEEKLY': '📆', 'SEASONAL': '🌟',
    };
    return icons[type] || '🎯';
  };

  return (
    <>
      {/* Sidebar Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
        onClick={() => setSidebarOpen(false)}
      />
      
      {/* Sidebar */}
      <motion.div
        initial={{ x: -320 }}
        animate={{ x: 0 }}
        exit={{ x: -320 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={`fixed top-0 left-0 h-full w-full sm:w-[340px] lg:w-[380px] ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'} shadow-2xl z-50 overflow-hidden`}
      >
        {/* Header */}
        <div className={`p-5 border-b ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'} bg-gradient-to-r ${theme === 'dark' ? 'from-zinc-900 to-zinc-800' : 'from-white to-zinc-50'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">🎮</span>
              </div>
              <div>
                <h2 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>VibeTeam</h2>
                <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Your gaming hub</p>
              </div>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)} 
              className={`p-2 rounded-lg transition-all ${theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-600'}`}
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="h-[calc(100%-80px)] overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
          
          {/* Section Tabs */}
          <div className="flex gap-2 mb-4">
            {[
              { id: 'tournaments', label: '🏅 Tournaments', icon: Trophy },
              { id: 'missions', label: '🎯 Missions', icon: Target },
              { id: 'boosters', label: '🚀 Boosters', icon: Rocket },
              { id: 'games', label: '🎮 Games', icon: Gamepad2 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                  activeSection === tab.id 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' 
                    : `${theme === 'dark' ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tournaments Section */}
          <AnimatePresence mode="wait">
            {activeSection === 'tournaments' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                <h3 className={`text-sm font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  Active Tournaments
                </h3>
                {tournaments.map((tournament, idx) => (
                  <motion.button
                    key={tournament.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleStartGame(tournament.id)}
                    className={`w-full p-4 rounded-2xl text-left transition-all shadow-lg hover:shadow-xl ${theme === 'dark' ? 'bg-zinc-800 border border-zinc-700' : 'bg-white border border-zinc-200'}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{tournament.icon}</span>
                        <div>
                          <h4 className={`font-black text-sm ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{tournament.name}</h4>
                          <p className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>{tournament.games.join(' • ')}</p>
                        </div>
                      </div>
                      <ChevronRight size={18} className={theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'} />
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-bold ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>Players</span>
                        <span className={`text-xs font-bold ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>{tournament.players}/{tournament.maxPlayers}</span>
                      </div>
                      <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-200'}`}>
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(tournament.players / tournament.maxPlayers) * 100}%` }}
                          transition={{ delay: 0.3 + idx * 0.05, duration: 0.5 }}
                          className={`h-full bg-gradient-to-r ${tournament.color} rounded-full`}
                        />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Missions Section */}
            {activeSection === 'missions' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                <h3 className={`text-sm font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  Your Missions
                </h3>
                {missions.length === 0 ? (
                  <div className={`p-8 text-center rounded-2xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
                    <Target size={40} className={`mx-auto mb-3 ${theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'}`} />
                    <p className={`font-bold ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>No active missions</p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Start playing to unlock missions!</p>
                  </div>
                ) : (
                  <>{missions.slice(0, 5).map((mission, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`p-4 rounded-2xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-100'} border ${theme === 'dark' ? 'border-zinc-700' : 'border-zinc-200'}`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{getMissionIcon(mission.type)}</span>
                        <div className="flex-1">
                          <h4 className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{mission.title}</h4>
                          <p className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>{mission.description}</p>
                        </div>
                        <span className="text-sm font-black text-green-500">+{mission.reward}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`flex-1 h-2 rounded-full ${theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-200'}`}>
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((mission.current / mission.target) * 100, 100)}%` }}
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                          />
                        </div>
                        <span className={`text-xs font-bold ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                          {mission.current}/{mission.target}
                        </span>
                      </div>
                    </motion.div>
                  ))}</>
                )}
              </motion.div>
            )}

            {/* Boosters Section */}
            {activeSection === 'boosters' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                <h3 className={`text-sm font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  Vibe Boosters
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {vibeBoosters.map((booster, idx) => (
                    <motion.button
                      key={booster.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.03 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={() => setHoveredBooster(booster.id)}
                      onMouseLeave={() => setHoveredBooster(null)}
                      className={`p-3 rounded-xl text-center transition-all relative overflow-hidden ${
                        theme === 'dark' ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-100 hover:bg-zinc-200'
                      }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${booster.color} opacity-0 hover:opacity-10 transition-opacity`} />
                      <span className="text-2xl relative z-10">{booster.icon}</span>
                      <span className={`text-[10px] font-bold block mt-1 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        {booster.name}
                      </span>
                      
                      {/* Tooltip */}
                      <AnimatePresence>
                        {hoveredBooster === booster.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className={`absolute -bottom-12 left-1/2 -translate-x-1/2 w-28 p-2 rounded-lg text-xs font-bold z-20 shadow-xl ${
                              theme === 'dark' ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-white'
                            }`}
                          >
                            {booster.desc}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Quick Games Section */}
            {activeSection === 'games' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                <h3 className={`text-sm font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  Quick Games
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {quickGames.map((game, idx) => (
                    <motion.button
                      key={game.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleStartGame(game.id)}
                      className={`p-4 rounded-2xl text-center transition-all ${
                        theme === 'dark' ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-100 hover:bg-zinc-200'
                      } border ${theme === 'dark' ? 'border-zinc-700' : 'border-zinc-200'}`}
                    >
                      <div className={`w-12 h-12 mx-auto mb-2 rounded-xl ${game.color} flex items-center justify-center`}>
                        <game.icon size={24} className="text-white" />
                      </div>
                      <span className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{game.name}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Actions */}
          <div className="pt-4 border-t border-zinc-700">
            <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button 
                onClick={() => { toggleTheme(); }}
                className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${
                  theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'
                }`}
              >
                {theme === 'dark' ? (
                  <Sun size={20} className="text-yellow-500" />
                ) : (
                  <Moon size={20} className="text-indigo-500" />
                )}
                <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                  {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </span>
              </button>
              
              <button 
                onClick={() => { resetGame(); setSidebarOpen(false); }}
                className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${
                  theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'
                }`}
              >
                <RotateCcw size={20} className="text-pink-500" />
                <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>🔄 Reset Game</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${theme === 'dark' ? 'border-zinc-800 bg-zinc-900' : 'border-zinc-200 bg-white'}`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs ${theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'}`}>VibeTeam v2.0</span>
            <div className="flex items-center gap-1">
              <span className={`text-xs ${theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'}`}>Made with</span>
              <span className="text-red-500">❤️</span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
