# Roadmap

This document tracks planned features and improvements for **The Runaway Emulator** (《跑路模拟器》).

## 🎯 Core Vision

Create a game-like experience where:
- Players can find relief from work stress
- The narrative progresses based on real-world time
- Random events keep gameplay fresh
- Multiple playthroughs are encouraged with data inheritance and difficulty adjustments
- Cloud storage is the primary data model, with self-host and localStorage options available

## 🏗️ Project Evolution

### Current State
Simple web app with a Run button that makes a character run while recording activity.

### Next Phase (Game Transformation)
Evolve into a fully-fledged game space with multiple buttons, story progression, and random events.

### Long-term Vision
Support for multiple playthroughs, cloud storage, and self-host options.

## 🎨 UI/UX Enhancements

### High Priority

- [x] **Color Template Selector for Calendar** ✅
  - Add dropdown/selector to choose calendar color themes
  - Current: GitHub green template only
  - Planned themes:
    - GitHub Green (default)
    - Ocean Blue
    - Sunset Orange
    - Purple Dream
    - Fire Red
    - Monochrome Gray
  - Save user preference to localStorage
  - Apply theme to calendar heatmap intensity colors

- [x] **Print Calendar Feature** ✅
  - Add Print button between Import/Export and Logout
  - Opens print preview window with:
    - Calendar panel only (full size)
    - User info header
    - Month/year display
    - No Run button
    - No logs panel
    - No navigation controls
  - Optimized for A4/Letter paper
  - Print-friendly CSS (black & white option)

### Recent Changes (2025-12-09)

- [x] **Settings Menu Improvements** ✅
  - Added Close button to settings menu for better mobile experience
  - Changed Calendar Theme selector from button list to dropdown menu for cleaner UI
  - Updated SettingsMenu CSS to share styles between timezone and theme selectors

### Completed

- [x] **Settings Menu** ✅
  - Consolidated Export, Import, Print, and Theme Selector into settings menu
  - Clean header with only Settings and Logout buttons
  - Dropdown menu with visual theme previews
  - Mobile-optimized bottom sheet on small screens

### Medium Priority

- [x] **Dark Mode Support** ✅
  - Toggle between light and dark themes
  - Save preference to localStorage
  - Apply to all components
  - Respects system preference on first load
  - Smooth transitions between modes

- [ ] **Custom Date Range for Calendar**
  - Allow users to select custom date ranges
  - Export specific date ranges
  - View statistics for selected periods

- [ ] **Calendar View Options**
  - Month view (current)
  - Week view
  - Year overview
  - List view

- [ ] **Enhanced Animations**
  - More running person variations (walking, jumping, flying)
  - Particle effects on button click
  - Confetti for milestones

### Low Priority

- [ ] **Keyboard Shortcuts**
  - Space/Enter to hit Run button
  - Arrow keys for calendar navigation
  - Ctrl+E for export
  - Ctrl+I for import

- [ ] **Accessibility Improvements**
  - ARIA labels for all interactive elements
  - Screen reader support
  - High contrast mode
  - Keyboard navigation indicators

## 📊 Data & Analytics

- [x] **Statistics Dashboard** ✅
  - Total escape dreams count
  - Average per day/week/month
  - Current and longest streak
  - Most active day of week
  - Peak escape times
  - Peak day with most escapes
  - Visual stat cards with insights

- [ ] **Goals & Milestones**
  - Set daily/weekly goals
  - Achievement badges
  - Milestone celebrations (100, 500, 1000 hits)
  - Progress tracking

- [ ] **Data Insights**
  - Identify patterns (e.g., "You escape most on Mondays")
  - Weekly/monthly reports
  - Mood correlation (if mood tracking added)

## 🔧 Technical Improvements

### High Priority

- [ ] **Cloud Storage System**
  - Implement MariaDB database for primary data storage
  - Add user authentication for cloud storage
  - Implement API endpoints for data synchronization
  - Support for Docker-based deployment

- [ ] **Self-host & Local Storage Support**
  - Optional self-host deployment option
  - Compatible localStorage mode for offline use
  - Data import/export between different storage modes

### Medium Priority

- [x] **Progressive Web App (PWA)** ✅
  - Service worker for offline support
  - Install as standalone app
  - Workbox caching strategies
  - Manifest with icons and metadata
  - [ ] Push notifications (optional)
  - [ ] Background sync

- [ ] **Performance Optimization**
  - Lazy load calendar days
  - Virtual scrolling for large logs
  - Optimize animations for low-end devices
  - Reduce bundle size

- [x] **Testing** ✅ (Partial)
  - [x] Unit tests for core modules (storage, quotes, timezone)
  - [x] Vitest setup with 39 passing tests
  - [ ] Component tests with React Testing Library
  - [ ] Integration tests
  - [ ] E2E tests with Playwright
  - [ ] CI/CD pipeline

## 🌐 Social & Sharing

- [ ] **Anonymous Sharing**
  - Share calendar as image
  - Generate shareable link (read-only)
  - Social media preview cards

- [ ] **Community Features** (Optional)
  - Anonymous global statistics
  - Compare with others (opt-in)
  - Motivational community board

## 📱 Mobile Enhancements

- [ ] **Mobile App**
  - React Native version
  - Native iOS/Android apps
  - Widget support

- [ ] **Mobile Optimizations**
  - Touch gestures (swipe to navigate)
  - Haptic feedback
  - Better mobile calendar layout

## 🔐 Privacy & Security

- [ ] **Data Encryption**
  - Encrypt localStorage data
  - Optional password protection
  - Secure export files

- [ ] **Privacy Controls**
  - Clear all data option
  - Export before delete
  - Privacy policy page

## � Game Features

### High Priority

- [ ] **Multiple Interactive Buttons**
  - Expand beyond just a Run button
  - Add various action buttons with different effects
  - Each button triggers unique animations and story progress

- [ ] **Story Progression System**
  - Narrative that advances based on real-world time
  - Character development and plot twists
  - Multiple endings based on player choices

- [ ] **Random Events System**
  - Daily random events that affect gameplay
  - Event chains with branching outcomes
  - Special events for holidays and milestones

### Medium Priority

- [ ] **Multiple Playthroughs Support**
  - NG+ (New Game Plus) mode
  - Data inheritance between playthroughs
  - Difficulty adjustments for each playthrough
  - Unlockable content for repeated play

- [ ] **Mini-Games Integration**
  - Add simple mini-games for variety
  - Mini-games that tie into the main narrative
  - Rewards for completing mini-games

## �🎯 Gamification

### Medium Priority

- [ ] **Achievements System**
  - Unlock badges for milestones and story progress
  - Streak tracking and rewards
  - Daily challenges with unique prizes
  - Leaderboard (optional, anonymous)

### Low Priority

- [ ] **Customization**
  - Custom button text and appearances
  - Custom character skins and animations
  - Custom quotes (user-added)
  - Profile customization options

## 📝 Content

- [ ] **More Quotes**
  - Expand quote library (50+ quotes)
  - Category-based quotes (motivation, travel, freedom)
  - User-submitted quotes

- [ ] **Localization**
  - Multi-language support
  - i18n implementation
  - RTL language support

## 🐛 Bug Fixes

- [ ] Test import/export with large datasets (1000+ hits)
- [ ] Verify calendar display across different timezones
- [ ] Test on various browsers (Safari, Firefox, Edge)
- [ ] Mobile responsiveness edge cases

## 📚 Documentation

- [ ] Add CONTRIBUTING.md
- [ ] Add CODE_OF_CONDUCT.md
- [ ] Add API documentation (if backend added)
- [ ] Video tutorials
- [ ] FAQ section

---

## How to Contribute

If you'd like to work on any of these items:

1. Check if the item is already being worked on
2. Create an issue referencing this TODO item
3. Fork the repository
4. Create a feature branch
5. Submit a pull request

## Priority Legend

- **High Priority**: Core features that significantly improve user experience
- **Medium Priority**: Nice-to-have features that add value
- **Low Priority**: Polish and refinements

---

*Last updated: 2025-12-09*

## Recent Updates (2025-12-08)

### ✅ Completed
- **Statistics Dashboard**: Added comprehensive stats with streaks, trends, and insights
- **PWA Support**: Full Progressive Web App with offline support and install capability
- **Testing Infrastructure**: Set up Vitest with 39 unit tests for core modules
- **Code Quality**: Fixed all linting errors and improved state initialization patterns

### 🎯 Ready for Pro Version
The app now has a solid foundation with:
- Statistics and analytics
- PWA capabilities
- Test coverage for core functionality
- Clean, maintainable codebase

Next priorities for pro version:
1. Accessibility improvements (ARIA labels, keyboard navigation)
2. Custom date ranges and advanced filtering
3. Data encryption and privacy controls
4. Enhanced animations and gamification
