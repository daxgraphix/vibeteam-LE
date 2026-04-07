# 🎮 VibeTeam - Ultimate Party & Couples Game App

A modern, interactive party game application built with React, TypeScript, and Vite. Perfect for couples, friends, team meetings, and party gatherings!

---

## ✨ Features

### 🎯 Game Modes
- **Solo Play** - Challenge yourself or play with friends (up to 8 players)
- **Team Battle** - Multiplayer team-based competitions (2-4 teams)
- **Couple Mode** - Romantic games for couples
- **Story Adventure** - Chapter-based narrative experiences
- **Boss Battles** - Challenge-mode gameplay
- **Tournaments** - Compete in weekly championships

### 🎮 Games Library (30+ Games)

| Category | Games |
|----------|-------|
| **Trivia** | General Trivia (150+), Africa Trivia (80), Tanzania Places (50), East Africa Culture (50), Swahili Words (75), Wildlife Safari (50) |
| **Memory** | Flipcard Match, Flipcard Race, Flipcard Duel, Emotion Flipcards, Culture Flipcards, Romantic Flipcards (70+), Memory Match |
| **Word** | Word Scramble, Word Relay, Would You Rather, Brain Teasers (106+) |
| **Brain** | Number Crunch (45+), Emoji Puzzles (50+), Rapid Fire (100+) |
| **Couple** | Romantic Riddles, Couple Quiz (70), Deep Love Questions (60), Couple Challenges |
| **Action** | Tug of War, Survival Challenge, Precision Challenge |

### 🌟 Special Features

- **Vibe Boosters** - Power-ups: Turbo, Jackpot, Double, Triple, Zen, Time Warp, Freeze, Shield, Lucky, Steal, Swap, Chaos, On Fire, Phoenix
- **Daily Challenges** - New missions every day
- **Achievements** - Unlock badges as you progress
- **Leaderboards** - Track high scores
- **Dark/Light Theme** - Toggle between themes
- **Adaptive Difficulty** - AI-powered difficulty that adjusts based on player performance

---

## 📱 Responsive Design

- **Mobile-first** design
- Works on all screen sizes (320px - 1920px+)
- Touch-friendly interactions with proper spacing
- iOS zoom prevention
- Safe area support for notched devices
- Landscape/portrait orientation support

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd vibeteam

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` folder.

---

## 🎨 Tech Stack

- **Frontend**: React 19, TypeScript 5.8
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **Backend**: Express.js (for WebSocket support)

---

## 📁 Project Structure

```
vibeteam/
├── src/
│   ├── components/           # React UI components
│   │   ├── Header.tsx       # App header with settings
│   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   ├── GameCard.tsx     # Game display card
│   │   ├── SplashScreen.tsx # Welcome/splash screen
│   │   ├── SettingsModal.tsx # Settings popup
│   │   └── ...
│   ├── constants/           # Game configuration
│   │   └── game.ts          # Game definitions
│   ├── context/             # React context providers
│   │   └── GameContext.tsx  # Global game state
│   ├── engine/              # Game logic
│   │   ├── gameEngine.ts    # Core game algorithms
│   │   ├── dataValidator.ts # Question validation
│   │   └── ...
│   ├── hooks/               # Custom React hooks
│   │   ├── useResponsive.ts # Responsive breakpoints
│   │   ├── useLocalStorage.ts
│   │   └── ...
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Container.tsx
│   │   └── Flex.tsx
│   ├── utils/               # Utility functions
│   │   └── index.ts        # Helper functions (cn, formatNumber, etc.)
│   ├── data.ts             # Question banks (836+ questions)
│   ├── types.ts            # TypeScript interfaces
│   ├── App.tsx             # Main application
│   └── index.css           # Global styles with CSS variables
├── server.ts               # Express server with WebSocket
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

---

## 🎯 How to Play

### 1. Launch the App
Open the app in your browser. You'll see the splash screen with the VibeTeam logo.

### 2. Select Game Mode
- Tap **"Get Started"** to choose between:
  - **Solo Play** - Add 1-8 players with custom names and avatars
  - **Team Battle** - Create 2-4 teams with custom names

### 3. Choose Your Game
Browse through categories:
- **Quick Games** - Trivia, Memory, Word, Brain
- **Special Modes** - Tournaments, Boss Battles, Story Mode
- **Couple Zone** - Romantic games for couples

### 4. Play & Score
- Answer questions by selecting from options
- Build streaks for bonus points
- Use difficulty levels (Easy/Medium/Hard) to adjust challenge
- Earn XP and track progress

### 5. Track Progress
- View missions and achievements
- Check leaderboards
- Complete daily challenges

---

## 🎮 Game Categories

### Trivia Games
- **General Trivia** - 150+ questions across various topics
- **Africa Trivia** - 80 questions about Africa
- **Tanzania Places** - 50 questions about Tanzania
- **East Africa Culture** - 50 questions about culture
- **Swahili Words** - 75 questions to learn Swahili
- **Wildlife Safari** - 50 questions about animals

### Memory Games
- **Flipcard Match** - Classic memory matching
- **Flipcard Race** - Speed-based matching
- **Flipcard Duel** - Competitive matching
- **Emotion Flipcards** - Emotional intelligence
- **Culture Flipcards** - Cultural knowledge
- **Romantic Flipcards** - 70+ romantic questions for couples
- **Memory Match** - Emoji-based memory game

### Word Games
- **Word Scramble** - Unscramble letters
- **Word Relay** - Word chain challenges
- **Would You Rather** - Decision games
- **Brain Teasers** - 106+ puzzle questions

### Brain Games
- **Number Crunch** - 45+ math challenges
- **Emoji Puzzles** - 50+ emoji-based guessing
- **Rapid Fire** - 100+ quick questions

### Couple Games
- **Couple Quiz** - 70 relationship questions
- **Deep Love Questions** - 60 intimate conversations
- **Romantic Riddles** - Text-based romantic questions
- **Couple Challenges** - Various couple activities

---

## 🔧 Adaptive Difficulty System

The app features an **intelligent difficulty system** that automatically adjusts based on player performance:

### How It Works
1. Tracks consecutive correct/wrong answers
2. Monitors average accuracy over time
3. Calculates performance score with time bonuses
4. Adjusts difficulty up or down automatically

### Difficulty Levels
- **Easy** - 1x points multiplier
- **Medium** - 1.5x points multiplier (default)
- **Hard** - 2x points multiplier

### Adaptive Rules
- ✅ 4+ consecutive correct + 75% performance → Difficulty increases
- ❌ 3+ consecutive wrong OR 35% performance → Difficulty decreases

---

## 📊 Question Validation

All 836+ questions have been validated to ensure:
- ✅ Every question has a valid answer
- ✅ Answer exists in options list
- ✅ No invalid "All of the above" or "None" options

### Validation Results
| Dataset | Questions | Status |
|---------|-----------|--------|
| Trivia | 150 | ✅ 100% |
| Rapid Fire | 100 | ✅ 100% |
| Brain Teasers | 106 | ✅ 100% |
| Africa Trivia | 80 | ✅ 100% |
| Tanzania | 50 | ✅ 100% |
| Culture | 50 | ✅ 100% |
| Swahili | 75 | ✅ 100% |
| Wildlife | 50 | ✅ 100% |
| Number Crunch | 45 | ✅ 100% |
| Couple | 70 | ✅ 100% |
| Deep Love | 60 | ✅ 100% |
| **TOTAL** | **836** | ✅ **100%** |

---

## 🎨 Design System

The app includes a comprehensive design system:

### CSS Variables
- Brand colors (primary, secondary, accent)
- Semantic colors (success, warning, error, info)
- Neutral colors for dark/light themes
- Spacing scale, z-index scale, border radius
- Custom animations and transitions

### UI Components
- **Button** - Multiple variants (primary, secondary, accent, ghost)
- **Card** - Interactive cards with hover effects
- **Badge** - Status badges with color variants
- **Container** - Responsive width containers
- **Flex** - Flexible layout helper

---

## 📱 Supported Devices

- 📱 Mobile phones (iOS & Android) - 320px+
- 📲 Tablets (iPad & Android tablets) - 768px+
- 🖥️ Desktop computers (Windows, macOS, Linux) - 1024px+

---

## 📄 License

MIT License

---

## 🎉 Recent Updates

### Version 2.1.0
- ✅ Enhanced SplashScreen with improved Solo/Team selection UX
- ✅ Player avatars and team colors
- ✅ Improved difficulty selector with visual feedback
- ✅ Adaptive difficulty algorithm
- ✅ 100% question validation (836 questions verified)

### Version 2.0.0
- ✅ Simplified dashboard with 3 main sections
- ✅ Fixed flipcard games functionality
- ✅ Added 16 flipcard pairs
- ✅ Created Romantic Flipcards with 70+ questions
- ✅ Fully responsive design

---

Made with ❤️ for party lovers everywhere!

[![VibeTeam](https://img.shields.io/badge/Version-2.1.0-blue)](https://github.com/vibeteam)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org)
