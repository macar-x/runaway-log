# Changelog

All notable changes to RunawayLog will be documented in this file.

## [1.1.0] - 2025-12-08

### Added
- **Statistics Dashboard**: Comprehensive analytics with 8 stat cards
  - Total escapes, today, this week, this month
  - Average per day calculation
  - Current and longest streak tracking
  - Peak day with most escapes
  - Most active day of week
  - Peak escape time (hourly analysis)
  - Visual insights with icons
- **Progressive Web App (PWA)**: Full offline support
  - Service worker with Workbox
  - Install as standalone app
  - Offline caching for all assets
  - Web manifest with metadata
  - Apple mobile web app support
- **Testing Infrastructure**: Vitest setup with 39 unit tests
  - Storage module tests (11 tests)
  - Quotes module tests (7 tests)
  - Timezone module tests (21 tests)
  - Test coverage for core functionality
  - npm scripts: `test`, `test:ui`, `test:coverage`

### Fixed
- Linting errors in App.tsx (setState in useEffect)
- Linting errors in Dashboard.tsx (setState in useEffect)
- Unused variable in exportImport.ts
- State initialization patterns for better performance

### Changed
- Refactored state initialization to use lazy initializers
- Improved code quality and maintainability
- Updated documentation with new features

### Technical
- Added vite-plugin-pwa for PWA support
- Added Vitest and Testing Library for testing
- Configured Workbox for caching strategies
- Build size: ~251KB JS, ~24KB CSS (gzipped: 81KB + 4.7KB)

## [1.0.0] - 2025-12-02

### Initial Release
- One-click escape tracking
- 90-day calendar heatmap
- Color theme selector (6 themes)
- Dark mode support
- Export/Import data
- Print calendar feature
- Settings menu
- Timezone support
- Motivational quotes
- Easter egg boom animation (0.6% chance)
- Docker deployment
- Mobile responsive design
