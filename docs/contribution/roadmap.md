# RunawayLog Roadmap

This document outlines the planned features and improvements for RunawayLog, organized by priority. It serves as a guide for the project's future development and helps contributors understand what we're working towards.

## Table of Contents

- [High Priority](#high-priority)
- [Medium Priority](#medium-priority)
- [Low Priority](#low-priority)
- [Completed](#completed)
- [Pro Mode Features](#pro-mode-features)
- [Contribution Opportunities](#contribution-opportunities)

## High Priority

### Accessibility Improvements

- [ ] **ARIA Labels for All Interactive Elements**
  - Add ARIA labels to buttons, inputs, and other interactive elements
  - Ensure proper keyboard navigation
  - Improve screen reader compatibility

- [ ] **Keyboard Shortcuts**
  - Space/Enter to hit Run button
  - Arrow keys for calendar navigation
  - Ctrl+E for export
  - Ctrl+I for import

- [ ] **High Contrast Mode**
  - Add high contrast theme option
  - Ensure all elements meet WCAG contrast ratios
  - Improve readability for visually impaired users

### Custom Date Range for Calendar

- [ ] **Custom Date Range Selector**
  - Allow users to select custom date ranges
  - Export specific date ranges
  - View statistics for selected periods
  - Filter logs by date range

## Medium Priority

### Calendar View Options

- [ ] **Additional Calendar Views**
  - Month view (current)
  - Week view
  - Year overview
  - List view

### Enhanced Animations

- [ ] **Improved Animations**
  - More running person variations (walking, jumping, flying)
  - Particle effects on button click
  - Confetti for milestones
  - Smooth transitions between views

### Goals & Milestones

- [ ] **Goal Setting System**
  - Set daily/weekly goals
  - Achievement badges
  - Milestone celebrations (100, 500, 1000 hits)
  - Progress tracking

### Data Insights

- [ ] **Advanced Analytics**
  - Identify patterns (e.g., "You escape most on Mondays")
  - Weekly/monthly reports
  - Mood correlation (if mood tracking added)

## Low Priority

### Mobile Enhancements

- [ ] **Mobile Optimizations**
  - Touch gestures (swipe to navigate)
  - Haptic feedback
  - Better mobile calendar layout

### Privacy & Security

- [ ] **Data Encryption**
  - Encrypt localStorage data
  - Optional password protection
  - Secure export files

- [ ] **Privacy Controls**
  - Clear all data option
  - Export before delete
  - Privacy policy page

### Gamification

- [ ] **Achievements System**
  - Unlock badges for milestones
  - Streak tracking
  - Daily challenges
  - Leaderboard (optional, anonymous)

### Customization

- [ ] **Advanced Customization**
  - Custom button text
  - Custom emoji for running person
  - Custom quotes (user-added)
  - Profile customization

### Content

- [ ] **More Quotes**
  - Expand quote library (50+ quotes)
  - Category-based quotes (motivation, travel, freedom)
  - User-submitted quotes

## Completed

### UI/UX Enhancements

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

- [x] **Settings Menu** ✅
  - Consolidated Export, Import, Print, and Theme Selector into settings menu
  - Clean header with only Settings and Logout buttons
  - Dropdown menu with visual theme previews
  - Mobile-optimized bottom sheet on small screens

- [x] **Dark Mode Support** ✅
  - Toggle between light and dark themes
  - Save preference to localStorage
  - Apply to all components
  - Respects system preference on first load
  - Smooth transitions between modes

### Data & Analytics

- [x] **Statistics Dashboard** ✅
  - Total escape dreams count
  - Average per day/week/month
  - Current and longest streak
  - Most active day of week
  - Peak escape times
  - Peak day with most escapes
  - Visual stat cards with insights

### Technical Improvements

- [x] **Progressive Web App (PWA)** ✅
  - Service worker for offline support
  - Install as standalone app
  - Workbox caching strategies
  - Manifest with icons and metadata

- [x] **Testing** ✅ (Partial)
  - Unit tests for core modules (storage, quotes, timezone)
  - Vitest setup with 39 passing tests

## Pro Mode Features

### Core Pro Features

- [x] **Multiple Game Modes** ✅
  - Card Drop game mode
  - More games coming soon

- [x] **Multi-page Navigation** ✅
  - Games Hub
  - Storage page
  - Releases page
  - About page
  - Profile page

- [ ] **Remote Storage Options** (Coming Soon)
  - WebDAV support
  - Firebase integration
  - Supabase integration

### Pro Enhancements

- [ ] **Advanced Privacy Controls**
  - End-to-end encryption for remote storage
  - Granular permission settings
  - Privacy-focused data handling

- [ ] **Enhanced Analytics**
  - Custom date ranges and advanced filtering
  - Predictive insights
  - Exportable reports

- [ ] **Gamification Elements**
  - More achievements and badges
  - Advanced streak tracking
  - Leaderboard (opt-in)

## Contribution Opportunities

We welcome contributions to all areas of the project. Here are some specific opportunities:

1. **Accessibility Improvements**: Add ARIA labels, keyboard shortcuts, and high contrast support
2. **Custom Date Range**: Implement custom date range selection for calendar and statistics
3. **Additional Calendar Views**: Add week, year, and list views to the calendar
4. **Enhanced Animations**: Improve animations and add new effects
5. **Goal Setting System**: Implement goal setting and achievement tracking
6. **Data Insights**: Add advanced analytics and pattern recognition
7. **Mobile Optimizations**: Improve the mobile experience
8. **Content Expansion**: Add more quotes to the library

## How to Get Involved

If you'd like to contribute to any of these items:

1. Check if the item is already being worked on by searching the [issues](https://github.com/macar-x/runaway-log/issues)
2. If not, create an issue referencing this roadmap item
3. Fork the repository
4. Create a feature branch
5. Implement your changes
6. Submit a pull request

## Recent Updates

### 2025-12-09

#### ✅ Completed
- **Settings Menu Improvements**: Added Close button and changed theme selector to dropdown
- **Documentation Overhaul**: Implemented comprehensive wiki structure
- **Multi-language README**: Added Simplified and Traditional Chinese README files

### 2025-12-08

#### ✅ Completed
- **Statistics Dashboard**: Added comprehensive stats with streaks, trends, and insights
- **PWA Support**: Full Progressive Web App with offline support and install capability
- **Testing Infrastructure**: Set up Vitest with 39 unit tests for core modules
- **Code Quality**: Fixed all linting errors and improved state initialization patterns

## Future Directions

The app now has a solid foundation with:
- Statistics and analytics
- PWA capabilities
- Test coverage for core functionality
- Clean, maintainable codebase
- Comprehensive documentation

Next priorities for the project:
1. Accessibility improvements (ARIA labels, keyboard navigation)
2. Custom date ranges and advanced filtering
3. Data encryption and privacy controls
4. Enhanced animations and gamification
5. Mobile optimizations

We're excited to see where the community takes RunawayLog! If you have ideas for new features or improvements, please don't hesitate to share them.
