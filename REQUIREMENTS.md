# Project Requirements & Dependencies

## Quick Start
To set up a new project with the same dependencies:

```bash
npm install
```

Or manually install dependencies:
```bash
npm install react@^19.2.0 react-dom@^19.2.0 framer-motion@^12.27.0 @tailwindcss/vite@^4.1.18
```

---

## Core Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| **react** | ^19.2.0 | UI library for building user interfaces |
| **react-dom** | ^19.2.0 | React bindings for the DOM |
| **framer-motion** | ^12.27.0 | Animation and motion library |
| **@tailwindcss/vite** | ^4.1.18 | Tailwind CSS Vite integration |

## Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| **vite** | npm:rolldown-vite@7.2.5 | Fast build tool and dev server |
| **@vitejs/plugin-react** | ^5.1.1 | Vite plugin for React Fast Refresh |
| **typescript** | ~5.9.3 | Type checking and language support |
| **tailwindcss** | ^4.1.18 | Utility-first CSS framework |
| **postcss** | ^8.5.6 | CSS transformation tool |
| **autoprefixer** | ^10.4.23 | Automatically add vendor prefixes to CSS |
| **eslint** | ^9.39.1 | Code quality and linting |
| **@eslint/js** | ^9.39.1 | ESLint JavaScript language support |
| **typescript-eslint** | ^8.46.4 | TypeScript support for ESLint |
| **eslint-plugin-react-hooks** | ^7.0.1 | ESLint rules for React hooks |
| **eslint-plugin-react-refresh** | ^0.4.24 | ESLint rules for React Refresh |
| **vite-plugin-svgr** | ^4.5.0 | Import SVG files as React components |
| **@types/react** | ^19.2.5 | TypeScript types for React |
| **@types/react-dom** | ^19.2.3 | TypeScript types for React DOM |
| **@types/node** | ^24.10.1 | TypeScript types for Node.js |
| **globals** | ^16.5.0 | Global variables for different JavaScript environments |
| **gh-pages** | ^6.3.0 | Deploy to GitHub Pages |

---

## Project Scripts

```bash
npm run dev       # Start development server (Vite)
npm run build     # Build for production (TypeScript + Vite)
npm run preview   # Preview production build
npm run lint      # Run ESLint code quality checks
npm run deploy    # Deploy to GitHub Pages (requires build first)
```

---

## System Requirements

- **Node.js**: v18+ recommended
- **npm**: v9+

## Setup Instructions for New Project

1. Create a new directory:
   ```bash
   mkdir my-new-project
   cd my-new-project
   ```

2. Copy the entire project structure or use this package.json as a template

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

---

## Configuration Files

- `package.json` - Dependencies and scripts
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tsconfig.app.json` - TypeScript app configuration
- `tsconfig.node.json` - TypeScript Node configuration
- `eslint.config.js` - ESLint configuration
- `tailwind.config.js` - Tailwind CSS configuration (if present)
- `postcss.config.js` - PostCSS configuration (if present)

---

## Notes

- This project uses **Rolldown-based Vite** (npm:rolldown-vite) for optimized builds
- **Tailwind CSS v4** is used with the Vite integration for faster CSS processing
- TypeScript is configured for strict type checking
- React 19 is used with latest type definitions
