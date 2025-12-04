# RunawayLog Rebranding Summary

## New Purpose

RunawayLog is designed to help people track their desire to escape the daily grind. Every click represents a dream of breaking free from:
- Boring, repetitive work
- Endless meetings
- Unfulfilling routines
- The desire to retire and travel
- Any situation they wish to escape from

The app visualizes how strong your will to escape really is through a calendar heatmap and detailed log.

## Name Change

**Old Name:** Hit Button App  
**New Name:** RunawayLog

## Key Changes

### Branding
- **App Title:** RunawayLog 🏃
- **Tagline:** "Track your desire to escape the daily grind"
- **Slogan:** "Every click is a dream of freedom"

### User Interface
- **Login Page:**
  - Title: "🏃 RunawayLog"
  - Subtitle: "Track your desire to escape the daily grind"
  - Slogan: "Every click is a dream of freedom"

- **Dashboard:**
  - Section Title: "Dreaming of Escape?" (was "Ready to Hit?")
  - Button: Still "RUN 🏃" but with escape context
  - Counter: "Escape Dreams: X" (was "Total Hits: X")
  - **New Feature:** Random motivational quote that changes with each click

- **Calendar:**
  - Title: "Escape Intensity (Last 90 Days)" (was "Hit Calendar")
  - Tooltip: "X escape dream(s)" (was "X hit(s)")

- **Logs:**
  - Title: "Escape Dreams Log" (was "Hit History")
  - Icon: 🏃 (running man)

### Motivational Quotes

Added 20 inspirational quotes that rotate randomly:
- "The only impossible journey is the one you never begin."
- "Life is either a daring adventure or nothing at all."
- "Your time is limited, don't waste it living someone else's life."
- And 17 more...

Quotes appear:
- On initial page load
- After every button click
- Styled in purple/blue color with italic font

### Technical Changes

**Package Name:** `runawaylog` (v1.0.0)

**Storage Keys:**
- localStorage: `runawaylog-data` (was `hit-button-app-data`)
- sessionStorage: `runawaylog-username` (was `hit-button-username`)

**Docker:**
- Image name: `runawaylog:latest`
- Container name: `runawaylog` (configurable)

**Files Updated:**
- package.json
- index.html (title + meta description)
- README.md
- All documentation files
- All React components
- Storage utilities
- Docker configuration
- Environment files

## New Features

1. **Motivational Quotes System** (`src/quotes.ts`)
   - 20 curated quotes about freedom, dreams, and escape
   - Random selection on load and after each click
   - Displayed prominently below the RUN button

2. **Enhanced Messaging**
   - All UI text reflects the escape/freedom theme
   - More emotional and relatable language
   - Encourages users to acknowledge their desires

## User Experience

The app now serves as:
- A **pressure valve** for daily frustrations
- A **visual reminder** of escape desires
- A **motivation tracker** showing patterns over time
- A **private space** to acknowledge feelings without judgment

Perfect for:
- People dreaming of retirement
- Those wanting to travel the world
- Anyone feeling stuck in their current situation
- Friends who complain daily about wanting to quit

## Emotional Impact

By reframing "hits" as "escape dreams," the app:
- Validates feelings of wanting to escape
- Makes it okay to dream of something different
- Provides data to see patterns (e.g., "I dream of escaping every Monday")
- Motivates action through accumulated evidence of desire

## Next Steps (Optional)

Future enhancements could include:
- Goal setting (e.g., "Save $X to travel")
- Escape plan templates
- Community features (anonymous sharing)
- Export data for reflection
- Streak tracking for consecutive days
- Achievement badges
