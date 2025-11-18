# Phase 1: Project Initialization & Setup

## Granular Implementation Guide - 2025 Best Practices

**Status**: Ready to begin
**Estimated Time**: 3-4 hours
**Prerequisites**: Node.js 18.17+, Git installed
**Last Updated**: 2025-11-18

---

## Overview

This phase sets up the foundation for the AdaEhandi catering website using Next.js 15 with the latest 2025 best practices, including Turbopack, flat ESLint config, TypeScript strict mode, and automated code quality tools.

**Key Technologies**:

- Next.js 15.5+ (App Router, Turbopack)
- TypeScript 5+ (Strict mode)
- Tailwind CSS 4.0+
- ESLint 9+ (Flat config)
- Prettier
- Husky 9+ (Git hooks)
- pnpm (recommended) or npm

---

## Table of Contents

1. [Environment Prerequisites](#1-environment-prerequisites)
2. [Initialize Next.js 15 Project](#2-initialize-nextjs-15-project)
3. [Git Repository Setup](#3-git-repository-setup)
4. [TypeScript Configuration](#4-typescript-configuration)
5. [Project Structure Creation](#5-project-structure-creation)
6. [ESLint & Prettier Setup](#6-eslint--prettier-setup)
7. [Git Hooks with Husky](#7-git-hooks-with-husky)
8. [Package.json Scripts](#8-packagejson-scripts)
9. [Environment Variables](#9-environment-variables)
10. [Verification & Testing](#10-verification--testing)

---

## 1. Environment Prerequisites

### 1.1 Check Node.js Version

- [ ] **Open terminal and verify Node.js version**

  ```bash
  node --version
  ```

  **Required**: v18.17.0 or higher (v20.x or v22.x recommended)

- [ ] **If Node.js version is too old, update:**
  - Option A: Download from https://nodejs.org
  - Option B: Use nvm: `nvm install 22 && nvm use 22`
  - Option C: Use fnm: `fnm install 22 && fnm use 22`

### 1.2 Choose Package Manager

- [ ] **Decide on package manager** (choose one):
  - **pnpm** (recommended - fastest, most efficient)
  - npm (comes with Node.js)
  - yarn

- [ ] **Install pnpm if chosen** (skip if using npm):
  ```bash
  npm install -g pnpm
  # Verify installation
  pnpm --version
  ```
  **Expected**: v8.0.0 or higher

### 1.3 Verify Git Installation

- [ ] **Check Git is installed**

  ```bash
  git --version
  ```

  **Required**: Git 2.0+ (preferably 2.40+)

- [ ] **Configure Git user info** (if not already set):

  ```bash
  git config --global user.name "Your Name"
  git config --global user.email "your.email@example.com"
  ```

- [ ] **Verify Git configuration**:
  ```bash
  git config --list --global
  ```

---

## 2. Initialize Next.js 15 Project

### 2.1 Create Next.js Application

- [ ] **Navigate to parent directory** where you want to create the project:

  ```bash
  cd ~/projects  # or your preferred location
  ```

- [ ] **Run create-next-app with all recommended flags**:

  ```bash
  npx create-next-app@latest adaehandi \
    --typescript \
    --tailwind \
    --eslint \
    --app \
    --src-dir \
    --import-alias "@/*" \
    --turbopack
  ```

- [ ] **Answer interactive prompts** (if any appear):
  - ✅ TypeScript: **Yes**
  - ✅ ESLint: **Yes**
  - ✅ Tailwind CSS: **Yes**
  - ✅ `src/` directory: **Yes**
  - ✅ App Router: **Yes**
  - ✅ Turbopack: **Yes**
  - ✅ Import alias: **@/\***

- [ ] **Navigate into project directory**:
  ```bash
  cd adaehandi
  ```

### 2.2 Verify Initial Setup

- [ ] **Check that project was created successfully**:

  ```bash
  ls -la
  ```

  **Expected files**:
  - `package.json`
  - `next.config.ts` (or .mjs)
  - `tsconfig.json`
  - `tailwind.config.ts`
  - `src/` directory
  - `.eslintrc.json` or `eslint.config.mjs`

- [ ] **Install dependencies** (if not auto-installed):

  ```bash
  pnpm install  # or npm install
  ```

- [ ] **Start development server to verify**:

  ```bash
  pnpm dev  # or npm run dev
  ```

  **Expected**: Server starts on http://localhost:3000

- [ ] **Open browser and verify** Next.js welcome page loads

- [ ] **Stop dev server** (Ctrl+C)

### 2.3 Update Next.js Config for 2025 Best Practices

- [ ] **Rename next.config.mjs to next.config.ts** (if not already TypeScript):

  ```bash
  mv next.config.mjs next.config.ts
  # OR if .js:
  mv next.config.js next.config.ts
  ```

- [ ] **Update next.config.ts with production-ready settings**:

  ```typescript
  import type { NextConfig } from 'next'

  const nextConfig: NextConfig = {
    // Enable TypeScript strict mode checks
    typescript: {
      // Production: fail build on type errors
      ignoreBuildErrors: false,
    },

    // ESLint configuration
    eslint: {
      // Production: fail build on lint errors
      ignoreDuringBuilds: false,
    },

    // Enable React strict mode (catches issues early)
    reactStrictMode: true,

    // Experimental features (2025)
    experimental: {
      // Turbopack for faster builds (beta in 15.5)
      turbo: {
        // Will use Turbopack for dev and build
      },
      // Typed routes for type-safe navigation
      typedRoutes: true,
    },

    // Image optimization configuration
    images: {
      // Modern formats (AVIF is smaller than WebP)
      formats: ['image/avif', 'image/webp'],
      // Responsive image sizes
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      // Will add domains later for external images
      remotePatterns: [],
    },

    // Performance optimizations
    compress: true,
    poweredByHeader: false, // Remove X-Powered-By header (security)

    // Logging
    logging: {
      fetches: {
        fullUrl: true,
      },
    },
  }

  export default nextConfig
  ```

- [ ] **Save the file**

- [ ] **Verify config has no syntax errors**:
  ```bash
  pnpm next info  # or npm run next info
  ```

---

## 3. Git Repository Setup

### 3.1 Initialize Git Repository

- [ ] **Initialize Git** (if not already done by create-next-app):

  ```bash
  git init
  ```

- [ ] **Verify .gitignore exists** and check its contents:
  ```bash
  cat .gitignore
  ```

### 3.2 Enhance .gitignore

- [ ] **Add additional entries to .gitignore**:

  ```bash
  cat >> .gitignore << 'EOF'

  # Environment variables
  .env
  .env.local
  .env.*.local
  .env.production

  # Payload CMS (will add later)
  /public/media/
  payload-types.ts

  # IDE
  .idea/
  .vscode/*
  !.vscode/extensions.json
  !.vscode/settings.json

  # OS
  .DS_Store
  Thumbs.db

  # Testing
  coverage/
  .nyc_output/

  # Build
  .turbo/
  .next/
  out/
  build/
  dist/

  # Logs
  *.log
  npm-debug.log*
  yarn-debug.log*
  pnpm-debug.log*
  lerna-debug.log*

  # Temporary files
  *.swp
  *.swo
  *~
  .cache/

  # Package manager
  pnpm-lock.yaml
  package-lock.json
  yarn.lock
  EOF
  ```

- [ ] **Verify .gitignore was updated**:
  ```bash
  tail -20 .gitignore
  ```

### 3.3 Initial Git Commit

- [ ] **Stage all files**:

  ```bash
  git add .
  ```

- [ ] **Create initial commit**:

  ```bash
  git commit -m "Initial Next.js 15 project setup with TypeScript, Tailwind, and Turbopack"
  ```

- [ ] **Verify commit was created**:
  ```bash
  git log --oneline -1
  ```

### 3.4 Set Default Branch Name

- [ ] **Rename branch to main** (if it's master):

  ```bash
  git branch -M main
  ```

- [ ] **Verify current branch**:
  ```bash
  git branch --show-current
  ```
  **Expected**: `main`

---

## 4. TypeScript Configuration

### 4.1 Enable Strict TypeScript Mode

- [ ] **Open tsconfig.json**:

  ```bash
  code tsconfig.json  # or your preferred editor
  ```

- [ ] **Update compilerOptions with strict settings**:

  ```json
  {
    "compilerOptions": {
      // Next.js defaults
      "lib": ["dom", "dom.iterable", "esnext"],
      "allowJs": true,
      "skipLibCheck": true,
      "noEmit": true,
      "esModuleInterop": true,
      "module": "esnext",
      "moduleResolution": "bundler",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "jsx": "preserve",
      "incremental": true,

      // Strict mode (ENHANCED FOR 2025)
      "strict": true,
      "strictNullChecks": true,
      "strictFunctionTypes": true,
      "strictBindCallApply": true,
      "strictPropertyInitialization": true,
      "noImplicitThis": true,
      "alwaysStrict": true,

      // Additional strict checks
      "noImplicitReturns": true,
      "noFallthroughCasesInSwitch": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "noImplicitOverride": true,
      "noPropertyAccessFromIndexSignature": true,
      "noUncheckedIndexedAccess": true,
      "exactOptionalPropertyTypes": true,
      "forceConsistentCasingInFileNames": true,

      // Path aliases
      "baseUrl": ".",
      "paths": {
        "@/*": ["./src/*"],
        "@/components/*": ["./src/components/*"],
        "@/lib/*": ["./src/lib/*"],
        "@/types/*": ["./src/types/*"],
        "@/styles/*": ["./src/styles/*"],
        "@/app/*": ["./src/app/*"]
      },

      // Next.js specific
      "plugins": [
        {
          "name": "next"
        }
      ]
    },
    "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    "exclude": ["node_modules"]
  }
  ```

- [ ] **Save tsconfig.json**

### 4.2 Create Type Definitions Directory

- [ ] **Create types directory**:

  ```bash
  mkdir -p src/types
  ```

- [ ] **Create global type definitions file**:

  ```bash
  cat > src/types/index.ts << 'EOF'
  /**
   * Global type definitions for AdaEhandi
   * Add shared types, interfaces, and type utilities here
   */

  // Example: Common utility types
  export type Nullable<T> = T | null
  export type Optional<T> = T | undefined
  export type Maybe<T> = T | null | undefined

  // Example: API response wrapper
  export interface ApiResponse<T> {
    data: T
    error?: string
    success: boolean
  }

  // Will add more types as we build
  EOF
  ```

### 4.3 Verify TypeScript Configuration

- [ ] **Run TypeScript compiler check**:

  ```bash
  pnpm tsc --noEmit  # or npx tsc --noEmit
  ```

  **Expected**: No errors (may have warnings about unused variables - that's okay for now)

- [ ] **Check that path aliases work** by creating a test file:

  ```bash
  cat > src/app/test-types.ts << 'EOF'
  import type { ApiResponse } from '@/types'

  // Test type checking
  const response: ApiResponse<string> = {
    data: 'test',
    success: true,
  }

  export default response
  EOF
  ```

- [ ] **Run type check again**:

  ```bash
  pnpm tsc --noEmit
  ```

  **Expected**: No errors

- [ ] **Delete test file**:
  ```bash
  rm src/app/test-types.ts
  ```

---

## 5. Project Structure Creation

### 5.1 Create Core Directory Structure

- [ ] **Create all required directories at once**:

  ```bash
  mkdir -p src/{components,lib,styles,types}
  mkdir -p src/components/{ui,sections,forms,layout}
  mkdir -p src/app/{api,\(frontend\),\(admin\)}
  mkdir -p public/{fonts,images,icons}
  mkdir -p public/images/{logo,placeholders}
  ```

- [ ] **Verify directory structure was created**:
  ```bash
  tree -L 3 src  # or: find src -type d
  ```

### 5.2 Create README Files for Each Directory

- [ ] **Create README for components/ui**:

  ```bash
  cat > src/components/ui/README.md << 'EOF'
  # UI Components

  Reusable, atomic UI components (buttons, inputs, cards, etc.)

  These should be:
  - Highly reusable
  - Styled with Tailwind CSS
  - Accessible (WCAG AA compliant)
  - TypeScript strict mode compatible

  ## Examples
  - Button
  - Input
  - Card
  - Modal
  - Dropdown
  EOF
  ```

- [ ] **Create README for components/sections**:

  ```bash
  cat > src/components/sections/README.md << 'EOF'
  # Section Components

  Larger page sections composed of multiple UI components.

  ## Examples
  - Hero section
  - Menu showcase
  - Testimonials
  - Footer
  EOF
  ```

- [ ] **Create README for components/forms**:

  ```bash
  cat > src/components/forms/README.md << 'EOF'
  # Form Components

  Form-related components including inputs, validation, and submission logic.

  ## Examples
  - ContactForm
  - BookingForm
  - NewsletterForm
  EOF
  ```

- [ ] **Create README for lib**:

  ```bash
  cat > src/lib/README.md << 'EOF'
  # Library / Utilities

  Shared utility functions, helpers, and configurations.

  ## Examples
  - `utils.ts` - General utility functions
  - `cn.ts` - Tailwind class name merger
  - `validators.ts` - Form validation helpers
  - `api.ts` - API client utilities
  EOF
  ```

### 5.3 Create Placeholder Files

- [ ] **Create utils.ts with common utilities**:

  ```bash
  cat > src/lib/utils.ts << 'EOF'
  /**
   * Utility functions for AdaEhandi
   */

  /**
   * Format price in Indian Rupees
   * @example formatPrice(1000) => "₹1,000"
   */
  export function formatPrice(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  /**
   * Format Indian phone number
   * @example formatPhone("9876543210") => "+91 98765 43210"
   */
  export function formatPhone(phone: string): string {
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length === 10) {
      return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`
    }
    return phone
  }

  /**
   * Create URL-friendly slug
   * @example slugify("Dal Makhani") => "dal-makhani"
   */
  export function slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
  EOF
  ```

- [ ] **Create constants.ts for app-wide constants**:

  ```bash
  cat > src/lib/constants.ts << 'EOF'
  /**
   * Application-wide constants
   */

  export const SITE_NAME = 'AdaEhandi'
  export const SITE_DESCRIPTION = 'Premium North Indian Catering Services in Delhi NCR'

  export const CONTACT = {
    phone: '+91 XXXX XXXXXX',
    email: 'info@adaehandi.com',
    address: 'Delhi NCR, India',
  } as const

  export const SOCIAL_LINKS = {
    facebook: '',
    instagram: '',
    twitter: '',
    youtube: '',
  } as const

  // Will add more constants as needed
  EOF
  ```

### 5.4 Verify Project Structure

- [ ] **Run tree command to visualize structure**:

  ```bash
  tree -L 3 -a -I 'node_modules|.next|.git'
  ```

- [ ] **Verify all directories exist**:
  ```bash
  ls -la src/components/
  ls -la src/lib/
  ls -la public/
  ```

---

## 6. ESLint & Prettier Setup

### 6.1 Install ESLint & Prettier Dependencies

- [ ] **Install Prettier and ESLint plugins**:

  ```bash
  pnpm add -D prettier eslint-config-prettier eslint-plugin-prettier
  # or
  npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
  ```

- [ ] **Install additional ESLint plugins**:

  ```bash
  pnpm add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
  pnpm add -D eslint-plugin-react eslint-plugin-react-hooks
  pnpm add -D eslint-plugin-jsx-a11y
  # or use npm install --save-dev
  ```

- [ ] **Install Tailwind CSS Prettier plugin** (optional but recommended):
  ```bash
  pnpm add -D prettier-plugin-tailwindcss
  ```

### 6.2 Configure Prettier

- [ ] **Create .prettierrc file**:

  ```bash
  cat > .prettierrc << 'EOF'
  {
    "semi": false,
    "singleQuote": true,
    "tabWidth": 2,
    "useTabs": false,
    "trailingComma": "es5",
    "printWidth": 100,
    "arrowParens": "always",
    "endOfLine": "lf",
    "plugins": ["prettier-plugin-tailwindcss"]
  }
  EOF
  ```

- [ ] **Create .prettierignore file**:

  ```bash
  cat > .prettierignore << 'EOF'
  # Dependencies
  node_modules/
  pnpm-lock.yaml
  package-lock.json
  yarn.lock

  # Build outputs
  .next/
  out/
  dist/
  build/

  # Cache
  .cache/
  .turbo/

  # Generated files
  payload-types.ts

  # Public assets
  public/

  # Logs
  *.log
  EOF
  ```

### 6.3 Configure ESLint for Next.js 15 (Flat Config)

- [ ] **Check if eslint.config.mjs exists** (Next.js 15+ uses flat config):

  ```bash
  ls eslint.config.mjs
  ```

- [ ] **If eslint.config.mjs exists, update it**:

  ```javascript
  import { FlatCompat } from '@eslint/eslintrc'
  import js from '@eslint/js'
  import typescriptParser from '@typescript-eslint/parser'
  import typescriptPlugin from '@typescript-eslint/eslint-plugin'
  import reactPlugin from 'eslint-plugin-react'
  import reactHooksPlugin from 'eslint-plugin-react-hooks'
  import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
  import prettierPlugin from 'eslint-plugin-prettier'
  import prettierConfig from 'eslint-config-prettier'

  const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
  })

  const eslintConfig = [
    js.configs.recommended,
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    prettierConfig,
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      plugins: {
        '@typescript-eslint': typescriptPlugin,
        react: reactPlugin,
        'react-hooks': reactHooksPlugin,
        'jsx-a11y': jsxA11yPlugin,
        prettier: prettierPlugin,
      },
      languageOptions: {
        parser: typescriptParser,
        parserOptions: {
          ecmaVersion: 'latest',
          sourceType: 'module',
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      rules: {
        'prettier/prettier': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/no-explicit-any': 'warn',
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'jsx-a11y/alt-text': 'error',
        'jsx-a11y/anchor-is-valid': 'warn',
      },
    },
  ]

  export default eslintConfig
  ```

- [ ] **If .eslintrc.json exists instead** (older setup), rename and migrate:
  ```bash
  # Backup old config
  mv .eslintrc.json .eslintrc.json.backup
  # Create new flat config (see above)
  ```

### 6.4 Create .eslintignore

- [ ] **Create .eslintignore file**:
  ```bash
  cat > .eslintignore << 'EOF'
  node_modules/
  .next/
  out/
  build/
  dist/
  public/
  *.config.js
  *.config.mjs
  *.config.ts
  payload-types.ts
  EOF
  ```

### 6.5 Verify ESLint & Prettier Work

- [ ] **Run Prettier on all files**:

  ```bash
  pnpm prettier --write .
  # or
  npm run format
  ```

- [ ] **Run ESLint check**:

  ```bash
  pnpm next lint
  # or
  npm run lint
  ```

  **Expected**: No errors (warnings are acceptable at this stage)

- [ ] **Test auto-fix**:
  ```bash
  pnpm next lint --fix
  ```

---

## 7. Git Hooks with Husky

### 7.1 Install Husky

- [ ] **Install Husky 9.x**:

  ```bash
  pnpm add -D husky
  # or
  npm install --save-dev husky
  ```

- [ ] **Initialize Husky**:

  ```bash
  pnpm exec husky init
  # or
  npx husky init
  ```

  **This creates**: `.husky/` directory with a sample pre-commit hook

- [ ] **Verify .husky directory was created**:
  ```bash
  ls -la .husky/
  ```
  **Expected files**: `pre-commit`, potentially `_/husky.sh`

### 7.2 Install lint-staged

- [ ] **Install lint-staged**:
  ```bash
  pnpm add -D lint-staged
  # or
  npm install --save-dev lint-staged
  ```

### 7.3 Configure lint-staged

- [ ] **Add lint-staged config to package.json**:

  Open `package.json` and add this configuration at the root level:

  ```json
  {
    "lint-staged": {
      "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
      "*.{json,md,mdx,css,html}": ["prettier --write"]
    }
  }
  ```

- [ ] **OR create standalone .lintstagedrc.json file**:
  ```bash
  cat > .lintstagedrc.json << 'EOF'
  {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,mdx,css,html}": [
      "prettier --write"
    ]
  }
  EOF
  ```

### 7.4 Configure Pre-commit Hook

- [ ] **Update .husky/pre-commit file**:

  ```bash
  cat > .husky/pre-commit << 'EOF'
  #!/usr/bin/env sh
  . "$(dirname -- "$0")/_/husky.sh"

  # Run lint-staged
  pnpm lint-staged
  # Or if using npm: npm run lint-staged

  # Optional: Run type check
  # pnpm tsc --noEmit
  EOF
  ```

- [ ] **Make pre-commit hook executable**:
  ```bash
  chmod +x .husky/pre-commit
  ```

### 7.5 Test Git Hooks

- [ ] **Create a test file with intentional formatting issues**:

  ```bash
  cat > src/test-hook.ts << 'EOF'
  const   badFormatting    =    "test"



  export default badFormatting
  EOF
  ```

- [ ] **Stage the file**:

  ```bash
  git add src/test-hook.ts
  ```

- [ ] **Try to commit** (hook should fix formatting automatically):

  ```bash
  git commit -m "Test: Verify pre-commit hook works"
  ```

  **Expected**: Hook runs, fixes formatting, and completes commit

- [ ] **Verify the file was formatted**:

  ```bash
  cat src/test-hook.ts
  ```

  **Expected**: Properly formatted code

- [ ] **Remove test file**:
  ```bash
  git rm src/test-hook.ts
  git commit -m "Remove test file"
  ```

---

## 8. Package.json Scripts

### 8.1 Add Custom Scripts

- [ ] **Open package.json and add/update scripts section**:

  ```json
  {
    "scripts": {
      "dev": "next dev --turbo",
      "build": "next build",
      "start": "next start",
      "lint": "next lint",
      "lint:fix": "next lint --fix",
      "format": "prettier --write .",
      "format:check": "prettier --check .",
      "type-check": "tsc --noEmit",
      "clean": "rm -rf .next out node_modules/.cache",
      "prepare": "husky"
    }
  }
  ```

- [ ] **Save package.json**

### 8.2 Test All Scripts

- [ ] **Test type checking**:

  ```bash
  pnpm type-check
  ```

  **Expected**: No errors

- [ ] **Test linting**:

  ```bash
  pnpm lint
  ```

  **Expected**: No errors

- [ ] **Test formatting check**:

  ```bash
  pnpm format:check
  ```

  **Expected**: All files formatted

- [ ] **Test dev server**:

  ```bash
  pnpm dev
  ```

  **Expected**: Server starts with Turbopack

- [ ] **Stop dev server and test build**:

  ```bash
  pnpm build
  ```

  **Expected**: Build completes successfully

- [ ] **Test production server**:

  ```bash
  pnpm start
  ```

  **Expected**: Production server starts on port 3000

- [ ] **Stop production server** (Ctrl+C)

---

## 9. Environment Variables

### 9.1 Create Environment Variable Templates

- [ ] **Create .env.example file** (template with no secrets):

  ```bash
  cat > .env.example << 'EOF'
  # Next.js Configuration
  NEXT_PUBLIC_APP_URL=http://localhost:3000
  NEXT_PUBLIC_SITE_NAME=AdaEhandi

  # Database (will add in Phase 2)
  # DATABASE_URI=postgresql://user:password@localhost:5432/adaehandi_dev

  # Payload CMS (will add in Phase 2)
  # PAYLOAD_SECRET=your-secret-key-minimum-32-characters

  # Email Service (will add later)
  # RESEND_API_KEY=
  # FROM_EMAIL=

  # Analytics (will add later)
  # NEXT_PUBLIC_GA_MEASUREMENT_ID=

  # Payment Gateway (will add later)
  # RAZORPAY_KEY_ID=
  # RAZORPAY_KEY_SECRET=
  EOF
  ```

- [ ] **Create .env.local for development** (gitignored):

  ```bash
  cat > .env.local << 'EOF'
  # Development Environment Variables
  # This file is gitignored - safe for secrets

  NEXT_PUBLIC_APP_URL=http://localhost:3000
  NEXT_PUBLIC_SITE_NAME=AdaEhandi

  # Add your development secrets here as needed
  EOF
  ```

- [ ] **Verify .env.local is in .gitignore**:
  ```bash
  grep -q "\.env\.local" .gitignore && echo "✓ .env.local is gitignored" || echo "✗ WARNING: .env.local is NOT gitignored!"
  ```

### 9.2 Create Environment Variable Type Definitions

- [ ] **Create env.d.ts for type safety**:

  ```bash
  cat > src/types/env.d.ts << 'EOF'
  /**
   * Type definitions for environment variables
   * Provides autocomplete and type checking for process.env
   */

  declare namespace NodeJS {
    interface ProcessEnv {
      // Next.js
      readonly NODE_ENV: 'development' | 'production' | 'test'
      readonly NEXT_PUBLIC_APP_URL: string
      readonly NEXT_PUBLIC_SITE_NAME: string

      // Database (Phase 2)
      readonly DATABASE_URI?: string

      // Payload CMS (Phase 2)
      readonly PAYLOAD_SECRET?: string

      // Future additions
      readonly RESEND_API_KEY?: string
      readonly NEXT_PUBLIC_GA_MEASUREMENT_ID?: string
    }
  }
  EOF
  ```

- [ ] **Verify TypeScript recognizes env types**:

  ```bash
  cat > src/test-env.ts << 'EOF'
  // Test file to verify env types work
  const appUrl = process.env.NEXT_PUBLIC_APP_URL
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME

  console.log(appUrl, siteName)
  EOF
  ```

- [ ] **Run type check**:

  ```bash
  pnpm type-check
  ```

- [ ] **Delete test file**:
  ```bash
  rm src/test-env.ts
  ```

### 9.3 Document Environment Variables

- [ ] **Create ENV_VARIABLES.md documentation**:

  ````bash
  cat > ENV_VARIABLES.md << 'EOF'
  # Environment Variables Documentation

  This document lists all environment variables used in the AdaEhandi project.

  ## Development Setup

  1. Copy `.env.example` to `.env.local`:
     ```bash
     cp .env.example .env.local
  ````

  2. Fill in the values in `.env.local` with your development credentials

  3. **Never commit `.env.local`** - it contains secrets!

  ## Variables

  ### Next.js Configuration

  | Variable                | Required | Description                 | Default                 |
  | ----------------------- | -------- | --------------------------- | ----------------------- |
  | `NEXT_PUBLIC_APP_URL`   | Yes      | Full URL of the application | `http://localhost:3000` |
  | `NEXT_PUBLIC_SITE_NAME` | Yes      | Name of the website         | `AdaEhandi`             |

  ### Database (Phase 2)

  | Variable       | Required | Description                  |
  | -------------- | -------- | ---------------------------- |
  | `DATABASE_URI` | Yes      | PostgreSQL connection string |

  ### Payload CMS (Phase 2)

  | Variable         | Required | Description                           |
  | ---------------- | -------- | ------------------------------------- |
  | `PAYLOAD_SECRET` | Yes      | Secret key for Payload (min 32 chars) |

  ## Production Deployment

  Set environment variables in your hosting platform:
  - Vercel: Project Settings → Environment Variables
  - Add all variables from `.env.example`
  - Use different values for production (never use dev credentials)

  ## Security Notes
  - ✅ Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
  - ❌ Variables without `NEXT_PUBLIC_` are server-side only
  - 🔒 Never commit secrets to Git
  - 🔄 Rotate secrets regularly
    EOF

  ```

  ```

---

## 10. Verification & Testing

### 10.1 Final Verification Checklist

- [ ] **Verify all dependencies are installed**:

  ```bash
  pnpm list --depth=0
  # or
  npm list --depth=0
  ```

- [ ] **Verify Git status is clean** (or has expected uncommitted files):

  ```bash
  git status
  ```

- [ ] **Run all quality checks in sequence**:

  ```bash
  echo "Running type check..." && pnpm type-check && \
  echo "Running lint..." && pnpm lint && \
  echo "Running format check..." && pnpm format:check && \
  echo "✓ All checks passed!"
  ```

- [ ] **Test development build**:

  ```bash
  pnpm dev
  ```

  - Open http://localhost:3000
  - Verify Next.js welcome page loads
  - Check console for no errors
  - Verify hot reload works (edit src/app/page.tsx)
  - Stop server

- [ ] **Test production build**:

  ```bash
  pnpm build && pnpm start
  ```

  - Verify build completes without errors
  - Open http://localhost:3000
  - Verify production build works
  - Stop server

### 10.2 Create Phase 1 Completion Commit

- [ ] **Stage all changes**:

  ```bash
  git add .
  ```

- [ ] **Review staged changes**:

  ```bash
  git status
  git diff --staged
  ```

- [ ] **Create comprehensive commit**:

  ```bash
  git commit -m "Complete Phase 1: Project initialization

  - Initialize Next.js 15 with TypeScript, Tailwind, Turbopack
  - Configure strict TypeScript mode with enhanced type safety
  - Set up ESLint with flat config and Prettier integration
  - Install and configure Husky + lint-staged for pre-commit hooks
  - Create project structure (components, lib, types directories)
  - Add utility functions and constants
  - Configure environment variables with type safety
  - Set up comprehensive .gitignore
  - Add custom package.json scripts
  - Document environment variables

  Next: Phase 2 - Database & Backend Configuration"
  ```

- [ ] **Verify commit was created**:
  ```bash
  git log --oneline -1
  ```

### 10.3 Generate Project Report

- [ ] **Create PHASE_01_COMPLETION_REPORT.md**:

  ```bash
  cat > PHASE_01_COMPLETION_REPORT.md << 'EOF'
  # Phase 1 Completion Report
  **Date Completed**: [FILL IN DATE]
  **Duration**: [FILL IN HOURS]

  ## ✅ Completed Tasks

  - [x] Next.js 15 project initialized with TypeScript and Turbopack
  - [x] Git repository configured with comprehensive .gitignore
  - [x] TypeScript strict mode enabled with enhanced type safety
  - [x] Project structure created (components, lib, types)
  - [x] ESLint configured with flat config (Next.js 15+)
  - [x] Prettier installed and configured
  - [x] Husky + lint-staged configured for pre-commit hooks
  - [x] Custom package.json scripts added
  - [x] Environment variables set up with type definitions
  - [x] Utility functions created (formatPrice, formatPhone, slugify)

  ## 📊 Project Statistics

  **Dependencies Installed**:
  - Production: [COUNT]
  - Development: [COUNT]

  **Files Created**: [COUNT]
  **Directories Created**: [COUNT]

  ## 🧪 Test Results

  - [x] Type checking: ✅ Passed
  - [x] Linting: ✅ Passed
  - [x] Formatting: ✅ Passed
  - [x] Development build: ✅ Passed
  - [x] Production build: ✅ Passed
  - [x] Pre-commit hook: ✅ Passed

  ## 📝 Notes

  [Add any notes, issues encountered, or decisions made]

  ## ⏭️ Next Steps

  Begin Phase 2: Database & Backend Configuration
  - Set up PostgreSQL database (Neon)
  - Install Payload CMS
  - Configure database connection
  - Create first admin user
  EOF
  ```

- [ ] **Fill in the completion report** with actual values

- [ ] **Add and commit the report**:
  ```bash
  git add PHASE_01_COMPLETION_REPORT.md
  git commit -m "Add Phase 1 completion report"
  ```

### 10.4 Optional: Push to Remote Repository

- [ ] **If you have a GitHub repository, add remote**:

  ```bash
  git remote add origin https://github.com/YOUR_USERNAME/adaehandi.git
  # or SSH:
  # git remote add origin git@github.com:YOUR_USERNAME/adaehandi.git
  ```

- [ ] **Push to remote**:
  ```bash
  git push -u origin main
  ```

---

## 🎉 Phase 1 Complete!

**Congratulations!** You've successfully completed Phase 1: Project Initialization & Setup.

Your project now has:

- ✅ Modern Next.js 15 setup with Turbopack
- ✅ Strict TypeScript configuration
- ✅ Automated code quality checks (ESLint + Prettier)
- ✅ Git hooks preventing bad commits
- ✅ Clean, scalable project structure
- ✅ Type-safe environment variables
- ✅ Production-ready configuration

## Next Actions

1. **Review this checklist** - ensure all tasks are completed
2. **Run final tests** - verify everything works
3. **Create Phase 1 completion commit**
4. **Begin Phase 2** - Database & Backend Configuration

---

## Troubleshooting

### Issue: "Cannot find module 'next'"

**Solution**:

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Issue: ESLint errors about flat config

**Solution**: Ensure you're using Next.js 15+ and have `eslint.config.mjs` (not `.eslintrc.json`)

### Issue: Husky hooks not running

**Solution**:

```bash
pnpm exec husky install
chmod +x .husky/pre-commit
```

### Issue: Type errors in strict mode

**Solution**: This is expected! Fix them one by one or temporarily disable specific strict checks in `tsconfig.json` and enable them gradually.

---

**Last Updated**: 2025-11-18
**Version**: 1.0
**Next Phase**: [PHASE_02_DATABASE_BACKEND.md](./PHASE_02_DATABASE_BACKEND.md)
