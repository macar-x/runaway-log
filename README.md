# RunawayLog 🏃

Track your desire to escape the daily grind. Every click represents a dream of breaking free.

## What is this?

A simple app to track when you dream of escaping work, meetings, or routine. Click the button, see patterns in a calendar heatmap, and get motivational quotes. All data stays private in your browser.

## Features

- 🏃 One-click tracking with animations
- 📊 Statistics dashboard (streaks, trends, peak times)
- 📅 90-day calendar heatmap with color themes
- 📝 Detailed log with timestamps
- 💭 Motivational quotes
- 🌙 Dark mode support
- 📱 Progressive Web App (install & offline support)
- 💾 Private (localStorage only)
- 📤 Export/Import data
- 🖨️ Print calendar
- 🌍 Timezone support

## Quick Start

**Local Development:**
```bash
git clone https://github.com/macar-x/runaway-log.git
cd runaway-log
npm install
npm run dev
```
Visit `http://localhost:5173`

**Docker:**
```bash
docker compose up -d
```
Visit `http://localhost:8080`

## Documentation

- [Configuration](docs/CONFIGURATION.md) - Environment variables and setup
- [Architecture](docs/ARCHITECTURE.md) - Port mapping and nginx configuration
- [Deployment](docs/DEPLOYMENT.md) - Docker and cloud deployment
- [Tech Stack](docs/TECH_STACK.md) - Technologies and dependencies
- [Rebranding](docs/REBRANDING.md) - Project history and naming
- [TODO](docs/TODO.md) - Planned features

## Tech Stack

React 19 + TypeScript + Vite + anime.js + Vitest  
PWA with Workbox + Service Worker  
Nginx Alpine + Docker (~53MB image)

## Requirements

- **Dev:** Node.js 20+, npm 10+
- **Production:** Docker + Docker Compose

## License

MIT

---

Built with **Ona**, the AI software engineering agent.
