# RunawayLog Architecture

This document describes the system architecture and design of RunawayLog, providing a comprehensive overview of how the application is structured and how its components interact.

## System Architecture Overview

RunawayLog follows a modern, component-based architecture with a clear separation of concerns. The application is built as a single-page application (SPA) using React and TypeScript, with a Progressive Web App (PWA) layer for enhanced functionality.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     RunawayLog Application                     │
├─────────────────┬─────────────────┬───────────────────┬─────────┤
│    User        │    Core         │    Data           │    PWA  │
│    Interface   │    Logic        │    Management     │    Layer│
├─────────────────┼─────────────────┼───────────────────┼─────────┤
│  Components    │  Contexts       │  LocalStorage     │ Service │
│  Layouts       │  Hooks          │  Export/Import    │ Worker  │
│  Pages         │  Utils          │  Remote Storage   │ Manifest│
└─────────────────┴─────────────────┴───────────────────┴─────────┘
        │                    │                     │
        └────────────────────┼─────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Browser Environment                      │
├─────────────────┬─────────────────┬───────────────────┬─────────┤
│  DOM           │  LocalStorage   │  Service Worker   │  Cache  │
└─────────────────┴─────────────────┴───────────────────┴─────────┘
```

## Component Structure

### Core Components

RunawayLog uses a hierarchical component structure, with components organized by their functionality and purpose.

#### 1. Layout Components

- **Layout.tsx** - Main application layout with navigation
  - Contains the top navigation bar and main content area
  - Manages the overall page structure
  - Wraps all other components

#### 2. Navigation Components

- **Navigation.tsx** - Main navigation bar
  - Contains Settings and Logout buttons in Free Mode
  - Additional page links in Pro Mode
- **SettingsMenu.tsx** - Settings dropdown/menu
  - Handles user preferences and configurations
  - Contains theme selection, dark mode toggle, etc.
- **ModeToggle.tsx** - Free/Pro mode switcher
  - Controls which features are available
  - Manages mode state across the application

#### 3. Feature Components

- **Dashboard.tsx** - Main dashboard component
  - Displays statistics and summary information
  - Shows current streak and progress
- **HitCalendar.tsx** - Calendar heatmap component
  - Visualizes hit data over time
  - Supports multiple color themes
- **HitLogs.tsx** - Hit history component
  - Shows detailed log of all hits
  - Supports filtering and search
- **EmailPrompt.tsx** - Email input prompt
  - Collects user email for personalized experience
  - Handles user authentication flow
- **Statistics.tsx** - Detailed statistics component
  - Shows comprehensive analytics
  - Includes charts and visualizations

#### 4. Settings Components

- **ThemeSelector.tsx** - Theme selection dropdown
  - Allows users to change calendar themes
  - Saves preference to localStorage
- **PrintCalendar.tsx** - Print functionality component
  - Generates print-friendly calendar view
  - Handles print preview and formatting

### Page Components

In Pro Mode, RunawayLog uses a multi-page structure with the following pages:

- **Home.tsx** - Main tracking page (same as Free Mode)
- **GamesHub.tsx** - Entry point for all game modes
- **CardGame.tsx** - Card Drop game implementation
- **Storage.tsx** - Remote storage management
- **Releases.tsx** - Release notes and updates
- **About.tsx** - Project information and credits
- **Profile.tsx** - User profile and preferences

## Data Flow

### Hit Recording Flow

1. **User Interaction**: User clicks the "Run" button
2. **Animation Trigger**: anime.js animation plays
3. **Hit Creation**: 
   - Generate unique ID
   - Get current timestamp
   - Select random quote
   - Create hit object
4. **State Update**: Update React state with new hit
5. **LocalStorage Update**: Persist hit to localStorage
6. **UI Update**: 
   - Update statistics dashboard
   - Refresh calendar heatmap
   - Append to hit logs
7. **Feedback**: Show success animation and quote

### Data Persistence Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   User Action   │     │   React State   │     │  localStorage   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                        │                        │
        ├────────────────────────┼────────────────────────┤
        │                        ▼                        │
        │                ┌─────────────────┐                │
        │                │  saveUserData   │                │
        │                └─────────────────┘                │
        │                        │                        │
        └────────────────────────┼────────────────────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │  Data Saved     │
                        └─────────────────┘
```

### Remote Storage Flow (Pro Mode)

1. **User Configures Storage**: User sets up remote storage in settings
2. **Connection Established**: App connects to the selected storage provider
3. **Data Sync Trigger**: 
   - Automatic sync on app start
   - Manual sync via settings
   - Background sync for offline changes
4. **Data Serialization**: Convert hit data to JSON format
5. **Encryption**: Encrypt data if enabled
6. **Upload**: Send data to remote storage
7. **Confirmation**: Update UI to show sync status

## State Management

RunawayLog uses a combination of React Context API and component state for managing application state.

### Context API Usage

#### 1. Mode Context

- **Purpose**: Manages Free/Pro mode state
- **File**: `src/contexts/ModeContext.tsx`
- **Features**:
  - Mode toggle functionality
  - Mode state access across components
  - Persistence to localStorage
  - Conditional rendering of Pro features

#### 2. Theme Context

- **Purpose**: Manages dark/light theme state
- **Implementation**: Uses CSS variables and localStorage
- **Features**:
  - Theme toggle functionality
  - System preference detection
  - Smooth transitions

### Component State

- **Local Component State**: Used for component-specific state management
  - Form inputs
  - Animation states
  - UI interactions
- **State Lifting**: Shared state is lifted to common ancestors
- **Props Drilling**: Minimal props drilling through component hierarchy

## PWA Architecture

RunawayLog is designed as a Progressive Web App with the following architecture:

### Service Worker

- **Registration**: Automatically registered when the app loads
- **Caching Strategy**: 
  - Stale-while-revalidate for static assets
  - Network-first for dynamic content
- **Offline Support**: Allows the app to work without an internet connection
- **Background Sync**: Syncs data when connection is restored (Pro Mode)

### Web App Manifest

- **Purpose**: Defines how the app appears when installed on a device
- **Contents**:
  - App name and short name
  - Icons of various sizes
  - Theme colors
  - Display mode (standalone, fullscreen, etc.)
  - Orientation preferences

### PWA Features

- **Installability**: Can be installed on desktop and mobile devices
- **Offline Functionality**: Works without internet connection
- **Push Notifications**: Coming soon for streak reminders
- **Background Sync**: Syncs data when connection is restored

## Docker Architecture

### Container Structure

RunawayLog uses a multi-stage Docker build process for optimal performance:

#### Stage 1: Build

- **Base Image**: Node.js 20
- **Purpose**: Build the application for production
- **Steps**:
  - Install dependencies
  - Build the application with Vite
  - Generate static files

#### Stage 2: Production

- **Base Image**: Nginx Alpine
- **Purpose**: Serve the built application
- **Steps**:
  - Copy built files from previous stage
  - Configure Nginx
  - Expose port 80
  - Start Nginx server

### Docker Compose

- **File**: `docker-compose.yml`
- **Services**:
  - `app` - Main RunawayLog application
    - Builds from Dockerfile
    - Maps port 8080 to container port 80
    - Restart policy: always

### Network Configuration

- **Default Network**: Bridge network for container communication
- **Port Mapping**: Host port 8080 → Container port 80
- **Volume Mounts**: None (static files are built into the image)

## Code Structure

### Directory Organization

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
├── main.tsx         # React rendering entry
└── index.css        # Global styles and CSS variables
```

### Key Module Relationships

#### 1. Storage Module

- **File**: `src/utils/storage.ts`
- **Purpose**: Handles all localStorage operations
- **Functions**:
  - `loadUserData()` - Loads user data from localStorage
  - `saveUserData()` - Saves user data to localStorage
  - `addHit()` - Adds a new hit to user data
  - `exportData()` - Exports data as JSON
  - `importData()` - Imports data from JSON

#### 2. Timezone Module

- **File**: `src/utils/timezone.ts`
- **Purpose**: Manages timezone-related functionality
- **Functions**:
  - `getTimezones()` - Gets list of all timezones
  - `getCurrentTimestamp()` - Gets current timestamp
  - `timestampToDateString()` - Converts timestamp to date string
  - `getSavedTimezone()` - Gets saved timezone from localStorage
  - `saveTimezone()` - Saves timezone to localStorage

#### 3. Theme Module

- **File**: `src/themes.ts`
- **Purpose**: Manages calendar color themes
- **Functions**:
  - `applyTheme()` - Applies selected theme to calendar
  - `getThemeById()` - Gets theme by ID
  - `colorThemes` - Array of available themes

## Security Architecture

### Data Security

- **Local Storage**: All sensitive data is stored locally in the browser
- **No Backend**: No server-side storage of user data
- **Encryption**: Optional encryption for Pro Mode remote storage
- **Password Protection**: Coming soon for sensitive data

### Input Validation

- **Type Safety**: TypeScript ensures type safety for all inputs
- **Form Validation**: Basic validation for user inputs
- **Sanitization**: Input sanitization to prevent XSS attacks

### CORS Policy

- **No CORS Issues**: Since the app runs entirely in the browser
- **Remote Storage**: CORS headers configured for supported storage providers

## Performance Architecture

### Optimization Strategies

- **Code Splitting**: Vite automatically splits code into chunks
- **Lazy Loading**: Pro Mode pages are lazily loaded
- **Caching**: PWA service worker caches static assets
- **Optimized Animations**: GPU-accelerated animations with anime.js
- **Responsive Design**: Mobile-first approach for better performance

### Bundle Size Optimization

- **Tree Shaking**: Vite removes unused code
- **Minification**: Production builds are minified
- **Compression**: Gzip compression for static assets
- **Small Dependencies**: Carefully selected lightweight dependencies

## Scalability Considerations

### Horizontal Scaling

- **No Server Infrastructure**: Scales automatically with user base
- **Static Hosting**: Can be hosted on CDN for global distribution
- **Containerization**: Easy to deploy multiple instances if needed

### Vertical Scaling

- **Modular Design**: Components are designed for reusability
- **Feature Toggles**: Pro features can be easily enabled/disabled
- **Extensible Architecture**: Easy to add new features and game modes

## Testing Architecture

### Test Layers

1. **Unit Tests**: Test individual functions and components
2. **Integration Tests**: Test component interactions
3. **E2E Tests**: Coming soon with Playwright

### Test Coverage

- **Core Modules**: Storage, timezone, quotes utilities
- **Critical Components**: Hit recording, data persistence
- **Edge Cases**: Offline functionality, error handling

## Future Architecture Enhancements

- **WebAssembly**: For performance-critical game components
- **GraphQL**: For more flexible API communication in Pro Mode
- **Web Workers**: For background processing of complex tasks
- **Microfrontend Architecture**: For scaling to more complex features
- **Event-Driven Architecture**: For better handling of asynchronous events

## Conclusion

RunawayLog's architecture is designed for simplicity, performance, and scalability. The component-based design with clear separation of concerns makes it easy to maintain and extend, while the PWA layer provides enhanced functionality for users. The Docker containerization ensures consistent deployment across environments, and the TypeScript foundation ensures type safety and code quality.

This architecture provides a solid foundation for current features while allowing for future growth and expansion of the application.
