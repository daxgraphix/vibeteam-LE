import { Mission, VibeBooster, Game, GameMode, GameCategory, GameStatus, Achievement, StoryChapter, BossBattle, SeasonEvent, Tournament, Difficulty } from '../types';
import { WORD_SCRAMBLE_WORDS, WORD_DIFFERENCE, WORD_RELAY_PROMPTS, WORD_READ_CHALLENGES, COUPLE_QUESTIONS, DEEP_LOVE_QUESTIONS, CHALLENGE_PROMPTS, MORE_CHALLENGES, FLIP_CARD_PAIRS } from '../data';

// Re-export word games from data.ts
export { WORD_SCRAMBLE_WORDS, WORD_DIFFERENCE, WORD_RELAY_PROMPTS, WORD_READ_CHALLENGES };

// ============================================
// MISSIONS - Engaging missions with progression
// ============================================

export const INITIAL_MISSIONS: Mission[] = [
  // Quick Play Missions
  { id: 'm1', title: '🧠 Trivia Master', description: 'Answer 50 trivia questions correctly', target: 50, current: 0, completed: false, reward: 100, type: 'SCORE' },
  { id: 'm2', title: '⚡ Speed Demon', description: 'Win 3 rapid fire rounds', target: 3, current: 0, completed: false, reward: 75, type: 'SCORE' },
  { id: 'm3', title: '👥 Team Spirit', description: 'Score 100 points as a team', target: 100, current: 0, completed: false, reward: 80, type: 'STREAK' },
  { id: 'm4', title: '🎨 Emoji Expert', description: 'Solve 10 emoji puzzles', target: 10, current: 0, completed: false, reward: 90, type: 'SCORE' },
  { id: 'm5', title: '✍️ Word Wizard', description: 'Complete 15 word relay rounds', target: 15, current: 0, completed: false, reward: 100, type: 'SCORE' },
  { id: 'm6', title: '🧩 Brainiac', description: 'Solve 8 brain teasers', target: 8, current: 0, completed: false, reward: 85, type: 'SCORE' },
  { id: 'm7', title: '🔥 Rapid Fire King', description: 'Answer 30 rapid fire questions', target: 30, current: 0, completed: false, reward: 120, type: 'SCORE' },
  { id: 'm8', title: '💪 Tug Champion', description: 'Win 5 tug of war matches', target: 5, current: 0, completed: false, reward: 150, type: 'SCORE' },
  { id: 'm9', title: '🤔 Would You Rather', description: 'Make 20 choices in Would You Rather', target: 20, current: 0, completed: false, reward: 95, type: 'SCORE' },
  { id: 'm10', title: '⭐ Perfect Streak', description: 'Get 5 correct answers in a row', target: 5, current: 0, completed: false, reward: 200, type: 'STREAK' },
  { id: 'm11', title: '🔤 Word Scrambler', description: 'Unscramble 25 words correctly', target: 25, current: 0, completed: false, reward: 110, type: 'SCORE' },
  { id: 'm12', title: '🔍 Word Detective', description: 'Complete 15 Word Difference challenges', target: 15, current: 0, completed: false, reward: 105, type: 'SCORE' },
  { id: 'm13', title: '👁️ Sharp Reader', description: 'Complete 20 Word Read challenges', target: 20, current: 0, completed: false, reward: 115, type: 'SCORE' },
  { id: 'm14', title: '🎯 Precision Pro', description: 'Achieve 90% accuracy in any game', target: 90, current: 0, completed: false, reward: 250, type: 'ACCURACY' },
  { id: 'm15', title: '🏆 Champion', description: 'Win 10 total games', target: 10, current: 0, completed: false, reward: 300, type: 'SCORE' },
  
  // Africa & Culture Missions
  { id: 'm16', title: '🌍 Africa Explorer', description: 'Complete 50 Africa Trivia questions', target: 50, current: 0, completed: false, reward: 300, type: 'SCORE' },
  { id: 'm17', title: '🗺️ Tanzania Traveler', description: 'Discover 50 Tanzania Places', target: 50, current: 0, completed: false, reward: 300, type: 'SCORE' },
  { id: 'm18', title: '🎭 Culture Vulture', description: 'Learn 50 East Africa Culture facts', target: 50, current: 0, completed: false, reward: 300, type: 'SCORE' },
  { id: 'm19', title: '📚 Swahili Scholar', description: 'Master 50 Swahili words', target: 50, current: 0, completed: false, reward: 300, type: 'SCORE' },
  { id: 'm20', title: '🦁 Safari Expert', description: 'Answer 50 Wildlife Safari questions', target: 50, current: 0, completed: false, reward: 300, type: 'SCORE' },
  
  // Challenge Missions
  { id: 'm21', title: '🎖️ Hardcore', description: 'Complete 20 questions on HARD difficulty', target: 20, current: 0, completed: false, reward: 350, type: 'CHALLENGE', difficulty: 'HARD' },
  { id: 'm22', title: '⏱️ Time Trial', description: 'Answer 15 questions in under 5 seconds each', target: 15, current: 0, completed: false, reward: 280, type: 'TIME' },
  { id: 'm23', title: '🎰 Lucky Day', description: 'Use 10 boosters in a single game', target: 10, current: 0, completed: false, reward: 200, type: 'COLLECT' },
  { id: 'm24', title: '👑 Team Captain', description: 'Lead your team to victory 5 times', target: 5, current: 0, completed: false, reward: 400, type: 'SCORE' },
  { id: 'm25', title: '🌟 Superstar', description: 'Score over 500 points in one game', target: 500, current: 0, completed: false, reward: 350, type: 'SCORE' },

  // Couple Games Missions
  { id: 'm26', title: '💕 Love Expert', description: 'Win 10 Couple Quiz games', target: 10, current: 0, completed: false, reward: 150, type: 'SCORE' },
  { id: 'm27', title: '❤️ Romantic Team', description: 'Complete 5 Love Trivia rounds', target: 5, current: 0, completed: false, reward: 120, type: 'SCORE' },
  { id: 'm28', title: '💑 Couple Power', description: 'Win 3 Couple Challenge rounds', target: 3, current: 0, completed: false, reward: 180, type: 'SCORE' },

  // Challenge Missions
  { id: 'm29', title: '⚡ Speed Demon', description: 'Win 5 Speed Challenge rounds', target: 5, current: 0, completed: false, reward: 200, type: 'SCORE' },
  { id: 'm30', title: '🔥 Never Give Up', description: 'Survive 10 rounds in Endurance Challenge', target: 10, current: 0, completed: false, reward: 220, type: 'SCORE' },
  { id: 'm31', title: '🎯 Sharp Shooter', description: 'Achieve 95% accuracy in Precision Challenge', target: 95, current: 0, completed: false, reward: 250, type: 'ACCURACY' },
  { id: 'm32', title: '⚔️ Duel Master', description: 'Win 5 Duel Challenges', target: 5, current: 0, completed: false, reward: 280, type: 'SCORE' },
  { id: 'm33', title: '🛡️ Last Stand', description: 'Win Survival Challenge 3 times', target: 3, current: 0, completed: false, reward: 300, type: 'SCORE' },

  // Flipcard Missions
  { id: 'm34', title: '🃏 Memory King', description: 'Complete 20 Flipcard Match games', target: 20, current: 0, completed: false, reward: 160, type: 'SCORE' },
  { id: 'm35', title: '🏎️ Fast Flip', description: 'Win 10 Flipcard Race rounds', target: 10, current: 0, completed: false, reward: 180, type: 'SCORE' },
  { id: 'm36', title: '😄 Emotion Reader', description: 'Complete 15 Emotion Flipcard games', target: 15, current: 0, completed: false, reward: 140, type: 'SCORE' },
  { id: 'm37', title: '🌍 Culture Match', description: 'Complete 12 Culture Flipcard games', target: 12, current: 0, completed: false, reward: 170, type: 'SCORE' },
];

// ============================================
// DAILY MISSIONS - Rotating daily challenges
// ============================================

export const DAILY_MISSIONS: Mission[] = [
  { id: 'd1', title: '📅 Daily Trivia', description: 'Complete 10 trivia questions today', target: 10, current: 0, completed: false, reward: 50, type: 'DAILY', expiresAt: new Date(new Date().setHours(23, 59, 59, 999)) },
  { id: 'd2', title: '⚡ Quick Fire', description: 'Answer 5 rapid fire questions correctly', target: 5, current: 0, completed: false, reward: 40, type: 'DAILY', expiresAt: new Date(new Date().setHours(23, 59, 59, 999)) },
  { id: 'd3', title: '🎯 Accuracy Check', description: 'Achieve 80% accuracy in any game', target: 80, current: 0, completed: false, reward: 60, type: 'DAILY', expiresAt: new Date(new Date().setHours(23, 59, 59, 999)) },
  { id: 'd4', title: '🔥 On Fire', description: 'Get a streak of 3 or more', target: 3, current: 0, completed: false, reward: 45, type: 'DAILY', expiresAt: new Date(new Date().setHours(23, 59, 59, 999)) },
  { id: 'd5', title: '🌍 Culture Day', description: 'Complete 3 Africa trivia questions', target: 3, current: 0, completed: false, reward: 55, type: 'DAILY', expiresAt: new Date(new Date().setHours(23, 59, 59, 999)) },
];

// ============================================
// WEEKLY MISSIONS - Longer term goals
// ============================================

export const WEEKLY_MISSIONS: Mission[] = [
  { id: 'w1', title: '📖 Week Warrior', description: 'Complete 100 questions this week', target: 100, current: 0, completed: false, reward: 500, type: 'WEEKLY' },
  { id: 'w2', title: '🏅 Weekly Champion', description: 'Win 5 games this week', target: 5, current: 0, completed: false, reward: 600, type: 'WEEKLY' },
  { id: 'w3', title: '🎯 Sharp Shooter', description: 'Maintain 85% accuracy all week', target: 85, current: 0, completed: false, reward: 550, type: 'WEEKLY' },
  { id: 'w4', title: '🌟 XP Hunter', description: 'Earn 1000 XP this week', target: 1000, current: 0, completed: false, reward: 700, type: 'WEEKLY' },
];

// ============================================
// VIBE BOOSTERS - Power-ups for games
// ============================================

export const VIBE_BOOSTERS: VibeBooster[] = [
  // Score Boosters
  { id: 'turbo', name: 'Turbo Mode', description: 'Timer runs 2x faster, but points are doubled!', multiplier: 2, icon: '🚀', type: 'SCORE', duration: 30 },
  { id: 'jackpot', name: 'Jackpot', description: 'Random rounds give 5x points!', multiplier: 5, icon: '💰', type: 'MULTIPLIER' },
  { id: 'double', name: 'Double Up', description: 'Next answer counts for 2x points', multiplier: 2, icon: '⚡', type: 'SCORE' },
  { id: 'triple', name: 'Triple Threat', description: 'Next answer counts for 3x points', multiplier: 3, icon: '🎯', type: 'SCORE' },
  
  // Time Boosters
  { id: 'zen', name: 'Zen Garden', description: 'No timer, but points are halved.', multiplier: 0.5, icon: '🧘', type: 'TIME', duration: 60 },
  { id: 'reverse', name: 'Time Warp', description: 'Get extra 30 seconds on timer', multiplier: 1, icon: '⏪', type: 'TIME' },
  { id: 'freeze', name: 'Freeze Time', description: 'Pause the timer for 10 seconds', multiplier: 1, icon: '❄️', type: 'TIME', duration: 10 },
  
  // Special Boosters
  { id: 'shield', name: 'Shield', description: 'Immunity to one wrong answer', multiplier: 1, icon: '🛡️', type: 'SHIELD' },
  { id: 'lucky', name: 'Lucky Charm', description: 'Next 3 answers are automatically correct!', multiplier: 3, icon: '🍀', type: 'REVEAL' },
  { id: 'steal', name: 'Steal Power', description: 'Steal 10 points from opponents in team mode', multiplier: 1, icon: '🦝', type: 'STEAL' },
  { id: 'swap', name: 'Answer Swap', description: 'Swap your answer with another option', multiplier: 1, icon: '🔄', type: 'SWAP' },
  { id: 'chaos', name: 'Chaos Theory', description: 'Points are randomized between 1-50.', multiplier: 1, icon: '🌀', type: 'MULTIPLIER' },
  
  // Streak Boosters
  { id: 'fire', name: 'On Fire', description: 'Streak bonus increased by 50%', multiplier: 1.5, icon: '🔥', type: 'STREAK', duration: 60 },
  { id: 'phoenix', name: 'Phoenix Rise', description: 'Revive your streak after a wrong answer', multiplier: 1, icon: '🦅', type: 'STREAK' },
];

// ============================================
// ACHIEVEMENTS - Unlockable accomplishments
// ============================================

export const ACHIEVEMENTS: Achievement[] = [
  // Beginner Achievements
  { id: 'a1', title: 'First Steps', description: 'Complete your first game', icon: '🎮', requirement: 1, xp: 50, rarity: 'COMMON', category: 'beginner' },
  { id: 'a2', title: 'Getting Started', description: 'Answer 10 questions correctly', icon: '📝', requirement: 10, xp: 75, rarity: 'COMMON', category: 'beginner' },
  { id: 'a3', title: 'Warming Up', description: 'Complete 5 games', icon: '🔥', requirement: 5, xp: 100, rarity: 'COMMON', category: 'beginner' },
  
  // Streak Achievements
  { id: 'a4', title: 'Hot Streak', description: 'Get a streak of 3', icon: '💫', requirement: 3, xp: 100, rarity: 'UNCOMMON', category: 'streak' },
  { id: 'a5', title: 'On Fire!', description: 'Get a streak of 5', icon: '🔥', requirement: 5, xp: 150, rarity: 'UNCOMMON', category: 'streak' },
  { id: 'a6', title: 'Unstoppable', description: 'Get a streak of 10', icon: '⚡', requirement: 10, xp: 300, rarity: 'RARE', category: 'streak' },
  { id: 'a7', title: 'Legendary', description: 'Get a streak of 20', icon: '👑', requirement: 20, xp: 500, rarity: 'EPIC', category: 'streak' },
  
  // Score Achievements
  { id: 'a8', title: 'Century Club', description: 'Score 100 points in one game', icon: '💯', requirement: 100, xp: 150, rarity: 'UNCOMMON', category: 'score' },
  { id: 'a9', title: 'High Scorer', description: 'Score 250 points in one game', icon: '🏆', requirement: 250, xp: 250, rarity: 'RARE', category: 'score' },
  { id: 'a10', title: 'Record Breaker', description: 'Score 500 points in one game', icon: '📊', requirement: 500, xp: 400, rarity: 'EPIC', category: 'score' },
  { id: 'a11', title: 'Master Scorer', description: 'Score 1000 points in one game', icon: '⭐', requirement: 1000, xp: 750, rarity: 'LEGENDARY', category: 'score' },
  
  // Accuracy Achievements
  { id: 'a12', title: 'Sharp Mind', description: 'Achieve 90% accuracy', icon: '🎯', requirement: 90, xp: 200, rarity: 'RARE', category: 'accuracy' },
  { id: 'a13', title: 'Perfectionist', description: 'Achieve 100% accuracy in a game', icon: '💎', requirement: 100, xp: 350, rarity: 'EPIC', category: 'accuracy' },
  
  // Game-Specific Achievements
  { id: 'a14', title: 'Trivia Expert', description: 'Answer 100 trivia questions', icon: '🧠', requirement: 100, xp: 300, rarity: 'RARE', category: 'game' },
  { id: 'a15', title: 'Emoji Master', description: 'Solve 50 emoji puzzles', icon: '🎨', requirement: 50, xp: 250, rarity: 'RARE', category: 'game' },
  { id: 'a16', title: 'Word Wizard', description: 'Complete 50 word challenges', icon: '✍️', requirement: 50, xp: 250, rarity: 'RARE', category: 'game' },
  { id: 'a17', title: 'Speed Demon', description: 'Answer 50 rapid fire questions', icon: '⚡', requirement: 50, xp: 250, rarity: 'RARE', category: 'game' },
  
  // Africa & Culture Achievements
  { id: 'a18', title: 'Africa Expert', description: 'Complete 100 Africa trivia', icon: '🌍', requirement: 100, xp: 400, rarity: 'EPIC', category: 'culture' },
  { id: 'a19', title: 'Swahili Speaker', description: 'Learn 100 Swahili words', icon: '📚', requirement: 100, xp: 400, rarity: 'EPIC', category: 'culture' },
  { id: 'a20', title: 'Safari Guide', description: 'Complete 100 wildlife questions', icon: '🦁', requirement: 100, xp: 400, rarity: 'EPIC', category: 'culture' },
  
  // Challenge Achievements
  { id: 'a21', title: 'Hardcore', description: 'Complete 50 questions on HARD', icon: '💪', requirement: 50, xp: 500, rarity: 'EPIC', category: 'challenge' },
  { id: 'a22', title: 'Boss Slayer', description: 'Defeat 5 bosses', icon: '⚔️', requirement: 5, xp: 600, rarity: 'EPIC', category: 'challenge' },
  { id: 'a23', title: 'Champion', description: 'Win 10 games', icon: '🏅', requirement: 10, xp: 350, rarity: 'RARE', category: 'challenge' },
  { id: 'a24', title: 'Legend', description: 'Win 50 games', icon: '🏆', requirement: 50, xp: 750, rarity: 'LEGENDARY', category: 'challenge' },
  
  // Special Achievements
  { id: 'a25', title: 'Night Owl', description: 'Play 10 games at night', icon: '🦉', requirement: 10, xp: 200, rarity: 'UNCOMMON', category: 'special' },
  { id: 'a26', title: 'Early Bird', description: 'Play 10 games in the morning', icon: '🌅', requirement: 10, xp: 200, rarity: 'UNCOMMON', category: 'special' },
  { id: 'a27', title: 'Team Player', description: 'Play 20 team games', icon: '👥', requirement: 20, xp: 300, rarity: 'RARE', category: 'special' },
  { id: 'a28', title: 'Solo Master', description: 'Play 30 solo games', icon: '🎯', requirement: 30, xp: 300, rarity: 'RARE', category: 'special' },
];

// ============================================
// DAILY CHALLENGES - Dynamic daily events
// ============================================

export const DAILY_CHALLENGES: string[] = [
  "Double points for every correct Trivia answer! 📚",
  "Tug of War: Winner gets 500 bonus XP! 💪",
  "Emoji Guessing: No hints allowed - pure brain power! 🎨",
  "Speed Round: All timers reduced by 50%! ⚡",
  "Team Swap: New random team assignments! 🔄",
  "Golden Round: One random question is worth 100x! 🌟",
  "Streak Bonus: Consecutive correct answers = bonus! 🔥",
  "Freeze Time: 10 second bonus for first correct answer! ❄️",
  "Word Master: 2x points on all word games! 📝",
  "Brain Boost: Brain teasers worth triple points! 🧠",
  "Team Unity: Team games award 50% more! 👥",
  "Lucky Star: Random questions have hidden bonuses! 🍀",
  "Perfect Round: All correct = 10x multiplier! 🎯",
  "Reverse Mode: Wrong answers count as bonus! ⏪",
  "Friend Referral: Invite a friend for 200 XP! 🎁",
  "Jackpot Friday: 5x points all day! 🎰",
  "Super Sunday: Double XP on all games! 🌟",
  "Midweek Madness: 3x points on Wednesday! 🎉",
  "Trivia Tuesday: Special trivia questions! 📚",
  "Memory Monday: Memory games are 2x! 🧠",
];

// ============================================
// LIVE TICKER EVENTS - Social feed
// ============================================

export const LIVE_TICKER_EVENTS: string[] = [
  "🔥 Team Alpha just crushed the high score!",
  "⭐ New Daily Challenge unlocked!",
  "🏆 Player 'Alex' reached Level 10!",
  "🎉 VibeTeam v2.0: New games added!",
  "💎 Global record: 5,000 points!",
  "👑 'Team Beta' won 5 games in a row!",
  "🚀 New player 'Sam' just joined!",
  "🎯 'Chris' completed all missions!",
  "🌟 'Jordan' unlocked the Legend achievement!",
  "🦁 Safari Expert: 'Taylor' completed 100 wildlife questions!",
  "📚 Swahili Scholar: 'Morgan' learned 50 new words!",
  "🏅 'Casey' just defeated the first boss!",
  "⚡ 'Riley' achieved a 20-streak!",
  "💯 'Quinn' scored 1000 points in one game!",
  "🎮 'Avery' played their 100th game!",
];

// ============================================
// STORY CHAPTERS - Adventure mode (All Unlocked)
// ============================================

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'ch1',
    title: '🌍 Journey to Africa',
    description: 'Begin your adventure learning about the amazing continent of Africa!',
    missions: ['m16', 'm17', 'm18', 'm19', 'm20'],
    unlockRequirement: 'Complete 1 game',
    isUnlocked: true,
    isCompleted: false,
    rewards: { xp: 500, coins: 100, badges: ['africa_explorer'] }
  },
  {
    id: 'ch2',
    title: '🦁 Safari Adventures',
    description: 'Explore the wild world of African wildlife and safaris!',
    missions: ['m20', 'm21'],
    unlockRequirement: 'Complete Chapter 1',
    isUnlocked: true,
    isCompleted: false,
    rewards: { xp: 750, coins: 150, badges: ['safari_guide'] }
  },
  {
    id: 'ch3',
    title: '📚 Swahili Secrets',
    description: 'Master the beautiful Swahili language!',
    missions: ['m19'],
    unlockRequirement: 'Complete Chapter 1',
    isUnlocked: true,
    isCompleted: false,
    rewards: { xp: 600, coins: 120, badges: ['swahili_speaker'] }
  },
  {
    id: 'ch4',
    title: '🏆 Champion\'s Path',
    description: 'Prove yourself as a true VibeTeam champion!',
    missions: ['m15', 'm22', 'm23', 'm24', 'm25'],
    unlockRequirement: 'Complete Chapter 1',
    isUnlocked: true,
    isCompleted: false,
    rewards: { xp: 1000, coins: 250, badges: ['champion'] }
  },
  {
    id: 'ch5',
    title: '🧠 Brain Teaser Island',
    description: 'Journey to mysterious island full of riddles!',
    missions: ['m6', 'm7'],
    unlockRequirement: 'Complete Chapter 2',
    isUnlocked: true,
    isCompleted: false,
    rewards: { xp: 800, coins: 180, badges: ['riddle_master'] }
  },
  {
    id: 'ch6',
    title: '🎯 Speed Challenge Zone',
    description: 'Test your reflexes in the speed challenge!',
    missions: ['m2', 'm3'],
    unlockRequirement: 'Complete Chapter 3',
    isUnlocked: true,
    isCompleted: false,
    rewards: { xp: 700, coins: 160, badges: ['speed_demon'] }
  },
  {
    id: 'ch7',
    title: '🌟 Word Wizard Tower',
    description: 'Climb the tower of word mastery!',
    missions: ['m5', 'm11', 'm12'],
    unlockRequirement: 'Complete Chapter 4',
    isUnlocked: true,
    isCompleted: false,
    rewards: { xp: 900, coins: 200, badges: ['word_wizard'] }
  },
  {
    id: 'ch8',
    title: '🎮 Emoji Master Class',
    description: 'Become the ultimate emoji puzzle solver!',
    missions: ['m4'],
    unlockRequirement: 'Complete Chapter 5',
    isUnlocked: true,
    isCompleted: false,
    rewards: { xp: 650, coins: 140, badges: ['emoji_expert'] }
  },
  {
    id: 'ch9',
    title: '⚔️ Battle of Minds',
    description: 'Face off against the greatest minds!',
    missions: ['m10', 'm14'],
    unlockRequirement: 'Complete Chapter 6',
    isUnlocked: true,
    isCompleted: false,
    rewards: { xp: 1100, coins: 300, badges: ['mind_warrior'] }
  },
  {
    id: 'ch10',
    title: '👑 Ultimate Champion',
    description: 'Become the ultimate VibeTeam champion!',
    missions: ['m15', 'm25'],
    unlockRequirement: 'Complete all chapters',
    isUnlocked: true,
    isCompleted: false,
    rewards: { xp: 2000, coins: 500, badges: ['ultimate_champion'] }
  },
];

// ============================================
// BOSS BATTLES - Challenge encounters (All Unlocked)
// ============================================

export const BOSS_BATTLES: BossBattle[] = [
  {
    id: 'boss1',
    name: '🧠 The Quiz Master',
    description: 'A formidable opponent who knows all the answers!',
    avatar: '🎭',
    difficulty: 'EASY',
    questions: [],
    timeLimit: 120,
    rewards: { xp: 300, coins: 100, badges: ['quiz_master'] },
    isDefeated: false
  },
  {
    id: 'boss2',
    name: '🦁 The Safari King',
    description: 'The king of the jungle challenges your wildlife knowledge!',
    avatar: '🦁',
    difficulty: 'EASY',
    questions: [],
    timeLimit: 100,
    rewards: { xp: 350, coins: 120, badges: ['safari_king'] },
    isDefeated: false
  },
  {
    id: 'boss3',
    name: '📚 The Swahili Sage',
    description: 'An ancient sage testing your language skills!',
    avatar: '👴',
    difficulty: 'MEDIUM',
    questions: [],
    timeLimit: 90,
    rewards: { xp: 450, coins: 150, badges: ['swahili_master'] },
    isDefeated: false
  },
  {
    id: 'boss4',
    name: '🧩 The Riddle Master',
    description: 'A master of puzzles and brain teasers!',
    avatar: '🎯',
    difficulty: 'MEDIUM',
    questions: [],
    timeLimit: 80,
    rewards: { xp: 500, coins: 180, badges: ['riddle_king'] },
    isDefeated: false
  },
  {
    id: 'boss5',
    name: '⚡ The Speed Demon',
    description: 'Answer fast or be defeated!',
    avatar: '⚡',
    difficulty: 'HARD',
    questions: [],
    timeLimit: 60,
    rewards: { xp: 600, coins: 200, badges: ['speed_demon_boss'] },
    isDefeated: false
  },
  {
    id: 'boss6',
    name: '🌍 The Africa Expert',
    description: 'A scholar with deep knowledge of the continent!',
    avatar: '🌍',
    difficulty: 'MEDIUM',
    questions: [],
    timeLimit: 90,
    rewards: { xp: 550, coins: 190, badges: ['africa_scholar'] },
    isDefeated: false
  },
  {
    id: 'boss7',
    name: '🎨 The Emoji Master',
    description: 'Decode the symbols or be lost forever!',
    avatar: '🎨',
    difficulty: 'EASY',
    questions: [],
    timeLimit: 110,
    rewards: { xp: 400, coins: 140, badges: ['emoji_master'] },
    isDefeated: false
  },
  {
    id: 'boss8',
    name: '🔤 The Word Wizard',
    description: 'A master of words and vocabulary!',
    avatar: '📖',
    difficulty: 'MEDIUM',
    questions: [],
    timeLimit: 85,
    rewards: { xp: 520, coins: 175, badges: ['word_wizard_boss'] },
    isDefeated: false
  },
  {
    id: 'boss9',
    name: '🏆 The Ultimate Champion',
    description: 'The final challenge for true champions!',
    avatar: '👑',
    difficulty: 'HARD',
    questions: [],
    timeLimit: 50,
    rewards: { xp: 1000, coins: 400, badges: ['ultimate_champion_boss'] },
    isDefeated: false
  },
  {
    id: 'boss10',
    name: '🌀 The Chaos Lord',
    description: 'Random questions from all categories!',
    avatar: '🌀',
    difficulty: 'HARD',
    questions: [],
    timeLimit: 45,
    rewards: { xp: 800, coins: 300, badges: ['chaos_lord'] },
    isDefeated: false
  },
];

// ============================================
// SEASONAL EVENTS - Time-limited content
// ============================================

export const SEASONAL_EVENTS: SeasonEvent[] = [
  {
    id: 'season1',
    title: '🎄 Holiday Festival',
    description: 'Celebrate the holidays with special festive challenges!',
    startDate: new Date('2024-12-01'),
    endDate: new Date('2024-12-31'),
    status: 'ENDED',
    theme: 'holiday',
    specialMissions: [],
    exclusiveRewards: { xp: 500, coins: 200, badges: ['holiday_champion'] },
    leaderboard: []
  },
  {
    id: 'season2',
    title: '🌍 Africa Month',
    description: 'Celebrate African culture and heritage!',
    startDate: new Date('2025-05-01'),
    endDate: new Date('2025-05-31'),
    status: 'ACTIVE',
    theme: 'africa',
    specialMissions: [
      { id: 'sm1', title: '🇹🇿 Tanzania Day', description: 'Complete Tanzania trivia', target: 20, current: 0, completed: false, reward: 100, type: 'SEASONAL' },
      { id: 'sm2', title: '🦁 Wildlife Week', description: 'Complete wildlife questions', target: 30, current: 0, completed: false, reward: 150, type: 'SEASONAL' },
    ],
    exclusiveRewards: { xp: 750, coins: 300, badges: ['africa_champion'] },
    leaderboard: []
  },
  {
    id: 'season3',
    title: '☀️ Summer Games',
    description: 'Hot summer challenges for cool prizes!',
    startDate: new Date('2025-06-01'),
    endDate: new Date('2025-08-31'),
    status: 'UPCOMING',
    theme: 'summer',
    specialMissions: [],
    exclusiveRewards: { xp: 600, coins: 250, badges: ['summer_champion'] },
    leaderboard: []
  },
];

// ============================================
// TOURNAMENTS - Competitive events
// ============================================

export const TOURNAMENTS: Tournament[] = [
  {
    id: 't1',
    name: '🧠 Weekly Trivia Championship',
    description: 'Test your knowledge in our weekly trivia tournament!',
    startDate: new Date('2025-01-06'),
    endDate: new Date('2025-01-12'),
    entryFee: 50,
    prizePool: 500,
    maxParticipants: 100,
    currentParticipants: 45,
    status: 'REGISTRATION',
    games: ['trivia', 'brain-teasers'],
    rewards: { xp: 300, coins: 150, badges: ['weekly_champion'] }
  },
  {
    id: 't2',
    name: '🌍 Africa Special Tournament',
    description: 'Show off your Africa knowledge!',
    startDate: new Date('2025-01-20'),
    endDate: new Date('2025-01-26'),
    entryFee: 100,
    prizePool: 1000,
    maxParticipants: 50,
    currentParticipants: 28,
    status: 'REGISTRATION',
    games: ['africa-trivia', 'tanzania-places', 'east-africa-culture'],
    rewards: { xp: 500, coins: 300, badges: ['africa_master'] }
  },
  {
    id: 't3',
    name: '⚡ Speed Challenge',
    description: 'Fastest fingers win!',
    startDate: new Date('2025-02-01'),
    endDate: new Date('2025-02-07'),
    entryFee: 75,
    prizePool: 750,
    maxParticipants: 75,
    currentParticipants: 0,
    status: 'REGISTRATION',
    games: ['rapid-fire', 'memory-match'],
    rewards: { xp: 400, coins: 200, badges: ['speed_champion'] }
  },
  {
    id: 't4',
    name: '🦁 Safari Championship',
    description: 'Test your wildlife knowledge!',
    startDate: new Date('2025-02-15'),
    endDate: new Date('2025-02-21'),
    entryFee: 80,
    prizePool: 800,
    maxParticipants: 60,
    currentParticipants: 15,
    status: 'REGISTRATION',
    games: ['wildlife-safari', 'africa-trivia'],
    rewards: { xp: 450, coins: 220, badges: ['safari_champion'] }
  },
  {
    id: 't5',
    name: '📚 Swahili Sprint',
    description: 'Master the language of East Africa!',
    startDate: new Date('2025-03-01'),
    endDate: new Date('2025-03-07'),
    entryFee: 60,
    prizePool: 600,
    maxParticipants: 80,
    currentParticipants: 20,
    status: 'REGISTRATION',
    games: ['swahili-words', 'east-africa-culture'],
    rewards: { xp: 380, coins: 180, badges: ['swahili_master'] }
  },
  {
    id: 't6',
    name: '🎯 Precision Tournament',
    description: 'Accuracy matters more than speed!',
    startDate: new Date('2025-03-15'),
    endDate: new Date('2025-03-21'),
    entryFee: 90,
    prizePool: 900,
    maxParticipants: 50,
    currentParticipants: 10,
    status: 'REGISTRATION',
    games: ['trivia', 'emoji-guess'],
    rewards: { xp: 480, coins: 240, badges: ['precision_master'] }
  },
  {
    id: 't7',
    name: '🧩 Brain Battle',
    description: 'Solve riddles against the best!',
    startDate: new Date('2025-04-01'),
    endDate: new Date('2025-04-07'),
    entryFee: 70,
    prizePool: 700,
    maxParticipants: 70,
    currentParticipants: 5,
    status: 'REGISTRATION',
    games: ['brain-teasers', 'would-you-rather'],
    rewards: { xp: 420, coins: 210, badges: ['brain_battle_master'] }
  },
  {
    id: 't8',
    name: '🏆 Ultimate Championship',
    description: 'The ultimate test of all skills!',
    startDate: new Date('2025-04-15'),
    endDate: new Date('2025-04-30'),
    entryFee: 200,
    prizePool: 5000,
    maxParticipants: 30,
    currentParticipants: 8,
    status: 'REGISTRATION',
    games: ['trivia', 'brain-teasers', 'rapid-fire', 'memory-match', 'number-crunch'],
    rewards: { xp: 1000, coins: 500, badges: ['ultimate_master'] }
  },
  {
    id: 't9',
    name: '🌟 Word Wizard Cup',
    description: 'For lovers of language!',
    startDate: new Date('2025-05-01'),
    endDate: new Date('2025-05-07'),
    entryFee: 55,
    prizePool: 550,
    maxParticipants: 90,
    currentParticipants: 12,
    status: 'REGISTRATION',
    games: ['word-relay', 'word-scramble'],
    rewards: { xp: 350, coins: 175, badges: ['word_wizard_cup'] }
  },
  {
    id: 't10',
    name: '🎮 Memory Masters',
    description: 'Who has the best memory?',
    startDate: new Date('2025-05-15'),
    endDate: new Date('2025-05-21'),
    entryFee: 65,
    prizePool: 650,
    maxParticipants: 85,
    currentParticipants: 18,
    status: 'REGISTRATION',
    games: ['memory-match', 'emoji-guess'],
    rewards: { xp: 390, coins: 195, badges: ['memory_master'] }
  },
];

// ============================================
// GAME DEFINITIONS - Enhanced game catalog
// ============================================

export const GAMES: Game[] = [
  // Core Trivia Games
  { 
    id: 'trivia', 
    title: 'Trivia', 
    description: 'Test your knowledge across various categories - from science to history!', 
    icon: 'Brain', 
    mode: 'TEAM' as GameMode,
    category: 'TRIVIA' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 1,
    maxPlayers: 8,
    duration: 600,
    difficulty: 'MEDIUM' as Difficulty,
    rewards: { xp: 50, coins: 20 }
  },
  { 
    id: 'emoji-guess', 
    title: 'Emoji Guess', 
    description: 'Decode the emojis to find the answer - can you read the symbols?', 
    icon: 'Image', 
    mode: 'INDIVIDUAL' as GameMode,
    category: 'WORD' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 1,
    maxPlayers: 1,
    duration: 300,
    difficulty: 'EASY' as Difficulty,
    rewards: { xp: 40, coins: 15 }
  },
  { 
    id: 'would-you-rather', 
    title: 'Would You Rather', 
    description: 'Make tough choices with your team - debate and decide!', 
    icon: 'MessageSquare', 
    mode: 'TEAM' as GameMode,
    category: 'STRATEGY' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 2,
    maxPlayers: 8,
    duration: 480,
    difficulty: 'EASY' as Difficulty,
    rewards: { xp: 45, coins: 18 }
  },
  { 
    id: 'brain-teasers', 
    title: 'Brain Teasers', 
    description: 'Solve riddles and trick questions that will twist your mind!', 
    icon: 'Sparkles', 
    mode: 'INDIVIDUAL' as GameMode,
    category: 'TRIVIA' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 1,
    maxPlayers: 1,
    duration: 420,
    difficulty: 'MEDIUM' as Difficulty,
    rewards: { xp: 60, coins: 25 }
  },
  { 
    id: 'rapid-fire', 
    title: 'Rapid Fire', 
    description: 'Answer as many questions as you can in 60 seconds - stay sharp!', 
    icon: 'Zap', 
    mode: 'INDIVIDUAL' as GameMode,
    category: 'ACTION' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 1,
    maxPlayers: 1,
    duration: 60,
    difficulty: 'MEDIUM' as Difficulty,
    rewards: { xp: 55, coins: 22 }
  },
  { 
    id: 'word-relay', 
    title: 'Word Relay', 
    description: 'Build chains of related words - think fast and link ideas!', 
    icon: 'PenTool', 
    mode: 'TEAM' as GameMode,
    category: 'WORD' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 2,
    maxPlayers: 6,
    duration: 360,
    difficulty: 'MEDIUM' as Difficulty,
    rewards: { xp: 50, coins: 20 }
  },
  { 
    id: 'tug-of-war', 
    title: 'Tug of War', 
    description: 'Pull to your side - fastest answers win the tug of war!', 
    icon: 'Users', 
    mode: 'TEAM' as GameMode,
    category: 'ACTION' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 2,
    maxPlayers: 8,
    duration: 300,
    difficulty: 'EASY' as Difficulty,
    rewards: { xp: 45, coins: 18 }
  },
  { 
    id: 'number-crunch', 
    title: 'Number Crunch', 
    description: 'Math challenges for number wizards - calculate your way to victory!', 
    icon: 'Hash', 
    mode: 'INDIVIDUAL' as GameMode,
    category: 'STRATEGY' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 1,
    maxPlayers: 1,
    duration: 240,
    difficulty: 'MEDIUM' as Difficulty,
    rewards: { xp: 50, coins: 20 }
  },
  { 
    id: 'memory-match', 
    title: 'Memory Match', 
    description: 'Match pairs of cards - test your memory and find all pairs!', 
    icon: 'Grid', 
    mode: 'INDIVIDUAL' as GameMode,
    category: 'MEMORY' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 1,
    maxPlayers: 1,
    duration: 180,
    difficulty: 'EASY' as Difficulty,
    rewards: { xp: 40, coins: 15 }
  },
  { 
    id: 'word-scramble', 
    title: 'Word Scramble', 
    description: 'Unscramble the letters to find the hidden word!', 
    icon: 'Type', 
    mode: 'INDIVIDUAL' as GameMode,
    category: 'WORD' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 1,
    maxPlayers: 1,
    duration: 300,
    difficulty: 'EASY' as Difficulty,
    rewards: { xp: 45, coins: 18 }
  },
  { 
    id: 'word-difference', 
    title: 'Word Difference', 
    description: 'Find the one difference between two similar words!', 
    icon: 'Search', 
    mode: 'INDIVIDUAL' as GameMode,
    category: 'WORD' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 1,
    maxPlayers: 1,
    duration: 240,
    difficulty: 'MEDIUM' as Difficulty,
    rewards: { xp: 50, coins: 20 }
  },
  { 
    id: 'word-read', 
    title: 'Word Read', 
    description: 'Read quickly and identify the correct word from similar options!', 
    icon: 'Eye', 
    mode: 'INDIVIDUAL' as GameMode,
    category: 'MEMORY' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 1,
    maxPlayers: 1,
    duration: 180,
    difficulty: 'EASY' as Difficulty,
    rewards: { xp: 40, coins: 15 }
  },
  
  // Africa & Culture Games (All Unlocked)
  { 
    id: 'africa-trivia', 
    title: 'Africa Trivia', 
    description: 'Test your knowledge of Africa, East Africa & Tanzania!', 
    icon: 'Globe', 
    mode: 'INDIVIDUAL' as GameMode,
    category: 'TRIVIA' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 1,
    maxPlayers: 1,
    duration: 600,
    difficulty: 'MEDIUM' as Difficulty,
    rewards: { xp: 75, coins: 30 }
  },
  { 
    id: 'tanzania-places', 
    title: 'Tanzania Places', 
    description: 'Discover famous places in Tanzania - from Kilimanjaro to Zanzibar!', 
    icon: 'MapPin', 
    mode: 'INDIVIDUAL' as GameMode,
    category: 'TRIVIA' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 1,
    maxPlayers: 1,
    duration: 480,
    difficulty: 'MEDIUM' as Difficulty,
    rewards: { xp: 70, coins: 28 }
  },
  { 
    id: 'east-africa-culture', 
    title: 'East Africa Culture', 
    description: 'Learn about East African traditions, food, music & culture!', 
    icon: 'Music', 
    mode: 'INDIVIDUAL' as GameMode,
    category: 'TRIVIA' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 1,
    maxPlayers: 1,
    duration: 540,
    difficulty: 'MEDIUM' as Difficulty,
    rewards: { xp: 65, coins: 26 }
  },
  { 
    id: 'swahili-words', 
    title: 'Swahili Words', 
    description: 'Learn common Swahili words & their meanings!', 
    icon: 'BookOpen', 
    mode: 'INDIVIDUAL' as GameMode,
    category: 'WORD' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 1,
    maxPlayers: 1,
    duration: 420,
    difficulty: 'EASY' as Difficulty,
    rewards: { xp: 55, coins: 22 }
  },
  { 
    id: 'wildlife-safari', 
    title: 'Wildlife Safari', 
    description: 'Explore African wildlife - lions, elephants, and more!', 
    icon: 'Palmtree', 
    mode: 'INDIVIDUAL' as GameMode,
    category: 'TRIVIA' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 1,
    maxPlayers: 1,
    duration: 540,
    difficulty: 'MEDIUM' as Difficulty,
    rewards: { xp: 70, coins: 28 }
  },
  
  // New Advanced Games (All Unlocked)
  { 
    id: 'boss-battle', 
    title: 'Boss Battle', 
    description: 'Face off against powerful bosses in ultimate challenges!', 
    icon: 'Sword', 
    mode: 'INDIVIDUAL' as GameMode,
    category: 'CHALLENGE' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 1,
    maxPlayers: 1,
    duration: 300,
    difficulty: 'HARD' as Difficulty,
    rewards: { xp: 200, coins: 100, badges: ['boss_slayer'] }
  },
  { 
    id: 'story-mode', 
    title: 'Story Adventure', 
    description: 'Embark on an epic adventure through chapters!', 
    icon: 'Book', 
    mode: 'INDIVIDUAL' as GameMode,
    category: 'STORY' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 1,
    maxPlayers: 1,
    duration: 1800,
    difficulty: 'MEDIUM' as Difficulty,
    rewards: { xp: 500, coins: 200, badges: ['adventurer'] }
  },
  { 
    id: 'tournament', 
    title: 'Tournament', 
    description: 'Compete in tournaments for glory and prizes!', 
    icon: 'Trophy', 
    mode: 'TEAM' as GameMode,
    category: 'COMPETITIVE' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 4,
    maxParticipants: 100,
    duration: 3600,
    difficulty: 'HARD' as Difficulty,
    rewards: { xp: 300, coins: 150, badges: ['tournament_champion'] }
  },

  // ============================================
  // COUPLE GAMES - Games for couples
  // ============================================
  { 
    id: 'couple-quiz', 
    title: 'Couple Quiz', 
    description: 'Test how well you know your partner - the ultimate relationship check!', 
    icon: 'Heart', 
    mode: 'INDIVIDUAL' as GameMode,
    category: 'COUPLE' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 2,
    maxPlayers: 2,
    duration: 300,
    difficulty: 'EASY' as Difficulty,
    rewards: { xp: 60, coins: 30 }
  },
  { 
    id: 'love-trivia', 
    title: 'Love Trivia', 
    description: 'Romantic trivia questions about love, relationships, and dating!', 
    icon: 'Heart', 
    mode: 'TEAM' as GameMode,
    category: 'COUPLE' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 2,
    maxPlayers: 4,
    duration: 420,
    difficulty: 'EASY' as Difficulty,
    rewards: { xp: 50, coins: 25 }
  },
  { 
    id: 'romantic-riddle', 
    title: 'Romantic Riddles', 
    description: 'Solve sweet riddles together - work as a team to find the answers!', 
    icon: 'Heart', 
    mode: 'TEAM' as GameMode,
    category: 'COUPLE' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 2,
    maxPlayers: 2,
    duration: 360,
    difficulty: 'MEDIUM' as Difficulty,
    rewards: { xp: 55, coins: 28 }
  },
  { 
    id: 'couple-challenge', 
    title: 'Couple Challenge', 
    description: 'Fun challenges and tasks for couples to complete together!', 
    icon: 'Heart', 
    mode: 'TEAM' as GameMode,
    category: 'COUPLE' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 2,
    maxPlayers: 2,
    duration: 600,
    difficulty: 'EASY' as Difficulty,
    rewards: { xp: 70, coins: 35 }
  },

  // ============================================
  // CHALLENGES - Competitive challenges
  // ============================================
  { 
    id: 'speed-challenge', 
    title: 'Speed Challenge', 
    description: 'Answer as fast as possible - speed is everything in this challenge!', 
    icon: 'Zap', 
    mode: 'INDIVIDUAL' as GameMode,
    category: 'CHALLENGE' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 1,
    maxPlayers: 1,
    duration: 60,
    difficulty: 'HARD' as Difficulty,
    rewards: { xp: 80, coins: 40 }
  },
  { 
    id: 'endurance-challenge', 
    title: 'Endurance Challenge', 
    description: 'Last as long as possible - answer correctly to stay in the game!', 
    icon: 'Flame', 
    mode: 'INDIVIDUAL' as GameMode,
    category: 'CHALLENGE' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 1,
    maxPlayers: 1,
    duration: 300,
    difficulty: 'HARD' as Difficulty,
    rewards: { xp: 90, coins: 45 }
  },
  { 
    id: 'precision-challenge', 
    title: 'Precision Challenge', 
    description: 'Accuracy over speed - answer perfectly to score high!', 
    icon: 'Target', 
    mode: 'INDIVIDUAL' as GameMode,
    category: 'CHALLENGE' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 1,
    maxPlayers: 1,
    duration: 180,
    difficulty: 'MEDIUM' as Difficulty,
    rewards: { xp: 70, coins: 35 }
  },
  { 
    id: 'duel-challenge', 
    title: 'Duel Challenge', 
    description: 'One-on-one battle against another player - only one winner!', 
    icon: 'Sword', 
    mode: 'TEAM' as GameMode,
    category: 'CHALLENGE' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 2,
    maxPlayers: 2,
    duration: 240,
    difficulty: 'HARD' as Difficulty,
    rewards: { xp: 100, coins: 50 }
  },
  { 
    id: 'survival-challenge', 
    title: 'Survival Challenge', 
    description: 'Keep answering correctly or get eliminated - last one standing wins!', 
    icon: 'Shield', 
    mode: 'TEAM' as GameMode,
    category: 'CHALLENGE' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 3,
    maxPlayers: 8,
    duration: 480,
    difficulty: 'HARD' as Difficulty,
    rewards: { xp: 120, coins: 60 }
  },

  // ============================================
  // FLIPCARDS - Memory card games
  // ============================================
  { 
    id: 'flipcard-match', 
    title: 'Flipcard Match', 
    description: 'Classic memory game - flip cards and find matching pairs!', 
    icon: 'Layers', 
    mode: 'INDIVIDUAL' as GameMode,
    category: 'FLIPCARDS' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 1,
    maxPlayers: 1,
    duration: 180,
    difficulty: 'EASY' as Difficulty,
    rewards: { xp: 45, coins: 20 }
  },
  { 
    id: 'flipcard-race', 
    title: 'Flipcard Race', 
    description: 'Race against time to match all pairs - be the fastest!', 
    icon: 'Layers', 
    mode: 'TEAM' as GameMode,
    category: 'FLIPCARDS' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 2,
    maxPlayers: 4,
    duration: 120,
    difficulty: 'MEDIUM' as Difficulty,
    rewards: { xp: 55, coins: 25 }
  },
  { 
    id: 'flipcard-duel', 
    title: 'Flipcard Duel', 
    description: 'Take turns flipping cards - collect more pairs than your opponent!', 
    icon: 'Layers', 
    mode: 'TEAM' as GameMode,
    category: 'FLIPCARDS' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 2,
    maxPlayers: 2,
    duration: 240,
    difficulty: 'MEDIUM' as Difficulty,
    rewards: { xp: 65, coins: 30 }
  },
  { 
    id: 'emotion-flipcards', 
    title: 'Emotion Flipcards', 
    description: 'Match emotions with scenarios - learn about feelings!', 
    icon: 'Smile', 
    mode: 'INDIVIDUAL' as GameMode,
    category: 'FLIPCARDS' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 1,
    maxPlayers: 2,
    duration: 300,
    difficulty: 'EASY' as Difficulty,
    rewards: { xp: 50, coins: 22 }
  },
  { 
    id: 'culture-flipcards', 
    title: 'Culture Flipcards', 
    description: 'Match cultural items and traditions from around the world!', 
    icon: 'Globe', 
    mode: 'TEAM' as GameMode,
    category: 'FLIPCARDS' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 2,
    maxPlayers: 6,
    duration: 360,
    difficulty: 'MEDIUM' as Difficulty,
    rewards: { xp: 60, coins: 28 }
  },
  { 
    id: 'romantic-flipcards', 
    title: 'Romantic Flipcards', 
    description: '70+ romantic text questions - flip to reveal loving answers!', 
    icon: 'Heart', 
    mode: 'TEAM' as GameMode,
    category: 'FLIPCARDS' as GameCategory,
    status: 'UNLOCKED' as GameStatus,
    minPlayers: 2,
    maxPlayers: 6,
    duration: 420,
    difficulty: 'EASY' as Difficulty,
    rewards: { xp: 70, coins: 35 }
  },
];

// ============================================
// GAME COLORS
// ============================================

export const GAME_COLORS = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#96CEB4', // Green
  '#FFEAA7', // Yellow
  '#DDA0DD', // Plum
  '#98D8C8', // Mint
  '#F7DC6F', // Gold
  '#BB8FCE', // Purple
  '#85C1E9', // Sky
  '#F8B500', // Orange
  '#00CED1', // Dark Cyan
];

// ============================================
// AVATARS
// ============================================

export const PLAYER_AVATARS = [
  '🦁', '🐯', '🐻', '🐼', '🐨', '🐸', '🦊', '🐰',
  '🦄', '🐲', '🦅', '🦉', '🦋', '🐝', '🐞', '🦀',
  '🐬', '🐳', '🦈', '🐙', '🦑', '🌟', '🌙', '☀️',
  '🌈', '🔥', '⚡', '💎', '🎯', '🎮', '🎭', '🎪',
];

export const TEAM_AVATARS = [
  '🦁 Lions',
  '🐘 Elephants',
  '🦓 Zebras',
  '🦒 Giraffes',
  '🐒 Monkeys',
  '🦅 Eagles',
  '🐺 Wolves',
  '🐝 Bees',
];

// ============================================
// BADGE DEFINITIONS
// ============================================

export const BADGES = [
  { id: 'africa_explorer', name: 'Africa Explorer', icon: '🌍', description: 'Complete Africa Trivia missions' },
  { id: 'safari_guide', name: 'Safari Guide', icon: '🦁', description: 'Complete Safari missions' },
  { id: 'swahili_speaker', name: 'Swahili Speaker', icon: '📚', description: 'Learn Swahili words' },
  { id: 'champion', name: 'Champion', icon: '🏆', description: 'Win multiple games' },
  { id: 'quiz_master', name: 'Quiz Master', icon: '🧠', description: 'Defeat the Quiz Master boss' },
  { id: 'speed_demon', name: 'Speed Demon', icon: '⚡', description: 'Defeat Lightning Bolt boss' },
  { id: 'puzzle_master', name: 'Puzzle Master', icon: '🧩', description: 'Defeat the Puzzle Master boss' },
  { id: 'true_champion', name: 'True Champion', icon: '👑', description: 'Defeat the Champion boss' },
  { id: 'safari_king', name: 'Safari King', icon: '🦁', description: 'Defeat the Safari King boss' },
  { id: 'weekly_champion', name: 'Weekly Champion', icon: '🏅', description: 'Win a weekly tournament' },
  { id: 'africa_master', name: 'Africa Master', icon: '🌍', description: 'Win Africa tournament' },
  { id: 'speed_champion', name: 'Speed Champion', icon: '⚡', description: 'Win Speed tournament' },
  { id: 'holiday_champion', name: 'Holiday Champion', icon: '🎄', description: 'Complete holiday event' },
  { id: 'africa_champion', name: 'Africa Champion', icon: '🌍', description: 'Complete Africa Month event' },
  { id: 'summer_champion', name: 'Summer Champion', icon: '☀️', description: 'Complete Summer event' },
  { id: 'boss_slayer', name: 'Boss Slayer', icon: '⚔️', description: 'Defeat 5 bosses' },
  { id: 'adventurer', name: 'Adventurer', icon: '📖', description: 'Complete story chapters' },
  { id: 'tournament_champion', name: 'Tournament Champion', icon: '🏆', description: 'Win a tournament' },
];

// ============================================
// LEADERBOARD DATA - Sample leaderboard entries
// ============================================

export const LEADERBOARD_DATA = [
  { rank: 1, name: 'Alex Champion', score: 15420, avatar: '🦁' },
  { rank: 2, name: 'Sarah Speed', score: 12350, avatar: '⚡' },
  { rank: 3, name: 'Mike Brain', score: 10890, avatar: '🧠' },
  { rank: 4, name: 'Emma Africa', score: 9450, avatar: '🌍' },
  { rank: 5, name: 'John Safari', score: 8200, avatar: '🦁' },
  { rank: 6, name: 'Lisa Swahili', score: 7100, avatar: '📚' },
  { rank: 7, name: 'Tom Rapid', score: 6800, avatar: '🔥' },
  { rank: 8, name: 'Amy Trivia', score: 5900, avatar: '🎯' },
  { rank: 9, name: 'David Word', score: 5200, avatar: '✍️' },
  { rank: 10, name: 'Nina Emoji', score: 4800, avatar: '🎨' },
];
