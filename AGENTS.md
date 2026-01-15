# AGENTS.md - Repository Guidelines for Coding Agents

This document provides comprehensive guidelines for agentic coding agents working in this React FSM demonstration repository.

## Project Overview

This is a dual-purpose repository containing:
1. **Slidev presentation** (`/`) - FSM concepts presentation using Slidev
2. **React demo frontend** (`/demo-fe/`) - Interactive FSM game control demonstration

The demo frontend showcases a finite-state machine implementation for game state management using React 19, TypeScript, Vite, and Tailwind CSS.

## Development Commands

### Root Directory (Slidev Presentation)
```bash
# Development server
npm run dev

# Build for production
npm run build

# Export to PDF/PNG
npm run export
```

### Demo Frontend (`/demo-fe/`)
```bash
# Development server (uses Bun runtime)
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

### Testing
Currently no test framework is configured. When adding tests:
- Use Vitest for unit testing (recommended for Vite projects)
- Use React Testing Library for component tests
- Place test files alongside source files with `.test.ts` or `.spec.ts` suffix

## Code Style Guidelines

### TypeScript Configuration
- **Strict mode enabled**: All TypeScript strict rules are enforced
- **Target**: ES2022 (app), ES2023 (node config)
- **Module system**: ESNext with bundler resolution
- **JSX**: React-JSX transform (no `React` import needed for JSX)
- **Path aliases**: `@/*` maps to `./src/*`

### Import Organization
```typescript
// 1. External libraries (React, third-party)
import { useReducer, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Square } from "lucide-react";

// 2. Internal modules (relative imports)
import { GameControl } from "./component";
```

### Component Structure
```typescript
// 1. Type definitions and interfaces
interface State {
  status: GameState;
}

interface Action {
  type: GameAction;
}

// 2. Enums and constants
enum GameState {
  IDLE = "idle",
  PLAYING = "playing",
  PAUSED = "paused",
  STOPPED = "stopped",
}

// 3. Utility functions
function reducer(state: State, { type }: Action): State {
  // Implementation
}

// 4. Component definition
export const GameControl = () => {
  // Hooks
  const [state, dispatch] = useReducer(reducer, { status: GameState.IDLE });

  // Event handlers
  const handleAction = useCallback(
    (type: GameAction) => () => dispatch({ type }),
    [],
  );

  // Render
  return (
    <div className="flex flex-col items-center justify-center">
      {/* JSX content */}
    </div>
  );
};
```

### Naming Conventions
- **Components**: PascalCase (e.g., `GameControl`, `ButtonConfig`)
- **Functions/Variables**: camelCase (e.g., `handleAction`, `buttonConfig`)
- **Enums**: PascalCase with string values (e.g., `GameState.IDLE = "idle"`)
- **Constants**: UPPER_SNAKE_CASE for global constants, camelCase for local constants
- **Files**: PascalCase for components (e.g., `GameControl.tsx`), camelCase for utilities

### React Patterns
- **Hooks**: Use `useCallback` for event handlers, `useMemo` for expensive computations
- **State**: Prefer `useReducer` for complex state logic (FSM patterns)
- **Props**: Use TypeScript interfaces for prop definitions
- **Composition**: Use compound component patterns when appropriate

### Styling Guidelines
- **CSS Framework**: Tailwind CSS v4.1.18
- **Component Library**: shadcn/ui components with custom variants
- **Class Organization**: Use Tailwind utility classes consistently
- **Responsive Design**: Mobile-first approach with responsive prefixes
- **Dark Mode**: Support dark mode with `dark:` prefixes

### Error Handling
```typescript
// Use type guards and exhaustive checking
function reducer(state: State, { type }: Action): State {
  switch (state.status) {
    case GameState.IDLE:
      if (type === GameAction.START) return { status: GameState.PLAYING };
      return state;
    // ... other cases
    default:
      // Exhaustive checking - will error if new states added
      const _exhaustiveCheck: never = state.status;
      return state;
  }
}
```

### File Structure
```
demo-fe/
├── src/
│   ├── components/
│   │   ├── ui/          # shadcn/ui components
│   │   └── feature/     # Feature-specific components
│   ├── component/       # Main components (GameControl, etc.)
│   ├── lib/             # Utilities (utils.ts)
│   ├── hooks/           # Custom hooks
│   ├── App.tsx          # Root component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
└── dist/               # Build output (gitignored)
```

## Linting and Type Checking

### ESLint Configuration
- **Base**: JavaScript recommended rules
- **TypeScript**: TypeScript ESLint rules
- **React**: React Hooks and React Refresh rules
- **Target**: Files with `.{ts,tsx}` extension
- **Ignores**: `dist/` directory

### Type Checking Rules
- `strict: true` - All strict type checking enabled
- `noUnusedLocals: true` - No unused variables
- `noUnusedParameters: true` - No unused function parameters
- `noFallthroughCasesInSwitch: true` - Exhaustive switch checking

## Build and Deployment

### Build Process
1. **TypeScript compilation**: `tsc -b`
2. **Vite bundling**: `vite build`
3. **Output**: Static files in `dist/`
4. **Base URL**: Configured for GitHub Pages deployment

### GitHub Actions
- **Trigger**: Push to main branch or manual workflow dispatch
- **Node version**: LTS
- **Package manager**: npm with `@antfu/ni` for dependency management
- **Deployment**: GitHub Pages

## Development Workflow

### Adding New Components
1. Create component file in appropriate directory
2. Export as named export (not default)
3. Use TypeScript interfaces for props
4. Follow existing component patterns
5. Add to index.ts if using barrel exports

### State Management
- **Prefer**: `useReducer` for complex state (FSM patterns)
- **Simple state**: `useState` is acceptable
- **Global state**: Not currently needed, but consider Context API for future needs

### Styling Approach
- **Primary**: Tailwind utility classes
- **Components**: shadcn/ui for consistent design system
- **Custom CSS**: Only when absolutely necessary, use CSS modules

## Performance Considerations
- **React Compiler**: Enabled (experimental)
- **Code splitting**: Use Vite's dynamic imports for large components
- **Bundle size**: Monitor with `npm run build`
- **Runtime**: Bun for development (faster than Node.js)

## Browser Support
- **Modern browsers**: ES2022+ features
- **No IE support**: Project targets modern browsers only
- **Polyfills**: Vite handles necessary polyfills automatically

## Security Notes
- **No server-side code**: Pure frontend application
- **Dependencies**: Regular security updates via npm
- **Content Security**: No user input processing in current implementation

## Agent-Specific Instructions

When working in this repository:
1. Always run `npm run lint` after making changes
2. Check TypeScript compilation with `npm run build`
3. Follow the established FSM patterns for state management
4. Use the existing component library (shadcn/ui) before creating custom components
5. Maintain consistency with existing code style and patterns
6. Test in both light and dark modes when making UI changes
7. Consider the educational purpose - code should be clear and well-documented