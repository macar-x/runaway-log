# Architecture Overview

This document explains how RunawayLog works in different environments and how ports are mapped.

## Port Configuration Explained

### Development Environment (npm run dev)

**Port:** 5173 (configurable via `VITE_PORT`)

```
User Browser → http://localhost:5173 → Vite Dev Server (Node.js)
```

- Vite runs a Node.js development server
- Serves source files directly with HMR (Hot Module Replacement)
- No nginx involved
- Fast refresh on code changes

**Configuration:** `vite.config.ts`

### Production Environment (Docker)

**Ports:** 8080 → 80 (configurable via `DOCKER_PORT`)

```
User Browser → http://localhost:8080 → Docker Port Mapping → Container Port 80 → Nginx
```

- Docker exposes port 8080 on your host machine
- Maps to port 80 inside the container
- Nginx listens on port 80 inside the container
- Serves pre-built static files from `/usr/share/nginx/html`

**Configuration:** `compose.yml` + `nginx.conf`

## When is nginx.conf Used?

The `nginx.conf` file is **ONLY used in the Docker container** (production environment).

### Docker Build Process

1. **Build Stage** (Node.js container):
   ```dockerfile
   FROM node:20-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build  # Creates dist/ folder
   ```

2. **Production Stage** (Nginx container):
   ```dockerfile
   FROM nginx:alpine
   COPY --from=builder /app/dist /usr/share/nginx/html  # Copy built files
   COPY nginx.conf /etc/nginx/conf.d/default.conf       # Copy nginx config
   EXPOSE 80                                             # Container listens on 80
   CMD ["nginx", "-g", "daemon off;"]                   # Start nginx
   ```

### What nginx.conf Does

```nginx
server {
    listen 80;                          # Nginx listens on port 80 INSIDE container
    server_name localhost;
    root /usr/share/nginx/html;         # Serve files from this directory
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;  # SPA routing: all routes → index.html
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;                     # Cache static assets for 1 year
        add_header Cache-Control "public, immutable";
    }

    gzip on;                            # Enable compression
    gzip_types text/plain text/css application/json application/javascript ...;
}
```

## Port Mapping Diagram

### Development (Vite)

```
┌─────────────┐
│   Browser   │
│ localhost:  │
│    5173     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Vite Server │
│  (Node.js)  │
│   Port:     │
│    5173     │
└─────────────┘
```

### Production (Docker)

```
┌─────────────┐
│   Browser   │
│ localhost:  │
│    8080     │  ← DOCKER_PORT (configurable in .env)
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│         Docker Container            │
│  ┌───────────────────────────────┐  │
│  │  Port Mapping: 8080 → 80      │  │
│  └───────────┬───────────────────┘  │
│              ▼                       │
│  ┌───────────────────────────────┐  │
│  │         Nginx Server          │  │
│  │      Listening on Port 80     │  │
│  │                               │  │
│  │  Serves: /usr/share/nginx/    │  │
│  │          html/                │  │
│  │  (Built files from dist/)     │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

## Why Different Ports?

### Port 5173 (Development)
- Default Vite port
- Commonly used for Vite projects
- Avoids conflicts with other common ports (3000, 8080)
- Can be changed via `VITE_PORT` in `.env`

### Port 80 (Inside Container)
- Standard HTTP port
- Nginx default
- No need to specify port in URLs inside container
- Health checks use `http://127.0.0.1:80`

### Port 8080 (Host Machine)
- Mapped from container port 80
- Avoids requiring root privileges (port 80 requires root on host)
- Common alternative HTTP port
- Can be changed via `DOCKER_PORT` in `.env`

## Configuration Files by Environment

| Environment | Config File | Port | Server |
|-------------|-------------|------|--------|
| Development | `vite.config.ts` | 5173 | Vite (Node.js) |
| Production (Docker) | `nginx.conf` | 80 (internal)<br>8080 (external) | Nginx |
| Production (Static) | Your web server config | Varies | Apache/Nginx/etc |

## Examples

### Change Development Port

Edit `.env`:
```env
VITE_PORT=3000
```

Run:
```bash
npm run dev
```

Access: `http://localhost:3000`

### Change Docker Port

Edit `.env`:
```env
DOCKER_PORT=9090
```

Run:
```bash
docker compose up -d
```

Access: `http://localhost:9090`

**Note:** The container still uses port 80 internally. Only the external mapping changes.

### Change Container Internal Port

If you need to change the port Nginx listens on inside the container:

1. Edit `nginx.conf`:
   ```nginx
   server {
       listen 8080;  # Changed from 80
       ...
   }
   ```

2. Edit `Dockerfile`:
   ```dockerfile
   EXPOSE 8080  # Changed from 80
   ```

3. Edit `compose.yml`:
   ```yaml
   ports:
     - "${DOCKER_PORT:-8080}:8080"  # Map to new internal port
   ```

4. Update health check in `compose.yml`:
   ```yaml
   healthcheck:
     test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://127.0.0.1:8080"]
   ```

## Static File Deployment (Without Docker)

If you deploy the built files to your own web server:

1. Build the app:
   ```bash
   npm run build
   ```

2. Copy `dist/` contents to your web server

3. Configure your web server (example for Nginx):
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /path/to/dist;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

The `nginx.conf` in the project is a reference, but you'll use your server's configuration.

## Summary

- **Development:** Vite server on port 5173 (configurable)
- **Docker Production:** Nginx on port 80 inside container, mapped to 8080 on host (configurable)
- **nginx.conf:** Only used inside Docker container
- **Port mapping:** `localhost:8080` → `container:80` → Nginx
- **Static deployment:** Use your own web server configuration

## Troubleshooting

### "Port 5173 already in use"
Change `VITE_PORT` in `.env` and restart dev server.

### "Port 8080 already in use"
Change `DOCKER_PORT` in `.env` and restart container.

### "Cannot access app in Docker"
Check port mapping: `docker compose ps` should show `0.0.0.0:8080->80/tcp`

### "nginx.conf changes not applied"
Rebuild Docker image: `docker compose up -d --build`
