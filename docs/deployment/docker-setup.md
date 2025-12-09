# Docker Setup for RunawayLog

This document provides detailed information about Docker deployment for RunawayLog, including configuration options, best practices, and troubleshooting tips.

## Why Use Docker?

Docker offers several benefits for deploying RunawayLog:

- **Consistent Environment**: Same environment across development, testing, and production
- **Isolation**: Applications run in isolated containers, reducing conflicts
- **Portability**: Deployable anywhere Docker is supported
- **Scalability**: Easy to scale horizontally by running multiple containers
- **Simplified Deployment**: Single command to start the application
- **Version Control**: Docker images can be versioned and rolled back if needed

## Prerequisites

- **Docker 20+**: Install from [Docker's official website](https://www.docker.com/)
- **Docker Compose**: Included with Docker Desktop
- **Git**: For cloning the repository

## Dockerfile Overview

The Dockerfile for RunawayLog uses a multi-stage build process to create an optimized production image:

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Multi-Stage Build Benefits

- **Smaller Image Size**: Only the production build artifacts are included in the final image
- **Improved Security**: No build dependencies in the final image
- **Faster Builds**: Leverages Docker's layer caching
- **Clean Separation**: Clear separation between build and production environments

## Docker Compose Configuration

The `compose.yml` file simplifies the Docker deployment process:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8080:80"
    restart: always
    # environment:
    #   - VITE_API_URL=https://api.runawaylog.example.com
    #   - VITE_WEBDAV_URL=https://webdav.example.com
```

## Basic Docker Deployment

### 1. Clone the Repository

```bash
git clone https://github.com/macar-x/runaway-log.git
cd runaway-log
```

### 2. Start the Container

```bash
docker compose up -d
```

This command will:
- Build the Docker image from the Dockerfile
- Start a container running the application
- Map port 8080 on your host to port 80 in the container
- Set the container to restart automatically on failure

### 3. Access the Application

Open your browser and navigate to `http://localhost:8080`

## Customizing the Docker Deployment

### Changing the Host Port

To change the host port, modify the `ports` section in `compose.yml`:

```yaml
ports:
  - "3000:80"  # Change host port to 3000
```

### Setting Environment Variables

Add environment variables to the `environment` section in `compose.yml`:

```yaml
environment:
  - VITE_API_URL=https://api.runawaylog.example.com
  - VITE_WEBDAV_URL=https://webdav.example.com
```

### Using a Custom Nginx Configuration

The Dockerfile uses a custom Nginx configuration file `nginx.conf` located in the project root. You can modify this file to customize the Nginx behavior:

```nginx
worker_processes auto;
events {
    worker_connections 1024;
}
http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    sendfile on;
    keepalive_timeout 65;
    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;
        location / {
            try_files $uri $uri/ /index.html;
        }
        gzip on;
        gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    }
}
```

## Docker Commands for Management

### Listing Containers

```bash
docker compose ps
```

### Viewing Container Logs

```bash
# View logs for all services
docker compose logs

# View logs for a specific service
docker compose logs app

# Follow logs in real-time
docker compose logs -f app
```

### Stopping Containers

```bash
docker compose down
```

### Restarting Containers

```bash
docker compose restart
```

### Rebuilding Images

```bash
# Rebuild all images
docker compose up -d --build

# Rebuild a specific image
docker compose up -d --build app
```

### Removing Containers and Images

```bash
# Remove containers, networks, and volumes
docker compose down -v

# Remove all unused images
docker image prune -a
```

## Production Best Practices

### Use Specific Image Tags

Instead of using `latest` tag, use specific versions for more deterministic deployments:

```yaml
# In compose.yml
services:
  app:
    image: runaway-log:1.0.0  # Use specific version tag
    build: .
```

### Implement Health Checks

Add health checks to ensure your container is healthy:

```yaml
# In compose.yml
services:
  app:
    build: .
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:80"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 5s
```

### Use Environment Files

Store environment variables in a `.env` file for better management:

```bash
# .env file
VITE_API_URL=https://api.runawaylog.example.com
VITE_WEBDAV_URL=https://webdav.example.com
```

```yaml
# In compose.yml
services:
  app:
    build: .
    env_file: .env
```

### Set Resource Limits

Limit the resources your container can use:

```yaml
# In compose.yml
services:
  app:
    build: .
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

### Use a Reverse Proxy

For production deployments, consider using a reverse proxy like Traefik or Nginx to handle:
- SSL termination
- Load balancing
- Rate limiting
- Request routing

### Configure Log Rotation

Configure log rotation for your containers:

```yaml
# In compose.yml
services:
  app:
    build: .
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

## Security Best Practices

### Run Containers as Non-Root User

Modify the Dockerfile to run the container as a non-root user:

```dockerfile
# Stage 2: Production
FROM nginx:alpine

# Create non-root user
RUN addgroup -g 1001 -S appuser && adduser -u 1001 -S appuser -G appuser

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# Change ownership of files
RUN chown -R appuser:appuser /usr/share/nginx/html /var/cache/nginx /var/run

# Switch to non-root user
USER appuser

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Scan Images for Vulnerabilities

Use Docker Scout or Trivy to scan your images for vulnerabilities:

```bash
# Using Docker Scout
docker scout cves .

# Using Trivy
trivy image runaway-log:latest
```

### Use Secrets Management

For sensitive data, use Docker Secrets or a dedicated secrets management service instead of environment variables:

```yaml
# In compose.yml
services:
  app:
    build: .
    secrets:
      - api_key
\secrets:
  api_key:
    file: ./api_key.txt
```

## Troubleshooting Docker Issues

### Container Fails to Start

1. **Check container logs**:
   ```bash
   docker compose logs app
   ```

2. **Verify port is not in use**:
   ```bash
   lsof -i :8080  # Check if port 8080 is in use
   ```

3. **Check Docker daemon status**:
   ```bash
sudo systemctl status docker
   ```

### Application Not Accessible

1. **Verify container is running**:
   ```bash
   docker compose ps
   ```

2. **Check port mapping**:
   ```bash
   docker port runaway-log-app-1  # Replace with your container name
   ```

3. **Test connection locally**:
   ```bash
   curl http://localhost:8080
   ```

### High Resource Usage

1. **Check container resource usage**:
   ```bash
   docker stats
   ```

2. **Optimize your application**:
   - Reduce memory usage
   - Optimize Nginx configuration
   - Set resource limits

### Build Failures

1. **Check build logs**:
   ```bash
   docker compose build --no-cache  # Build without cache to see all logs
   ```

2. **Verify dependencies**:
   - Ensure package.json is valid
   - Check Node.js version compatibility

## CI/CD Integration

### GitHub Actions Example

```yaml
# .github/workflows/docker-build.yml
name: Docker Build

on:
  push:
    branches: [ main ]
    tags: [ 'v*' ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Build the Docker image
      run: docker build . --file Dockerfile --tag runaway-log:$(date +%s)
    - name: Test the image
      run: docker run --rm -d -p 8080:80 runaway-log:$(date +%s)
```

### GitLab CI Example

```yaml
# .gitlab-ci.yml
build:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_TAG .
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_TAG
  only:
    - tags
```

## Conclusion

Docker provides a powerful and flexible way to deploy RunawayLog, offering benefits like consistent environments, isolation, and simplified deployment. By following the best practices outlined in this guide, you can ensure a secure, reliable, and scalable deployment for your production environment.

For more information about Docker, refer to the [official Docker documentation](https://docs.docker.com/).
