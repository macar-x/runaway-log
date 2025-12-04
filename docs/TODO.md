# TODO List

This document tracks planned features and improvements for RunawayLog.

## 🎨 UI/UX Enhancements

### High Priority

- [ ] **Color Template Selector for Calendar**
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

- [ ] **Print Calendar Feature**
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

### Medium Priority

- [ ] **Dark Mode Support**
  - Toggle between light and dark themes
  - Save preference to localStorage
  - Apply to all components

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

- [ ] **Statistics Dashboard**
  - Total escape dreams count
  - Average per day/week/month
  - Longest streak
  - Most active day of week
  - Peak escape times
  - Trend graphs

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

- [ ] **Progressive Web App (PWA)**
  - Service worker for offline support
  - Install as standalone app
  - Push notifications (optional)
  - Background sync

- [ ] **Data Backup & Sync**
  - Auto-backup to cloud (optional)
  - Sync across devices
  - Backup reminders
  - Restore from backup

- [ ] **Performance Optimization**
  - Lazy load calendar days
  - Virtual scrolling for large logs
  - Optimize animations for low-end devices
  - Reduce bundle size

- [ ] **Testing**
  - Unit tests for components
  - Integration tests
  - E2E tests with Playwright
  - CI/CD pipeline

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

## 🎯 Gamification

- [ ] **Achievements System**
  - Unlock badges for milestones
  - Streak tracking
  - Daily challenges
  - Leaderboard (optional, anonymous)

- [ ] **Customization**
  - Custom button text
  - Custom emoji for running person
  - Custom quotes (user-added)
  - Profile customization

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

*Last updated: 2025-12-02*
