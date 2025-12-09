# Contribution Guidelines

Thank you for your interest in contributing to RunawayLog! We welcome contributions from the community, whether it's fixing bugs, adding new features, improving documentation, or suggesting enhancements.

This document provides guidelines for contributing to the project. Please take a moment to review these guidelines before submitting your contribution.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Pull Requests](#pull-requests)
- [Development Setup](#development-setup)
- [Coding Guidelines](#coding-guidelines)
  - [TypeScript](#typescript)
  - [React](#react)
  - [CSS](#css)
  - [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Style Guide](#style-guide)
- [License](#license)

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](code-of-conduct.md). Please read it before contributing to ensure a welcoming and inclusive environment for all.

## How Can I Contribute?

### Reporting Bugs

If you find a bug in the project, please report it by opening an issue on GitHub. When reporting bugs, please include:

- A clear and descriptive title
- A detailed description of the issue
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Your environment (browser, OS, etc.)

### Suggesting Enhancements

If you have an idea for a new feature or improvement, please open an issue on GitHub. When suggesting enhancements, please include:

- A clear and descriptive title
- A detailed description of the enhancement
- Use cases for the enhancement
- Any relevant examples or mockups
- How this enhancement would benefit the project

### Pull Requests

We welcome pull requests for bug fixes, new features, and improvements. Before submitting a pull request, please:

1. Fork the repository
2. Create a feature branch from `dev`
3. Make your changes
4. Test your changes thoroughly
5. Update documentation if needed
6. Ensure your code follows the project's style guide
7. Submit a pull request to the `dev` branch

## Development Setup

To set up a development environment, please refer to the [Development Setup](https://github.com/macar-x/runaway-log/blob/dev/docs/developer/development-setup.md) guide.

## Coding Guidelines

### TypeScript

- Use TypeScript for all new files
- Follow the existing type definitions
- Use interfaces for complex types
- Avoid using `any` unless absolutely necessary
- Add type annotations for function parameters and return types
- Use descriptive variable and function names

### React

- Use functional components with hooks
- Use TypeScript for component props
- Follow the existing component structure
- Use CSS modules for styling
- Keep components small and focused
- Use React Context for global state management
- Follow React best practices

### CSS

- Use CSS modules for scoped styling
- Use CSS variables for theming
- Follow the existing styling conventions
- Use responsive design principles
- Avoid inline styles
- Use descriptive class names

### Testing

- Write tests for new functionality
- Follow the existing test patterns
- Test edge cases
- Aim for high test coverage
- Use Vitest and React Testing Library

## Pull Request Process

1. **Fork the Repository**: Create your own fork of the project
2. **Create a Branch**: Create a feature branch from `dev`
3. **Make Changes**: Implement your changes with proper tests
4. **Run Tests**: Ensure all tests pass with `npm test`
5. **Run Lint**: Ensure your code passes linting with `npm run lint`
6. **Update Documentation**: Update relevant documentation if needed
7. **Submit PR**: Submit a pull request to the `dev` branch
8. **Code Review**: Wait for the maintainers to review your PR
9. **Address Feedback**: Make any requested changes
10. **Merge**: Once approved, your PR will be merged into `dev`

## Style Guide

### Code Style

- Use consistent indentation (2 spaces)
- Use semicolons
- Use single quotes for strings
- Use camelCase for variables and functions
- Use PascalCase for components and interfaces
- Keep lines under 120 characters
- Use descriptive comments when necessary

### Commit Messages

- Use clear and descriptive commit messages
- Start with a capital letter
- Use the imperative mood ("Add feature" not "Added feature")
- Limit the first line to 72 characters
- Use the body to explain what and why, not how

Example:

```
Add Close button to settings menu

This change adds a Close button to the settings menu for better usability on mobile devices. The button is placed at the end of the settings dropdown and uses the same styling as other action buttons.

Fixes #123
```

## License

By contributing to RunawayLog, you agree that your contributions will be licensed under the project's MIT License.

## Getting Help

If you have any questions or need help with your contribution, feel free to:

- Open an issue on GitHub
- Join the project's discussions
- Contact the maintainers

We appreciate all contributions and look forward to working with you! 🚀
