import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  User, 
  Trophy, 
  Play, 
  RotateCcw, 
  ChevronLeft,
  Gamepad2,
  Zap,
  Timer as TimerIcon,
  Brain,
  MessageSquare,
  Image as ImageIcon,
  PenTool,
  Hash,
  Sparkles,
  ChevronRight,
  Volume2,
  VolumeX,
  Flame,
  Check,
  X,
  ArrowRight,
  Target,
  Star,
  Award,
  Grid,
  Type,
  Search,
  Eye,
  Shuffle,
  Globe,
  MapPin,
  Music,
  BookOpen,
  Palmtree,
  Sword,
  Crown,
  Rocket,
  Settings,
  Home,
  Heart,
  Layers
} from 'lucide-react';
import { GameMode, Theme, Difficulty, Team, Player, Mission, Question } from './types';
import { 
  LiveTicker, 
  SplashScreen, 
  FloatingText, 
  GameEndSummary, 
  Header, 
  GameCard,
  Leaderboard,
  MissionProgress,
  Sidebar
} from './components';
import { 
  GAMES,
  GAME_COLORS,
  INITIAL_MISSIONS,
  DAILY_CHALLENGES,
  VIBE_BOOSTERS,
  STORY_CHAPTERS,
  BOSS_BATTLES,
  TOURNAMENTS,
  LEADERBOARD_DATA,
  WORD_SCRAMBLE_WORDS
} from './constants';
import {
  TRIVIA_QUESTIONS,
  EMOJI_PUZZLES,
  WOULD_YOU_RATHER,
  BRAIN_TEASERS,
  RAPID_FIRE_QUESTIONS,
  WORD_RELAY_PROMPTS,
  WORD_DIFFERENCE,
  WORD_READ_CHALLENGES,
  AFRICA_TRIVIA,
  TANZANIA_PLACES,
  EAST_AFRICA_CULTURE,
  SWAHILI_WORDS,
  WILDLIFE_SAFARI,
  NUMBER_CRUNCH_QUESTIONS,
  COUPLE_QUESTIONS,
  DEEP_LOVE_QUESTIONS,
  CHALLENGE_PROMPTS,
  MORE_CHALLENGES,
  FLIP_CARD_PAIRS,
  ROMANTIC_TEXT_FLIPCARDS,
  ROMANTIC_RIDDLES,
  shuffleArray
} from './data';
import { filterValidQuestions, getSanitizedQuestion, validateQuestions } from './engine/gameEngine';

function App() {
  // Core State
  const [difficulty, setDifficulty] = useState<Difficulty>('MEDIUM');
  const [theme, setTheme] = useState<Theme>('dark');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSidebarTab, setActiveSidebarTab] = useState<string | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const [showModeSelect, setShowModeSelect] = useState(false);
  const [mode, setMode] = useState<GameMode | null>(null);
  const [view, setView] = useState<'DASHBOARD' | 'SETUP' | 'GAME' | 'LEADERBOARD'>('DASHBOARD');
  
  // Game State
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [missions, setMissions] = useState<Mission[]>(INITIAL_MISSIONS);
  const [dailyChallenge, setDailyChallenge] = useState<string | null>(null);
  const [lastMissionCompleted, setLastMissionCompleted] = useState<Mission | null>(null);
  
  // Session State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [streak, setStreak] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showStoryMode, setShowStoryMode] = useState(true);
  const [showBossBattles, setShowBossBattles] = useState(true);
  const [showTournaments, setShowTournaments] = useState(true);
  
  // Store shuffled questions in state to prevent re-shuffling on each render
  const [shuffledQuestions, setShuffledQuestions] = useState<ReturnType<typeof getShuffledQuestions> | null>(null);
  
  // Tug of War State
  const [tugPosition, setTugPosition] = useState(50);
  const [tugDirection, setTugDirection] = useState(0);

  // Memory Match State
  const [memoryCards, setMemoryCards] = useState<{id: number, emoji: string, isFlipped: boolean, isMatched: boolean}[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [memoryFlippedCards, setMemoryFlippedCards] = useState<number[]>([]);
  const [memoryMatched, setMemoryMatched] = useState(0);
  const [memoryDifficulty, setMemoryDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [memoryTimer, setMemoryTimer] = useState(0);
  const [memoryCombo, setMemoryCombo] = useState(0);
  const [memoryTimerInterval, setMemoryTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [memoryCategory, setMemoryCategory] = useState<'fruits' | 'animals' | 'flags' | 'mixed'>('mixed');

  // Flipcard State - for flipcard games
  const [flipCardFlipped, setFlipCardFlipped] = useState(false);
  
  // Setup State
  const [teamCount, setTeamCount] = useState(2);
  const [playerCount, setPlayerCount] = useState(4);
  const [teamNames, setTeamNames] = useState<string[]>(['Team Alpha', 'Team Beta']);
  const [playerNames, setPlayerNames] = useState<string[]>(['Player']);

  // Constants
  const BASE_POINTS = 10;
  
  // Get total questions for current game
  const getTotalQuestions = (): number => {
    if (!activeGame) return 10;
    const shuffled = getShuffledQuestions();
    switch (activeGame) {
      case 'trivia': return shuffled.trivia.length;
      case 'emoji-guess': return shuffled.emoji.length;
      case 'would-you-rather': return shuffled.wouldYouRather.length;
      case 'brain-teasers': return shuffled.brainTeasers.length;
      case 'rapid-fire': return shuffled.rapidFire.length;
      case 'word-relay': return shuffled.wordRelay.length;
      case 'word-scramble': return shuffled.wordScramble.length;
      case 'word-difference': return shuffled.wordDifference.length;
      case 'word-read': return shuffled.wordRead.length;
      case 'africa-trivia': return shuffled.africaTrivia.length;
      case 'tanzania-places': return shuffled.tanzaniaPlaces.length;
      case 'east-africa-culture': return shuffled.eastAfricaCulture.length;
      case 'swahili-words': return shuffled.swahiliWords.length;
      case 'wildlife-safari': return shuffled.wildlifeSafari.length;
      case 'number-crunch': return shuffled.numberCrunch.length;
      case 'memory-match': return shuffled.trivia.length; // Use trivia for memory match
      case 'tournament': return RAPID_FIRE_QUESTIONS.length;
      case 'story-mode': return shuffled.trivia.length + shuffled.africaTrivia.length + shuffled.swahiliWords.length + shuffled.wildlifeSafari.length;
      case 'boss-battle': return shuffled.brainTeasers.length + shuffled.trivia.length;
      case 'couple-quiz': return shuffled.coupleQuestions.length;
      case 'love-trivia': return shuffled.deepLoveQuestions.length;
      case 'couple-challenge':
      case 'speed-challenge':
      case 'endurance-challenge':
      case 'precision-challenge':
      case 'duel-challenge':
      case 'survival-challenge': return shuffled.challengePrompts.length;
      case 'romantic-riddle': return shuffled.romanticRiddles.length;
      case 'flipcard-match':
      case 'flipcard-race':
      case 'flipcard-duel': return 16; // 2 sets of 8 cards each
      case 'emotion-flipcards': return 8; // 1 set of 8 cards (Feelings)
      case 'culture-flipcards': return 16; // 2 sets of 8 cards (Love, Romance, Hearts, Nature)
      case 'romantic-flipcards': return shuffled.romanticTextFlipCards?.length || 70;
      default: return 10;
    }
  };
  
  // Time limits per game - All games are freestyle (no timer)
  const getTimeLimit = (gameId: string): number => {
    const limits: Record<string, number> = {
      'trivia': 0,
      'rapid-fire': 0,
      'brain-teasers': 0,
      'emoji-guess': 0,
      'word-relay': 0,
      'would-you-rather': 0,
      'tug-of-war': 0,
      'number-crunch': 0,
      'memory-match': 0,
      'word-scramble': 0,
      'word-difference': 0,
      'word-read': 0,
      'story-mode': 0,
      'boss-battle': 0,
      'tournament': 0
    };
    return limits[gameId] || 0;
  };

  // Get current answer - using shuffled questions for consistency
  const getCurrentAnswer = (): string => {
    if (!activeGame) return '';
    const shuffled = getShuffledQuestions();
    switch (activeGame) {
      case 'trivia':
        return shuffled.trivia[currentQuestion % shuffled.trivia.length]?.answer || '';
      case 'rapid-fire':
        return shuffled.rapidFire[currentQuestion % shuffled.rapidFire.length]?.answer || '';
      case 'brain-teasers':
        return shuffled.brainTeasers[currentQuestion % shuffled.brainTeasers.length]?.answer || '';
      case 'word-scramble':
        return shuffled.wordScramble[currentQuestion % shuffled.wordScramble.length]?.answer || '';
      case 'word-difference':
        return shuffled.wordDifference[currentQuestion % shuffled.wordDifference.length]?.difference || '';
      case 'word-read':
        return shuffled.wordRead[currentQuestion % shuffled.wordRead.length]?.correctWord || '';
      case 'africa-trivia':
        return shuffled.africaTrivia[currentQuestion % shuffled.africaTrivia.length]?.answer || '';
      case 'tanzania-places':
        return shuffled.tanzaniaPlaces[currentQuestion % shuffled.tanzaniaPlaces.length]?.answer || '';
      case 'east-africa-culture':
        return shuffled.eastAfricaCulture[currentQuestion % shuffled.eastAfricaCulture.length]?.answer || '';
      case 'swahili-words':
        return shuffled.swahiliWords[currentQuestion % shuffled.swahiliWords.length]?.answer || '';
      case 'wildlife-safari':
        return shuffled.wildlifeSafari[currentQuestion % shuffled.wildlifeSafari.length]?.answer || '';
      case 'story-mode':
        const allStory = [...shuffled.trivia, ...shuffled.africaTrivia, ...shuffled.swahiliWords, ...shuffled.wildlifeSafari];
        return allStory[currentQuestion % allStory.length]?.answer || '';
      case 'boss-battle':
        const bossQs = [...shuffled.brainTeasers, ...shuffled.trivia];
        return bossQs[currentQuestion % bossQs.length]?.answer || '';
      case 'tournament':
        return RAPID_FIRE_QUESTIONS[currentQuestion % RAPID_FIRE_QUESTIONS.length]?.answer || '';
      case 'couple-quiz':
        return shuffled.coupleQuestions[currentQuestion % shuffled.coupleQuestions.length]?.answer || '';
      case 'love-trivia':
        return shuffled.deepLoveQuestions[currentQuestion % shuffled.deepLoveQuestions.length]?.answer || '';
      case 'couple-challenge':
      case 'speed-challenge':
      case 'endurance-challenge':
      case 'precision-challenge':
      case 'duel-challenge':
      case 'survival-challenge':
        // Challenges don't have correct answers in the traditional sense
        // Return the challenge as the "answer" for tracking purposes
        return shuffled.challengePrompts[currentQuestion % shuffled.challengePrompts.length]?.challenge || '';
      case 'romantic-riddle':
        return shuffled.romanticRiddles[currentQuestion % shuffled.romanticRiddles.length]?.answer || '';
      default:
        return '';
    }
  };

  // Get shuffled questions - initializes once when game starts
  // Now includes validation to filter out invalid questions and sanitize options
  const getShuffledQuestions = useCallback(() => {
    if (!shuffledQuestions) {
      // Filter and sanitize questions - remove invalid options and ensure answers are correct
      const validTrivia = filterValidQuestions(TRIVIA_QUESTIONS, true).map(q => getSanitizedQuestion(q));
      const validBrainTeasers = filterValidQuestions(BRAIN_TEASERS, true).map(q => getSanitizedQuestion(q));
      const validRapidFire = filterValidQuestions(RAPID_FIRE_QUESTIONS, true).map(q => getSanitizedQuestion(q));
      const validAfricaTrivia = filterValidQuestions(AFRICA_TRIVIA, true).map(q => getSanitizedQuestion(q));
      const validTanzaniaPlaces = filterValidQuestions(TANZANIA_PLACES, true).map(q => getSanitizedQuestion(q));
      const validEastAfricaCulture = filterValidQuestions(EAST_AFRICA_CULTURE, true).map(q => getSanitizedQuestion(q));
      const validSwahiliWords = filterValidQuestions(SWAHILI_WORDS, true).map(q => getSanitizedQuestion(q));
      const validWildlifeSafari = filterValidQuestions(WILDLIFE_SAFARI, true).map(q => getSanitizedQuestion(q));
      const validNumberCrunch = filterValidQuestions(NUMBER_CRUNCH_QUESTIONS, true).map(q => getSanitizedQuestion(q));
      const validCoupleQuestions = COUPLE_QUESTIONS.map(q => getSanitizedQuestion(q));
      const validDeepLoveQuestions = DEEP_LOVE_QUESTIONS.map(q => getSanitizedQuestion(q));

      const shuffled = {
        trivia: shuffleArray(validTrivia),
        emoji: shuffleArray([...EMOJI_PUZZLES]),
        wouldYouRather: shuffleArray([...WOULD_YOU_RATHER]),
        brainTeasers: shuffleArray(validBrainTeasers),
        rapidFire: shuffleArray(validRapidFire),
        wordRelay: shuffleArray([...WORD_RELAY_PROMPTS]),
        wordDifference: shuffleArray([...WORD_DIFFERENCE]),
        wordRead: shuffleArray([...WORD_READ_CHALLENGES]),
        wordScramble: shuffleArray([...WORD_SCRAMBLE_WORDS]),
        africaTrivia: shuffleArray(validAfricaTrivia),
        tanzaniaPlaces: shuffleArray(validTanzaniaPlaces),
        eastAfricaCulture: shuffleArray(validEastAfricaCulture),
        swahiliWords: shuffleArray(validSwahiliWords),
        wildlifeSafari: shuffleArray(validWildlifeSafari),
        numberCrunch: shuffleArray(validNumberCrunch),
        coupleQuestions: shuffleArray(validCoupleQuestions),
        deepLoveQuestions: shuffleArray(validDeepLoveQuestions),
        challengePrompts: shuffleArray([...CHALLENGE_PROMPTS, ...MORE_CHALLENGES]),
        flipCardPairs: shuffleArray(FLIP_CARD_PAIRS),
        romanticTextFlipCards: shuffleArray(ROMANTIC_TEXT_FLIPCARDS),
        romanticRiddles: shuffleArray(ROMANTIC_RIDDLES.map(q => getSanitizedQuestion(q))),
      };
      setShuffledQuestions(shuffled);
      return shuffled;
    }
    return shuffledQuestions;
  }, [shuffledQuestions]);

  // Get current question data
  const getQuestionData = (): unknown => {
    if (!activeGame) return null;
    const shuffled = getShuffledQuestions();
    switch (activeGame) {
      case 'trivia':
        return shuffled.trivia[currentQuestion % shuffled.trivia.length];
      case 'emoji-guess':
        return shuffled.emoji[currentQuestion % shuffled.emoji.length];
      case 'would-you-rather':
        return shuffled.wouldYouRather[currentQuestion % shuffled.wouldYouRather.length];
      case 'brain-teasers':
        return shuffled.brainTeasers[currentQuestion % shuffled.brainTeasers.length];
      case 'rapid-fire':
        return shuffled.rapidFire[currentQuestion % shuffled.rapidFire.length];
      case 'word-relay':
        return shuffled.wordRelay[currentQuestion % shuffled.wordRelay.length];
      case 'word-scramble':
        return shuffled.wordScramble[currentQuestion % shuffled.wordScramble.length];
      case 'word-difference':
        return shuffled.wordDifference[currentQuestion % shuffled.wordDifference.length];
      case 'word-read':
        return shuffled.wordRead[currentQuestion % shuffled.wordRead.length];
      case 'africa-trivia':
        return shuffled.africaTrivia[currentQuestion % shuffled.africaTrivia.length];
      case 'tanzania-places':
        return shuffled.tanzaniaPlaces[currentQuestion % shuffled.tanzaniaPlaces.length];
      case 'east-africa-culture':
        return shuffled.eastAfricaCulture[currentQuestion % shuffled.eastAfricaCulture.length];
      case 'swahili-words':
        return shuffled.swahiliWords[currentQuestion % shuffled.swahiliWords.length];
      case 'wildlife-safari':
        return shuffled.wildlifeSafari[currentQuestion % shuffled.wildlifeSafari.length];
      case 'number-crunch':
        // Number crunch uses dedicated math questions
        return shuffled.numberCrunch[currentQuestion % shuffled.numberCrunch.length];
      case 'couple-quiz':
        // Couple quiz uses couple relationship questions
        return shuffled.coupleQuestions[currentQuestion % shuffled.coupleQuestions.length];
      case 'love-trivia':
        // Love trivia uses deep love questions
        return shuffled.deepLoveQuestions[currentQuestion % shuffled.deepLoveQuestions.length];
      case 'couple-challenge':
      case 'speed-challenge':
      case 'endurance-challenge':
      case 'precision-challenge':
      case 'duel-challenge':
      case 'survival-challenge':
        // Challenge games use combined challenge prompts
        return shuffled.challengePrompts[currentQuestion % shuffled.challengePrompts.length];
      case 'romantic-riddle':
        return shuffled.romanticRiddles[currentQuestion % shuffled.romanticRiddles.length];
      case 'flipcard-match':
      case 'flipcard-race':
      case 'flipcard-duel':
        // General flipcard games - use sets 0-7 (Animals, Fruits, Weather, Transport, Emojis, Hobbies, Food, Buildings)
        const setIndex = Math.floor(currentQuestion / 8) % 8;
        const pairIndex = currentQuestion % 8;
        const flipSet = shuffled.flipCardPairs[setIndex];
        return flipSet ? flipSet.pairs[pairIndex] : { front: '❤️', back: 'Love' };
      case 'emotion-flipcards':
        // Emotion flipcards - use set 13 (Feelings)
        const emotionSet = shuffled.flipCardPairs[13];
        return emotionSet ? emotionSet.pairs[currentQuestion % emotionSet.pairs.length] : { front: '😍', back: 'Love Eyes' };
      case 'culture-flipcards':
        // Culture flipcards - use sets 9-12 (Love, Romance, Hearts, Nature)
        const cultureSetIndex = 9 + (currentQuestion % 4);
        const cultureSet = shuffled.flipCardPairs[cultureSetIndex];
        return cultureSet ? cultureSet.pairs[currentQuestion % cultureSet.pairs.length] : { front: '❤️', back: 'Love' };
      case 'romantic-flipcards':
        // Romantic text flipcards - 70 text-based romantic questions
        return shuffled.romanticTextFlipCards[currentQuestion % shuffled.romanticTextFlipCards.length];
      case 'memory-match':
        // Memory match uses trivia questions as placeholder
        return shuffled.trivia[currentQuestion % shuffled.trivia.length];
      case 'story-mode':
        // Story mode uses mixed questions from all categories
        const allStory = [...TRIVIA_QUESTIONS, ...AFRICA_TRIVIA, ...SWAHILI_WORDS, ...WILDLIFE_SAFARI];
        if (allStory.length === 0) {
          return { id: 'fallback', question: 'Welcome to Story Adventure! Click any answer to start!', options: ['Start', 'Begin', 'Go', 'Play'], answer: 'Start' };
        }
        return allStory[currentQuestion % allStory.length];
      case 'boss-battle':
        // Boss battles use harder brain teasers and trivia
        const bossQuestions = [...BRAIN_TEASERS, ...TRIVIA_QUESTIONS];
        if (bossQuestions.length === 0) {
          return { riddle: 'Welcome to Boss Battle! Are you ready?', answer: 'Yes' };
        }
        return bossQuestions[currentQuestion % bossQuestions.length];
      case 'tournament':
        // Tournament uses rapid fire for fast-paced competition
        // Use raw RAPID_FIRE_QUESTIONS to avoid filtering issues
        const tournamentQuestions = [...RAPID_FIRE_QUESTIONS];
        if (tournamentQuestions.length === 0) {
          return { id: 'rf_fallback', question: 'Welcome to the Tournament! Are you ready?', answer: 'Yes' };
        }
        return tournamentQuestions[currentQuestion % tournamentQuestions.length];
      default:
        return null;
    }
  };

  // Calculate score with enhanced algorithm
  const calculatePoints = useCallback((correct: boolean): number => {
    if (!correct) return 0;
    
    // Base points per game type
    const gameBasePoints: Record<string, number> = {
      'trivia': 15,
      'rapid-fire': 10,
      'brain-teasers': 20,
      'emoji-guess': 25,
      'word-relay': 12,
      'would-you-rather': 10,
      'tug-of-war': 15,
      'number-crunch': 15,
      'memory-match': 20,
      'word-scramble': 18,
      'word-difference': 15,
      'word-read': 12,
      'africa-trivia': 20,
      'tanzania-places': 18,
      'east-africa-culture': 15,
      'swahili-words': 12,
      'wildlife-safari': 18,
      'couple-quiz': 20,
      'love-trivia': 25,
      'couple-challenge': 15,
      'speed-challenge': 20,
      'endurance-challenge': 18,
      'precision-challenge': 22,
      'duel-challenge': 25,
      'survival-challenge': 30,
      'flipcard-match': 15,
      'flipcard-race': 20,
      'flipcard-duel': 25,
      'emotion-flipcards': 18,
      'culture-flipcards': 18
    };
    
    let points = gameBasePoints[activeGame || 'trivia'] || BASE_POINTS;
    
    // Difficulty multiplier
    const diffMultiplier = { 'EASY': 1, 'MEDIUM': 1.5, 'HARD': 2 }[difficulty];
    points *= diffMultiplier;
    
    // Combo system - exponential bonus for consecutive correct answers
    // 1st: 1x, 2nd: 1.5x, 3rd: 2x, 4th: 2.5x, 5th+: 3x
    const comboMultiplier = Math.min(1 + (streak * 0.5), 3);
    points = Math.floor(points * comboMultiplier);
    
    // Perfect round bonus - extra points for 5+ streak
    if (streak >= 5) {
      points += 25; // Bonus for maintaining streak
    }
    
    // First answer bonus (quick start)
    if (currentQuestion === 0 && correct) {
      points += 10;
    }
    
    // Late-game pressure bonus
    if (currentQuestion >= 7 && correct) {
      points += 5;
    }
    
    return points;
  }, [difficulty, activeGame, streak, currentQuestion]);

  // Get difficulty level based on game progress
  const getCurrentDifficulty = useCallback((): 'EASY' | 'MEDIUM' | 'HARD' => {
    // Progress through the game increases difficulty
    const progress = currentQuestion / getTotalQuestions();
    if (progress < 0.3) return 'EASY';
    if (progress < 0.7) return 'MEDIUM';
    return 'HARD';
  }, [currentQuestion]);

  // Toggle theme
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  // Generate daily challenge
  const generateDailyChallenge = useCallback(() => {
    const challenge = DAILY_CHALLENGES[Math.floor(Math.random() * DAILY_CHALLENGES.length)];
    setDailyChallenge(challenge);
  }, []);

  // Complete mission
  const completeMission = useCallback((missionId: string) => {
    setMissions(prev => prev.map(m => {
      if (m.id === missionId && !m.completed) {
        const newCurrent = m.current + 1;
        const isCompleted = newCurrent >= m.target;
        if (isCompleted) {
          setLastMissionCompleted({ ...m, current: newCurrent, completed: true });
        }
        return { ...m, current: newCurrent, completed: isCompleted };
      }
      return m;
    }));
  }, []);

  // Timer effect - DISABLED for freestyle play
  useEffect(() => {
    // Timer is disabled - all games are freestyle
    // No automatic advancing
    return;
  }, [gameStarted, activeGame, timeLeft]);

  // Tug of war animation
  useEffect(() => {
    if (activeGame !== 'tug-of-war' || !gameStarted) return;
    const interval = setInterval(() => {
      setTugPosition(prev => {
        const newPos = prev + (Math.random() - 0.5) * 5 + tugDirection * 2;
        return Math.max(0, Math.min(100, newPos));
      });
    }, 100);
    return () => clearInterval(interval);
  }, [activeGame, gameStarted, tugDirection]);

  const handleTimeUp = () => {
    setShowResult(true);
    setStreak(0);
    // No auto-advance - user must manually click Next
    // User can see the answer and then click Next or Back
  };

  const nextQuestion = () => {
    setCurrentQuestion(prev => prev + 1);
    setTimeLeft(getTimeLimit(activeGame || 'trivia'));
    setSelectedAnswer(null);
    setShowResult(false);
    setTugPosition(50);
  };

  // Fuzzy matching algorithm for answer validation
  // Allows for minor typos and case-insensitive matching
  const checkAnswer = (userAnswer: string, correctAnswer: string): boolean => {
    const normalize = (str: string) => str.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
    const normalizedUser = normalize(userAnswer);
    const normalizedCorrect = normalize(correctAnswer);
    
    // Exact match after normalization
    if (normalizedUser === normalizedCorrect) return true;
    
    // Allow if answer contains the key part (for short answers)
    if (normalizedCorrect.length <= 4 && normalizedUser.includes(normalizedCorrect)) return true;
    
    // Levenshtein distance for fuzzy matching (allow 1 error for longer words)
    const maxDistance = Math.floor(normalizedCorrect.length * 0.2); // 20% tolerance
    const distance = levenshteinDistance(normalizedUser, normalizedCorrect);
    return distance <= Math.max(1, maxDistance);
  };

  // Calculate Levenshtein distance between two strings
  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix: number[][] = [];
    for (let i = 0; i <= str1.length; i++) matrix[i] = [i];
    for (let j = 0; j <= str2.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= str1.length; i++) {
      for (let j = 1; j <= str2.length; j++) {
        if (str1[i-1] === str2[j-1]) {
          matrix[i][j] = matrix[i-1][j-1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i-1][j-1] + 1,
            matrix[i][j-1] + 1,
            matrix[i-1][j] + 1
          );
        }
      }
    }
    return matrix[str1.length][str2.length];
  };

  const handleAnswer = (answer: string) => {
    if (showResult || !activeGame) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    // Check if this is a challenge game
    const isChallengeGame = ['couple-challenge', 'speed-challenge', 'endurance-challenge', 
      'precision-challenge', 'duel-challenge', 'survival-challenge'].includes(activeGame);
    
    // For challenge games, 'completed' is always correct
    if (isChallengeGame && answer === 'completed') {
      const points = calculatePoints(true);
      const winnerId = mode === 'TEAM' 
        ? teams[0]?.id 
        : players[0]?.id;
      
      if (winnerId) {
        setScores(prev => ({ ...prev, [winnerId]: (prev[winnerId] || 0) + points }));
      }
      setStreak(prev => prev + 1);
      return;
    }
    
    // Only score if it's an actual answer, not a 'show' or 'skip' action
    if (answer !== 'show' && answer !== 'skip') {
      const correctAnswer = getCurrentAnswer();
      const isCorrect = checkAnswer(answer, correctAnswer);
      
      if (isCorrect) {
        const points = calculatePoints(true);
        const winnerId = mode === 'TEAM' 
          ? teams[0]?.id 
          : players[0]?.id;
        
        if (winnerId) {
          setScores(prev => ({ ...prev, [winnerId]: (prev[winnerId] || 0) + points }));
        }
        
        setStreak(prev => prev + 1);
        
        // Complete missions
        if (activeGame === 'trivia') completeMission('m1');
        if (activeGame === 'rapid-fire') completeMission('m7');
        if (activeGame === 'emoji-guess') completeMission('m4');
        if (activeGame === 'brain-teasers') completeMission('m6');
        if (activeGame === 'word-relay') completeMission('m5');
        if (activeGame === 'would-you-rather') completeMission('m9');
        if (activeGame === 'word-scramble') completeMission('m11');
        if (activeGame === 'word-difference') completeMission('m12');
        if (activeGame === 'word-read') completeMission('m13');
        if (activeGame === 'africa-trivia') completeMission('m16');
        if (activeGame === 'tanzania-places') completeMission('m17');
        if (activeGame === 'east-africa-culture') completeMission('m18');
        if (activeGame === 'swahili-words') completeMission('m19');
        if (activeGame === 'wildlife-safari') completeMission('m20');
        if (streak >= 4) completeMission('m10');
      } else {
        setStreak(0);
      }
    }
    
    // No auto-advance - user must manually click Next to continue
  };

  // Simple function to just show the answer without scoring
  const revealAnswer = () => {
    console.log('Revealing answer, showResult:', !showResult);
    setShowResult(true);
  };

  const startGame = (gameId: string) => {
    console.log('Starting game:', gameId);
    
    // For special modes, ensure we have a valid game id
    const validGameId = ['trivia', 'rapid-fire', 'brain-teasers', 'emoji-guess',
      'would-you-rather', 'word-relay', 'word-scramble', 'word-difference', 'word-read',
      'africa-trivia', 'tanzania-places', 'east-africa-culture', 'swahili-words', 'wildlife-safari',
      'story-mode', 'boss-battle', 'tournament', 'tug-of-war', 'number-crunch', 'memory-match',
      'couple-quiz', 'love-trivia', 'couple-challenge', 'speed-challenge', 'endurance-challenge',
      'precision-challenge', 'duel-challenge', 'survival-challenge',
      'flipcard-match', 'flipcard-race', 'flipcard-duel', 'emotion-flipcards', 'culture-flipcards', 'romantic-flipcards',
      'romantic-riddle'].includes(gameId) ? gameId : 'trivia';
    
    // Reset shuffled questions to ensure validation is applied for each new game
    setShuffledQuestions(null);
    setActiveGame(validGameId);
    setGameStarted(true);
    setCurrentQuestion(0);
    setFlipCardFlipped(false);
    setTimeLeft(getTimeLimit(validGameId));
    setScores({});
    setSelectedAnswer(null);
    setShowResult(false);
    setStreak(0);
    setTugPosition(50);
    setView('GAME');
  };

  // Memory Match - Emoji categories
  const emojiCategories = {
    fruits: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝'],
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔'],
    flags: ['🇰🇪', '🇹🇿', '🇺🇬', '🇿🇦', '🇳🇬', '🇪🇬', '🇲🇦', '🇬🇭', '🇸🇳', '🇲🇱', '🇪🇹', '🇩🇿', '🇱🇾', '🇹🇩', '🇸🇴', '🇪🇷'],
    mixed: ['🌟', '🔥', '💎', '🎯', '🚀', '⚡', '🎨', '🎭', '🎪', '🎬', '🎮', '🎲', '🎸', '🎺', '🎻', '🥇']
  };

  // Memory Match - Get card count by difficulty
  const getMemoryCardCount = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 12; // 4x3 grid
      case 'medium': return 16; // 4x4 grid
      case 'hard': return 20; // 4x5 grid
      default: return 16;
    }
  };

  // Memory Match - Initialize game
  const initMemoryMatch = () => {
    const cardCount = getMemoryCardCount(memoryDifficulty);
    const halfCount = cardCount / 2;
    const categoryEmojis = emojiCategories[memoryCategory] || emojiCategories.mixed;
    
    // Select random emojis from category
    const shuffledCategory = [...categoryEmojis].sort(() => Math.random() - 0.5);
    const selectedEmojis = shuffledCategory.slice(0, halfCount);
    
    // Create pairs and shuffle
    const cards = [...selectedEmojis, ...selectedEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      }));
    
    setMemoryCards(cards);
    setMemoryMoves(0);
    setMemoryFlippedCards([]);
    setMemoryMatched(0);
    setMemoryCombo(0);
    setMemoryTimer(0);
    
    // Start timer
    if (memoryTimerInterval) clearInterval(memoryTimerInterval);
    const interval = setInterval(() => {
      setMemoryTimer(prev => prev + 1);
    }, 1000);
    setMemoryTimerInterval(interval);
  };

  // Memory Match - Stop timer
  const stopMemoryTimer = () => {
    if (memoryTimerInterval) {
      clearInterval(memoryTimerInterval);
      setMemoryTimerInterval(null);
    }
  };

  // Memory Match - Format time
  const formatMemoryTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Memory Match - Handle card click
  const handleMemoryCardClick = (cardId: number) => {
    if (memoryFlippedCards.length >= 2) return; // Already two cards flipped
    if (memoryCards[cardId].isMatched) return; // Already matched
    if (memoryCards[cardId].isFlipped) return; // Already flipped

    // Flip the card
    const newCards = [...memoryCards];
    newCards[cardId].isFlipped = true;
    setMemoryCards(newCards);

    const newFlippedCards = [...memoryFlippedCards, cardId];
    setMemoryFlippedCards(newFlippedCards);

    // Check for match if two cards are flipped
    if (newFlippedCards.length === 2) {
      setMemoryMoves(prev => prev + 1);
      const [first, second] = newFlippedCards;
      const totalPairs = memoryCards.length / 2;

      if (newCards[first].emoji === newCards[second].emoji) {
        // Match found - increase combo!
        const newCombo = memoryCombo + 1;
        setMemoryCombo(newCombo);
        
        // Calculate bonus points
        const comboBonus = Math.min(newCombo * 10, 50); // Max 50 bonus per match
        const baseScore = 100;
        const matchScore = baseScore + comboBonus;
        
        // Award points to first player/team
        const targetId = mode === 'TEAM' ? teams[0]?.id || 'team-0' : players[0]?.id || 'player-0';
        setScores(prev => ({
          ...prev,
          [targetId]: (prev[targetId] || 0) + matchScore
        }));
        
        setTimeout(() => {
          const matchedCards = newCards.map((card, idx) =>
            idx === first || idx === second ? { ...card, isMatched: true } : card
          );
          setMemoryCards(matchedCards);
          const newMatched = memoryMatched + 1;
          setMemoryMatched(newMatched);
          setMemoryFlippedCards([]);
          
          // Check if game complete
          if (newMatched === totalPairs) {
            stopMemoryTimer();
            // Time bonus
            const timeBonus = Math.max(500 - memoryTimer * 2, 0);
            setScores(prev => ({
              ...prev,
              [targetId]: (prev[targetId] || 0) + timeBonus
            }));
          }
        }, 500);
      } else {
        // No match - reset combo!
        setMemoryCombo(0);
        setTimeout(() => {
          const unflippedCards = newCards.map((card, idx) =>
            idx === first || idx === second ? { ...card, isFlipped: false } : card
          );
          setMemoryCards(unflippedCards);
          setMemoryFlippedCards([]);
        }, 1000);
      }
    }
  };

  const endGame = () => {
    setGameStarted(false);
  };

  const backToDashboard = () => {
    setView('DASHBOARD');
    setActiveGame(null);
    setGameStarted(false);
  };

  const setupTeams = () => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'];
    const newTeams = teamNames.map((name, i) => ({
      id: `team-${i}`,
      name,
      score: 0,
      color: colors[i % colors.length],
      xp: 0,
      level: 1,
      wins: 0,
      streak: 0
    }));
    setTeams(newTeams);
    setMode('TEAM');
    setView('DASHBOARD');
    generateDailyChallenge();
  };

  const setupPlayers = () => {
    const avatars = ['🦊', '🐼', '🦁', '🐯', '🐨', '🐰'];
    const newPlayers = playerNames.map((name, i) => ({
      id: `player-${i}`,
      name,
      score: 0,
      xp: 0,
      level: 1,
      wins: 0,
      streak: 0,
      avatar: avatars[i % avatars.length]
    }));
    setPlayers(newPlayers);
    setMode('INDIVIDUAL');
    setView('DASHBOARD');
    generateDailyChallenge();
  };

  const playAgain = () => {
    if (activeGame) startGame(activeGame);
  };

  const resetGame = () => {
    setTeams([]);
    setPlayers([]);
    setScores({});
    setMissions(INITIAL_MISSIONS);
    setActiveGame(null);
    setMode(null);
    setView('DASHBOARD');
    setShuffledQuestions(null);
  };

  // Hide mission notification
  useEffect(() => {
    if (lastMissionCompleted) {
      const timer = setTimeout(() => setLastMissionCompleted(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [lastMissionCompleted]);

  // Save state to localStorage
  useEffect(() => {
    const state = { difficulty, theme, teams, players, missions, mode };
    localStorage.setItem('vibeteam_state', JSON.stringify(state));
  }, [difficulty, theme, teams, players, missions, mode]);

  // Load saved state
  useEffect(() => {
    const saved = localStorage.getItem('vibeteam_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.difficulty) setDifficulty(parsed.difficulty);
        if (parsed.theme) setTheme(parsed.theme);
        if (parsed.teams) setTeams(parsed.teams);
        if (parsed.players) setPlayers(parsed.players);
        if (parsed.missions) setMissions(parsed.missions);
        if (parsed.mode) setMode(parsed.mode);
      } catch (e) {
        console.error('Failed to load state:', e);
      }
    }
  }, []);

  // Render splash
  if (showSplash) {
    return <SplashScreen onComplete={(mode, names) => { 
      setShowSplash(false); 
      setMode(mode);
      if (mode === 'TEAM') {
        setTeams([{ id: '1', name: names[0], score: 0 }]);
      } else {
        setPlayers(names.map((name, index) => ({ id: String(index + 1), name, score: 0, isEliminated: false })));
      }
      setView('DASHBOARD');
    }} />;
  }
  
  // Mode Selection Screen
  if (showModeSelect) {
    return (
      <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gradient-to-br from-indigo-50 via-white to-purple-50'}`}>
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-20 -left-32 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px]" 
          />
          <motion.div 
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute bottom-20 -right-32 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px]" 
          />
        </div>
        
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/30">
                <Sparkles className="text-white" size={40} />
              </div>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Choose Your Vibe
            </h1>
            <p className={`text-lg md:text-xl ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Select your gameplay experience
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl w-full">
            {/* Solo Mode - INDIVIDUAL */}
            <motion.button
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.03, y: -8 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setMode('INDIVIDUAL');
                setView('DASHBOARD');
                setShowModeSelect(false);
              }}
              className="group relative p-8 md:p-10 rounded-3xl transition-all bg-gradient-to-br from-zinc-900 to-zinc-800 hover:from-zinc-800 hover:to-zinc-700 shadow-2xl border border-zinc-700/50 overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative z-10">
                <motion.div 
                  whileHover={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-500/30"
                >
                  <User size={44} className="text-white" />
                </motion.div>
                
                <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Solo</h2>
                <p className="text-zinc-400 text-base md:text-lg mb-6">
                  Challenge yourself! Answer questions and climb the leaderboard.
                </p>
                
                {/* Feature Tags */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {['🏆 Leaderboards', '⏱ Timed Challenges', '🧠 Brain Teasers'].map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-zinc-800/80 rounded-full text-xs text-zinc-300 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Arrow */}
              <motion.div 
                className="absolute bottom-8 right-8 text-pink-500"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={24} />
              </motion.div>
            </motion.button>
            
            {/* Team Mode */}
            <motion.button
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.03, y: -8 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setMode('TEAM');
                setView('DASHBOARD');
                setShowModeSelect(false);
              }}
              className="group relative p-8 md:p-10 rounded-3xl transition-all bg-gradient-to-br from-zinc-900 to-zinc-800 hover:from-zinc-800 hover:to-zinc-700 shadow-2xl border border-zinc-700/50 overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative z-10">
                <motion.div 
                  whileHover={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-violet-500/30"
                >
                  <Users size={44} className="text-white" />
                </motion.div>
                
                <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Team</h2>
                <p className="text-zinc-400 text-base md:text-lg mb-6">
                  Team up with friends! Compete together in challenges.
                </p>
                
                {/* Feature Tags */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {['👥 2-4 Teams', '🏅 Tournaments', '⚔️ Boss Battles'].map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-zinc-800/80 rounded-full text-xs text-zinc-300 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Arrow */}
              <motion.div 
                className="absolute bottom-8 right-8 text-violet-500"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={24} />
              </motion.div>
            </motion.button>
          </div>
          
          {/* Back to Splash */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={() => setShowModeSelect(false)}
            className={`mt-12 flex items-center gap-2 text-sm font-medium ${theme === 'dark' ? 'text-zinc-500 hover:text-zinc-300' : 'text-zinc-500 hover:text-zinc-700'}`}
          >
            <ChevronLeft size={18} /> Back
          </motion.button>
        </div>
      </div>
    );
  }

  // Render game
  if (view === 'GAME' && activeGame) {
    const questionData = getQuestionData();
    const timeLimit = getTimeLimit(activeGame);
    const gameColor = GAME_COLORS[activeGame as keyof typeof GAME_COLORS] || 'bg-indigo-500';
    
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
        <Header 
          onReset={resetGame}
          theme={theme}
          onToggleTheme={toggleTheme}
          difficulty={difficulty}
          onChangeDifficulty={setDifficulty}
          onOpenSidebar={() => setSidebarOpen(true)}
        />
        
        <div className="max-w-4xl mx-auto p-6">
          {!gameStarted ? (
            <GameEndSummary 
              gameId={activeGame}
              mode={mode || 'INDIVIDUAL'}
              teams={teams}
              players={players}
              scores={scores}
              onPlayAgain={playAgain}
              onBack={backToDashboard}
            />
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <button onClick={backToDashboard} className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-500'}`}>
                  <ChevronLeft size={24} />
                </button>
                
                <div className="flex items-center gap-3">
                  {streak > 0 && (
                    <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full">
                      <Flame size={16} />
                      <span className="font-black text-sm">{streak}</span>
                    </div>
                  )}
                  
                  {timeLimit > 0 && (
                    <div className={`px-4 py-2 rounded-xl font-black text-sm flex items-center gap-2 ${
                      timeLeft <= 10 ? 'bg-red-500 text-white animate-pulse' : theme === 'dark' ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-500'
                    }`}>
                      <TimerIcon size={16} />
                      {timeLeft}s
                    </div>
                  )}
                  
                  <div className={`px-4 py-2 rounded-xl font-black text-sm ${theme === 'dark' ? 'bg-zinc-800 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
                    Q{currentQuestion + 1}/{getTotalQuestions()}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      if (currentQuestion > 0) {
                        setCurrentQuestion(currentQuestion - 1);
                        setShowResult(false);
                        setSelectedAnswer(null);
                      }
                    }} 
                    disabled={currentQuestion === 0}
                    className={`p-3 rounded-xl ${currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''} ${theme === 'dark' ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}`}
                    title="Previous Question"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={() => {
                      setActiveGame(null);
                      setGameStarted(false);
                    }} 
                    className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-zinc-800 text-red-400 hover:bg-zinc-700' : 'bg-zinc-100 text-red-500 hover:bg-zinc-200'}`}
                    title="Exit Game"
                  >
                    <X size={24} />
                  </button>
                  <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-500'}`}>
                    {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
                  </button>
                </div>
              </div>

              {/* Question Card */}
              <div className={`p-6 rounded-[2rem] mb-6 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'} shadow-xl border ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-100'}`}>
                {/* Game Title */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${gameColor} text-white`}>
                    {GAMES.find(g => g.id === activeGame)?.title || activeGame}
                  </span>
                  {mode === 'TEAM' ? <Users size={16} className="text-violet-500" /> : <User size={16} className="text-pink-500" />}
                </div>

                {/* Trivia - Flashcard Style */}
                {activeGame === 'trivia' && questionData && (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Brain size={24} className="text-indigo-500" />
                      <span className="text-indigo-500 font-black text-sm uppercase">Trivia Challenge</span>
                    </div>
                    <div className={`p-8 rounded-3xl mb-6 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-xl`}>
                      <h2 className={`text-2xl font-bold text-center ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        {(questionData as { question: string }).question}
                      </h2>
                    </div>
                    
                    {!showResult ? (
                      <button 
                        onClick={revealAnswer}
                        className="px-12 py-4 bg-indigo-500 text-white rounded-2xl font-black text-xl hover:bg-indigo-600 transition-colors"
                      >
                        Show Answer
                      </button>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="p-6 bg-emerald-500/20 rounded-2xl">
                          <p className="text-emerald-500 font-black text-xl text-center">
                            {(questionData as { answer: string }).answer}
                          </p>
                        </div>
                        <button 
                          onClick={() => {
                            setShowResult(false);
                            nextQuestion();
                          }}
                          className="px-12 py-4 bg-indigo-500 text-white rounded-2xl font-black text-xl hover:bg-indigo-600 transition-colors w-full"
                        >
                          Next Question →
                        </button>
                      </motion.div>
                    )}
                  </>
                )}

                {/* Emoji Guess - Flashcard Style */}
                {activeGame === 'emoji-guess' && questionData && (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <ImageIcon size={24} className="text-pink-500" />
                      <span className="text-pink-500 font-black text-sm uppercase">Emoji Puzzle</span>
                    </div>
                    <div className={`p-12 rounded-3xl mb-6 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-xl flex items-center justify-center`}>
                      <div className="text-8xl">{(questionData as { emojis: string }).emojis}</div>
                    </div>
                    
                    {!showResult ? (
                      <button 
                        onClick={revealAnswer}
                        className="px-12 py-4 bg-pink-500 text-white rounded-2xl font-black text-xl hover:bg-pink-600 transition-colors"
                      >
                        Show Answer
                      </button>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="p-6 bg-pink-500/20 rounded-2xl">
                          <p className="text-pink-500 font-black text-2xl text-center">
                            {(questionData as { answer: string }).answer}
                          </p>
                        </div>
                        <button 
                          onClick={() => {
                            setShowResult(false);
                            nextQuestion();
                          }}
                          className="px-12 py-4 bg-pink-500 text-white rounded-2xl font-black text-xl hover:bg-pink-600 transition-colors w-full"
                        >
                          Next Puzzle →
                        </button>
                      </motion.div>
                    )}
                  </>
                )}

                {/* Rapid Fire - Flashcard Style */}
                {activeGame === 'rapid-fire' && questionData && (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Zap size={24} className="text-emerald-500" />
                      <span className="text-emerald-500 font-black text-sm uppercase">Quick Question</span>
                    </div>
                    <div className={`p-12 rounded-3xl mb-6 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-xl`}>
                      <h2 className={`text-4xl font-black text-center ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        {(questionData as { question: string }).question}
                      </h2>
                    </div>
                    
                    {!showResult ? (
                      <button 
                        onClick={revealAnswer}
                        className="px-12 py-4 bg-emerald-500 text-white rounded-2xl font-black text-xl hover:bg-emerald-600 transition-colors"
                      >
                        Show Answer
                      </button>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="p-6 bg-emerald-500/20 rounded-2xl">
                          <p className="text-emerald-500 font-black text-3xl text-center">
                            {(questionData as { answer: string }).answer}
                          </p>
                        </div>
                        <button 
                          onClick={() => {
                            setShowResult(false);
                            nextQuestion();
                          }}
                          className="px-12 py-4 bg-emerald-500 text-white rounded-2xl font-black text-xl hover:bg-emerald-600 transition-colors w-full"
                        >
                          Next Question →
                        </button>
                      </motion.div>
                    )}
                  </>
                )}

                {/* Brain Teasers - Flashcard Style */}
                {activeGame === 'brain-teasers' && questionData && (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Sparkles size={24} className="text-amber-500" />
                      <span className="text-amber-500 font-black text-sm uppercase">Brain Teaser</span>
                    </div>
                    <div className={`p-8 rounded-3xl mb-6 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-xl`}>
                      <h2 className={`text-2xl font-bold text-center italic ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        "{(questionData as { riddle: string }).riddle}"
                      </h2>
                    </div>
                    
                    {!showResult ? (
                      <button 
                        onClick={revealAnswer}
                        className="px-12 py-4 bg-amber-500 text-white rounded-2xl font-black text-xl hover:bg-amber-600 transition-colors"
                      >
                        Reveal Answer
                      </button>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="p-6 bg-amber-500/20 rounded-2xl">
                          <p className="text-amber-500 font-black text-xl text-center">
                            {(questionData as { answer: string }).answer}
                          </p>
                        </div>
                        <button 
                          onClick={() => {
                            setShowResult(false);
                            nextQuestion();
                          }}
                          className="px-12 py-4 bg-amber-500 text-white rounded-2xl font-black text-xl hover:bg-amber-600 transition-colors w-full"
                        >
                          Next Riddle →
                        </button>
                      </motion.div>
                    )}
                  </>
                )}

                {/* Word Difference - Flashcard style with manual controls */}
                {activeGame === 'word-difference' && questionData && (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Search size={24} className="text-teal-500" />
                      <span className="text-teal-500 font-black text-sm uppercase">Word Difference</span>
                    </div>
                    <div className="flex items-center justify-center gap-8 mb-6">
                      <div className={`text-4xl font-black p-6 rounded-2xl ${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-900'}`}>
                        {(questionData as { word1: string }).word1}
                      </div>
                      <span className="text-2xl font-black text-zinc-400">vs</span>
                      <div className={`text-4xl font-black p-6 rounded-2xl ${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-900'}`}>
                        {(questionData as { word2: string }).word2}
                      </div>
                    </div>
                    
                    {/* Manual controls */}
                    <div className="flex gap-4 justify-center flex-wrap">
                      <button 
                        onClick={() => {
                          if (currentQuestion > 0) {
                            setCurrentQuestion(currentQuestion - 1);
                            setShowResult(false);
                            setSelectedAnswer('');
                          }
                        }}
                        disabled={currentQuestion === 0}
                        className={`px-6 py-3 rounded-2xl font-black text-lg ${currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''} ${theme === 'dark' ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700' : 'bg-zinc-200 text-zinc-600 hover:bg-zinc-300'}`}
                      >
                        ← Back
                      </button>
                      <button 
                        onClick={revealAnswer}
                        className="px-8 py-3 bg-teal-500 text-white rounded-2xl font-black text-lg hover:bg-teal-600 transition-colors"
                      >
                        Show Answer
                      </button>
                      <button 
                        onClick={() => handleAnswer('skip')}
                        className={`px-6 py-3 rounded-2xl font-black text-lg ${theme === 'dark' ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700' : 'bg-zinc-200 text-zinc-600 hover:bg-zinc-300'}`}
                      >
                        Skip
                      </button>
                    </div>

                    {/* Show answer when user clicks Show Answer */}
                    {showResult && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-6 bg-teal-500/20 rounded-2xl"
                      >
                        <p className="text-teal-500 font-black text-xl text-center">
                          {(questionData as { difference: string }).difference}
                        </p>
                        <div className="flex gap-4 justify-center mt-4">
                          <button 
                            onClick={() => {
                              setShowResult(false);
                              nextQuestion();
                            }}
                            className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-colors"
                          >
                            Next →
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </>
                )}

                {/* Word Read - Flashcard Style */}
                {activeGame === 'word-read' && questionData && (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Eye size={24} className="text-rose-500" />
                      <span className="text-rose-500 font-black text-sm uppercase">Read the Word</span>
                    </div>
                    
                    {!showResult ? (
                      <>
                        <div className={`p-8 rounded-3xl mb-6 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-xl`}>
                          <p className={`text-xs font-bold uppercase tracking-widest text-center mb-6 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                            Which word is spelled correctly?
                          </p>
                          <div className="grid grid-cols-2 gap-4">
                            {(questionData as { words: string[] }).words.map((word, index) => (
                              <div
                                key={index}
                                className={`p-6 rounded-2xl font-black text-2xl text-center ${theme === 'dark' ? 'bg-zinc-700 text-white' : 'bg-zinc-100 text-zinc-900'}`}
                              >
                                {word}
                              </div>
                            ))}
                          </div>
                        </div>
                        <button 
                          onClick={revealAnswer}
                          className="px-12 py-4 bg-rose-500 text-white rounded-2xl font-black text-xl hover:bg-rose-600 transition-colors w-full"
                        >
                          Show Answer
                        </button>
                      </>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-8 rounded-3xl mb-6 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-xl`}
                      >
                        <p className={`text-xs font-bold uppercase tracking-widest text-center mb-4 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                          The correct spelling is:
                        </p>
                        <h2 className="text-5xl font-black text-center text-rose-500">
                          {(questionData as { correctWord: string }).correctWord}
                        </h2>
                        <button 
                          onClick={() => {
                            setShowResult(false);
                            nextQuestion();
                          }}
                          className="mt-6 px-12 py-4 bg-rose-500 text-white rounded-2xl font-black text-xl hover:bg-rose-600 transition-colors w-full"
                        >
                          Next Word →
                        </button>
                      </motion.div>
                    )}
                  </>
                )}

                {/* Africa Trivia - Flashcard Style */}
                {activeGame === 'africa-trivia' && questionData && (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Globe size={24} className="text-amber-500" />
                      <span className="text-amber-500 font-black text-sm uppercase">Africa Trivia</span>
                    </div>
                    <div className={`p-8 rounded-3xl mb-6 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-xl`}>
                      <h2 className={`text-2xl font-bold text-center ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        {(questionData as { question: string }).question}
                      </h2>
                    </div>
                    
                    {!showResult ? (
                      <button 
                        onClick={revealAnswer}
                        className="px-12 py-4 bg-amber-500 text-white rounded-2xl font-black text-xl hover:bg-amber-600 transition-colors"
                      >
                        Show Answer
                      </button>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="p-6 bg-emerald-500/20 rounded-2xl">
                          <p className="text-emerald-500 font-black text-xl text-center">
                            {(questionData as { answer: string }).answer}
                          </p>
                        </div>
                        <button 
                          onClick={() => {
                            setShowResult(false);
                            nextQuestion();
                          }}
                          className="px-12 py-4 bg-amber-500 text-white rounded-2xl font-black text-xl hover:bg-amber-600 transition-colors w-full"
                        >
                          Next Question →
                        </button>
                      </motion.div>
                    )}
                  </>
                )}

                {/* Tanzania Places - Flashcard Style */}
                {activeGame === 'tanzania-places' && questionData && (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <MapPin size={24} className="text-red-500" />
                      <span className="text-red-500 font-black text-sm uppercase">Tanzania Places</span>
                    </div>
                    <div className={`p-8 rounded-3xl mb-6 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-xl`}>
                      <h2 className={`text-2xl font-bold text-center ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        {(questionData as { question: string }).question}
                      </h2>
                    </div>
                    
                    {!showResult ? (
                      <button 
                        onClick={revealAnswer}
                        className="px-12 py-4 bg-red-500 text-white rounded-2xl font-black text-xl hover:bg-red-600 transition-colors"
                      >
                        Show Answer
                      </button>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="p-6 bg-emerald-500/20 rounded-2xl">
                          <p className="text-emerald-500 font-black text-xl text-center">
                            {(questionData as { answer: string }).answer}
                          </p>
                        </div>
                        <button 
                          onClick={() => {
                            setShowResult(false);
                            nextQuestion();
                          }}
                          className="px-12 py-4 bg-red-500 text-white rounded-2xl font-black text-xl hover:bg-red-600 transition-colors w-full"
                        >
                          Next Place →
                        </button>
                      </motion.div>
                    )}
                  </>
                )}

                {/* East Africa Culture - Flashcard Style */}
                {activeGame === 'east-africa-culture' && questionData && (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Music size={24} className="text-purple-500" />
                      <span className="text-purple-500 font-black text-sm uppercase">East Africa Culture</span>
                    </div>
                    <div className={`p-8 rounded-3xl mb-6 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-xl`}>
                      <h2 className={`text-2xl font-bold text-center ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        {(questionData as { question: string }).question}
                      </h2>
                    </div>
                    
                    {!showResult ? (
                      <button 
                        onClick={revealAnswer}
                        className="px-12 py-4 bg-purple-500 text-white rounded-2xl font-black text-xl hover:bg-purple-600 transition-colors"
                      >
                        Show Answer
                      </button>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="p-6 bg-emerald-500/20 rounded-2xl">
                          <p className="text-emerald-500 font-black text-xl text-center">
                            {(questionData as { answer: string }).answer}
                          </p>
                        </div>
                        <button 
                          onClick={() => {
                            setShowResult(false);
                            nextQuestion();
                          }}
                          className="px-12 py-4 bg-purple-500 text-white rounded-2xl font-black text-xl hover:bg-purple-600 transition-colors w-full"
                        >
                          Next Question →
                        </button>
                      </motion.div>
                    )}
                  </>
                )}

                {/* Swahili Words - Flashcard Style */}
                {activeGame === 'swahili-words' && questionData && (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <BookOpen size={24} className="text-cyan-500" />
                      <span className="text-cyan-500 font-black text-sm uppercase">Swahili Words</span>
                    </div>
                    <div className={`p-8 rounded-3xl mb-6 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-xl`}>
                      <h2 className={`text-2xl font-bold text-center ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        {(questionData as { question: string }).question}
                      </h2>
                    </div>
                    
                    {!showResult ? (
                      <button 
                        onClick={revealAnswer}
                        className="px-12 py-4 bg-cyan-500 text-white rounded-2xl font-black text-xl hover:bg-cyan-600 transition-colors"
                      >
                        Show Meaning
                      </button>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="p-6 bg-emerald-500/20 rounded-2xl">
                          <p className="text-emerald-500 font-black text-xl text-center">
                            {(questionData as { answer: string }).answer}
                          </p>
                        </div>
                        <button 
                          onClick={() => {
                            setShowResult(false);
                            nextQuestion();
                          }}
                          className="px-12 py-4 bg-cyan-500 text-white rounded-2xl font-black text-xl hover:bg-cyan-600 transition-colors w-full"
                        >
                          Next Word →
                        </button>
                      </motion.div>
                    )}
                  </>
                )}

                {/* Wildlife Safari - Flashcard Style */}
                {activeGame === 'wildlife-safari' && questionData && (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Palmtree size={24} className="text-lime-500" />
                      <span className="text-lime-500 font-black text-sm uppercase">Wildlife Safari</span>
                    </div>
                    <div className={`p-8 rounded-3xl mb-6 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-xl`}>
                      <h2 className={`text-2xl font-bold text-center ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        {(questionData as { question: string }).question}
                      </h2>
                    </div>
                    
                    {!showResult ? (
                      <button 
                        onClick={revealAnswer}
                        className="px-12 py-4 bg-lime-500 text-white rounded-2xl font-black text-xl hover:bg-lime-600 transition-colors"
                      >
                        Show Answer
                      </button>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="p-6 bg-emerald-500/20 rounded-2xl">
                          <p className="text-emerald-500 font-black text-xl text-center">
                            {(questionData as { answer: string }).answer}
                          </p>
                        </div>
                        <button 
                          onClick={() => {
                            setShowResult(false);
                            nextQuestion();
                          }}
                          className="px-12 py-4 bg-lime-500 text-white rounded-2xl font-black text-xl hover:bg-lime-600 transition-colors w-full"
                        >
                          Next Animal →
                        </button>
                      </motion.div>
                    )}
                  </>
                )}

                {/* Story Adventure - Flashcard Style */}
                {activeGame === 'story-mode' && questionData && (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <BookOpen size={24} className="text-amber-500" />
                      <span className="text-amber-500 font-black text-sm uppercase">Story Adventure</span>
                    </div>
                    <div className={`p-8 rounded-3xl mb-6 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-xl`}>
                      <h2 className={`text-2xl font-bold text-center ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        {String((questionData as any)?.question || (questionData as any)?.riddle || 'Loading...')}
                      </h2>
                    </div>
                    
                    {!showResult ? (
                      <button 
                        onClick={() => {
                          setShowResult(true);
                        }}
                        className="px-12 py-4 bg-amber-500 text-white rounded-2xl font-black text-xl hover:bg-amber-600 transition-colors"
                      >
                        Show Answer
                      </button>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="p-6 bg-emerald-500/20 rounded-2xl">
                          <p className="text-emerald-500 font-black text-xl text-center">
                            THE ANSWER IS: {(questionData as any)?.answer || (questionData as any)?.riddle || 'N/A'}
                          </p>
                        </div>
                        <button 
                          onClick={() => {
                            setShowResult(false);
                            nextQuestion();
                          }}
                          className="px-12 py-4 bg-amber-500 text-white rounded-2xl font-black text-xl hover:bg-amber-600 transition-colors w-full"
                        >
                          Next Chapter →
                        </button>
                      </motion.div>
                    )}
                  </>
                )}

                {/* Boss Battle - Flashcard Style */}
                {activeGame === 'boss-battle' && questionData && (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Sword size={24} className="text-red-500" />
                      <span className="text-red-500 font-black text-sm uppercase">Boss Battle</span>
                    </div>
                    <div className={`p-8 rounded-3xl mb-6 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-xl`}>
                      <h2 className={`text-2xl font-bold text-center ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        {(questionData as { riddle?: string, question?: string }).riddle || (questionData as { question: string }).question}
                      </h2>
                    </div>
                    
                    {!showResult ? (
                      <button 
                        onClick={() => setShowResult(true)}
                        className="px-12 py-4 bg-red-500 text-white rounded-2xl font-black text-xl hover:bg-red-600 transition-colors"
                      >
                        Show Answer
                      </button>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="p-6 bg-emerald-500/20 rounded-2xl">
                          <p className="text-emerald-500 font-black text-xl text-center">
                            {(questionData as any)?.answer || (questionData as any)?.riddle || 'Answer'}
                          </p>
                        </div>
                        <button 
                          onClick={() => {
                            setShowResult(false);
                            nextQuestion();
                          }}
                          className="px-12 py-4 bg-red-500 text-white rounded-2xl font-black text-xl hover:bg-red-600 transition-colors w-full"
                        >
                          Attack Again! →
                        </button>
                      </motion.div>
                    )}
                  </>
                )}

                {/* Tournament - Flashcard Style */}
                {activeGame === 'tournament' && questionData && (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Trophy size={24} className="text-violet-500" />
                      <span className="text-violet-500 font-black text-sm uppercase">Tournament</span>
                    </div>
                    <div className={`p-8 rounded-3xl mb-6 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-xl`}>
                      <h2 className={`text-2xl font-bold text-center ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        {(questionData as { question: string }).question}
                      </h2>
                    </div>
                    
                    {!showResult ? (
                      <button 
                        onClick={() => setShowResult(true)}
                        className="px-12 py-4 bg-violet-500 text-white rounded-2xl font-black text-xl hover:bg-violet-600 transition-colors"
                      >
                        Show Answer
                      </button>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="p-6 bg-emerald-500/20 rounded-2xl">
                          <p className="text-emerald-500 font-black text-xl text-center">
                            {(questionData as any)?.answer || (questionData as any)?.riddle || 'Answer'}
                          </p>
                        </div>
                        <button 
                          onClick={() => {
                            setShowResult(false);
                            nextQuestion();
                          }}
                          className="px-12 py-4 bg-violet-500 text-white rounded-2xl font-black text-xl hover:bg-violet-600 transition-colors w-full"
                        >
                          Next Round →
                        </button>
                      </motion.div>
                    )}
                  </>
                )}

                {/* Would You Rather - Flashcard Style */}
                {activeGame === 'would-you-rather' && questionData && (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <MessageSquare size={24} className="text-violet-500" />
                      <span className="text-violet-500 font-black text-sm uppercase">Would You Rather</span>
                    </div>
                    <div className={`p-8 rounded-3xl mb-6 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-xl`}>
                      <h2 className={`text-2xl font-bold text-center ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        Would you rather...
                      </h2>
                      <div className="mt-6 space-y-4">
                        <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-zinc-700' : 'bg-violet-100'}`}>
                          <p className={`text-lg font-bold text-center ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                            {(questionData as { optionA: string }).optionA}
                          </p>
                        </div>
                        <div className="text-center text-violet-500 font-black text-xl">VS</div>
                        <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-zinc-700' : 'bg-violet-100'}`}>
                          <p className={`text-lg font-bold text-center ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                            {(questionData as { optionB: string }).optionB}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => {
                        setShowResult(false);
                        nextQuestion();
                      }}
                      className="px-12 py-4 bg-violet-500 text-white rounded-2xl font-black text-xl hover:bg-violet-600 transition-colors w-full"
                    >
                      Next Scenario →
                    </button>
                  </>
                )}

                {/* Tug of War - Interactive Display */}
                {activeGame === 'tug-of-war' && (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Users size={24} className="text-red-500" />
                      <span className="text-red-500 font-black text-sm uppercase">Tug of War</span>
                    </div>
                    <div className={`p-8 rounded-3xl mb-6 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-xl`}>
                      <h2 className={`text-xl font-bold text-center mb-6 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        Pull the rope to your side!
                      </h2>
                      <div className="relative h-20 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-6">
                        <motion.div 
                          animate={{ x: `${tugPosition - 50}%` }}
                          className="absolute top-1/2 left-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center"
                        >
                          <Users size={36} className="text-white" />
                        </motion.div>
                      </div>
                      <div className="flex justify-center gap-4">
                        <button onClick={() => setTugDirection(-1)} className="px-8 py-4 bg-red-500 text-white rounded-2xl font-black text-lg hover:bg-red-600 transition-colors">
                          ⬅️ PULL!
                        </button>
                        <button onClick={() => setTugDirection(1)} className="px-8 py-4 bg-blue-500 text-white rounded-2xl font-black text-lg hover:bg-blue-600 transition-colors">
                          PULL! ➡️
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {/* Word Relay - Flashcard Style */}
                {activeGame === 'word-relay' && questionData && (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <PenTool size={24} className="text-cyan-500" />
                      <span className="text-cyan-500 font-black text-sm uppercase">Word Relay</span>
                    </div>
                    <div className={`p-12 rounded-3xl mb-6 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-xl`}>
                      <p className={`text-xs font-bold uppercase tracking-widest text-center mb-4 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        Build a chain with related words
                      </p>
                      <h2 className={`text-5xl font-black text-center ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        {String(questionData)}
                      </h2>
                    </div>
                    
                    <button 
                      onClick={() => {
                        setShowResult(false);
                        nextQuestion();
                      }}
                      className="px-12 py-4 bg-cyan-500 text-white rounded-2xl font-black text-xl hover:bg-cyan-600 transition-colors w-full"
                    >
                      Next Word →
                    </button>
                  </>
                )}

                {/* Word Scramble - Flashcard Style */}
                {activeGame === 'word-scramble' && questionData && (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Shuffle size={24} className="text-amber-500" />
                      <span className="text-amber-500 font-black text-sm uppercase">Word Scramble</span>
                    </div>
                    <div className={`p-12 rounded-3xl mb-6 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-xl`}>
                      <p className={`text-xs font-bold uppercase tracking-widest text-center mb-4 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        Unscramble the word
                      </p>
                      <h2 className={`text-5xl font-black text-center mb-6 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        {(questionData as { scrambled: string }).scrambled}
                      </h2>
                      
                      {!showResult ? (
                        <button 
                          onClick={revealAnswer}
                          className="px-8 py-3 bg-amber-500 text-white rounded-2xl font-black text-lg hover:bg-amber-600 transition-colors w-full"
                        >
                          Reveal Answer
                        </button>
                      ) : (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-4"
                        >
                          <div className="p-4 bg-amber-500/20 rounded-xl">
                            <p className="text-amber-500 font-black text-3xl text-center">
                              {(questionData as { answer: string }).answer}
                            </p>
                            {(questionData as { hint?: string }).hint && (
                              <p className={`text-sm text-center mt-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                                💡 {(questionData as { hint: string }).hint}
                              </p>
                            )}
                          </div>
                          <button 
                            onClick={() => {
                              setShowResult(false);
                              nextQuestion();
                            }}
                            className="px-12 py-4 bg-amber-500 text-white rounded-2xl font-black text-xl hover:bg-amber-600 transition-colors w-full"
                          >
                            Next Word →
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </>
                )}

                {/* Number Crunch - Flashcard Style */}
                {activeGame === 'number-crunch' && questionData && (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Hash size={24} className="text-orange-500" />
                      <span className="text-orange-500 font-black text-sm uppercase">Number Crunch</span>
                    </div>
                    <div className={`p-12 rounded-3xl mb-6 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-xl`}>
                      <p className={`text-xs font-bold uppercase tracking-widest text-center mb-4 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        Solve the math problem
                      </p>
                      <h2 className={`text-4xl font-black text-center ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        {(questionData as { question: string }).question}
                      </h2>

                      {!showResult ? (
                        <button
                          onClick={revealAnswer}
                          className="px-8 py-3 bg-orange-500 text-white rounded-2xl font-black text-lg hover:bg-orange-600 transition-colors w-full mt-6"
                        >
                          Show Answer
                        </button>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-4 mt-6"
                        >
                          <div className="p-4 bg-orange-500/20 rounded-xl">
                            <p className="text-orange-500 font-black text-3xl text-center">
                              {(questionData as { answer: string }).answer}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setShowResult(false);
                              nextQuestion();
                            }}
                            className="px-12 py-4 bg-orange-500 text-white rounded-2xl font-black text-xl hover:bg-orange-600 transition-colors w-full"
                          >
                            Next Problem →
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </>
                )}

                {/* Couple Quiz - Flashcard Style */}
                {activeGame === 'couple-quiz' && questionData && (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Heart size={24} className="text-pink-500" />
                      <span className="text-pink-500 font-black text-sm uppercase">Couple Quiz</span>
                    </div>
                    <div className={`p-6 rounded-3xl mb-6 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-xl`}>
                      <p className={`text-2xl font-black mb-8 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        {(questionData as Question).question}
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        {(questionData as Question).options?.map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleAnswer(option)}
                            disabled={showResult}
                            className={`p-4 rounded-2xl font-bold text-lg transition-all ${
                              showResult
                                ? option === (questionData as Question).answer
                                  ? 'bg-emerald-500 text-white'
                                  : selectedAnswer === option
                                  ? 'bg-red-500 text-white'
                                  : theme === 'dark'
                                  ? 'bg-zinc-700 text-zinc-400'
                                  : 'bg-zinc-100 text-zinc-500'
                                : selectedAnswer === option
                                ? theme === 'dark'
                                  ? 'bg-pink-600 text-white'
                                  : 'bg-pink-500 text-white'
                                : theme === 'dark'
                                ? 'bg-zinc-700 text-white hover:bg-zinc-600'
                                : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Progress & Score */}
                    <div className="flex justify-between items-center mb-6">
                      <div className={`px-4 py-2 rounded-xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-lg`}>
                        <span className={`text-xs font-bold uppercase ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Question</span>
                        <p className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{currentQuestion + 1}/{getTotalQuestions()}</p>
                      </div>
                      <div className={`px-4 py-2 rounded-xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-lg`}>
                        <span className={`text-xs font-bold uppercase ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Score</span>
                        <p className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{scores[mode === 'TEAM' ? 'team1' : 'player1'] || 0}</p>
                      </div>
                    </div>
                    {/* Next Button */}
                    {showResult && (
                      <button
                        onClick={nextQuestion}
                        className={`w-full py-4 rounded-2xl font-black text-xl transition-all ${
                          theme === 'dark'
                            ? 'bg-pink-600 text-white hover:bg-pink-500'
                            : 'bg-pink-500 text-white hover:bg-pink-600'
                        }`}
                      >
                        Next Question →
                      </button>
                    )}
                  </>
                )}

                {/* Romantic Riddles - Flashcard Style */}
                {activeGame === 'romantic-riddle' && questionData && (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Heart size={24} className="text-rose-500" />
                      <span className="text-rose-500 font-black text-sm uppercase">Romantic Riddles</span>
                    </div>
                    <div className={`p-6 rounded-3xl mb-6 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-xl`}>
                      <p className={`text-2xl font-black mb-8 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        {(questionData as Question).question}
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        {(questionData as Question).options?.map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleAnswer(option)}
                            disabled={showResult}
                            className={`p-4 rounded-2xl font-bold text-lg transition-all ${
                              showResult
                                ? option === (questionData as Question).answer
                                  ? 'bg-emerald-500 text-white'
                                  : selectedAnswer === option
                                  ? 'bg-red-500 text-white'
                                  : theme === 'dark'
                                  ? 'bg-zinc-700 text-zinc-400'
                                  : 'bg-zinc-100 text-zinc-500'
                                : selectedAnswer === option
                                ? theme === 'dark'
                                  ? 'bg-rose-600 text-white'
                                  : 'bg-rose-500 text-white'
                                : theme === 'dark'
                                ? 'bg-zinc-700 text-white hover:bg-zinc-600'
                                : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Progress & Score */}
                    <div className="flex justify-between items-center mb-6">
                      <div className={`px-4 py-2 rounded-xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-lg`}>
                        <span className={`text-xs font-bold uppercase ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Riddle</span>
                        <p className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{currentQuestion + 1}/{getTotalQuestions()}</p>
                      </div>
                      <div className={`px-4 py-2 rounded-xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-lg`}>
                        <span className={`text-xs font-bold uppercase ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Score</span>
                        <p className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{scores[mode === 'TEAM' ? 'team1' : 'player1'] || 0}</p>
                      </div>
                    </div>
                    {/* Next Button */}
                    {showResult && (
                      <button
                        onClick={nextQuestion}
                        className={`w-full py-4 rounded-2xl font-black text-xl transition-all ${
                          theme === 'dark'
                            ? 'bg-rose-600 text-white hover:bg-rose-500'
                            : 'bg-rose-500 text-white hover:bg-rose-600'
                        }`}
                      >
                        Next Riddle →
                      </button>
                    )}
                  </>
                )}

                {/* Love Trivia - Flashcard Style */}
                {activeGame === 'love-trivia' && questionData && (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Heart size={24} className="text-red-500" />
                      <span className="text-red-500 font-black text-sm uppercase">Love Trivia</span>
                    </div>
                    <div className={`p-6 rounded-3xl mb-6 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-xl`}>
                      <p className={`text-2xl font-black mb-8 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        {(questionData as Question).question}
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        {(questionData as Question).options?.map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleAnswer(option)}
                            disabled={showResult}
                            className={`p-4 rounded-2xl font-bold text-lg transition-all ${
                              showResult
                                ? option === (questionData as Question).answer
                                  ? 'bg-emerald-500 text-white'
                                  : selectedAnswer === option
                                  ? 'bg-red-500 text-white'
                                  : theme === 'dark'
                                  ? 'bg-zinc-700 text-zinc-400'
                                  : 'bg-zinc-100 text-zinc-500'
                                : selectedAnswer === option
                                ? theme === 'dark'
                                  ? 'bg-red-600 text-white'
                                  : 'bg-red-500 text-white'
                                : theme === 'dark'
                                ? 'bg-zinc-700 text-white hover:bg-zinc-600'
                                : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Progress & Score */}
                    <div className="flex justify-between items-center mb-6">
                      <div className={`px-4 py-2 rounded-xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-lg`}>
                        <span className={`text-xs font-bold uppercase ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Question</span>
                        <p className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{currentQuestion + 1}/{getTotalQuestions()}</p>
                      </div>
                      <div className={`px-4 py-2 rounded-xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-lg`}>
                        <span className={`text-xs font-bold uppercase ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Score</span>
                        <p className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{scores[mode === 'TEAM' ? 'team1' : 'player1'] || 0}</p>
                      </div>
                    </div>
                    {/* Next Button */}
                    {showResult && (
                      <button
                        onClick={nextQuestion}
                        className={`w-full py-4 rounded-2xl font-black text-xl transition-all ${
                          theme === 'dark'
                            ? 'bg-red-600 text-white hover:bg-red-500'
                            : 'bg-red-500 text-white hover:bg-red-600'
                        }`}
                      >
                        Next Question →
                      </button>
                    )}
                  </>
                )}

                                {/* Challenge Games - Show challenge prompts */}
                {['couple-challenge', 'speed-challenge', 'endurance-challenge', 'precision-challenge', 'duel-challenge', 'survival-challenge'].includes(activeGame || '') && questionData && (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Sword size={24} className="text-orange-500" />
                      <span className="text-orange-500 font-black text-sm uppercase">
                        {activeGame?.replace('-', ' ')}
                      </span>
                    </div>
                    <div className={`p-8 rounded-3xl mb-6 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-xl text-center`}>
                      <p className={`text-3xl font-black mb-8 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        {(questionData as { challenge: string }).challenge}
                      </p>
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => { handleAnswer('completed'); setShowResult(true); }}
                          className={`px-8 py-4 rounded-2xl font-bold text-xl transition-all ${
                            theme === 'dark'
                              ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                              : 'bg-emerald-500 text-white hover:bg-emerald-600'
                          }`}
                        >
                          ✅ Completed!
                        </button>
                        <button
                          onClick={() => { handleAnswer('skip'); setShowResult(true); }}
                          className={`px-8 py-4 rounded-2xl font-bold text-xl transition-all ${
                            theme === 'dark'
                              ? 'bg-zinc-700 text-white hover:bg-zinc-600'
                              : 'bg-zinc-200 text-zinc-900 hover:bg-zinc-300'
                          }`}
                        >
                          ⏭️ Skip
                        </button>
                      </div>
                    </div>
                    {/* Progress & Score */}
                    <div className="flex justify-between items-center mb-6">
                      <div className={`px-4 py-2 rounded-xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-lg`}>
                        <span className={`text-xs font-bold uppercase ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Challenge</span>
                        <p className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{currentQuestion + 1}/{getTotalQuestions()}</p>
                      </div>
                      <div className={`px-4 py-2 rounded-xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-lg`}>
                        <span className={`text-xs font-bold uppercase ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Score</span>
                        <p className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{scores[mode === 'TEAM' ? 'team1' : 'player1'] || 0}</p>
                      </div>
                    </div>
                    {/* Next Button */}
                    {showResult && (
                      <button
                        onClick={nextQuestion}
                        className={`w-full py-4 rounded-2xl font-black text-xl transition-all ${
                          theme === 'dark'
                            ? 'bg-orange-600 text-white hover:bg-orange-500'
                            : 'bg-orange-500 text-white hover:bg-orange-600'
                        }`}
                      >
                        Next Challenge →
                      </button>
                    )}
                  </>
                )}

                                {/* Flipcard Games - Professional Design */}
                {['flipcard-match', 'flipcard-race', 'flipcard-duel', 'emotion-flipcards', 'culture-flipcards'].includes(activeGame || '') && questionData && (
                  <div className="text-center">
                    {/* Game Header */}
                    <div className="mb-6">
                      <div className="inline-flex items-center gap-3 mb-2">
                        <div className="p-3 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 shadow-lg shadow-purple-500/30">
                          <Layers size={28} className="text-white" />
                        </div>
                        <div className="text-left">
                          <h2 className="text-xl font-black uppercase tracking-wider bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
                            Flip Cards
                          </h2>
                          <p className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>Tap card to flip</p>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between text-xs font-bold mb-2">
                        <span className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}>Progress</span>
                        <span className="text-purple-500">{currentQuestion + 1}/{getTotalQuestions()}</span>
                      </div>
                      <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-200'} overflow-hidden`}>
                        <div 
                          className="h-full bg-gradient-to-r from-violet-500 to-pink-500 transition-all duration-500"
                          style={{ width: `${((currentQuestion + 1) / getTotalQuestions()) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Main Flip Card Container */}
                    <div className="mb-6">
                      <div 
                        className="relative cursor-pointer mx-auto w-64 h-64"
                        onClick={() => setFlipCardFlipped(!flipCardFlipped)}
                      >
                        {/* Card Back (shown when flipped) */}
                        <div className={`absolute inset-0 rounded-3xl flex flex-col items-center justify-center transition-all duration-500 shadow-2xl ${
                          flipCardFlipped 
                            ? 'opacity-100 rotate-y-0 scale-100' 
                            : 'opacity-0 rotate-y-180 scale-50'
                        } bg-gradient-to-br from-pink-500 via-rose-500 to-red-500`}
                        style={{ transformStyle: 'preserve-3d' }}
                        >
                          <span className="text-5xl font-black text-white drop-shadow-lg text-center px-4">
                            {(questionData as { back: string }).back}
                          </span>
                          <span className="text-white/80 text-sm mt-3 font-medium">Tap to hide</span>
                        </div>

                        {/* Card Front (shown when not flipped) */}
                        <div className={`absolute inset-0 rounded-3xl flex flex-col items-center justify-center transition-all duration-500 shadow-2xl ${
                          !flipCardFlipped 
                            ? 'opacity-100 rotate-y-0 scale-100' 
                            : 'opacity-0 -rotate-y-180 scale-50'
                        } bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500`}
                        style={{ transformStyle: 'preserve-3d' }}
                        >
                          <span className="text-7xl drop-shadow-lg">
                            {(questionData as { front: string }).front}
                          </span>
                          <span className="text-white/80 text-sm mt-3 font-medium">Tap to reveal</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className={`p-4 rounded-2xl ${theme === 'dark' ? 'bg-zinc-800/80' : 'bg-white'} shadow-lg border ${theme === 'dark' ? 'border-zinc-700' : 'border-zinc-200'}`}>
                        <div className={`text-xs font-bold uppercase ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Score</div>
                        <div className="text-2xl font-black text-gradient bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
                          {scores[mode === 'TEAM' ? 'team1' : 'player1'] || 0}
                        </div>
                      </div>
                      <div className={`p-4 rounded-2xl ${theme === 'dark' ? 'bg-zinc-800/80' : 'bg-white'} shadow-lg border ${theme === 'dark' ? 'border-zinc-700' : 'border-zinc-200'}`}>
                        <div className={`text-xs font-bold uppercase ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Streak</div>
                        <div className={`text-2xl font-black ${streak > 0 ? 'text-amber-500' : theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'}`}>
                          {streak}🔥
                        </div>
                      </div>
                      <div className={`p-4 rounded-2xl ${theme === 'dark' ? 'bg-zinc-800/80' : 'bg-white'} shadow-lg border ${theme === 'dark' ? 'border-zinc-700' : 'border-zinc-200'}`}>
                        <div className={`text-xs font-bold uppercase ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Cards</div>
                        <div className="text-2xl font-black text-pink-500">
                          {currentQuestion + 1}/{getTotalQuestions()}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => setFlipCardFlipped(!flipCardFlipped)}
                        className={`flex-1 py-4 rounded-2xl font-black text-lg transition-all shadow-lg ${
                          theme === 'dark'
                            ? 'bg-zinc-700 text-white hover:bg-zinc-600'
                            : 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300'
                        }`}
                      >
                        {flipCardFlipped ? '👁️ Flip Back' : '👁️ Flip Card'}
                      </button>
                      <button
                        onClick={() => { 
                          handleAnswer('flip'); 
                          setShowResult(true); 
                          setFlipCardFlipped(false);
                          nextQuestion();
                        }}
                        className={`flex-1 py-4 rounded-2xl font-black text-lg transition-all shadow-lg bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500`}
                      >
                        Next Card →
                      </button>
                    </div>
                  </div>
                )}

                {/* Romantic Flipcards - Text-based Questions */}
                {activeGame === 'romantic-flipcards' && questionData && (
                  <div className="text-center">
                    {/* Game Header */}
                    <div className="mb-6">
                      <div className="inline-flex items-center gap-3 mb-2">
                        <div className="p-3 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 shadow-lg shadow-pink-500/30">
                          <Heart size={28} className="text-white" />
                        </div>
                        <div className="text-left">
                          <h2 className="text-xl font-black uppercase tracking-wider bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
                            Romantic Flipcards
                          </h2>
                          <p className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>70+ Love Questions</p>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between text-xs font-bold mb-2">
                        <span className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}>Question</span>
                        <span className="text-pink-500">{currentQuestion + 1}/{getTotalQuestions()}</span>
                      </div>
                      <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-200'} overflow-hidden`}>
                        <div 
                          className="h-full bg-gradient-to-r from-pink-500 to-red-500 transition-all duration-500"
                          style={{ width: `${((currentQuestion + 1) / getTotalQuestions()) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Text Flip Card */}
                    <div className="mb-6">
                      <div 
                        className="relative cursor-pointer mx-auto w-full max-w-md"
                        onClick={() => setFlipCardFlipped(!flipCardFlipped)}
                      >
                        {/* Card Back - Answer (shown when flipped) */}
                        <div className={`p-8 rounded-3xl transition-all duration-500 shadow-2xl ${
                          flipCardFlipped 
                            ? 'opacity-100 scale-100' 
                            : 'opacity-0 scale-90'
                        } bg-gradient-to-br from-pink-500 via-rose-500 to-red-500`}
                        >
                          <div className="text-center">
                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${theme === 'dark' ? 'bg-white/20 text-white' : 'bg-white/30 text-white'}`}>
                              💕 Answer
                            </div>
                            <p className="text-2xl font-black text-white drop-shadow-lg">
                              {(questionData as { back: string }).back}
                            </p>
                          </div>
                        </div>

                        {/* Card Front - Question (shown when not flipped) */}
                        <div className={`p-8 rounded-3xl transition-all duration-500 shadow-2xl ${
                          !flipCardFlipped 
                            ? 'opacity-100 scale-100' 
                            : 'opacity-0 scale-90'
                        } ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} border-2 border-pink-200`}
                        >
                          <div className="text-center">
                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${theme === 'dark' ? 'bg-pink-500/20 text-pink-400' : 'bg-pink-100 text-pink-600'}`}>
                              💭 Question
                            </div>
                            <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-800'}`}>
                              {(questionData as { front: string }).front}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hint Text */}
                    <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      {flipCardFlipped ? '💡 Share your answer with your partner!' : '💭 Think about your answer, then tap to reveal!'}
                    </p>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className={`p-4 rounded-2xl ${theme === 'dark' ? 'bg-zinc-800/80' : 'bg-white'} shadow-lg border ${theme === 'dark' ? 'border-zinc-700' : 'border-zinc-200'}`}>
                        <div className={`text-xs font-bold uppercase ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Score</div>
                        <div className="text-2xl font-black text-gradient bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
                          {scores[mode === 'TEAM' ? 'team1' : 'player1'] || 0}
                        </div>
                      </div>
                      <div className={`p-4 rounded-2xl ${theme === 'dark' ? 'bg-zinc-800/80' : 'bg-white'} shadow-lg border ${theme === 'dark' ? 'border-zinc-700' : 'border-zinc-200'}`}>
                        <div className={`text-xs font-bold uppercase ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Streak</div>
                        <div className={`text-2xl font-black ${streak > 0 ? 'text-amber-500' : theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'}`}>
                          {streak}🔥
                        </div>
                      </div>
                      <div className={`p-4 rounded-2xl ${theme === 'dark' ? 'bg-zinc-800/80' : 'bg-white'} shadow-lg border ${theme === 'dark' ? 'border-zinc-700' : 'border-zinc-200'}`}>
                        <div className={`text-xs font-bold uppercase ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Cards</div>
                        <div className="text-2xl font-black text-pink-500">
                          {currentQuestion + 1}/{getTotalQuestions()}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => setFlipCardFlipped(!flipCardFlipped)}
                        className={`flex-1 py-4 rounded-2xl font-black text-lg transition-all shadow-lg ${
                          theme === 'dark'
                            ? 'bg-zinc-700 text-white hover:bg-zinc-600'
                            : 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300'
                        }`}
                      >
                        {flipCardFlipped ? '💭 See Question' : '💕 Reveal Answer'}
                      </button>
                      <button
                        onClick={() => { 
                          handleAnswer('flip'); 
                          setShowResult(true); 
                          setFlipCardFlipped(false);
                          nextQuestion();
                        }}
                        className={`flex-1 py-4 rounded-2xl font-black text-lg transition-all shadow-lg bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 text-white hover:from-pink-500 hover:via-rose-500 hover:to-red-500`}
                      >
                        Next Question →
                      </button>
                    </div>
                  </div>
                )}

                {/* Memory Match - Full Card Matching Game */}
                {activeGame === 'memory-match' && (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Grid size={24} className="text-purple-500" />
                      <span className="text-purple-500 font-black text-sm uppercase">Memory Match</span>
                    </div>
                    <div className={`p-6 rounded-3xl mb-6 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} shadow-xl`}>
                      {/* Difficulty & Category Selectors */}
                      <div className="flex flex-col gap-3 mb-4">
                        {/* Difficulty */}
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-bold uppercase ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Difficulty</span>
                          <div className="flex gap-1">
                            {(['easy', 'medium', 'hard'] as const).map(diff => (
                              <button
                                key={diff}
                                onClick={() => setMemoryDifficulty(diff)}
                                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-all ${
                                  memoryDifficulty === diff
                                    ? diff === 'easy' ? 'bg-emerald-500 text-white' : diff === 'medium' ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'
                                    : theme === 'dark' ? 'bg-zinc-700 text-zinc-400' : 'bg-zinc-200 text-zinc-500'
                                }`}
                              >
                                {diff}
                              </button>
                            ))}
                          </div>
                        </div>
                        {/* Category */}
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-bold uppercase ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Category</span>
                          <div className="flex gap-1">
                            {(['fruits', 'animals', 'flags', 'mixed'] as const).map(cat => (
                              <button
                                key={cat}
                                onClick={() => setMemoryCategory(cat)}
                                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-all ${
                                  memoryCategory === cat
                                    ? 'bg-purple-500 text-white'
                                    : theme === 'dark' ? 'bg-zinc-700 text-zinc-400' : 'bg-zinc-200 text-zinc-500'
                                }`}
                              >
                                {cat === 'fruits' ? '🍎' : cat === 'animals' ? '🐾' : cat === 'flags' ? '🚩' : '🎲'}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Score Display */}
                      <div className="flex justify-center gap-6 mb-4">
                        <div className="text-center">
                          <p className={`text-xs font-bold uppercase ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>⏱ Time</p>
                          <p className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{formatMemoryTime(memoryTimer)}</p>
                        </div>
                        <div className="text-center">
                          <p className={`text-xs font-bold uppercase ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>🔄 Moves</p>
                          <p className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{memoryMoves}</p>
                        </div>
                        <div className="text-center">
                          <p className={`text-xs font-bold uppercase ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>💎 Matches</p>
                          <p className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{memoryMatched}/{memoryCards.length / 2}</p>
                        </div>
                        <div className="text-center">
                          <p className={`text-xs font-bold uppercase ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>🔥 Combo</p>
                          <p className={`text-2xl font-black ${memoryCombo > 2 ? 'text-orange-500' : theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{memoryCombo}x</p>
                        </div>
                      </div>

                      {/* Card Grid */}
                      <div className={`grid gap-2 mb-4 ${memoryDifficulty === 'easy' ? 'grid-cols-4' : memoryDifficulty === 'medium' ? 'grid-cols-4' : 'grid-cols-5'}`}>
                        {memoryCards.length === 0 ? (
                          // Initialize on first render
                          (initMemoryMatch(), Array.from({ length: getMemoryCardCount(memoryDifficulty) }).map((_, i) => (
                            <button
                              key={i}
                              className={`aspect-square p-2 rounded-xl text-2xl font-bold transition-all duration-300 ${
                                theme === 'dark'
                                  ? 'bg-zinc-700 hover:bg-zinc-600'
                                  : 'bg-zinc-200 hover:bg-zinc-300'
                              }`}
                              onClick={() => handleMemoryCardClick(i)}
                            >
                              ?
                            </button>
                          )))
                        ) : (
                          memoryCards.map((card) => (
                            <button
                              key={card.id}
                              className={`aspect-square p-2 rounded-xl text-2xl font-bold transition-all duration-300 ${
                                card.isFlipped || card.isMatched
                                  ? card.isMatched
                                    ? 'bg-emerald-500/50 scale-95'
                                    : 'bg-purple-500'
                                  : theme === 'dark'
                                    ? 'bg-zinc-700 hover:bg-zinc-600 hover:scale-105'
                                    : 'bg-zinc-200 hover:bg-zinc-300 hover:scale-105'
                              }`}
                              onClick={() => handleMemoryCardClick(card.id)}
                              disabled={card.isMatched || card.isFlipped}
                            >
                              {card.isFlipped || card.isMatched ? card.emoji : '?'}
                            </button>
                          ))
                        )}
                      </div>

                      {/* Game Complete Message */}
                      {memoryMatched === memoryCards.length / 2 && memoryCards.length > 0 && (
                        <div className="text-center mb-4 p-4 bg-gradient-to-r from-emerald-500/30 to-purple-500/30 rounded-xl">
                          <p className="text-emerald-500 font-black text-xl">🎉 You Won!</p>
                          <p className="text-emerald-400 text-sm">Completed in {memoryMoves} moves • {formatMemoryTime(memoryTimer)}</p>
                          {memoryCombo > 3 && <p className="text-purple-400 text-sm mt-1">🔥 Best Combo: {memoryCombo}x</p>}
                        </div>
                      )}

                      <button
                        onClick={() => {
                          initMemoryMatch();
                        }}
                        className="px-12 py-4 bg-purple-500 text-white rounded-2xl font-black text-xl hover:bg-purple-600 transition-colors w-full"
                      >
                        New Game →
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Score Display */}
              <div className={`flex items-center justify-center gap-8 p-6 rounded-2xl ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'} border ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-100'}`}>
                {mode === 'TEAM' ? teams.map(team => (
                  <div key={team.id} className="text-center">
                    <p className={`text-sm font-bold mb-1 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>{team.name}</p>
                    <p className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{scores[team.id] || 0}</p>
                  </div>
                )) : players.map(player => (
                  <div key={player.id} className="text-center">
                    <p className={`text-sm font-bold mb-1 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>{player.name}</p>
                    <p className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{scores[player.id] || 0}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        <AnimatePresence>
          {lastMissionCompleted && (
            <FloatingText 
              text={`${lastMissionCompleted.title} Complete! +${lastMissionCompleted.reward}`}
              onComplete={() => {}}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Render setup
  if (view === 'SETUP') {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
        <Header 
          onReset={resetGame}
          theme={theme}
          onToggleTheme={toggleTheme}
          difficulty={difficulty}
          onChangeDifficulty={setDifficulty}
          onOpenSidebar={() => setSidebarOpen(true)}
        />
        
        <div className="max-w-2xl mx-auto p-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-8 rounded-[2rem] ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'} shadow-xl border ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-100'}`}
          >
            <button onClick={() => setView('DASHBOARD')} className={`flex items-center gap-2 mb-6 font-bold ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
              <ChevronLeft size={20} /> Back
            </button>
            
            <h2 className={`text-3xl font-black mb-8 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              {mode === 'TEAM' ? 'Setup Teams' : 'Setup Players'}
            </h2>
            
            <div className="space-y-6">
              {mode === 'TEAM' ? (
                <>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>Number of Teams</label>
                    <div className="flex gap-2">
                      {[2, 3, 4].map(num => (
                        <button
                          key={num}
                          onClick={() => { setTeamCount(num); setTeamNames(Array(num).fill(0).map((_, i) => `Team ${String.fromCharCode(65 + i)}`)); }}
                          className={`px-6 py-3 rounded-xl font-bold ${teamCount === num ? 'bg-indigo-600 text-white' : theme === 'dark' ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-600'}`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className={`block text-sm font-bold ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>Team Names</label>
                    {teamNames.map((name, i) => (
                      <input
                        key={i}
                        type="text"
                        value={name}
                        onChange={(e) => { const newNames = [...teamNames]; newNames[i] = e.target.value; setTeamNames(newNames); }}
                        className={`w-full p-4 rounded-xl font-bold ${theme === 'dark' ? 'bg-zinc-800 text-white border-zinc-700' : 'bg-zinc-100 text-zinc-900 border-zinc-200'} border-2 focus:outline-none`}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {/* Solo/Individual Mode - Single Player Name */}
                  <div className="space-y-3">
                    <label className={`block text-sm font-bold ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>Your Name</label>
                    <input
                      type="text"
                      value={playerNames[0] || ''}
                      onChange={(e) => setPlayerNames([e.target.value])}
                      placeholder="Enter your name"
                      className={`w-full p-4 rounded-xl font-bold ${theme === 'dark' ? 'bg-zinc-800 text-white border-zinc-700' : 'bg-zinc-100 text-zinc-900 border-zinc-200'} border-2 focus:outline-none`}
                    />
                  </div>
                </>
              )}
              <button onClick={mode === 'TEAM' ? setupTeams : setupPlayers} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-xl">
                Start Game
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Old Sidebar removed - using imported Sidebar component
          
          {/* Navigation Section */}
          <div className="space-y-2 mb-6">
            <p className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'} mb-2`}>Navigation</p>
            
            {/* Home */}
            <button 
              onClick={() => { setView('DASHBOARD'); setSidebarOpen(false); }}
              className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'}`}
            >
              <Home size={18} className="text-indigo-500" />
              <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>🏠 Home</span>
            </button>
            
            {/* Quick Games */}
            <button 
              onClick={() => { setActiveSidebarTab('games'); setSidebarOpen(false); }}
              className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'}`}
            >
              <Gamepad2 size={18} className="text-green-500" />
              <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>🎮 Quick Games</span>
            </button>
            
            {/* Leaderboard */}
            <button 
              onClick={() => { setActiveSidebarTab('leaderboard'); setSidebarOpen(false); }}
              className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'}`}
            >
              <Award size={18} className="text-yellow-500" />
              <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>🏆 Leaderboard</span>
            </button>
          </div>
          
          {/* Special Modes Section */}
          <div className="space-y-2 mb-6">
            <p className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'} mb-2`}>Special Modes</p>
            
            {/* Story Adventure */}
            <button 
              onClick={() => { startGame('story-mode'); setSidebarOpen(false); }}
              className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${theme === 'dark' ? 'hover:bg-amber-900/30' : 'hover:bg-amber-50'}`}
            >
              <BookOpen size={18} className="text-amber-500" />
              <span className={`font-bold ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`}>📖 Story Adventure</span>
              <span className={`ml-auto text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>{STORY_CHAPTERS.length}</span>
            </button>
            
            {/* Boss Battles */}
            <button 
              onClick={() => { startGame('boss-battle'); setSidebarOpen(false); }}
              className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${theme === 'dark' ? 'hover:bg-red-900/30' : 'hover:bg-red-50'}`}
            >
              <Crown size={18} className="text-red-500" />
              <span className={`font-bold ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>👑 Boss Battles</span>
              <span className={`ml-auto text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>{BOSS_BATTLES.length}</span>
            </button>
            
            {/* Tournaments */}
            <button 
              onClick={() => { startGame('tournament'); setSidebarOpen(false); }}
              className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${theme === 'dark' ? 'hover:bg-blue-900/30' : 'hover:bg-blue-50'}`}
            >
              <Trophy size={18} className="text-blue-500" />
              <span className={`font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>🏅 Tournaments</span>
              <span className={`ml-auto text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>{TOURNAMENTS.length}</span>
            </button>
          </div>
          
          {/* Missions Section */}
          <div className="space-y-2 mb-6">
            <p className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'} mb-2`}>Missions</p>
            
            {/* Your Missions */}
            <button 
              onClick={() => { setActiveSidebarTab('missions'); setSidebarOpen(false); }}
              className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${theme === 'dark' ? 'hover:bg-emerald-900/30' : 'hover:bg-emerald-50'}`}
            >
              <Target size={18} className="text-emerald-500" />
              <span className={`font-bold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>🎯 Your Missions</span>
            </button>
            
            {/* Active Missions */}
            <button 
              onClick={() => { setActiveSidebarTab('active'); setSidebarOpen(false); }}
              className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${theme === 'dark' ? 'hover:bg-purple-900/30' : 'hover:bg-purple-50'}`}
            >
              <Zap size={18} className="text-purple-500" />
              <span className={`font-bold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>⚡ Active Missions</span>
            </button>
            
            {/* Vibe Boosters */}
            <button 
              onClick={() => { setActiveSidebarTab('boosters'); setSidebarOpen(false); }}
              className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${theme === 'dark' ? 'hover:bg-orange-900/30' : 'hover:bg-orange-50'}`}
            >
              <Rocket size={18} className="text-orange-500" />
              <span className={`font-bold ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>🚀 Vibe Boosters</span>
            </button>
          </div>
          
          {/* Settings Section */}
          <div className="space-y-2">
            <p className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'} mb-2`}>Settings</p>
            
            {/* Settings */}
            <button 
              onClick={() => { setActiveSidebarTab('settings'); setSidebarOpen(false); }}
              className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'}`}
            >
              <Settings size={18} className="text-zinc-500" />
              <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>⚙️ Settings</span>
            </button>
            
            {/* Reset Game */}
            <button 
              onClick={() => { resetGame(); setSidebarOpen(false); }}
              className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'}`}
            >
              <RotateCcw size={18} className="text-pink-500" />
              <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>🔄 Reset Game</span>
            </button>
          </div>
      
      {/* Settings Modal */}
      {activeSidebarTab === 'settings' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`max-w-md w-full rounded-3xl p-6 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'} shadow-2xl`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>⚙️ Settings</h2>
              <button onClick={() => setActiveSidebarTab(null)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg">
                <X size={24} className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800">
                <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>🌙 Dark Mode</span>
                <button 
                  onClick={toggleTheme}
                  className={`px-4 py-2 rounded-lg font-bold ${theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-zinc-200 text-zinc-900'}`}
                >
                  {theme === 'dark' ? 'ON' : 'OFF'}
                </button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800">
                <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>📊 Difficulty</span>
                <select 
                  value={difficulty} 
                  onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                  className={`px-4 py-2 rounded-lg font-bold ${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-900'} border`}
                >
                  <option value="EASY">EASY</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HARD">HARD</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Games Modal */}
      {activeSidebarTab === 'games' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`max-w-lg w-full rounded-3xl p-6 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'} shadow-2xl max-h-[80vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>🎮 Quick Games</h2>
              <button onClick={() => setActiveSidebarTab(null)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg">
                <X size={24} className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {GAMES.filter(g => !['story-mode', 'boss-battle', 'tournament'].includes(g.id)).map(game => (
                <button
                  key={game.id}
                  onClick={() => { startGame(game.id); setActiveSidebarTab(null); setSidebarOpen(false); }}
                  className={`p-4 rounded-xl text-left transition-all hover:scale-105 ${theme === 'dark' ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-100 hover:bg-zinc-200'}`}
                >
                  <span className={`text-2xl mb-2 block`}>{game.icon}</span>
                  <span className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{game.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Missions Modal */}
      {activeSidebarTab === 'missions' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`max-w-lg w-full rounded-3xl p-6 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'} shadow-2xl max-h-[80vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>🎯 Your Missions</h2>
              <button onClick={() => setActiveSidebarTab(null)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg">
                <X size={24} className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} />
              </button>
            </div>
            <div className="space-y-3">
              <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-emerald-900/30' : 'bg-emerald-50'} border border-emerald-500/30`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-emerald-500">🎯</span>
                  <span className={`font-bold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>Daily Challenge</span>
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>{dailyChallenge || 'Complete today\'s challenge!'}</p>
              </div>
              <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-500">🏆</span>
                  <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>Win 5 Games</span>
                </div>
                <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-200'}`}>
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '40%' }} />
                </div>
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>2/5 completed</p>
              </div>
              <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-purple-500">⚡</span>
                  <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>Score 1000 Points</span>
                </div>
                <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-200'}`}>
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '60%' }} />
                </div>
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>600/1000 points</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Active Missions Modal */}
      {activeSidebarTab === 'active' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`max-w-lg w-full rounded-3xl p-6 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'} shadow-2xl max-h-[80vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>⚡ Active Missions</h2>
              <button onClick={() => setActiveSidebarTab(null)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg">
                <X size={24} className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} />
              </button>
            </div>
            <div className="space-y-3">
              {missions.length > 0 ? missions.slice(0, 5).map((mission, idx) => (
                <div key={idx} className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50'} border border-purple-500/30`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-purple-500">🎯</span>
                    <span className={`font-bold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>{mission.title}</span>
                  </div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>{mission.description}</p>
                </div>
              )) : (
                <div className={`p-6 text-center ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  <Zap size={32} className="mx-auto mb-2 text-zinc-400" />
                  <p>No active missions right now!</p>
                  <p className="text-sm mt-1">Start playing to unlock missions</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Vibe Boosters Modal */}
      {activeSidebarTab === 'boosters' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`max-w-lg w-full rounded-3xl p-6 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'} shadow-2xl max-h-[80vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>🚀 Vibe Boosters</h2>
              <button onClick={() => setActiveSidebarTab(null)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg">
                <X size={24} className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-4 rounded-xl text-center ${theme === 'dark' ? 'bg-orange-900/30' : 'bg-orange-50'} border border-orange-500/30`}>
                <span className="text-3xl block mb-2">⏰</span>
                <span className={`font-bold text-sm ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>Time Freeze</span>
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Stop timer for 10s</p>
              </div>
              <div className={`p-4 rounded-xl text-center ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'} border border-blue-500/30`}>
                <span className="text-3xl block mb-2">💡</span>
                <span className={`font-bold text-sm ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Hint</span>
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Reveal answer letter</p>
              </div>
              <div className={`p-4 rounded-xl text-center ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-50'} border border-green-500/30`}>
                <span className="text-3xl block mb-2">✨</span>
                <span className={`font-bold text-sm ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>Double Points</span>
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>2x score next Q</p>
              </div>
              <div className={`p-4 rounded-xl text-center ${theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50'} border border-purple-500/30`}>
                <span className="text-3xl block mb-2">🔄</span>
                <span className={`font-bold text-sm ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>Skip</span>
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Skip current question</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Leaderboard Modal */}
      {activeSidebarTab === 'leaderboard' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`max-w-lg w-full rounded-3xl p-6 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'} shadow-2xl max-h-[80vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>🏆 Leaderboard</h2>
              <button onClick={() => setActiveSidebarTab(null)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg">
                <X size={24} className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} />
              </button>
            </div>
            <div className="space-y-2">
              {mode === 'TEAM' ? teams.slice(0, 5).map((team, idx) => (
                <div key={team.id} className={`flex items-center gap-3 p-3 rounded-xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
                  <span className={`font-black text-lg ${idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-zinc-400' : idx === 2 ? 'text-orange-600' : theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>#{idx + 1}</span>
                  <div className={`w-8 h-8 rounded-lg ${team.color}`} />
                  <span className={`font-bold flex-1 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{team.name}</span>
                  <span className={`font-bold ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>{scores[team.id] || 0} pts</span>
                </div>
              )) : players.slice(0, 5).map((player, idx) => (
                <div key={player.id} className={`flex items-center gap-3 p-3 rounded-xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
                  <span className={`font-black text-lg ${idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-zinc-400' : idx === 2 ? 'text-orange-600' : theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>#{idx + 1}</span>
                  <span className={`text-2xl`}>{player.avatar}</span>
                  <span className={`font-bold flex-1 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{player.name}</span>
                  <span className={`font-bold ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>{scores[player.id] || 0} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

  // Render dashboard
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
      <LiveTicker theme={theme} />
      <Header 
        onReset={resetGame}
        theme={theme}
        onToggleTheme={toggleTheme}
        difficulty={difficulty}
        onChangeDifficulty={setDifficulty}
        onOpenSidebar={() => setSidebarOpen(true)}
      />
      
      {sidebarOpen && (
        <Sidebar 
          theme={theme}
          setSidebarOpen={setSidebarOpen}
          setActiveSidebarTab={setActiveSidebarTab}
          startGame={startGame}
          resetGame={resetGame}
          toggleTheme={toggleTheme}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          mode={mode}
          teams={teams}
          players={players}
          scores={scores}
          dailyChallenge={dailyChallenge}
          missions={missions}
          GAMES={GAMES}
          view={view}
          setView={setView}
        />
      )}
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Players Setup */}
        {mode && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 sm:mb-12">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className={`text-xs font-black uppercase tracking-widest ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                {mode === 'TEAM' ? 'Teams' : 'Players'} Setup
              </h2>
              <button onClick={() => { setMode(null); setTeams([]); setPlayers([]); }} className="text-xs font-bold text-indigo-500">Change Mode</button>
            </div>
            <div className={`p-4 sm:p-6 rounded-2xl ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100'} border`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  {mode === 'TEAM' ? <Users className="text-indigo-500 w-5 h-5 sm:w-6 sm:h-6" /> : <User className="text-pink-500 w-5 h-5 sm:w-6 sm:h-6" />}
                  <div>
                    <p className={`font-bold text-sm sm:text-base ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                      {mode === 'TEAM' ? teams.map(t => t.name).join(' vs ') : players.map(p => p.name).join(', ')}
                    </p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      {mode === 'TEAM' ? `${teams.length} Teams` : `${players.length} Players`}
                    </p>
                  </div>
                </div>
                <button onClick={() => setView('SETUP')} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl touch-spacing">
                  <RotateCcw size={18} className="sm:size-20" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick Access - Special Modes */}
        <div className="mb-12">
          <h2 className={`text-xs font-black uppercase tracking-widest mb-4 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Special Modes - Click to Play!</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* Story Adventure */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => startGame('story-mode')}
              className={`p-6 rounded-2xl border-2 transition-all text-left hover:scale-105 ${theme === 'dark' ? 'bg-gradient-to-br from-amber-900/30 to-zinc-900 border-amber-500/30 hover:border-amber-500' : 'bg-gradient-to-br from-amber-50 to-white border-amber-200 hover:border-amber-500'}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">📖</span>
                <div>
                  <h3 className={`text-lg font-black ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`}>Story Adventure</h3>
                  <p className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>{STORY_CHAPTERS.length} Chapters</p>
                </div>
              </div>
              <div className={`mt-3 px-3 py-1.5 rounded-lg text-center text-sm font-bold ${theme === 'dark' ? 'bg-amber-600 text-white' : 'bg-amber-500 text-white'}`}>PLAY NOW</div>
            </motion.button>

            {/* Boss Battles */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => startGame('boss-battle')}
              className={`p-6 rounded-2xl border-2 transition-all text-left hover:scale-105 ${theme === 'dark' ? 'bg-gradient-to-br from-red-900/30 to-zinc-900 border-red-500/30 hover:border-red-500' : 'bg-gradient-to-br from-red-50 to-white border-red-200 hover:border-red-500'}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">⚔️</span>
                <div>
                  <h3 className={`text-lg font-black ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>Boss Battles</h3>
                  <p className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>{BOSS_BATTLES.length} Bosses</p>
                </div>
              </div>
              <div className={`mt-3 px-3 py-1.5 rounded-lg text-center text-sm font-bold ${theme === 'dark' ? 'bg-red-600 text-white' : 'bg-red-500 text-white'}`}>FIGHT NOW</div>
            </motion.button>

            {/* Tournaments */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => startGame('tournament')}
              className={`p-6 rounded-2xl border-2 transition-all text-left hover:scale-105 ${theme === 'dark' ? 'bg-gradient-to-br from-violet-900/30 to-zinc-900 border-violet-500/30 hover:border-violet-500' : 'bg-gradient-to-br from-violet-50 to-white border-violet-200 hover:border-violet-500'}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">🏆</span>
                <div>
                  <h3 className={`text-lg font-black ${theme === 'dark' ? 'text-violet-400' : 'text-violet-600'}`}>Tournaments</h3>
                  <p className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>{TOURNAMENTS.length} Active</p>
                </div>
              </div>
              <div className={`mt-3 px-3 py-1.5 rounded-lg text-center text-sm font-bold ${theme === 'dark' ? 'bg-violet-600 text-white' : 'bg-violet-500 text-white'}`}>JOIN NOW</div>
            </motion.button>
          </div>
        </div>

        {/* Games */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xs font-black uppercase tracking-widest ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Choose a Game</h2>
          </div>
          
          <div className="game-grid">
            {GAMES.map((game, index) => (
              <GameCard
                key={game.id}
                game={game}
                onClick={() => startGame(game.id)}
                index={index}
                theme={theme}
                isPopular={game.id === 'trivia' || game.id === 'rapid-fire'}
                isNew={game.id === 'memory-match' || game.id === 'word-scramble' || game.id === 'word-difference' || game.id === 'word-read'}
              />
            ))}
          </div>
        </div>

      </main>

      <AnimatePresence>
        {lastMissionCompleted && (
          <FloatingText text={`${lastMissionCompleted.title} Complete! +${lastMissionCompleted.reward}`} onComplete={() => {}} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
