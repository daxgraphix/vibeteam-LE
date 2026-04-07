// ============================================
// CORE TYPES
// ============================================

export type GameMode = 'TEAM' | 'INDIVIDUAL' | 'COOP';
export type Theme = 'light' | 'dark';
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type GameCategory = 'TRIVIA' | 'WORD' | 'MEMORY' | 'STRATEGY' | 'ACTION' | 'STORY' | 'COUPLE' | 'CHALLENGE' | 'FLIPCARDS';
export type GameStatus = 'LOCKED' | 'UNLOCKED' | 'PLAYING' | 'COMPLETED';
export type SeasonStatus = 'ACTIVE' | 'UPCOMING' | 'ENDED';

// ============================================
// ENTITY TYPES
// ============================================

export interface Team {
  id: string;
  name: string;
  score: number;
  color: string;
  xp: number;
  level: number;
  wins: number;
  streak: number;
  avatar?: string;
  members: string[];
  rank?: number;
}

export interface Player {
  id: string;
  name: string;
  score: number;
  xp: number;
  level: number;
  wins: number;
  streak: number;
  avatar: string;
  badges: string[];
  stats: PlayerStats;
}

// ============================================
// GAME TYPES
// ============================================

export interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  mode: GameMode;
  category: GameCategory;
  status: GameStatus;
  minPlayers?: number;
  maxPlayers?: number;
  maxParticipants?: number;
  duration?: number; // in seconds
  difficulty: Difficulty;
  rewards: GameRewards;
  tutorial?: TutorialStep[];
}

export interface GameRewards {
  xp: number;
  coins: number;
  badges?: string[];
  unlockGame?: string;
}

export interface TutorialStep {
  step: number;
  title: string;
  description: string;
  target?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export interface Question {
  id: string;
  question: string;
  options?: string[];
  answer: string;
  category?: string;
  subcategory?: string;
  difficulty?: Difficulty;
  points?: number;
  timeLimit?: number;
  hint?: string;
  fact?: string;
  imageUrl?: string;
  audioUrl?: string;
}

export interface EmojiPuzzle {
  id?: string;
  emojis: string;
  answer: string;
  hint?: string;
  difficulty?: Difficulty;
  category?: string;
}

export interface WordScramble {
  scrambled: string;
  answer: string;
  hint?: string;
  difficulty: Difficulty;
  category: string;
}

export interface WordDifference {
  word1: string;
  word2: string;
  difference: string;
  category: string;
  difficulty: Difficulty;
}

export interface WordReadChallenge {
  words: string[];
  correctWord: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  category: string;
}

// ============================================
// STORY & ADVENTURE TYPES
// ============================================

export interface StoryChapter {
  id: string;
  title: string;
  description: string;
  missions: string[];
  unlockRequirement: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  rewards: GameRewards;
}

export interface BossBattle {
  id: string;
  name: string;
  description: string;
  avatar: string;
  difficulty: Difficulty;
  questions: Question[];
  timeLimit: number;
  rewards: GameRewards;
  isDefeated: boolean;
}

export interface SeasonEvent {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: SeasonStatus;
  theme: string;
  specialMissions: Mission[];
  exclusiveRewards: GameRewards;
  leaderboard: LeaderboardEntry[];
}

// ============================================
// MISSION & ACHIEVEMENT TYPES
// ============================================

export interface Mission {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  completed: boolean;
  reward: number;
  type: MissionType;
  difficulty?: Difficulty;
  expiresAt?: Date;
  bonusReward?: number;
}

export type MissionType = 
  | 'SCORE' 
  | 'STREAK' 
  | 'ACCURACY' 
  | 'TIME' 
  | 'COLLECT' 
  | 'CHALLENGE' 
  | 'STORY' 
  | 'BOSS' 
  | 'DAILY' 
  | 'WEEKLY' 
  | 'SEASONAL';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: number;
  xp: number;
  rarity: AchievementRarity;
  unlockedAt?: Date;
  category: string;
}

export type AchievementRarity = 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';

// ============================================
// BOOSTER TYPES
// ============================================

export type VibeBooster = {
  id: string;
  name: string;
  description: string;
  multiplier: number;
  icon: string;
  type: BoosterType;
  duration?: number;
  uses?: number;
  cost?: number;
};

export type BoosterType = 
  | 'SCORE' 
  | 'TIME' 
  | 'STREAK' 
  | 'SHIELD' 
  | 'STEAL' 
  | 'SWAP' 
  | 'MULTIPLIER' 
  | 'REVEAL';

// ============================================
// GAME STATE TYPES
// ============================================

export interface GameState {
  currentMode: GameMode | null;
  teams: Team[];
  players: Player[];
  activeGameId: string | null;
  isGameActive: boolean;
  missions: Mission[];
  difficulty: Difficulty;
  theme: Theme;
  sessionHistory: GameSession[];
  currentSeason?: SeasonEvent;
}

export interface GameSession {
  gameId: string;
  startTime: Date;
  endTime?: Date;
  score: number;
  correct: number;
  wrong: number;
  streak: number;
  maxStreak: number;
  boostersUsed: string[];
  difficulty: Difficulty;
  accuracy: number;
  timePlayed: number;
}

// ============================================
// UI STATE TYPES
// ============================================

export interface ViewState {
  current: 'SPLASH' | 'DASHBOARD' | 'SETUP' | 'GAME' | 'LEADERBOARD' | 'ACHIEVEMENTS' | 'SETTINGS' | 'STORY' | 'TOURNAMENT';
  previous?: string;
  transition?: string;
}

export interface NotificationState {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning' | 'achievement' | 'unlock' | 'streak';
  message: string;
  duration?: number;
  icon?: string;
}

// ============================================
// LEADERBOARD TYPES
// ============================================

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  avatar: string;
  isCurrentUser?: boolean;
  change?: number;
  badges?: string[];
}

export interface LeaderboardFilter {
  timeRange: 'ALL' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
  gameId?: string;
  mode?: GameMode;
}

// ============================================
// STATS TYPES
// ============================================

export interface PlayerStats {
  totalGames: number;
  totalWins: number;
  totalXP: number;
  currentLevel: number;
  longestStreak: number;
  favoriteGame?: string;
  accuracy: number;
  totalQuestions: number;
  correctAnswers: number;
  coins: number;
  badges: string[];
  achievements: string[];
  tournamentsWon: number;
  bossesDefeated: number;
  chaptersCompleted: number;
}

// ============================================
// TOURNAMENT TYPES
// ============================================

export interface Tournament {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  entryFee: number;
  prizePool: number;
  maxParticipants: number;
  currentParticipants: number;
  status: 'REGISTRATION' | 'ACTIVE' | 'COMPLETED';
  games: string[];
  rewards: GameRewards;
}
