# Development Setup Guide

This guide will walk you through setting up a development environment for RunawayLog. Whether you prefer to work locally or with Docker, we've got you covered.

## Prerequisites

### For Local Development

- **Node.js** - Version 20 or higher
  - Download from [Node.js official website](https://nodejs.org/)
  - Includes npm (Node Package Manager)

- **Git** - Version control system
  - Download from [Git official website](https://git-scm.com/)
  - Configure your Git user name and email

- **IDE** - Recommended: Visual Studio Code
  - Download from [VS Code official website](https://code.visualstudio.com/)
  - Recommended extensions:
    - ESLint
    - Prettier
    - TypeScript Vue Plugin (Volar)
    - Docker
    - GitLens

### For Docker Development

- **Docker** - Version 20 or higher
  - Download from [Docker official website](https://www.docker.com/)
  - Includes Docker Compose

## Option 1: Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/macar-x/runaway-log.git
cd runaway-log
```

### 2. Install Dependencies

```bash
npm install
```

This will install all the required dependencies listed in the `package.json` file.

### 3. Configure Environment Variables (Optional)

Copy the example environment file and modify it if needed:

```bash
cp .env.example .env
```

The default configuration should work for most cases, but you can adjust the variables if needed:

```
# Server Configuration
VITE_PORT=5173

# PWA Configuration
VITE_PWA_NAME="RunawayLog"
VITE_PWA_SHORT_NAME="RunawayLog"
VITE_PWA_DESCRIPTION="Track your desire to escape the daily grind"

# API Configuration (Pro Mode)
VITE_API_URL="https://api.runawaylog.example.com"
VITE_WEBDAV_URL="https://webdav.example.com"
```

### 4. Start the Development Server

```bash
npm run dev
```

The development server will start and you can access the application at:

```
http://localhost:5173
```

The server includes Hot Module Replacement (HMR), which means changes to your code will be automatically reflected in the browser without needing to refresh.

### 5. Verify the Setup

- Open your browser and navigate to `http://localhost:5173`
- You should see the RunawayLog application running
- Try clicking the "Run" button to verify basic functionality
- Open the developer tools in your browser to check for any errors

## Option 2: Docker Development

### 1. Clone the Repository

```bash
git clone https://github.com/macar-x/runaway-log.git
cd runaway-log
```

### 2. Build and Run with Docker Compose

```bash
docker compose up -d
```

This command will:
- Build the Docker image from the Dockerfile
- Start a container running the application
- Map port 8080 on your host to port 80 in the container

### 3. Access the Application

Once the container is running, you can access the application at:

```
http://localhost:8080
```

### 4. Stop the Container

To stop the running container:

```bash
docker compose down
```

### 5. Rebuild the Image (if needed)

If you make changes to the code or Dockerfile, you'll need to rebuild the image:

```bash
docker compose up -d --build
```

## Option 3: VS Code Dev Containers

If you're using Visual Studio Code, you can use the Dev Containers extension for a seamless Docker development experience.

### 1. Install the Dev Containers Extension

- Open VS Code
- Go to the Extensions view (Ctrl+Shift+X)
- Search for "Dev Containers"
- Install the extension from Microsoft

### 2. Open the Project in a Dev Container

- Open the project folder in VS Code
- You should see a notification asking if you want to reopen the folder in a dev container
- Click "Reopen in Container"
- VS Code will build the container and connect to it

### 3. Start the Development Server

Once connected to the dev container:

```bash
npm run dev
```

### 4. Access the Application

The application will be available at `http://localhost:5173`

## Development Workflow

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui
```

### Building for Production

```bash
npm run build
```

This will create an optimized production build in the `dist` directory.

### Previewing the Production Build

```bash
npm run preview
```

This will start a local server to preview the production build.

### Running Lint Checks

```bash
npm run lint
```

This will run ESLint to check for code quality issues.

### Running Type Checks

```bash
tsc --noEmit
```

This will run the TypeScript compiler to check for type errors.

## Project Structure

```
runaway-log/
├── .devcontainer/       # VS Code Dev Container configuration
├── docs/                # Documentation (this wiki)
├── public/              # Static assets
├── src/                 # Source code
│   ├── assets/          # Images, icons, etc.
│   ├── components/      # React components
│   ├── contexts/        # React Context providers
│   ├── pages/           # Application pages (Pro Mode)
│   ├── test/            # Test files
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── .dockerignore        # Files to ignore for Docker builds
├── .env.example         # Example environment variables
├── .eslintrc.js         # ESLint configuration
├── .gitignore           # Files to ignore for Git
├── Dockerfile           # Dockerfile for production builds
├── LICENSE              # License file
├── README.md            # Project README
├── compose.yml          # Docker Compose configuration
├── index.html           # HTML template
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── vitest.config.ts     # Vitest configuration
```

## Coding Guidelines

### TypeScript

- Use TypeScript for all new files
- Follow the existing type definitions
- Use interfaces for complex types
- Avoid using `any` unless absolutely necessary

### React

- Use functional components with hooks
- Use TypeScript for component props
- Follow the existing component structure
- Use CSS modules for styling
- Keep components small and focused

### CSS

- Use CSS modules for scoped styling
- Use CSS variables for theming
- Follow the existing styling conventions
- Use responsive design principles
- Avoid inline styles

### Testing

- Write tests for new functionality
- Follow the existing test patterns
- Test edge cases
- Aim for high test coverage

## Debugging

### Debugging in Chrome

1. Start the development server with `npm run dev`
2. Open Chrome and navigate to `http://localhost:5173`
3. Open Chrome DevTools (F12)
4. Go to the Sources tab
5. Find your TypeScript files under `localhost:5173/src/`
6. Set breakpoints and debug as needed

### Debugging in VS Code

1. Install the Debugger for Chrome extension
2. Use the existing debug configuration in `.vscode/launch.json`
3. Start the development server with `npm run dev`
4. Press F5 to start debugging in VS Code
5. VS Code will connect to Chrome and you can debug directly in the editor

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the port in `.env` file or kill the process using the port
   - For local development: `VITE_PORT=5174`
   - For Docker: Change the port mapping in `compose.yml`

2. **Dependencies not installing correctly**
   - Try removing `node_modules` and `package-lock.json` then reinstalling
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Type errors during build**
   - Check the TypeScript errors and fix them
   - Use `tsc --noEmit` to check for type errors

4. **Docker build failing**
   - Check the Dockerfile for errors
   - Make sure you have the latest Docker version
   - Try building with `--no-cache` to avoid using cached layers
   ```bash
   docker compose up -d --build --no-cache
   ```

## Next Steps

Now that you have your development environment set up, you're ready to start contributing to RunawayLog!

- Check out the [Code Structure](code-structure.md) guide to understand the codebase better
- Read the [Testing](testing.md) guide to learn how to write tests
- Look at the [Roadmap](contribution/roadmap.md) to find tasks you can work on
- Join the [GitHub Discussions](https://github.com/macar-x/runaway-log/discussions) to connect with other contributors

Happy coding! 🚀
