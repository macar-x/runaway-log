# Pro Mode Architecture

## Overview
Pro Mode extends RunawayLog with advanced features, multiple game modes, remote storage, and additional pages.

## Mode Structure

### Free Mode (Default)
- Single page application with unified navigation
- Hit button → Statistics → Calendar → Logs
- All core features included
- Local storage only
- Clean navigation bar with settings

### Pro Mode
- Multi-page application with routing
- Full navigation bar with mode switcher
- Multiple game modes
- Remote storage options
- Additional informational pages (Games, Storage, Releases, About)

## Routing Structure

```
/                          → Home (same as simple mode)
/game/cards               → Card Drop Game Mode
/game/[future-modes]      → Future game modes
/storage                  → Remote Storage Settings
/releases                 → Release Notes & Changelog
/about                    → About Page
```

## Navigation Layout

```
┌─────────────────────────────────────────┐
│  [Logo] RunawayLog    [Simple|Pro] [⚙️] │
├─────────────────────────────────────────┤
│  Home | Games | Storage | Releases | About │  (Pro mode only)
├─────────────────────────────────────────┤
│                                         │
│         Page Content                    │
│                                         │
└─────────────────────────────────────────┘
```

## Features by Mode

### Free Mode Features
- ✅ Hit tracking
- ✅ Calendar heatmap
- ✅ Statistics dashboard
- ✅ Logs
- ✅ Export/Import
- ✅ Themes & Dark mode
- ✅ Timezone support
- ✅ Print calendar
- ✅ Unified navigation bar

### Pro Mode Additional Features

#### 1. Game Modes
**Card Drop Game:**
- Random card drops when hitting Run button
- Collectible card system
- Card rarity levels (common, rare, epic, legendary)
- Card gallery/collection view
- Achievement system for collecting cards

**Future Game Modes:**
- Slot machine mode
- Achievement badges
- Daily challenges
- Streak rewards

#### 2. Remote Storage
**WebDAV Integration:**
- Connect to WebDAV servers
- Auto-sync data
- Conflict resolution

**Database Options:**
- Firebase integration
- Supabase integration
- Custom backend API

**Cloud Storage:**
- Google Drive
- Dropbox
- OneDrive

#### 3. Releases Page
- Version history
- Changelog with dates
- Feature highlights
- Download links
- Migration guides

#### 4. About Page
- Project description
- How to use
- Privacy policy
- Credits
- Contact information
- GitHub link
- Built with Ona badge

## Technical Implementation

### Dependencies to Add
```json
{
  "react-router-dom": "^6.x",
  "framer-motion": "^11.x" (for animations),
  "webdav": "^5.x" (for WebDAV support)
}
```

### File Structure
```
src/
├── modes/
│   ├── SimpleMode.tsx       (current Dashboard)
│   └── ProMode.tsx          (new wrapper with routing)
├── pages/
│   ├── Home.tsx             (Dashboard content)
│   ├── games/
│   │   ├── CardGame.tsx
│   │   └── CardGallery.tsx
│   ├── Storage.tsx
│   ├── Releases.tsx
│   └── About.tsx
├── components/
│   ├── Navigation.tsx       (Pro mode nav bar)
│   ├── ModeToggle.tsx       (Simple/Pro switcher)
│   └── [existing components]
├── services/
│   ├── webdav.ts
│   ├── firebase.ts
│   └── sync.ts
└── types/
    ├── cards.ts
    └── storage.ts
```

### State Management
- Use React Context for mode state
- Persist mode preference in localStorage
- Share user data across modes

### Card System Design

#### Card Structure
```typescript
interface Card {
  id: string;
  name: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image: string;
  collectedAt?: number;
  count: number;
}

interface CardCollection {
  cards: Card[];
  totalCards: number;
  uniqueCards: number;
  completionRate: number;
}
```

#### Card Drop Mechanics
- Each hit has a chance to drop a card
- Rarity affects drop rate:
  - Common: 60%
  - Rare: 25%
  - Epic: 12%
  - Legendary: 3%
- Duplicate cards increase count
- Visual animation when card drops

#### Card Themes
- Motivational quotes cards
- Travel destination cards
- Freedom/escape themed cards
- Achievement milestone cards

## Migration Strategy

### Phase 1: Foundation (Current Sprint)
- Add React Router
- Create mode toggle component
- Implement basic routing
- Create placeholder pages

### Phase 2: Card Game
- Design card system
- Implement card drop mechanics
- Create card gallery
- Add animations

### Phase 3: Remote Storage
- WebDAV integration
- Sync logic
- Conflict resolution
- UI for storage settings

### Phase 4: Content Pages
- Releases page with changelog
- About page with information
- Documentation updates

## User Experience

### Mode Toggle Behavior
- Toggle persists in localStorage
- Smooth transition between modes
- No data loss when switching
- Free mode is default for new users
- Toggle styled like settings button for consistency
- Shows current mode with icon (🆓 Free / ⭐ Pro)

### Pro Mode Onboarding
- First-time tooltip explaining features
- Quick tour of new pages
- Optional tutorial for card game

## Data Compatibility
- All free mode data works in pro mode
- Pro mode data (cards, settings) stored separately
- Export includes both free and pro data
- Import handles both formats
- Seamless switching between modes

## Performance Considerations
- Lazy load pro mode features
- Code splitting by route
- Optimize card images
- Cache remote data locally

## Future Enhancements
- Multiplayer features (compare with friends)
- Social sharing of cards
- Custom card creation
- Trading system (if multiplayer)
- Mobile app with native features
