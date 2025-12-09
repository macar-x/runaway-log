# Deploying RunawayLog

This document provides guidance on deploying RunawayLog in various environments. Whether you're deploying to a local server, a cloud platform, or a containerized environment, this guide will walk you through the process.

## Deployment Options

RunawayLog offers several deployment options depending on your needs:

1. **Local Development** - For development purposes
2. **Docker Deployment** - For containerized production environments
3. **Static Hosting** - For hosting on static site platforms
4. **Cloud Deployment** - For deploying to cloud platforms
5. **Self-Hosted Server** - For running on your own server

## Prerequisites

### For Local Development

- Node.js 20+ and npm 10+
- Git

### For Docker Deployment

- Docker 20+ and Docker Compose

### For Static Hosting

- A static hosting service (Vercel, Netlify, GitHub Pages, etc.)
- Build artifacts from `npm run build`

### For Cloud Deployment

- Cloud provider account (AWS, GCP, Azure, etc.)
- Knowledge of the specific cloud platform

## Local Development Deployment

For local development, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/macar-x/runaway-log.git
   cd runaway-log
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:5173`

## Docker Deployment

Docker is the recommended way to deploy RunawayLog for production environments. It provides a consistent, isolated environment and simplifies the deployment process.

### Using Docker Compose

1. **Clone the repository**:
   ```bash
   git clone https://github.com/macar-x/runaway-log.git
   cd runaway-log
   ```

2. **Start the container**:
   ```bash
   docker compose up -d
   ```

3. **Access the application**:
   Open your browser and navigate to `http://localhost:8080`

### Customizing the Docker Deployment

You can customize the Docker deployment by modifying the `compose.yml` file:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8080:80"  # Change the host port if needed
    restart: always
    # Add environment variables if needed
    # environment:
    #   - VITE_API_URL=https://api.runawaylog.example.com
```

### Building the Docker Image Manually

If you prefer to build the Docker image manually:

```bash
docker build -t runaway-log:latest .
docker run -d -p 8080:80 --name runaway-log runaway-log:latest
```

## Static Hosting Deployment

RunawayLog can be deployed as a static site on various hosting platforms.

### Building the Static Files

First, build the application for production:

```bash
npm install
npm run build
```

This will generate optimized static files in the `dist` directory.

### Deploying to Vercel

1. **Sign up for a Vercel account** at [vercel.com](https://vercel.com/)
2. **Install the Vercel CLI**:
   ```bash
   npm install -g vercel
   ```
3. **Deploy from the project directory**:
   ```bash
   vercel deploy
   ```
4. Follow the prompts to complete the deployment

### Deploying to Netlify

1. **Sign up for a Netlify account** at [netlify.com](https://netlify.com/)
2. **Install the Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```
3. **Deploy from the project directory**:
   ```bash
   netlify deploy --prod
   ```
4. Follow the prompts to complete the deployment

### Deploying to GitHub Pages

1. **Create a GitHub repository** for your project
2. **Build the application**:
   ```bash
   npm run build
   ```
3. **Install the gh-pages package**:
   ```bash
   npm install -D gh-pages
   ```
4. **Add a deploy script** to `package.json`:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```
5. **Deploy the application**:
   ```bash
   npm run deploy
   ```

## Cloud Deployment

### Deploying to AWS

1. **Create an S3 bucket** for hosting static files
2. **Enable static website hosting** on the bucket
3. **Build the application**:
   ```bash
   npm run build
   ```
4. **Upload the build artifacts** to the S3 bucket
5. **Configure a CloudFront distribution** for caching and HTTPS

### Deploying to Google Cloud Platform

1. **Create a Cloud Storage bucket** for hosting static files
2. **Enable static website hosting** on the bucket
3. **Build the application**:
   ```bash
   npm run build
   ```
4. **Upload the build artifacts** to the Cloud Storage bucket
5. **Configure a Cloud CDN** for caching and HTTPS

### Deploying to Azure

1. **Create a Storage account** for hosting static files
2. **Enable static website hosting** on the storage account
3. **Build the application**:
   ```bash
   npm run build
   ```
4. **Upload the build artifacts** to the storage account
5. **Configure a CDN profile** for caching and HTTPS

## Self-Hosted Server Deployment

### Apache Deployment

1. **Install Apache** on your server
2. **Build the application**:
   ```bash
   npm run build
   ```
3. **Copy the build artifacts** to the Apache document root:
   ```bash
   sudo cp -r dist/* /var/www/html/
   ```
4. **Configure Apache** to serve the static files
5. **Enable HTTPS** using Let's Encrypt

### Nginx Deployment

1. **Install Nginx** on your server
2. **Build the application**:
   ```bash
   npm run build
   ```
3. **Copy the build artifacts** to the Nginx document root:
   ```bash
   sudo cp -r dist/* /usr/share/nginx/html/
   ```
4. **Configure Nginx** to serve the static files
5. **Enable HTTPS** using Let's Encrypt

## Environment Variables

RunawayLog supports the following environment variables:

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `VITE_PORT` | The port the development server listens on | 5173 |
| `VITE_PWA_NAME` | The name of the PWA | "RunawayLog" |
| `VITE_PWA_SHORT_NAME` | Short name for the PWA | "RunawayLog" |
| `VITE_PWA_DESCRIPTION` | Description of the PWA | "Track your desire to escape the daily grind" |
| `VITE_API_URL` | API URL for Pro Mode | "https://api.runawaylog.example.com" |
| `VITE_WEBDAV_URL` | WebDAV URL for Pro Mode | "https://webdav.example.com" |

## SSL/TLS Configuration

It's strongly recommended to use HTTPS for all production deployments:

- Use Let's Encrypt for free SSL certificates
- Configure your web server or reverse proxy to use HTTPS
- Redirect all HTTP traffic to HTTPS
- Ensure your SSL certificates are properly renewed

## CORS Configuration

RunawayLog requires CORS configuration for certain features, especially for Pro Mode's remote storage functionality. Ensure your server is configured to send the appropriate CORS headers.

## Performance Optimization

### Caching

- Enable caching for static assets
- Use a CDN to cache content globally
- Configure proper cache control headers

### Compression

- Enable Gzip or Brotli compression for static assets
- Compress text-based assets (HTML, CSS, JavaScript)

### Minification

- The production build automatically minifies assets
- Ensure your web server is configured to serve compressed assets

## Monitoring and Maintenance

### Logging

- Configure your web server to log access and error logs
- Consider using a log management service for large deployments

### Updates

- Regularly update the application to the latest version
- Test updates in a staging environment before deploying to production
- Follow the release notes for any breaking changes

### Backup

- Regularly backup your Docker volumes or static files
- If using remote storage, ensure your data is backed up

## Security Considerations

- Keep your server and dependencies up to date
- Use HTTPS for all connections
- Implement proper access controls
- Regularly scan for vulnerabilities
- Follow security best practices for your specific deployment environment

## Scaling Considerations

RunawayLog is designed to be easily scalable:

- For static hosting, scaling is handled by the hosting provider
- For Docker deployments, you can scale horizontally by running multiple containers
- For self-hosted deployments, use a load balancer to distribute traffic

## Troubleshooting

### Common Deployment Issues

1. **Port Already in Use**
   - Change the host port in the `compose.yml` file
   - Check which process is using the port with `lsof -i :8080`

2. **Build Errors**
   - Ensure you have the correct Node.js version
   - Check the build logs for specific errors
   - Clear the `node_modules` directory and reinstall dependencies

3. **SSL Certificate Issues**
   - Ensure your SSL certificates are valid
   - Check the certificate chain
   - Verify the certificate matches the domain name

4. **CORS Errors**
   - Check your CORS configuration
   - Ensure the correct headers are being sent
   - Test with a CORS extension or tool

## Conclusion

RunawayLog is a flexible application that can be deployed in various environments. Whether you choose Docker, static hosting, or a cloud platform, this guide provides the necessary steps to get you up and running. Always follow best practices for security, performance, and maintenance to ensure a reliable deployment.
