# RunawayLog Code Structure

This document describes the organization and structure of the RunawayLog codebase, helping developers understand how the application is organized and where to find specific components and functionality.

## Project Root Structure

```
runaway-log/
├── .devcontainer/       # VS Code Dev Container configuration
├── docs/                # Documentation and wiki
├── public/              # Static assets served directly
├── src/                 # Main source code
├── .dockerignore        # Files to ignore for Docker builds
├── .env.example         # Example environment variables
├── .eslintrc.js         # ESLint configuration
├── .gitignore           # Files to ignore for Git
├── Dockerfile           # Dockerfile for production builds
├── LICENSE              # License file
├── README.md            # Project README (English)
├── README_ZHC.md        # Project README (Simplified Chinese)
├── README_ZHT.md        # Project README (Traditional Chinese)
├── compose.yml          # Docker Compose configuration
├── index.html           # HTML template
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── vitest.config.ts     # Vitest configuration
```

## Source Code Structure

The main source code is located in the `src/` directory, which is organized into several subdirectories based on functionality.

```
src/
├── assets/          # Static assets (images, icons, etc.)
├── components/      # Reusable UI components
├── contexts/        # React Context API providers
├── pages/           # Application pages (Pro Mode)
├── test/            # Test files
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── App.css          # Main application styles
├── App.tsx          # Application entry point
├── darkMode.ts      # Dark mode functionality
├── exportImport.ts  # Data export/import functionality
├── index.css        # Global styles and CSS variables
├── main.tsx         # React rendering entry
├── quotes.ts        # Motivational quotes
├── themes.ts        # Calendar color themes
└── timezone.ts      # Timezone handling
```

## Directory Breakdown

### assets/

Contains static assets that are imported and used within the application:

- `react.svg` - React logo used in the About page
- Additional images, icons, and other static files

### components/

Reusable UI components that make up the application's interface:

```
components/
├── Dashboard.css      # Dashboard component styles
├── Dashboard.tsx      # Main dashboard with statistics
├── EmailPrompt.css    # Email input prompt styles
├── EmailPrompt.tsx    # Email input component
├── HitCalendar.css    # Calendar heatmap styles
├── HitCalendar.tsx    # Calendar heatmap component
├── HitLogs.css        # Hit history logs styles
├── HitLogs.tsx        # Hit history component
├── Layout.tsx         # Main application layout
├── Login.css          # Login component styles
├── Login.tsx          # Login component
├── ModeToggle.css     # Mode toggle styles
├── ModeToggle.tsx     # Free/Pro mode switcher
├── Navigation.css     # Navigation bar styles
├── Navigation.tsx     # Top navigation component
├── PrintCalendar.css  # Print calendar styles
├── PrintCalendar.tsx  # Print calendar functionality
├── SettingsMenu.css   # Settings menu styles
├── SettingsMenu.tsx   # Settings dropdown menu
├── Statistics.css     # Statistics component styles
├── Statistics.tsx     # Detailed statistics view
├── ThemeSelector.css  # Theme selector styles
└── ThemeSelector.tsx  # Theme selection component
```

### contexts/

React Context API providers for state management:

```
contexts/
└── ModeContext.tsx    # Manages Free/Pro mode state
```

### pages/

Application pages, primarily used in Pro Mode:

```
pages/
├── games/            # Game-related pages
│   ├── CardGame.tsx  # Card Drop game
│   ├── GamesHub.css  # Games hub styles
│   └── GamesHub.tsx  # Games hub entry point
├── About.tsx         # About page
├── Home.tsx          # Main home page (same as Free Mode)
├── Profile.css       # Profile page styles
├── Profile.tsx       # User profile page
├── Releases.tsx      # Release notes page
└── Storage.tsx       # Remote storage management
```

### test/

Test files and setup:

```
test/
├── quotes.test.ts    # Tests for quotes functionality
├── setup.ts          # Test setup configuration
├── storage.test.ts   # Tests for storage functionality
└── timezone.test.ts  # Tests for timezone functionality
```

### types/

TypeScript type definitions:

```
types/
└── mode.ts           # Type definitions for app mode
```

### utils/

Utility functions for various purposes:

```
utils/
├── gravatar.ts       # Gravatar generation utilities
```

## Core Files

### App.tsx

The main application component that serves as the entry point for the React application. It sets up the routes, context providers, and main layout.

### main.tsx

The React rendering entry point that mounts the App component to the DOM. It also handles service worker registration for PWA functionality.

### darkMode.ts

Handles dark/light theme management, including:
- Theme state management
- CSS variable updates
- System preference detection
- Theme persistence to localStorage

### exportImport.ts

Handles data export and import functionality:
- Exporting user data as JSON
- Importing data from JSON files
- Validating imported data

### quotes.ts

Manages the collection of motivational quotes:
- Array of quotes about freedom and escape
- Function to get a random quote
- Quote selection logic

### themes.ts

Handles calendar color themes:
- Array of available themes with color definitions
- Functions to apply themes to the calendar
- Theme selection and persistence

### timezone.ts

Manages timezone-related functionality:
- List of supported timezones
- Current timestamp generation
- Timestamp to date string conversion
- Timezone persistence

## Key Module Relationships

### Data Flow

```
User Interaction → Component → Utility Function → localStorage
               ↓
          State Update → UI Update
```

### Component Hierarchy

```
App
├── Layout
│   ├── Navigation
│   └── Main Content
│       ├── Dashboard
│       ├── HitCalendar
│       └── HitLogs
└── Context Providers
    └── ModeContext
```

## Code Organization Principles

1. **Component-Based Architecture**: The application is built using React components, each responsible for a specific piece of UI functionality.

2. **Separation of Concerns**: Different aspects of the application are separated into different files and directories:
   - UI components in `components/`
   - State management in `contexts/`
   - Utility functions in various top-level files
   - Pages in `pages/`

3. **Type Safety**: The entire codebase uses TypeScript for type safety, with type definitions in `types/` and inline type annotations.

4. **Responsive Design**: All components are designed to work well on both desktop and mobile devices.

5. **Theming Support**: The application supports both light and dark modes, with CSS variables used for theming.

6. **PWA Support**: The application is a Progressive Web App with offline functionality and installability.

## File Naming Conventions

- **Components**: PascalCase with `.tsx` extension (e.g., `HitCalendar.tsx`)
- **Styles**: Same name as component with `.css` extension (e.g., `HitCalendar.css`)
- **Utility Files**: camelCase with `.ts` extension (e.g., `darkMode.ts`)
- **Type Definitions**: PascalCase with `.ts` extension (e.g., `mode.ts`)
- **Test Files**: Same name as the file being tested with `.test.ts` extension (e.g., `quotes.test.ts`)

## Code Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Use interfaces for complex types
- Avoid using `any` unless absolutely necessary
- Use type inference when possible
- Add type annotations for function parameters and return types

### React

- Use functional components with hooks
- Use React Context for global state management
- Use CSS modules for component styling
- Keep components small and focused on a single responsibility
- Use descriptive component names

### CSS

- Use CSS modules for scoped styling
- Use CSS variables for theming
- Follow a consistent naming convention (BEM or similar)
- Use responsive design principles
- Avoid inline styles

## Module Organization

### Reusable Components

Components that are used in multiple places should be placed in the `components/` directory and designed to be reusable.

### Page Components

Components that represent entire pages should be placed in the `pages/` directory.

### Utility Functions

Functions that are used across multiple components should be placed in appropriate utility files.

### State Management

Global state should be managed using React Context API, with context providers in the `contexts/` directory.

## Testing Strategy

- **Unit Tests**: Test individual functions and components in isolation
- **Integration Tests**: Test interactions between components
- **E2E Tests**: Coming soon with Playwright
- **Test Coverage**: Aim for high coverage of core functionality

## Build Process

The application uses Vite for building:

1. **Development**: `npm run dev` starts the development server with HMR
2. **Production**: `npm run build` creates an optimized production build
3. **Preview**: `npm run preview` previews the production build locally

## Deployment Process

1. **Docker Build**: `docker compose up -d` builds and runs the application in a Docker container
2. **Static Hosting**: The production build can be deployed to any static hosting service
3. **CI/CD**: Coming soon with GitHub Actions

## Conclusion

The RunawayLog codebase is organized in a clear and logical manner, with separate directories for components, pages, contexts, and utilities. This organization makes it easy for developers to find and modify code, and promotes reusability and maintainability. By following the established conventions and principles, developers can contribute effectively to the project and ensure a consistent codebase.
