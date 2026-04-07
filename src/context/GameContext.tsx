import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { GameMode, Theme, Difficulty, Team, Player, Mission } from '../types';
import { INITIAL_MISSIONS } from '../constants';

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

export function GameProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<GameMode | null>(null);
  const [theme, setTheme] = useState<Theme>('dark');
  const [difficulty, setDifficulty] = useState<Difficulty>('MEDIUM');
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
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