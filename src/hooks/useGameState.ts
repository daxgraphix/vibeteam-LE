import { useState, useEffect, useCallback } from 'react';
import { GameMode, Team, Player, Mission, Theme, Difficulty, GameState } from '../types';
import { INITIAL_MISSIONS, DAILY_CHALLENGES } from '../constants';

const STORAGE_KEY = 'vibeteam_state';

interface UseGameStateReturn {
  // State
  difficulty: Difficulty;
  showSplash: boolean;
  theme: Theme;
  view: 'DASHBOARD' | 'SETUP' | 'GAME' | 'LEADERBOARD';
  mode: GameMode | null;
  teams: Team[];
  players: Player[];
  activeGame: string | null;
  scores: Record<string, number>;
  missions: Mission[];
  lastMissionCompleted: Mission | null;
  dailyChallenge: string | null;
  // Actions
  setDifficulty: (difficulty: Difficulty) => void;
  setShowSplash: (show: boolean) => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setView: (view: 'DASHBOARD' | 'SETUP' | 'GAME' | 'LEADERBOARD') => void;
  setMode: (mode: GameMode | null) => void;
  setTeams: (teams: Team[]) => void;
  setPlayers: (players: Player[]) => void;
  setActiveGame: (game: string | null) => void;
  setScores: (scores: Record<string, number>) => void;
  updateScore: (id: string, points: number) => void;
  setMissions: (missions: Mission[]) => void;
  completeMission: (missionId: string) => void;
  resetGame: () => void;
  generateDailyChallenge: () => void;
}

export function useGameState(): UseGameStateReturn {
  const [difficulty, setDifficulty] = useState<Difficulty>('MEDIUM');
  const [showSplash, setShowSplash] = useState(true);
  const [theme, setTheme] = useState<Theme>('dark');
  const [view, setView] = useState<'DASHBOARD' | 'SETUP' | 'GAME' | 'LEADERBOARD'>('DASHBOARD');
  const [mode, setMode] = useState<GameMode | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [missions, setMissions] = useState<Mission[]>(INITIAL_MISSIONS);
  const [lastMissionCompleted, setLastMissionCompleted] = useState<Mission | null>(null);
  const [dailyChallenge, setDailyChallenge] = useState<string | null>(null);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const generateDailyChallenge = useCallback(() => {
    const challenge = DAILY_CHALLENGES[Math.floor(Math.random() * DAILY_CHALLENGES.length)];
    setDailyChallenge(challenge);
  }, []);

  const updateScore = useCallback((id: string, points: number) => {
    setScores(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + points
    }));
  }, []);

  const completeMission = useCallback((missionId: string) => {
    setMissions(prev => prev.map(mission => {
      if (mission.id === missionId && !mission.completed) {
        const newCurrent = mission.current + 1;
        const isCompleted = newCurrent >= mission.target;
        if (isCompleted) {
          const completedMission = { ...mission, current: newCurrent, completed: true };
          setLastMissionCompleted(completedMission);
          return completedMission;
        }
        return { ...mission, current: newCurrent };
      }
      return mission;
    }));
  }, []);

  const resetGame = useCallback(() => {
    setTeams([]);
    setPlayers([]);
    setScores({});
    setMissions(INITIAL_MISSIONS);
    setActiveGame(null);
    setView('DASHBOARD');
    setMode(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Load saved state
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed: Partial<GameState> = JSON.parse(saved);
        if (parsed.difficulty) setDifficulty(parsed.difficulty);
        if (parsed.theme) setTheme(parsed.theme);
        if (parsed.teams) setTeams(parsed.teams);
        if (parsed.players) setPlayers(parsed.players);
        if (parsed.missions) setMissions(parsed.missions);
        if (parsed.currentMode) setMode(parsed.currentMode);
        if (parsed.activeGameId) setActiveGame(parsed.activeGameId);
      } catch (e) {
        console.error('Failed to load saved state:', e);
      }
    }
  }, []);

  // Save state
  useEffect(() => {
    const state: Partial<GameState> = {
      difficulty,
      theme,
      teams,
      players,
      missions,
      currentMode: mode || undefined,
      activeGameId: activeGame,
      isGameActive: false,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [difficulty, theme, teams, players, missions, mode, activeGame]);

  // Auto-hide mission completion notification
  useEffect(() => {
    if (lastMissionCompleted) {
      const timer = setTimeout(() => setLastMissionCompleted(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [lastMissionCompleted]);

  return {
    // State
    difficulty,
    showSplash,
    theme,
    view,
    mode,
    teams,
    players,
    activeGame,
    scores,
    missions,
    lastMissionCompleted,
    dailyChallenge,
    // Actions
    setDifficulty,
    setShowSplash,
    setTheme,
    toggleTheme,
    setView,
    setMode,
    setTeams,
    setPlayers,
    setActiveGame,
    setScores,
    updateScore,
    setMissions,
    completeMission,
    resetGame,
    generateDailyChallenge,
  };
}
