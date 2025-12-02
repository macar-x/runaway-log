# RunawayLog 🏃

Track your desire to escape the daily grind. Every click represents your dream of breaking free from the routine, the boring meetings, the endless tasks. Whether you're dreaming of retirement, travel, or simply a different life - RunawayLog helps you visualize how strong your will to escape really is.

## ✨ Features

- 🏃 **One-Click Escape** - Hit the button every time you dream of running away
- 📅 **Escape Calendar** - 90-day heatmap showing your desire patterns
- 📊 **Dream Log** - Detailed history of every escape thought with timestamps
- 💭 **Motivational Quotes** - Random inspiring messages to fuel your dreams
- 💾 **Private & Local** - All data stored in your browser, completely private
- 🎨 **Smooth Animations** - Satisfying interactions for every click
- 📱 **Always Available** - Works on mobile and desktop, anytime you need it

## 🚀 Quick Start

### Run Locally (Development)

```bash
# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Start development server
npm run dev
```

Visit `http://localhost:5173`

### Run with Docker (Production)

```bash
# Using Docker Compose (recommended)
docker compose up -d

# Or using Docker CLI
docker build -t hit-button-app .
docker run -d -p 8080:80 hit-button-app
```

Visit `http://localhost:8080`

## 📚 Documentation

- **[Configuration Guide](docs/CONFIGURATION.md)** - Environment variables and setup for different environments
- **[Architecture Overview](docs/ARCHITECTURE.md)** - How ports work, nginx.conf usage, and deployment architecture
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Docker, CI/CD, and cloud platform deployment
- **[Tech Stack](docs/TECH_STACK.md)** - Detailed information about technologies used

## 🛠️ Tech Stack

**Frontend:** React 18 + TypeScript + Vite + anime.js  
**Styling:** CSS3 with Flexbox & Grid  
**Storage:** localStorage + sessionStorage  
**Production:** Nginx Alpine + Docker  
**Size:** ~53MB Docker image, ~77KB transferred

## 📋 Prerequisites

- **Development:** Node.js 20.x+, npm 10.x+
- **Production:** Docker + Docker Compose

## 🔧 Configuration

The app uses environment variables for flexible configuration. See [Configuration Guide](docs/CONFIGURATION.md) for details.

Quick example:
```bash
# .env
VITE_PORT=5173              # Dev server port
DOCKER_PORT=8080            # Docker exposed port
VITE_HMR_HOST=              # Cloud environment domain (optional)
```

## 📦 Project Structure

```
hit-button-app/
├── src/
│   ├── components/         # React components
│   ├── types.ts           # TypeScript interfaces
│   ├── storage.ts         # localStorage utilities
│   └── App.tsx            # Root component
├── docs/                  # Documentation
├── Dockerfile             # Multi-stage Docker build
├── compose.yml            # Docker Compose configuration
└── vite.config.ts         # Vite configuration
```

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## 📄 License

MIT

## 🙏 Acknowledgments

Special thanks to **Ona**, the AI software engineering agent, for architecting and building this application from scratch - from initial setup and animation implementation to Docker configuration and comprehensive testing.

---

**Need help?** Check out the [documentation](docs/) or open an issue.
