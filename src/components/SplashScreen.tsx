import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Users, Brain, Sparkles, Zap, Trophy, ArrowRight, Star, User, Plus, X, UserPlus, Shield, Swords } from 'lucide-react';

interface SplashScreenProps {
  onComplete: (mode: 'INDIVIDUAL' | 'TEAM', names: string[]) => void;
}

type ModeType = 'INDIVIDUAL' | 'TEAM';

interface ModeOption {
  id: ModeType;
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  features: string[];
}

const modeOptions: ModeOption[] = [
  {
    id: 'INDIVIDUAL',
    title: 'Solo Play',
    description: 'Challenge yourself or play with friends',
    icon: <User size={28} />,
    color: 'from-pink-500 to-rose-600',
    features: ['Single Player', 'Multiple Friends', 'Track Personal Stats', 'Leaderboards']
  },
  {
    id: 'TEAM',
    title: 'Team Battle',
    description: 'Form teams and compete together',
    icon: <Users size={28} />,
    color: 'from-indigo-500 to-violet-600',
    features: ['2-4 Teams', 'Team Scoring', 'Collaborative Play', 'Team Leaderboards']
  }
];

const avatars = ['🦊', '🐼', '🦁', '🐯', '🐨', '🐰', '🐸', '🦄'];

const STORAGE_KEY = 'vibeteam_user_data';

interface SavedUserData {
  mode: ModeType;
  playerNames: { name: string; avatar: string }[];
  teamName: string;
  teams: { name: string; color: string }[];
}

function loadSavedData(): SavedUserData | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load saved data:', e);
  }
  return null;
}

function saveUserData(data: SavedUserData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save data:', e);
  }
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [showModeSelect, setShowModeSelect] = useState(false);
  const [selectedMode, setSelectedMode] = useState<ModeType | null>(null);
  const [playerNames, setPlayerNames] = useState<string[]>(() => {
    const saved = loadSavedData();
    if (saved && saved.mode === 'INDIVIDUAL' && saved.playerNames.length > 0) {
      return saved.playerNames.map(p => p.name).filter(n => n.trim() !== '');
    }
    return [{ name: '', avatar: avatars[0] }];
  });
  const [playerAvatars, setPlayerAvatars] = useState<string[]>(() => {
    const saved = loadSavedData();
    if (saved && saved.mode === 'INDIVIDUAL') {
      return saved.playerNames.map(p => p.avatar || avatars[0]);
    }
    return [avatars[0]];
  });
  const [teamName, setTeamName] = useState(() => {
    const saved = loadSavedData();
    return saved?.teamName || '';
  });
  const [teams, setTeams] = useState<{ name: string; color: string }[]>(() => {
    const saved = loadSavedData();
    if (saved && saved.mode === 'TEAM' && saved.teams.length > 0) {
      return saved.teams;
    }
    return [
      { name: '', color: 'bg-red-500' },
      { name: '', color: 'bg-blue-500' }
    ];
  });
  const [showTeamSetup, setShowTeamSetup] = useState(false);

  const handleModeSelect = (mode: ModeType) => {
    setSelectedMode(mode);
    if (mode === 'INDIVIDUAL') {
      setPlayerNames([{ name: '', avatar: avatars[0] }]);
    } else {
      setTeamName('');
      setTeams([
        { name: '', color: 'bg-red-500' },
        { name: '', color: 'bg-blue-500' }
      ]);
    }
  };

  const handleAddPlayer = () => {
    if (playerNames.length < 8) {
      setPlayerNames([...playerNames, { name: '', avatar: avatars[playerNames.length % avatars.length] }]);
    }
  };

  const handleRemovePlayer = (index: number) => {
    if (playerNames.length > 1) {
      setPlayerNames(playerNames.filter((_, i) => i !== index));
    }
  };

  const handlePlayerNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = { ...newNames[index], name };
    setPlayerNames(newNames);
  };

  const handleTeamNameChange = (index: number, name: string) => {
    const newTeams = [...teams];
    newTeams[index] = { ...newTeams[index], name };
    setTeams(newTeams);
  };

  const addTeam = () => {
    if (teams.length < 4) {
      const colors = ['bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-orange-500'];
      setTeams([...teams, { name: '', color: colors[teams.length] }]);
    }
  };

  const removeTeam = (index: number) => {
    if (teams.length > 2) {
      setTeams(teams.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    if (selectedMode === 'INDIVIDUAL') {
      const validPlayers = playerNames.filter(p => p.name.trim() !== '');
      if (validPlayers.length > 0) {
        onComplete('INDIVIDUAL', validPlayers.map(p => p.name));
      }
    } else if (selectedMode === 'TEAM') {
      const validTeams = teams.filter(t => t.name.trim() !== '');
      if (validTeams.length >= 2) {
        onComplete('TEAM', validTeams.map(t => t.name));
      }
    }
  };

  const canProceed = selectedMode === 'INDIVIDUAL' 
    ? playerNames.some(p => p.name.trim() !== '')
    : teams.filter(t => t.name.trim() !== '').length >= 2;

  if (showModeSelect) {
    return (
      <div className="fixed inset-0 z-[200] bg-zinc-950 flex flex-col items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 w-full max-w-md px-6"
        >
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Gamepad2 size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-white mb-1">Welcome!</h2>
            <p className="text-zinc-400 text-sm">Choose how you want to play</p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!selectedMode ? (
              <motion.div
                key="mode-select"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-3"
              >
                {modeOptions.map((mode) => (
                  <motion.button
                    key={mode.id}
                    onClick={() => handleModeSelect(mode.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-all text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${mode.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        {mode.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white">{mode.title}</h3>
                        <p className="text-zinc-400 text-xs">{mode.description}</p>
                      </div>
                      <ArrowRight size={20} className="text-zinc-500" />
                    </div>
                  </motion.button>
                ))}

                <button
                  onClick={() => setShowModeSelect(false)}
                  className="w-full mt-4 py-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm"
                >
                  ← Back
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="name-input"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-5"
              >
                <button
                  onClick={() => setSelectedMode(null)}
                  className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm mb-2"
                >
                  <ArrowRight className="rotate-180" size={18} /> Back to mode selection
                </button>

                {selectedMode === 'INDIVIDUAL' ? (
                  <>
                    <div className="bg-zinc-900/60 rounded-xl p-4 border border-zinc-800">
                      <div className="flex items-center gap-2 mb-3">
                        <UserPlus size={18} className="text-pink-400" />
                        <h3 className="text-sm font-semibold text-white">Add Players</h3>
                      </div>
                      <p className="text-zinc-500 text-xs mb-4">Add at least one player to continue</p>
                      
                      <div className="space-y-2 max-h-[280px] overflow-y-auto">
                        {playerNames.map((player, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="text-lg">{player.avatar}</span>
                            <input
                              type="text"
                              value={player.name}
                              onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                              placeholder={`Player ${index + 1}`}
                              className="flex-1 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm placeholder-zinc-500 focus:border-pink-500 focus:outline-none"
                            />
                            {playerNames.length > 1 && (
                              <button
                                onClick={() => handleRemovePlayer(index)}
                                className="p-2 rounded-lg bg-zinc-800 text-zinc-500 hover:text-red-400 transition-colors"
                              >
                                <X size={16} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={handleAddPlayer}
                        disabled={playerNames.length >= 8}
                        className="w-full mt-3 py-2 rounded-lg border border-dashed border-zinc-700 text-zinc-500 hover:border-pink-500 hover:text-pink-400 transition-all text-sm disabled:opacity-40"
                      >
                        + Add Player
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-zinc-900/60 rounded-xl p-4 border border-zinc-800">
                      <div className="flex items-center gap-2 mb-3">
                        <Swords size={18} className="text-indigo-400" />
                        <h3 className="text-sm font-semibold text-white">Setup Teams</h3>
                      </div>
                      <p className="text-zinc-500 text-xs mb-4">Add at least 2 teams to compete</p>
                      
                      <div className="space-y-2">
                        {teams.map((team, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-lg ${team.color} flex items-center justify-center`}>
                              <Users size={16} className="text-white" />
                            </div>
                            <input
                              type="text"
                              value={team.name}
                              onChange={(e) => handleTeamNameChange(index, e.target.value)}
                              placeholder={`Team ${index + 1}`}
                              className="flex-1 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
                            />
                            {teams.length > 2 && (
                              <button
                                onClick={() => removeTeam(index)}
                                className="p-2 rounded-lg bg-zinc-800 text-zinc-500 hover:text-red-400 transition-colors"
                              >
                                <X size={16} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={addTeam}
                        disabled={teams.length >= 4}
                        className="w-full mt-3 py-2 rounded-lg border border-dashed border-zinc-700 text-zinc-500 hover:border-indigo-500 hover:text-indigo-400 transition-all text-sm disabled:opacity-40"
                      >
                        + Add Team
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-zinc-500 text-xs">
                      <Shield size={14} />
                      <span>{teams.filter(t => t.name.trim() !== '').length} / {teams.length} teams ready</span>
                    </div>
                  </>
                )}

                <motion.button
                  onClick={handleSubmit}
                  disabled={!canProceed}
                  whileHover={{ scale: canProceed ? 1.02 : 1 }}
                  whileTap={{ scale: canProceed ? 0.98 : 1 }}
                  className={`w-full py-3.5 rounded-xl font-bold transition-all ${
                    canProceed
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/20'
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  }`}
                >
                  Start Playing →
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] bg-zinc-950 flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" 
        />
      </div>

      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center mb-12"
      >
        <motion.div 
          animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="relative inline-block"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_60px_rgba(139,92,246,0.5)]">
            <Gamepad2 size={48} className="text-white" />
          </div>
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl font-black mb-3 bg-gradient-to-r from-white via-indigo-100 to-white bg-clip-text text-transparent"
        >
          VIBE TEAM
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-zinc-400 text-lg"
        >
          The Ultimate Meeting Engagement Platform
        </motion.p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10"
      >
        <motion.button
          onClick={() => setShowModeSelect(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 rounded-2xl font-bold text-lg text-white shadow-[0_0_40px_rgba(139,92,246,0.5)] hover:shadow-[0_0_60px_rgba(139,92,246,0.6)] transition-all"
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  );
}