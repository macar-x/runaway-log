# Testing RunawayLog

This document describes the testing strategy, tools, and practices used in the RunawayLog project. It provides guidance for developers on how to write and run tests effectively.

## Testing Strategy

RunawayLog uses a multi-layered testing approach to ensure the application's quality and reliability:

1. **Unit Tests**: Test individual functions and components in isolation
2. **Integration Tests**: Test interactions between components
3. **End-to-End (E2E) Tests**: Coming soon with Playwright

## Testing Tools

### Test Framework

- **Vitest** - Next-generation testing framework
  - Compatible with Jest syntax
  - Fast test execution
  - Built-in TypeScript support
  - Works seamlessly with Vite
  - Lightweight and focused

### Testing Libraries

- **React Testing Library** - Testing utilities for React components
  - Focuses on testing components from the user's perspective
  - Encourages good testing practices
  - Works well with Vitest
  - Accessibility-focused

- **Jest DOM** - Custom Jest matchers for DOM elements
  - Makes assertions about DOM nodes easier to write and read
  - Integration with React Testing Library
  - Provides descriptive error messages

- **User Event** - Simulates user interactions in tests
  - More realistic than fireEvent
  - Supports complex user flows
  - Integration with React Testing Library
  - Simulates real user behavior

## Test Organization

### Test Files

Test files are organized in the `src/test/` directory, with a naming convention that matches the file being tested:

```
src/test/
├── quotes.test.ts    # Tests for quotes functionality
├── setup.ts          # Test setup configuration
├── storage.test.ts   # Tests for storage functionality
└── timezone.test.ts  # Tests for timezone functionality
```

### Test Coverage

The project aims for high test coverage, especially for core functionality:

- **Core Modules**: Storage, timezone, quotes utilities
- **Critical Components**: Hit recording, data persistence
- **Edge Cases**: Offline functionality, error handling
- **User Flows**: Main user interactions

## Running Tests

### Basic Test Commands

```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode (re-run on file changes)
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run a specific test file
npm test src/test/quotes.test.ts

# Run tests matching a pattern
npm test -- quotes
```

### Test Coverage

To generate a test coverage report:

```bash
npm run test:coverage
```

This will create a coverage report in the `coverage/` directory, which includes:
- Overall coverage percentage
- Coverage by file
- Coverage by function
- Coverage by line
- HTML report for easy visualization

## Writing Tests

### Unit Tests

Unit tests focus on testing individual functions or components in isolation.

#### Testing Utility Functions

```typescript
// Example: Testing a utility function
import { describe, it, expect } from 'vitest';
import { getRandomQuote } from '../quotes';

describe('quotes', () => {
  it('should return a quote object', () => {
    const quote = getRandomQuote();
    expect(quote).toHaveProperty('text');
    expect(quote).toHaveProperty('author');
    expect(typeof quote.text).toBe('string');
    expect(typeof quote.author).toBe('string');
  });

  it('should return different quotes on subsequent calls', () => {
    const quote1 = getRandomQuote();
    const quote2 = getRandomQuote();
    expect(quote1).not.toEqual(quote2);
  });
});
```

#### Testing React Components

```typescript
// Example: Testing a React component
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HitCalendar } from '../components/HitCalendar';

describe('HitCalendar', () => {
  it('should render the calendar component', () => {
    render(<HitCalendar hits={[]} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('should display the correct number of hits', () => {
    const mockHits = [
      { id: '1', timestamp: Date.now(), date: '2023-01-01', quote: 'Test quote' }
    ];
    render(<HitCalendar hits={mockHits} />);
    const hitCells = screen.getAllByRole('gridcell');
    // Assert that the calendar shows the correct hit
  });
});
```

### Integration Tests

Integration tests focus on testing interactions between components.

```typescript
// Example: Integration test
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from '../App';

describe('App Integration', () => {
  it('should record a hit when the Run button is clicked', () => {
    render(<App />);
    const runButton = screen.getByText('Run');
    fireEvent.click(runButton);
    // Assert that a hit was recorded
    // Check that the statistics updated
    // Verify that the calendar updated
  });
});
```

## Test Setup

### Test Environment

The test environment is configured in `src/test/setup.ts`:

```typescript
// src/test/setup.ts
import '@testing-library/jest-dom/vitest';

// Mock localStorage for testing
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});
```

### Vitest Configuration

Vitest is configured in `vitest.config.ts`:

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/main.tsx', 'src/test/**/*'],
    },
  },
});
```

## Best Practices

### Writing Effective Tests

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it's implemented
2. **Use Descriptive Test Names**: Clearly describe what the test is checking
3. **Test Edge Cases**: Test empty states, error conditions, and boundary values
4. **Keep Tests Independent**: Tests should not depend on each other
5. **Mock External Dependencies**: Mock APIs, localStorage, and other external dependencies
6. **Test Accessibility**: Use ARIA roles and accessible queries
7. **Keep Tests Fast**: Avoid slow tests that make the test suite sluggish

### Component Testing Best Practices

- **Use Render from React Testing Library**: Avoid shallow rendering
- **Use User Event for Interactions**: Simulate real user behavior
- **Test Accessibility**: Use accessible queries like `getByRole`
- **Avoid Testing Implementation Details**: Don't test component internal state directly
- **Test User Flows**: Test the main user interactions

### Mocking Best Practices

- **Mock Only What's Necessary**: Don't over-mock
- **Use Jest's Mock Functions**: For mocking functions
- **Mock External Services**: For APIs and other external dependencies
- **Reset Mocks Between Tests**: Ensure tests are independent

## Debugging Tests

### Debugging in VS Code

1. Use the existing debug configuration in `.vscode/launch.json`
2. Set breakpoints in your test files
3. Run the debug configuration (F5)
4. VS Code will stop at your breakpoints

### Debugging with Console Logs

```typescript
// Example: Debugging with console logs
it('should return a quote object', () => {
  const quote = getRandomQuote();
  console.log('Quote:', quote); // Add debug log
  expect(quote).toHaveProperty('text');
  expect(quote).toHaveProperty('author');
});
```

## Continuous Integration

Coming soon: GitHub Actions workflow for running tests on every pull request.

## Test Coverage Goals

- **Core Utilities**: >90% coverage
- **Components**: >80% coverage
- **Critical User Flows**: 100% coverage
- **Overall**: >85% coverage

## Common Test Scenarios

### Testing localStorage

```typescript
// Example: Testing localStorage interaction
import { describe, it, expect, beforeEach } from 'vitest';
import { saveUserData, loadUserData } from '../utils/storage';

describe('storage', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should save and load user data', () => {
    const userData = {
      username: 'testuser',
      hits: [{ id: '1', timestamp: Date.now(), date: '2023-01-01', quote: 'Test quote' }],
    };

    saveUserData(userData);
    const loadedData = loadUserData('testuser');

    expect(loadedData).toEqual(userData);
  });
});
```

### Testing React Context

```typescript
// Example: Testing React Context
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ModeContext } from '../contexts/ModeContext';

const TestComponent = () => {
  const { mode } = useContext(ModeContext);
  return <div data-testid="mode">{mode}</div>;
};

describe('ModeContext', () => {
  it('should provide the default mode', () => {
    render(
      <ModeContext.Provider value={{ mode: 'free', setMode: () => {} }}>
        <TestComponent />
      </ModeContext.Provider>
    );

    const modeElement = screen.getByTestId('mode');
    expect(modeElement).toHaveTextContent('free');
  });
});
```

## Conclusion

Testing is an essential part of the RunawayLog development process, ensuring the application's quality, reliability, and maintainability. By following the testing strategy, using the recommended tools, and adhering to best practices, developers can write effective tests that catch bugs early and improve the overall quality of the application.

Remember, the goal of testing is not just to achieve high coverage, but to ensure that the application works correctly for users in real-world scenarios. Focus on testing the most critical functionality and user flows, and always consider the user's perspective when writing tests.
