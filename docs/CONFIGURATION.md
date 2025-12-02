# Configuration Guide

This guide explains how to configure RunawayLog for different environments using environment variables.

## Quick Start

1. **Copy the example configuration file:**

```bash
cp .env.example .env
```

2. **Edit `.env` with your preferred settings:**

```bash
nano .env
# or
vim .env
```

## Available Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_PORT` | `5173` | Development server port |
| `VITE_HOST` | `0.0.0.0` | Development server host (0.0.0.0 allows network access) |
| `VITE_HMR_HOST` | (empty) | HMR WebSocket host for cloud environments |
| `VITE_HMR_PORT` | `443` | HMR WebSocket port |
| `VITE_HMR_PROTOCOL` | `wss` | HMR WebSocket protocol (ws/wss) |
| `DOCKER_PORT` | `8080` | Docker container exposed port |
| `DOCKER_CONTAINER_NAME` | `hit-button-app` | Docker container name |

## Configuration Examples

### Example 1: Local Development (Default)

```env
VITE_PORT=5173
VITE_HOST=0.0.0.0
VITE_HMR_HOST=
DOCKER_PORT=8080
DOCKER_CONTAINER_NAME=hit-button-app
```

This is the default configuration. The app runs on `http://localhost:5173` for development and `http://localhost:8080` for Docker.

### Example 2: Custom Ports

```env
VITE_PORT=3000
VITE_HOST=0.0.0.0
VITE_HMR_HOST=
DOCKER_PORT=9090
DOCKER_CONTAINER_NAME=my-hit-app
```

Use this if you have port conflicts or prefer different ports. Dev server will run on port 3000, Docker on port 9090.

### Example 3: Cloud Environment (Gitpod)

```env
VITE_PORT=5173
VITE_HOST=0.0.0.0
VITE_HMR_HOST=5173--your-workspace-id.region.gitpod.dev
VITE_HMR_PORT=443
VITE_HMR_PROTOCOL=wss
DOCKER_PORT=8080
DOCKER_CONTAINER_NAME=hit-button-app
```

Set `VITE_HMR_HOST` to your Gitpod workspace URL for proper Hot Module Replacement.

### Example 4: GitHub Codespaces

```env
VITE_PORT=5173
VITE_HOST=0.0.0.0
VITE_HMR_HOST=your-codespace-name-5173.githubpreview.dev
VITE_HMR_PORT=443
VITE_HMR_PROTOCOL=wss
DOCKER_PORT=8080
DOCKER_CONTAINER_NAME=hit-button-app
```

## Important Notes

- **`.env` is gitignored** - Your local configuration won't be committed to version control
- **`.env.example` is tracked** - This serves as a template for other developers
- **Restart required** - After changing `.env`, restart the dev server or rebuild Docker containers
- **Docker Compose** - Automatically reads `.env` file from the project root
- **Vite** - Automatically loads `.env` during development and build

## Verifying Configuration

After setting up your `.env` file, verify it's working:

```bash
# For development server
npm run dev
# Check the output for the correct port

# For Docker
docker compose up -d
docker compose ps
# Check the PORTS column for the correct port mapping
```

## Troubleshooting

### Port Already in Use

If you see an error like "Port 5173 is already in use":

1. Change `VITE_PORT` in `.env` to a different port
2. Restart the dev server

### HMR Not Working in Cloud Environment

If Hot Module Replacement doesn't work in Gitpod/Codespaces:

1. Set `VITE_HMR_HOST` to your workspace URL
2. Ensure `VITE_HMR_PROTOCOL` is set to `wss`
3. Restart the dev server

### Docker Container Name Conflict

If you see "container name already in use":

1. Change `DOCKER_CONTAINER_NAME` in `.env`
2. Or stop the existing container: `docker stop hit-button-app`
