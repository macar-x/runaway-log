# Deployment Guide

This guide covers deploying RunawayLog using Docker and setting up CI/CD pipelines.

## Docker Deployment

### Prerequisites

- Docker
- Docker Compose (recommended)

### Using Docker Compose (Recommended)

Docker Compose provides the easiest way to deploy the application.

```bash
# Build and start the container
docker compose up -d

# View logs
docker compose logs -f

# Stop the container
docker compose down

# Rebuild after code changes
docker compose up -d --build
```

The app will be available at `http://localhost:8080` (or the port specified in `.env`).

### Using Docker CLI

For more control or when Docker Compose is not available:

```bash
# Build the image
docker build -t hit-button-app .

# Run the container
docker run -d -p 8080:80 --name hit-button-app hit-button-app

# View logs
docker logs -f hit-button-app

# Stop the container
docker stop hit-button-app

# Remove the container
docker rm hit-button-app

# Remove the image
docker rmi hit-button-app
```

### Custom Port Configuration

To run on a different port:

```bash
# Using Docker Compose (edit .env)
echo "DOCKER_PORT=3000" >> .env
docker compose up -d

# Using Docker CLI
docker run -d -p 3000:80 --name hit-button-app hit-button-app
```

### Docker Image Details

- **Base Image:** nginx:alpine
- **Size:** ~53MB
- **Build Type:** Multi-stage (Node.js builder + Nginx runtime)
- **Health Check:** Enabled (checks every 30s)

## Production Build (Without Docker)

To build static files for deployment to any web server:

```bash
# Build production assets
npm run build

# Output directory
ls dist/
```

Deploy the `dist/` directory to:
- Nginx
- Apache
- Netlify
- Vercel
- GitHub Pages
- Any static file hosting service

### Nginx Configuration Example

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
```

## CI/CD Integration

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Build Docker image
        run: docker build -t hit-button-app .
      
      - name: Push to registry
        if: github.ref == 'refs/heads/main'
        run: |
          echo "${{ secrets.DOCKER_PASSWORD }}" | docker login -u "${{ secrets.DOCKER_USERNAME }}" --password-stdin
          docker tag hit-button-app ${{ secrets.DOCKER_USERNAME }}/hit-button-app:latest
          docker push ${{ secrets.DOCKER_USERNAME }}/hit-button-app:latest
```

### GitLab CI

Create `.gitlab-ci.yml`:

```yaml
stages:
  - build
  - test
  - deploy

variables:
  DOCKER_IMAGE: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA

build:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker build -t $DOCKER_IMAGE .
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker push $DOCKER_IMAGE

test:
  stage: test
  image: node:20-alpine
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/

deploy:
  stage: deploy
  image: docker:latest
  only:
    - main
  script:
    - docker pull $DOCKER_IMAGE
    - docker tag $DOCKER_IMAGE $CI_REGISTRY_IMAGE:latest
    - docker push $CI_REGISTRY_IMAGE:latest
    # Deploy to your server
    - ssh user@server "docker pull $CI_REGISTRY_IMAGE:latest && docker compose up -d"
```

### Jenkins Pipeline

Create `Jenkinsfile`:

```groovy
pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = "hit-button-app"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm ci'
                sh 'npm run build'
            }
        }
        
        stage('Docker Build') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                sh 'docker compose up -d --build'
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
}
```

## Cloud Platform Deployment

### Heroku

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Deploy using container
heroku container:push web
heroku container:release web

# Open app
heroku open
```

### AWS ECS

1. Push image to ECR
2. Create ECS task definition
3. Create ECS service
4. Configure load balancer

### Google Cloud Run

```bash
# Build and push to GCR
gcloud builds submit --tag gcr.io/PROJECT_ID/hit-button-app

# Deploy to Cloud Run
gcloud run deploy hit-button-app \
  --image gcr.io/PROJECT_ID/hit-button-app \
  --platform managed \
  --port 80 \
  --allow-unauthenticated
```

## Health Checks

The Docker container includes a health check that runs every 30 seconds:

```bash
# Check container health
docker inspect --format='{{.State.Health.Status}}' hit-button-app

# View health check logs
docker inspect --format='{{json .State.Health}}' hit-button-app | jq
```

## Monitoring

### Docker Stats

```bash
# Real-time resource usage
docker stats hit-button-app

# Container logs
docker logs -f --tail 100 hit-button-app
```

### Log Management

For production, consider:
- **ELK Stack** (Elasticsearch, Logstash, Kibana)
- **Grafana + Loki**
- **CloudWatch** (AWS)
- **Stackdriver** (GCP)

## Scaling

### Horizontal Scaling

```bash
# Using Docker Compose
docker compose up -d --scale hit-button-app=3

# Behind a load balancer (nginx, HAProxy, etc.)
```

### Kubernetes Deployment

Create `k8s/deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hit-button-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: hit-button-app
  template:
    metadata:
      labels:
        app: hit-button-app
    spec:
      containers:
      - name: hit-button-app
        image: hit-button-app:latest
        ports:
        - containerPort: 80
        livenessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 10
---
apiVersion: v1
kind: Service
metadata:
  name: hit-button-app
spec:
  selector:
    app: hit-button-app
  ports:
  - port: 80
    targetPort: 80
  type: LoadBalancer
```

## Security Best Practices

1. **Use specific image tags** instead of `latest`
2. **Scan images for vulnerabilities** using tools like Trivy
3. **Run containers as non-root user** (already configured in Nginx)
4. **Use secrets management** for sensitive data
5. **Enable HTTPS** in production with Let's Encrypt
6. **Set up firewall rules** to restrict access
7. **Regular updates** of base images and dependencies

## Troubleshooting

### Container Won't Start

```bash
# Check logs
docker logs hit-button-app

# Check container status
docker ps -a

# Inspect container
docker inspect hit-button-app
```

### Port Conflicts

```bash
# Find process using port
lsof -i :8080

# Use different port
docker run -d -p 9090:80 --name hit-button-app hit-button-app
```

### Build Failures

```bash
# Clear Docker cache
docker builder prune -a

# Rebuild without cache
docker build --no-cache -t hit-button-app .
```
