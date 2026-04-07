import { useState, useCallback, useEffect } from 'react';
import { 
  GameMode, 
  Team, 
  Player, 
  Mission, 
  Theme, 
  Difficulty
} from '../types';
import { 
  calculateScore, 
  calculateXP, 
  calculateLevel,
  xpForNextLevel,
  getTimeLimit,
  determineWinner,
  isGameValid,
  calculateAccuracy,
  updateMissionProgress,
  calculateMissionRewards,
  createGameSession,
  processAnswer,
  endGameSession,
  getSessionStats,
  shuffleArray,
  getRandomItems,
  generateId,
  GameSession,
  GameStats
} from '../engine';
import { INITIAL_MISSIONS, DAILY_CHALLENGES } from '../constants';

// ============================================
// STORAGE KEYS
// ============================================

const STORAGE_KEY = 'vibeteam_state';
const SESSIONS_KEY = 'vibeteam_sessions';

// ============================================
// HOOK INTERFACE
// ============================================

interface UseGameEngineReturn {
  // Game State
  difficulty: Difficulty;
  theme: Theme;
  mode: GameMode | null;
  teams: Team[];
  players: Player[];
  activeGame: string | null;
  scores: Record<string, number>;
  missions: Mission[];
  dailyChallenge: string | null;
  lastMissionCompleted: Mission | null;
  
  // Game Session
  currentSession: GameSession | null;
  currentQuestion: number;
  timeLeft: number;
  gameStarted: boolean;
  currentStreak: number;
  
  // Actions
  setDifficulty: (difficulty: Difficulty) => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setMode: (mode: GameMode | null) => void;
  setTeams: (teams: Team[]) => void;
  setPlayers: (players: Player[]) => void;
  setActiveGame: (game: string | null) => void;
  
  // Game Actions
  startGame: (gameId: string) => void;
  answerQuestion: (answer: string, correctAnswer: string) => void;
  endGame: () => void;
  resetGame: () => void;
  
  // Helpers
  generateDailyChallenge: () => void;
  getLeaderboard: () => Array<{ id: string; name: string; score: number }>;
  getPlayerStats: () => GameStats | null;
}

// ============================================
// HOOK IMPLEMENTATION
// ============================================

export function useGameEngine(): UseGameEngineReturn {
  // Core State
  const [difficulty, setDifficulty] = useState<Difficulty>('MEDIUM');
  const [theme, setTheme] = useState<Theme>('dark');
  const [mode, setMode] = useState<GameMode | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [missions, setMissions] = useState<Mission[]>(INITIAL_MISSIONS);
  const [dailyChallenge, setDailyChallenge] = useState<string | null>(null);
  const [lastMissionCompleted, setLastMissionCompleted] = useState<Mission | null>(null);
  
  // Game Session State
  const [currentSession, setCurrentSession] = useState<GameSession | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [sessionHistory, setSessionHistory] = useState<GameSession[]>([]);

  // ============================================
  // PERSISTENCE
  // ============================================

  // Load saved state
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.difficulty) setDifficulty(parsed.difficulty);
        if (parsed.theme) setTheme(parsed.theme);
        if (parsed.teams) setTeams(parsed.teams);
        if (parsed.players) setPlayers(parsed.players);
        if (parsed.missions) setMissions(parsed.missions);
        if (parsed.mode) setMode(parsed.mode);
      }
      
      const sessionsSaved = localStorage.getItem(SESSIONS_KEY);
      if (sessionsSaved) {
        setSessionHistory(JSON.parse(sessionsSaved));
      }
    } catch (e) {
      console.error('Failed to load saved state:', e);
    }
  }, []);

  // Save state
  useEffect(() => {
    const state = {
      difficulty,
      theme,
      teams,
      players,
      missions,
      mode
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessionHistory));
  }, [difficulty, theme, teams, players, missions, mode, sessionHistory]);

  // ============================================
  // ACTIONS
  // ============================================

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const generateDailyChallenge = useCallback(() => {
    const challenge = DAILY_CHALLENGES[Math.floor(Math.random() * DAILY_CHALLENGES.length)];
    setDailyChallenge(challenge);
  }, []);

  // ============================================
  // GAME ACTIONS
  // ============================================

  const startGame = useCallback((gameId: string) => {
    setActiveGame(gameId);
    setGameStarted(true);
    setCurrentQuestion(0);
    setTimeLeft(getTimeLimit(gameId, difficulty));
    setScores({});
    setCurrentStreak(0);
    
    // Create new session
    const session = createGameSession(gameId, mode || 'INDIVIDUAL');
    setCurrentSession(session);
  }, [difficulty, mode]);

  const answerQuestion = useCallback((answer: string, correctAnswer: string) => {
    const isCorrect = answer.toLowerCase() === correctAnswer.toLowerCase();
    
    // Calculate score
    const basePoints = 10;
    const score = isCorrect 
      ? calculateScore(basePoints, timeLeft, difficulty, currentStreak)
      : 0;
    
    // Update scores
    if (isCorrect && mode === 'TEAM' && teams.length > 0) {
      const winnerId = teams[0].id;
      setScores(prev => ({
        ...prev,
        [winnerId]: (prev[winnerId] || 0) + score
      }));
    } else if (isCorrect && mode === 'INDIVIDUAL' && players.length > 0) {
      const winnerId = players[0].id;
      setScores(prev => ({
        ...prev,
        [winnerId]: (prev[winnerId] || 0) + score
      }));
    }
    
    // Update streak
    setCurrentStreak(prev => isCorrect ? prev + 1 : 0);
    
    // Update session
    if (currentSession) {
      const updatedSession = processAnswer(
        currentSession,
        isCorrect,
        30 - timeLeft,
        score
      );
      setCurrentSession(updatedSession);
    }
    
    // Update missions
    if (activeGame && isCorrect) {
      const updatedMissions = updateMissionProgress(missions, activeGame, score, isCorrect);
      
      // Check for newly completed missions
      updatedMissions.forEach((mission, index) => {
        if (mission.completed && !missions[index].completed) {
          setLastMissionCompleted(mission);
        }
      });
      
      setMissions(updatedMissions);
    }
  }, [timeLeft, difficulty, currentStreak, mode, teams, players, currentSession, activeGame, missions]);

  const nextQuestion = useCallback(() => {
    if (currentQuestion < 9) {
      setCurrentQuestion(prev => prev + 1);
      setTimeLeft(getTimeLimit(activeGame || 'trivia', difficulty));
    } else {
      endGame();
    }
  }, [currentQuestion, activeGame, difficulty]);

  const endGame = useCallback(() => {
    setGameStarted(false);
    
    // End session
    if (currentSession) {
      const finalSession = endGameSession(currentSession);
      setSessionHistory(prev => [...prev, finalSession]);
      setCurrentSession(null);
    }
    
    setActiveGame(null);
  }, [currentSession]);

  const resetGame = useCallback(() => {
    setTeams([]);
    setPlayers([]);
    setScores({});
    setMissions(INITIAL_MISSIONS);
    setActiveGame(null);
    setMode(null);
    setCurrentSession(null);
    setCurrentQuestion(0);
    setTimeLeft(30);
    setGameStarted(false);
    setCurrentStreak(0);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Auto-advance question
  useEffect(() => {
    if (!gameStarted || timeLeft > 0) return;
    
    const timer = setTimeout(() => {
      nextQuestion();
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [timeLeft, gameStarted, nextQuestion]);

  // Auto-hide mission notification
  useEffect(() => {
    if (lastMissionCompleted) {
      const timer = setTimeout(() => setLastMissionCompleted(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [lastMissionCompleted]);

  // ============================================
  // HELPERS
  // ============================================

  const getLeaderboard = useCallback(() => {
    if (mode === 'TEAM') {
      return teams
        .map(t => ({ id: t.id, name: t.name, score: scores[t.id] || 0 }))
        .sort((a, b) => b.score - a.score);
    } else {
      return players
        .map(p => ({ id: p.id, name: p.name, score: scores[p.id] || 0 }))
        .sort((a, b) => b.score - a.score);
    }
  }, [mode, teams, players, scores]);

  const getPlayerStats = useCallback((): GameStats | null => {
    if (!currentSession || currentSession.isActive) return null;
    return getSessionStats(currentSession);
  }, [currentSession]);

  return {
    // State
    difficulty,
    theme,
    mode,
    teams,
    players,
    activeGame,
    scores,
    missions,
    dailyChallenge,
    lastMissionCompleted,
    
    // Session State
    currentSession,
    currentQuestion,
    timeLeft,
    gameStarted,
    currentStreak,
    
    // Actions
    setDifficulty,
    setTheme,
    toggleTheme,
    setMode,
    setTeams,
    setPlayers,
    setActiveGame,
    
    // Game Actions
    startGame,
    answerQuestion,
    endGame,
    resetGame,
    
    // Helpers
    generateDailyChallenge,
    getLeaderboard,
    getPlayerStats
  };
}
