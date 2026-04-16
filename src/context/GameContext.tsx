import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { GameMode, Theme, Difficulty, Team, Player, Mission } from '../types';
import { INITIAL_MISSIONS } from '../constants';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface GameContextType {
  mode: GameMode | null;
  theme: Theme;
  difficulty: Difficulty;
  teams: Team[];
  players: Player[];
  missions: Mission[];
  setMode: (mode: GameMode | null) => void;
  setTheme: (theme: Theme) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setTeams: (teams: Team[]) => void;
  setPlayers: (players: Player[]) => void;
  setMissions: (missions: Mission[]) => void;
  toggleTheme: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const DEFAULT_PLAYER: Player = {
  id: 'player-1',
  name: 'Player',
  score: 0,
  xp: 0,
  level: 1,
  wins: 0,
  streak: 0,
  avatar: '👤',
  badges: [],
  stats: {
    totalGames: 0,
    totalWins: 0,
    totalXP: 0,
    currentLevel: 1,
    longestStreak: 0,
    accuracy: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    coins: 0,
    badges: [],
    achievements: [],
    tournamentsWon: 0,
    bossesDefeated: 0,
    chaptersCompleted: 0,
  },
};

export function GameProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage<Theme>('vibeteam_theme', 'dark');
  const [difficulty, setDifficulty] = useLocalStorage<Difficulty>('vibeteam_difficulty', 'MEDIUM');
  const [mode, setMode] = useState<GameMode | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useLocalStorage<Player[]>('vibeteam_players', [DEFAULT_PLAYER]);
  const [missions, setMissions] = useState<Mission[]>(INITIAL_MISSIONS);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const resetGame = useCallback(() => {
    setMode(null);
    setTeams([]);
    setPlayers([]);
    setMissions(INITIAL_MISSIONS);
  }, []);

  return (
    <GameContext.Provider
      value={{
        mode,
        theme,
        difficulty,
        teams,
        players,
        missions,
        setMode,
        setTheme,
        setDifficulty,
        setTeams,
        setPlayers,
        setMissions,
        toggleTheme,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}