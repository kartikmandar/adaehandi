# AdaEhandi - Premium Indian Catering Website
## Complete Project Roadmap & Implementation Guide

**Version:** 1.0
**Last Updated:** 2025-11-18
**Project Type:** Next.js 15 + Payload CMS + PostgreSQL + Vercel
**Target:** Delhi-based North Indian Premium Catering Service

---

## Table of Contents

1. [Phase 1: Project Initialization & Setup](#phase-1-project-initialization--setup)
2. [Phase 2: Database & Backend Configuration](#phase-2-database--backend-configuration)
3. [Phase 3: Payload CMS Setup & Collections](#phase-3-payload-cms-setup--collections)
4. [Phase 4: Design System & Tailwind Configuration](#phase-4-design-system--tailwind-configuration)
5. [Phase 5: Core Pages & Components](#phase-5-core-pages--components)
6. [Phase 6: Advanced Features](#phase-6-advanced-features)
7. [Phase 7: Content Management & Media](#phase-7-content-management--media)
8. [Phase 8: Testing & Quality Assurance](#phase-8-testing--quality-assurance)
9. [Phase 9: SEO & Performance Optimization](#phase-9-seo--performance-optimization)
10. [Phase 10: Security Hardening](#phase-10-security-hardening)
11. [Phase 11: Deployment & DevOps](#phase-11-deployment--devops)
12. [Phase 12: Post-Launch & Monitoring](#phase-12-post-launch--monitoring)

---

## Phase 1: Project Initialization & Setup

### 1.1 Repository & Environment Setup

- [ ] **Initialize Next.js 15 project**
  ```bash
  npx create-next-app@latest adaehandi --typescript --tailwind --app --eslint
  cd adaehandi
  ```
  - Choose: TypeScript: Yes
  - Choose: ESLint: Yes
  - Choose: Tailwind CSS: Yes
  - Choose: `src/` directory: Yes
  - Choose: App Router: Yes
  - Choose: Turbopack: Yes
  - Choose: Import alias: @/*

- [ ] **Configure package manager**
  ```bash
  # If using pnpm
  pnpm install
  # Or npm
  npm install
  ```

- [ ] **Set up Git configuration**
  ```bash
  git init
  git add .
  git commit -m "Initial Next.js 15 project setup"
  git branch -M main
  ```

- [ ] **Create comprehensive .gitignore**
  - Add: `.env`, `.env.local`, `.env.production`
  - Add: `node_modules/`, `.next/`, `out/`
  - Add: `.vercel/`, `.turbo/`
  - Add: `*.log`, `.DS_Store`
  - Add: `public/media/` (generated uploads)

- [ ] **Set up environment variables structure**
  - Create `.env.example` with all required variables (no values)
  - Create `.env.local` for development (gitignored)
  - Document all environment variables in README

### 1.2 TypeScript Configuration

- [ ] **Enable strict TypeScript mode**
  ```json
  // tsconfig.json
  {
    "compilerOptions": {
      "strict": true,
      "noUncheckedIndexedAccess": true,
      "noImplicitReturns": true,
      "noFallthroughCasesInSwitch": true,
      "exactOptionalPropertyTypes": true,
      "noImplicitOverride": true
    }
  }
  ```

- [ ] **Create type definitions directory**
  - Create `src/types/` folder
  - Create `src/types/index.ts` for global types
  - Create `src/types/payload.ts` for Payload types (will be auto-generated)

- [ ] **Set up path aliases**
  ```json
  // tsconfig.json
  {
    "compilerOptions": {
      "paths": {
        "@/*": ["./src/*"],
        "@/components/*": ["./src/components/*"],
        "@/lib/*": ["./src/lib/*"],
        "@/types/*": ["./src/types/*"],
        "@/payload/*": ["./src/payload/*"]
      }
    }
  }
  ```

### 1.3 Project Structure Setup

- [ ] **Create core directory structure**
  ```
  src/
  ├── app/                    # Next.js App Router
  │   ├── (frontend)/         # Public-facing pages
  │   ├── (admin)/            # Payload admin routes
  │   └── api/                # API routes
  ├── components/             # React components
  │   ├── ui/                 # Base UI components
  │   ├── sections/           # Page sections
  │   └── forms/              # Form components
  ├── lib/                    # Utilities & helpers
  ├── payload/                # Payload CMS config
  │   ├── collections/        # Collection schemas
  │   ├── globals/            # Global schemas
  │   ├── blocks/             # Reusable blocks
  │   └── hooks/              # Payload hooks
  ├── styles/                 # Global styles
  └── types/                  # TypeScript types
  ```

- [ ] **Create public assets structure**
  ```
  public/
  ├── fonts/                  # Custom fonts (Devanagari, etc.)
  ├── images/                 # Static images
  │   ├── logo/
  │   ├── icons/
  │   └── placeholders/
  └── media/                  # Uploaded media (gitignored)
  ```

### 1.4 Code Quality Tools

- [ ] **Install and configure ESLint**
  ```bash
  pnpm add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
  pnpm add -D eslint-plugin-react eslint-plugin-react-hooks
  ```

- [ ] **Create .eslintrc.json**
  ```json
  {
    "extends": [
      "next/core-web-vitals",
      "plugin:@typescript-eslint/recommended"
    ],
    "rules": {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn"
    }
  }
  ```

- [ ] **Install Prettier**
  ```bash
  pnpm add -D prettier eslint-config-prettier
  ```

- [ ] **Create .prettierrc**
  ```json
  {
    "semi": false,
    "singleQuote": true,
    "trailingComma": "es5",
    "tabWidth": 2,
    "printWidth": 100
  }
  ```

- [ ] **Set up Husky for pre-commit hooks**
  ```bash
  pnpm add -D husky lint-staged
  npx husky init
  ```

- [ ] **Configure lint-staged in package.json**
  ```json
  {
    "lint-staged": {
      "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
      "*.{json,md}": ["prettier --write"]
    }
  }
  ```

### 1.5 Development Scripts

- [ ] **Add custom scripts to package.json**
  ```json
  {
    "scripts": {
      "dev": "next dev --turbo",
      "build": "next build",
      "start": "next start",
      "lint": "next lint",
      "lint:fix": "next lint --fix",
      "format": "prettier --write .",
      "type-check": "tsc --noEmit",
      "payload": "payload",
      "generate:types": "payload generate:types",
      "test": "vitest",
      "test:e2e": "playwright test"
    }
  }
  ```

---

## Phase 2: Database & Backend Configuration

### 2.1 PostgreSQL Database Setup

- [ ] **Choose PostgreSQL hosting provider**
  - Option A: Neon (recommended for Vercel) - serverless, auto-scaling
  - Option B: Supabase - includes auth, storage
  - Option C: Railway - simple, affordable
  - Option D: Self-hosted

- [ ] **Create Neon PostgreSQL database** (recommended)
  - Sign up at https://neon.tech
  - Create new project: "adaehandi-production"
  - Create database: "adaehandi_db"
  - Enable connection pooling
  - Copy connection string (pooled)

- [ ] **Set up development database**
  - Create separate Neon project or branch for development
  - OR use local PostgreSQL:
    ```bash
    # Install PostgreSQL locally
    brew install postgresql@15  # macOS
    # or
    sudo apt-get install postgresql-15  # Ubuntu

    # Start PostgreSQL
    brew services start postgresql@15

    # Create database
    createdb adaehandi_dev
    ```

- [ ] **Configure database environment variables**
  ```env
  # .env.local (development)
  DATABASE_URI=postgresql://user:password@localhost:5432/adaehandi_dev
  PAYLOAD_SECRET=your-secret-key-min-32-chars

  # .env.production (will be set in Vercel)
  DATABASE_URI=postgresql://user:password@neon.tech/adaehandi_db?sslmode=require
  ```

- [ ] **Test database connection**
  ```bash
  # Using psql
  psql $DATABASE_URI
  \l  # List databases
  \q  # Quit
  ```

### 2.2 Install Payload CMS Dependencies

- [ ] **Install Payload CMS 3.0 and PostgreSQL adapter**
  ```bash
  pnpm add payload@beta @payloadcms/db-postgres @payloadcms/richtext-lexical
  pnpm add @payloadcms/plugin-cloud-storage @payloadcms/plugin-seo
  pnpm add @payloadcms/ui @payloadcms/next
  ```

- [ ] **Install database and validation dependencies**
  ```bash
  pnpm add drizzle-orm postgres
  pnpm add zod  # For schema validation
  ```

- [ ] **Install file upload dependencies**
  ```bash
  pnpm add sharp  # Image processing (required)
  ```

### 2.3 Payload Configuration File

- [ ] **Create payload.config.ts in project root**
  ```typescript
  import { buildConfig } from 'payload/config'
  import { postgresAdapter } from '@payloadcms/db-postgres'
  import { lexicalEditor } from '@payloadcms/richtext-lexical'
  import path from 'path'

  export default buildConfig({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',

    // Admin configuration
    admin: {
      user: 'users',
      meta: {
        titleSuffix: '- AdaEhandi Admin',
        favicon: '/favicon.ico',
        ogImage: '/og-image.jpg',
      },
    },

    // Database adapter with connection pooling
    db: postgresAdapter({
      pool: {
        connectionString: process.env.DATABASE_URI!,
        max: 20,
        min: 2,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
      },
      push: process.env.NODE_ENV === 'development', // Auto-push schema in dev
    }),

    // Rich text editor
    editor: lexicalEditor({}),

    // TypeScript type generation
    typescript: {
      outputFile: path.resolve(__dirname, 'src/types/payload.ts'),
    },

    // Collections (will add later)
    collections: [],

    // Global settings (will add later)
    globals: [],

    // Secret key (min 32 characters)
    secret: process.env.PAYLOAD_SECRET!,
  })
  ```

- [ ] **Create next.config.mjs with Payload integration**
  ```javascript
  import { withPayload } from '@payloadcms/next/withPayload'

  /** @type {import('next').NextConfig} */
  const nextConfig = {
    // Experimental features
    experimental: {
      reactCompiler: true,
    },

    // Image optimization
    images: {
      formats: ['image/avif', 'image/webp'],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      domains: ['localhost'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**.neon.tech',
        },
      ],
    },

    // Security headers
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'X-DNS-Prefetch-Control',
              value: 'on',
            },
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
          ],
        },
      ]
    },
  }

  export default withPayload(nextConfig)
  ```

### 2.4 Payload Admin Route Setup

- [ ] **Create Payload admin route handler**
  ```typescript
  // src/app/(admin)/admin/[[...segments]]/page.tsx
  import { AdminView } from '@payloadcms/next/views'
  import config from '@/payload.config'

  export default function AdminPage() {
    return <AdminView config={config} />
  }
  ```

- [ ] **Create admin layout**
  ```typescript
  // src/app/(admin)/layout.tsx
  import type { Metadata } from 'next'

  export const metadata: Metadata = {
    title: 'AdaEhandi Admin',
    description: 'Content management system for AdaEhandi',
  }

  export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return children
  }
  ```

### 2.5 Database Migration Setup

- [ ] **Create migrations directory**
  ```bash
  mkdir -p src/payload/migrations
  ```

- [ ] **Create initial migration script**
  ```typescript
  // src/payload/migrations/2025-11-18-initial-setup.ts
  import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

  export async function up({ payload }: MigrateUpArgs): Promise<void> {
    // Initial database setup
    await payload.logger.info('Running initial migration...')
  }

  export async function down({ payload }: MigrateDownArgs): Promise<void> {
    // Rollback logic
    await payload.logger.info('Rolling back initial migration...')
  }
  ```

- [ ] **Add migration scripts to package.json**
  ```json
  {
    "scripts": {
      "migrate:create": "payload migrate:create",
      "migrate:up": "payload migrate:up",
      "migrate:down": "payload migrate:down",
      "migrate:status": "payload migrate:status"
    }
  }
  ```

---

## Phase 3: Payload CMS Setup & Collections

### 3.1 Users Collection (Authentication)

- [ ] **Create Users collection schema**
  ```typescript
  // src/payload/collections/Users.ts
  import type { CollectionConfig } from 'payload/types'

  export const Users: CollectionConfig = {
    slug: 'users',
    auth: {
      tokenExpiration: 7200, // 2 hours
      verify: true,
      maxLoginAttempts: 5,
      lockTime: 600000, // 10 minutes
    },
    admin: {
      useAsTitle: 'email',
      defaultColumns: ['name', 'email', 'role'],
    },
    access: {
      create: () => true, // First user can self-register
      read: ({ req: { user } }) => Boolean(user),
      update: ({ req: { user } }) => Boolean(user),
      delete: ({ req: { user } }) => user?.role === 'admin',
    },
    fields: [
      {
        name: 'name',
        type: 'text',
        required: true,
      },
      {
        name: 'role',
        type: 'select',
        required: true,
        defaultValue: 'editor',
        options: [
          { label: 'Admin', value: 'admin' },
          { label: 'Editor', value: 'editor' },
          { label: 'Viewer', value: 'viewer' },
        ],
      },
    ],
  }
  ```

- [ ] **Add Users collection to payload.config.ts**
  ```typescript
  import { Users } from './src/payload/collections/Users'

  export default buildConfig({
    collections: [Users],
  })
  ```

- [ ] **Create first admin user**
  - Run `pnpm dev`
  - Navigate to `http://localhost:3000/admin`
  - Create admin account with strong password
  - Verify email functionality (if configured)

### 3.2 Menu Items Collection

- [ ] **Create MenuItems collection schema**
  ```typescript
  // src/payload/collections/MenuItems.ts
  import type { CollectionConfig } from 'payload/types'

  export const MenuItems: CollectionConfig = {
    slug: 'menu-items',
    admin: {
      useAsTitle: 'name',
      defaultColumns: ['name', 'category', 'featured', 'publishedAt'],
      group: 'Content',
    },
    access: {
      read: () => true, // Public
      create: ({ req: { user } }) => Boolean(user),
      update: ({ req: { user } }) => Boolean(user),
      delete: ({ req: { user } }) => user?.role === 'admin',
    },
    fields: [
      {
        name: 'name',
        type: 'text',
        required: true,
        localized: true, // Hindi/English
      },
      {
        name: 'nameHindi',
        type: 'text',
        admin: {
          description: 'Name in Devanagari script',
        },
      },
      {
        name: 'slug',
        type: 'text',
        required: true,
        unique: true,
        admin: {
          position: 'sidebar',
        },
        hooks: {
          beforeValidate: [
            ({ value, data }) => {
              if (!value && data?.name) {
                return data.name
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/^-+|-+$/g, '')
              }
              return value
            },
          ],
        },
      },
      {
        name: 'description',
        type: 'richText',
        required: true,
      },
      {
        name: 'category',
        type: 'select',
        required: true,
        options: [
          { label: 'Appetizers (शुरुआती)', value: 'appetizers' },
          { label: 'Main Course (मुख्य व्यंजन)', value: 'main-course' },
          { label: 'Breads (रोटी)', value: 'breads' },
          { label: 'Rice (चावल)', value: 'rice' },
          { label: 'Desserts (मिठाई)', value: 'desserts' },
          { label: 'Beverages (पेय)', value: 'beverages' },
        ],
        index: true,
      },
      {
        name: 'cuisine',
        type: 'select',
        options: [
          { label: 'Punjabi', value: 'punjabi' },
          { label: 'Mughlai', value: 'mughlai' },
          { label: 'Awadhi', value: 'awadhi' },
          { label: 'Tandoori', value: 'tandoori' },
          { label: 'Vegetarian', value: 'vegetarian' },
          { label: 'Vegan', value: 'vegan' },
        ],
      },
      {
        name: 'dietaryInfo',
        type: 'array',
        fields: [
          {
            name: 'tag',
            type: 'select',
            options: [
              { label: 'Vegetarian 🥬', value: 'vegetarian' },
              { label: 'Vegan 🌱', value: 'vegan' },
              { label: 'Gluten-Free', value: 'gluten-free' },
              { label: 'Dairy-Free', value: 'dairy-free' },
              { label: 'Spicy 🌶️', value: 'spicy' },
              { label: 'Halal ☪️', value: 'halal' },
            ],
          },
        ],
      },
      {
        name: 'images',
        type: 'array',
        required: true,
        minRows: 1,
        maxRows: 5,
        fields: [
          {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
          },
          {
            name: 'alt',
            type: 'text',
            required: true,
          },
        ],
      },
      {
        name: 'featured',
        type: 'checkbox',
        defaultValue: false,
        index: true,
        admin: {
          position: 'sidebar',
          description: 'Show on homepage',
        },
      },
      {
        name: 'servingSize',
        type: 'text',
        admin: {
          description: 'e.g., "Serves 10-12 people"',
        },
      },
      {
        name: 'publishedAt',
        type: 'date',
        admin: {
          position: 'sidebar',
          date: {
            pickerAppearance: 'dayAndTime',
          },
        },
        hooks: {
          beforeChange: [
            ({ siblingData, value }) => {
              if (!value && siblingData._status === 'published') {
                return new Date()
              }
              return value
            },
          ],
        },
      },
    ],
    hooks: {
      afterChange: [
        async ({ doc, req, operation }) => {
          // Revalidate cache on change
          if (operation === 'update') {
            // Implement ISR revalidation
          }
        },
      ],
    },
    timestamps: true,
    versions: {
      drafts: true,
    },
  }
  ```

- [ ] **Create database indexes for MenuItems**
  ```typescript
  // src/payload/migrations/2025-11-18-menu-indexes.ts
  export async function up({ payload }: MigrateUpArgs): Promise<void> {
    await payload.db.drizzle.execute(`
      CREATE INDEX IF NOT EXISTS idx_menu_items_category
      ON menu_items(category);

      CREATE INDEX IF NOT EXISTS idx_menu_items_featured
      ON menu_items(featured);

      CREATE INDEX IF NOT EXISTS idx_menu_items_slug
      ON menu_items(slug);

      CREATE INDEX IF NOT EXISTS idx_menu_items_published
      ON menu_items(published_at);
    `)
  }
  ```

### 3.3 Media Collection (File Uploads)

- [ ] **Create Media collection schema**
  ```typescript
  // src/payload/collections/Media.ts
  import type { CollectionConfig } from 'payload/types'
  import path from 'path'

  export const Media: CollectionConfig = {
    slug: 'media',
    admin: {
      group: 'Content',
    },
    access: {
      read: () => true,
      create: ({ req: { user } }) => Boolean(user),
      update: ({ req: { user } }) => Boolean(user),
      delete: ({ req: { user } }) => user?.role === 'admin',
    },
    upload: {
      staticDir: path.resolve(__dirname, '../../public/media'),
      staticURL: '/media',
      mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
      imageSizes: [
        {
          name: 'thumbnail',
          width: 400,
          height: 300,
          position: 'centre',
          formatOptions: {
            format: 'webp',
            options: { quality: 80 },
          },
        },
        {
          name: 'card',
          width: 768,
          height: 576,
          position: 'centre',
          formatOptions: {
            format: 'webp',
            options: { quality: 85 },
          },
        },
        {
          name: 'hero',
          width: 1920,
          height: 1080,
          position: 'centre',
          formatOptions: {
            format: 'webp',
            options: { quality: 90 },
          },
        },
      ],
      adminThumbnail: 'thumbnail',
      focalPoint: true,
      crop: true,
    },
    fields: [
      {
        name: 'alt',
        type: 'text',
        required: true,
      },
      {
        name: 'caption',
        type: 'text',
      },
      {
        name: 'photographer',
        type: 'text',
        admin: {
          description: 'Photo credit',
        },
      },
    ],
  }
  ```

- [ ] **Configure Sharp for image optimization**
  ```typescript
  // Ensure sharp is installed
  pnpm add sharp
  ```

### 3.4 Service Packages Collection

- [ ] **Create ServicePackages collection schema**
  ```typescript
  // src/payload/collections/ServicePackages.ts
  import type { CollectionConfig } from 'payload/types'

  export const ServicePackages: CollectionConfig = {
    slug: 'service-packages',
    admin: {
      useAsTitle: 'name',
      defaultColumns: ['name', 'type', 'priceRange', 'featured'],
      group: 'Content',
    },
    access: {
      read: () => true,
      create: ({ req: { user } }) => Boolean(user),
      update: ({ req: { user } }) => Boolean(user),
      delete: ({ req: { user } }) => user?.role === 'admin',
    },
    fields: [
      {
        name: 'name',
        type: 'text',
        required: true,
      },
      {
        name: 'nameHindi',
        type: 'text',
      },
      {
        name: 'slug',
        type: 'text',
        required: true,
        unique: true,
      },
      {
        name: 'type',
        type: 'select',
        required: true,
        options: [
          { label: 'Wedding Catering (शादी)', value: 'wedding' },
          { label: 'Corporate Events (कॉर्पोरेट)', value: 'corporate' },
          { label: 'Private Parties (निजी पार्टी)', value: 'private' },
          { label: 'Festival Catering (त्योहार)', value: 'festival' },
          { label: 'Birthday (जन्मदिन)', value: 'birthday' },
        ],
      },
      {
        name: 'description',
        type: 'richText',
        required: true,
      },
      {
        name: 'priceRange',
        type: 'group',
        fields: [
          {
            name: 'min',
            type: 'number',
            required: true,
            admin: {
              description: 'Minimum price per person (₹)',
            },
          },
          {
            name: 'max',
            type: 'number',
            required: true,
            admin: {
              description: 'Maximum price per person (₹)',
            },
          },
        ],
      },
      {
        name: 'minimumGuests',
        type: 'number',
        required: true,
        defaultValue: 50,
      },
      {
        name: 'features',
        type: 'array',
        required: true,
        fields: [
          {
            name: 'feature',
            type: 'text',
            required: true,
          },
        ],
      },
      {
        name: 'menuItems',
        type: 'relationship',
        relationTo: 'menu-items',
        hasMany: true,
        admin: {
          description: 'Default menu items included in package',
        },
      },
      {
        name: 'heroImage',
        type: 'upload',
        relationTo: 'media',
        required: true,
      },
      {
        name: 'gallery',
        type: 'array',
        fields: [
          {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
          },
        ],
      },
      {
        name: 'featured',
        type: 'checkbox',
        defaultValue: false,
      },
    ],
    timestamps: true,
    versions: {
      drafts: true,
    },
  }
  ```

### 3.5 Testimonials Collection

- [ ] **Create Testimonials collection schema**
  ```typescript
  // src/payload/collections/Testimonials.ts
  import type { CollectionConfig } from 'payload/types'

  export const Testimonials: CollectionConfig = {
    slug: 'testimonials',
    admin: {
      useAsTitle: 'customerName',
      defaultColumns: ['customerName', 'eventType', 'rating', 'approved'],
      group: 'Content',
    },
    access: {
      read: ({ req: { user } }) => {
        if (user) return true
        return {
          approved: { equals: true },
        }
      },
      create: ({ req: { user } }) => Boolean(user),
      update: ({ req: { user } }) => Boolean(user),
      delete: ({ req: { user } }) => user?.role === 'admin',
    },
    fields: [
      {
        name: 'customerName',
        type: 'text',
        required: true,
      },
      {
        name: 'eventType',
        type: 'select',
        required: true,
        options: [
          { label: 'Wedding', value: 'wedding' },
          { label: 'Corporate', value: 'corporate' },
          { label: 'Private Party', value: 'private' },
          { label: 'Festival', value: 'festival' },
        ],
      },
      {
        name: 'eventDate',
        type: 'date',
        admin: {
          description: 'When was the event held?',
        },
      },
      {
        name: 'rating',
        type: 'number',
        required: true,
        min: 1,
        max: 5,
      },
      {
        name: 'review',
        type: 'textarea',
        required: true,
        maxLength: 500,
      },
      {
        name: 'customerPhoto',
        type: 'upload',
        relationTo: 'media',
      },
      {
        name: 'eventPhotos',
        type: 'array',
        maxRows: 3,
        fields: [
          {
            name: 'photo',
            type: 'upload',
            relationTo: 'media',
          },
        ],
      },
      {
        name: 'approved',
        type: 'checkbox',
        defaultValue: false,
        admin: {
          position: 'sidebar',
          description: 'Show on public website',
        },
      },
      {
        name: 'featured',
        type: 'checkbox',
        defaultValue: false,
        admin: {
          position: 'sidebar',
          description: 'Show on homepage',
        },
      },
    ],
    timestamps: true,
  }
  ```

### 3.6 Booking Inquiries Collection

- [ ] **Create BookingInquiries collection schema**
  ```typescript
  // src/payload/collections/BookingInquiries.ts
  import type { CollectionConfig } from 'payload/types'

  export const BookingInquiries: CollectionConfig = {
    slug: 'booking-inquiries',
    admin: {
      useAsTitle: 'customerName',
      defaultColumns: ['customerName', 'eventType', 'eventDate', 'status', 'createdAt'],
      group: 'Inquiries',
    },
    access: {
      read: ({ req: { user } }) => Boolean(user),
      create: () => true, // Public form submission
      update: ({ req: { user } }) => Boolean(user),
      delete: ({ req: { user } }) => user?.role === 'admin',
    },
    fields: [
      {
        name: 'customerName',
        type: 'text',
        required: true,
      },
      {
        name: 'email',
        type: 'email',
        required: true,
      },
      {
        name: 'phone',
        type: 'text',
        required: true,
        validate: (val) => {
          if (!/^\+91[0-9]{10}$/.test(val)) {
            return 'Please enter valid Indian phone number (+91XXXXXXXXXX)'
          }
          return true
        },
      },
      {
        name: 'eventType',
        type: 'select',
        required: true,
        options: [
          { label: 'Wedding', value: 'wedding' },
          { label: 'Corporate', value: 'corporate' },
          { label: 'Private Party', value: 'private' },
          { label: 'Festival', value: 'festival' },
          { label: 'Birthday', value: 'birthday' },
          { label: 'Other', value: 'other' },
        ],
      },
      {
        name: 'eventDate',
        type: 'date',
        required: true,
        admin: {
          date: {
            pickerAppearance: 'dayOnly',
          },
        },
      },
      {
        name: 'guestCount',
        type: 'number',
        required: true,
        min: 10,
      },
      {
        name: 'venue',
        type: 'text',
        admin: {
          description: 'Location in Delhi/NCR',
        },
      },
      {
        name: 'servicePackage',
        type: 'relationship',
        relationTo: 'service-packages',
      },
      {
        name: 'message',
        type: 'textarea',
        maxLength: 1000,
      },
      {
        name: 'status',
        type: 'select',
        required: true,
        defaultValue: 'new',
        options: [
          { label: 'New', value: 'new' },
          { label: 'Contacted', value: 'contacted' },
          { label: 'Quote Sent', value: 'quote-sent' },
          { label: 'Confirmed', value: 'confirmed' },
          { label: 'Declined', value: 'declined' },
        ],
        admin: {
          position: 'sidebar',
        },
      },
      {
        name: 'internalNotes',
        type: 'textarea',
        admin: {
          description: 'Internal notes (not visible to customer)',
        },
      },
    ],
    hooks: {
      afterChange: [
        async ({ operation, doc }) => {
          if (operation === 'create') {
            // Send email notification to admin
            // Send confirmation email to customer
          }
        },
      ],
    },
    timestamps: true,
  }
  ```

### 3.7 Global Settings

- [ ] **Create Site Settings global schema**
  ```typescript
  // src/payload/globals/SiteSettings.ts
  import type { GlobalConfig } from 'payload/types'

  export const SiteSettings: GlobalConfig = {
    slug: 'site-settings',
    admin: {
      group: 'Settings',
    },
    access: {
      read: () => true,
      update: ({ req: { user } }) => user?.role === 'admin',
    },
    fields: [
      {
        type: 'tabs',
        tabs: [
          {
            label: 'General',
            fields: [
              {
                name: 'siteName',
                type: 'text',
                required: true,
                defaultValue: 'AdaEhandi',
              },
              {
                name: 'siteNameHindi',
                type: 'text',
                defaultValue: 'अड़ाएहंडी',
              },
              {
                name: 'tagline',
                type: 'text',
                defaultValue: 'Premium North Indian Catering in Delhi',
              },
              {
                name: 'taglineHindi',
                type: 'text',
                defaultValue: 'दिल्ली में प्रीमियम नॉर्थ इंडियन कैटरिंग',
              },
              {
                name: 'logo',
                type: 'upload',
                relationTo: 'media',
                required: true,
              },
              {
                name: 'favicon',
                type: 'upload',
                relationTo: 'media',
              },
            ],
          },
          {
            label: 'Contact',
            fields: [
              {
                name: 'phone',
                type: 'text',
                required: true,
              },
              {
                name: 'email',
                type: 'email',
                required: true,
              },
              {
                name: 'address',
                type: 'textarea',
                required: true,
              },
              {
                name: 'googleMapsUrl',
                type: 'text',
              },
              {
                name: 'whatsappNumber',
                type: 'text',
                admin: {
                  description: 'Include country code (+91)',
                },
              },
            ],
          },
          {
            label: 'Social Media',
            fields: [
              {
                name: 'facebook',
                type: 'text',
              },
              {
                name: 'instagram',
                type: 'text',
              },
              {
                name: 'twitter',
                type: 'text',
              },
              {
                name: 'linkedin',
                type: 'text',
              },
              {
                name: 'youtube',
                type: 'text',
              },
            ],
          },
          {
            label: 'Business Hours',
            fields: [
              {
                name: 'hours',
                type: 'array',
                fields: [
                  {
                    name: 'day',
                    type: 'select',
                    options: [
                      'Monday',
                      'Tuesday',
                      'Wednesday',
                      'Thursday',
                      'Friday',
                      'Saturday',
                      'Sunday',
                    ],
                  },
                  {
                    name: 'open',
                    type: 'text',
                    admin: {
                      description: 'e.g., "9:00 AM"',
                    },
                  },
                  {
                    name: 'close',
                    type: 'text',
                    admin: {
                      description: 'e.g., "8:00 PM"',
                    },
                  },
                  {
                    name: 'closed',
                    type: 'checkbox',
                    defaultValue: false,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  }
  ```

- [ ] **Create Navigation global schema**
  ```typescript
  // src/payload/globals/Navigation.ts
  import type { GlobalConfig } from 'payload/types'

  export const Navigation: GlobalConfig = {
    slug: 'navigation',
    admin: {
      group: 'Settings',
    },
    access: {
      read: () => true,
      update: ({ req: { user } }) => Boolean(user),
    },
    fields: [
      {
        name: 'mainNav',
        type: 'array',
        fields: [
          {
            name: 'label',
            type: 'text',
            required: true,
          },
          {
            name: 'labelHindi',
            type: 'text',
          },
          {
            name: 'href',
            type: 'text',
            required: true,
          },
        ],
      },
      {
        name: 'footerNav',
        type: 'array',
        fields: [
          {
            name: 'label',
            type: 'text',
            required: true,
          },
          {
            name: 'href',
            type: 'text',
            required: true,
          },
        ],
      },
    ],
  }
  ```

### 3.8 Add All Collections & Globals to Config

- [ ] **Update payload.config.ts with all schemas**
  ```typescript
  import { Users } from './src/payload/collections/Users'
  import { MenuItems } from './src/payload/collections/MenuItems'
  import { Media } from './src/payload/collections/Media'
  import { ServicePackages } from './src/payload/collections/ServicePackages'
  import { Testimonials } from './src/payload/collections/Testimonials'
  import { BookingInquiries } from './src/payload/collections/BookingInquiries'
  import { SiteSettings } from './src/payload/globals/SiteSettings'
  import { Navigation } from './src/payload/globals/Navigation'

  export default buildConfig({
    collections: [
      Users,
      MenuItems,
      Media,
      ServicePackages,
      Testimonials,
      BookingInquiries,
    ],
    globals: [SiteSettings, Navigation],
  })
  ```

- [ ] **Generate TypeScript types**
  ```bash
  pnpm generate:types
  ```

- [ ] **Run database migrations**
  ```bash
  pnpm migrate:up
  ```

---

## Phase 4: Design System & Tailwind Configuration

### 4.1 Tailwind CSS Configuration

- [ ] **Install Tailwind CSS dependencies**
  ```bash
  pnpm add -D @tailwindcss/typography @tailwindcss/forms @tailwindcss/aspect-ratio
  pnpm add tailwind-merge clsx
  ```

- [ ] **Configure Tailwind with Indian color palettes**
  ```typescript
  // tailwind.config.ts
  import type { Config } from 'tailwindcss'

  const config: Config = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          // Premium Indian palette (Saffron Heritage)
          primary: {
            50: '#FFF5E6',
            100: '#FFE5B3',
            200: '#FFD580',
            300: '#FFC44D',
            400: '#FFB31A',
            500: '#FF9933', // Deep Saffron (Indian flag)
            600: '#E68A2E',
            700: '#CC7A29',
            800: '#B36B24',
            900: '#995C1F',
          },
          secondary: {
            50: '#FFF0F5',
            100: '#FFD6E8',
            200: '#FFADCC',
            300: '#FF85AF',
            400: '#FF5C93',
            500: '#8B2635', // Maroon (weddings)
            600: '#7A2130',
            700: '#691C2A',
            800: '#581825',
            900: '#47131F',
          },
          accent: {
            50: '#FFFDF0',
            100: '#FFFADB',
            200: '#FFF5B8',
            300: '#FFF094',
            400: '#FFEB70',
            500: '#D4AF37', // Royal Gold
            600: '#C09E31',
            700: '#AB8E2B',
            800: '#977D26',
            900: '#826D20',
          },
          neutral: {
            50: '#FAF9F7',
            100: '#F5F3F0',
            200: '#E8E6E1',
            300: '#D3D0C9',
            400: '#B8B4AC',
            500: '#8B8680',
            600: '#6E6B66',
            700: '#54524E',
            800: '#3C3A37',
            900: '#2A2826',
          },
        },
        fontFamily: {
          // Latin fonts
          sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
          serif: ['var(--font-playfair)', 'Georgia', 'serif'],
          display: ['var(--font-cinzel)', 'Georgia', 'serif'],
          // Devanagari fonts
          hindi: ['var(--font-noto-sans-devanagari)', 'sans-serif'],
          hindiDisplay: ['var(--font-hind)', 'sans-serif'],
        },
        fontSize: {
          // Responsive type scale
          xs: ['0.75rem', { lineHeight: '1rem' }],
          sm: ['0.875rem', { lineHeight: '1.25rem' }],
          base: ['1rem', { lineHeight: '1.5rem' }],
          lg: ['1.125rem', { lineHeight: '1.75rem' }],
          xl: ['1.25rem', { lineHeight: '1.75rem' }],
          '2xl': ['1.5rem', { lineHeight: '2rem' }],
          '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
          '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
          '5xl': ['3rem', { lineHeight: '1' }],
          '6xl': ['3.75rem', { lineHeight: '1' }],
          '7xl': ['4.5rem', { lineHeight: '1' }],
          '8xl': ['6rem', { lineHeight: '1' }],
          '9xl': ['8rem', { lineHeight: '1' }],
        },
        spacing: {
          // 8px base scale
          18: '4.5rem',
          112: '28rem',
          128: '32rem',
        },
        maxWidth: {
          '8xl': '88rem',
          '9xl': '96rem',
        },
        borderRadius: {
          '4xl': '2rem',
        },
        boxShadow: {
          // Premium shadows
          'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
          'premium': '0 10px 40px -10px rgba(139, 38, 53, 0.25)',
          'gold': '0 10px 40px -10px rgba(212, 175, 55, 0.30)',
        },
        animation: {
          'fade-in': 'fadeIn 0.5s ease-in-out',
          'slide-up': 'slideUp 0.5s ease-out',
          'slide-down': 'slideDown 0.5s ease-out',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideUp: {
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          slideDown: {
            '0%': { transform: 'translateY(-20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
        },
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }

  export default config
  ```

### 4.2 Custom Fonts Setup

- [ ] **Install Google Fonts (Next.js font optimization)**
  ```bash
  # Fonts are included via next/font/google
  ```

- [ ] **Configure fonts in layout**
  ```typescript
  // src/app/layout.tsx
  import { Inter, Playfair_Display, Cinzel, Noto_Sans_Devanagari, Hind } from 'next/font/google'

  const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
  })

  const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
  })

  const cinzel = Cinzel({
    subsets: ['latin'],
    variable: '--font-cinzel',
    display: 'swap',
    weight: ['400', '600', '700'],
  })

  const notoSansDevanagari = Noto_Sans_Devanagari({
    subsets: ['devanagari'],
    variable: '--font-noto-sans-devanagari',
    display: 'swap',
  })

  const hind = Hind({
    subsets: ['devanagari'],
    variable: '--font-hind',
    display: 'swap',
    weight: ['300', '400', '600', '700'],
  })

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html
        lang="en"
        className={`${inter.variable} ${playfair.variable} ${cinzel.variable} ${notoSansDevanagari.variable} ${hind.variable}`}
      >
        <body className="font-sans antialiased">{children}</body>
      </html>
    )
  }
  ```

### 4.3 Global Styles & CSS Variables

- [ ] **Create global styles**
  ```css
  /* src/styles/globals.css */
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer base {
    :root {
      /* Color tokens */
      --color-background: 250 249 247; /* neutral-50 */
      --color-foreground: 42 40 38; /* neutral-900 */
      --color-primary: 255 153 51; /* primary-500 */
      --color-secondary: 139 38 53; /* secondary-500 */
      --color-accent: 212 175 55; /* accent-500 */

      /* Spacing */
      --spacing-section: 6rem;
      --spacing-section-mobile: 3rem;

      /* Typography */
      --font-size-hero: clamp(2.5rem, 5vw, 5rem);
      --font-size-h1: clamp(2rem, 4vw, 3.5rem);
      --font-size-h2: clamp(1.75rem, 3vw, 2.5rem);
      --font-size-h3: clamp(1.5rem, 2.5vw, 2rem);

      /* Border radius */
      --radius-sm: 0.375rem;
      --radius-md: 0.5rem;
      --radius-lg: 0.75rem;
      --radius-xl: 1rem;

      /* Shadows */
      --shadow-soft: 0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04);
      --shadow-premium: 0 10px 40px -10px rgba(139, 38, 53, 0.25);
    }

    body {
      @apply bg-neutral-50 text-neutral-900;
    }

    h1, h2, h3, h4, h5, h6 {
      @apply font-display;
    }

    /* Smooth scrolling */
    html {
      scroll-behavior: smooth;
    }

    /* Focus styles for accessibility */
    *:focus-visible {
      @apply outline-2 outline-offset-2 outline-primary-500;
    }
  }

  @layer components {
    /* Button base styles */
    .btn {
      @apply inline-flex items-center justify-center px-6 py-3
             font-medium rounded-lg transition-all duration-200
             focus:outline-none focus:ring-2 focus:ring-offset-2;
    }

    .btn-primary {
      @apply bg-primary-500 text-white hover:bg-primary-600
             focus:ring-primary-500 shadow-md hover:shadow-lg;
    }

    .btn-secondary {
      @apply bg-secondary-500 text-white hover:bg-secondary-600
             focus:ring-secondary-500 shadow-md hover:shadow-lg;
    }

    .btn-outline {
      @apply border-2 border-primary-500 text-primary-600
             hover:bg-primary-50 focus:ring-primary-500;
    }

    /* Container */
    .container-custom {
      @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
    }

    /* Section spacing */
    .section-padding {
      @apply py-16 sm:py-20 lg:py-24;
    }

    /* Card styles */
    .card {
      @apply bg-white rounded-xl shadow-soft overflow-hidden
             transition-shadow duration-300 hover:shadow-premium;
    }

    /* Premium gradient overlay */
    .gradient-overlay {
      @apply absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/40 to-transparent;
    }
  }

  @layer utilities {
    /* Text gradient */
    .text-gradient {
      @apply bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500
             bg-clip-text text-transparent;
    }

    /* Aspect ratios */
    .aspect-video {
      aspect-ratio: 16 / 9;
    }

    .aspect-square {
      aspect-ratio: 1 / 1;
    }

    .aspect-food {
      aspect-ratio: 4 / 3;
    }

    /* Touch targets (mobile) */
    .touch-target {
      @apply min-h-[44px] min-w-[44px];
    }
  }
  ```

### 4.4 Utility Functions

- [ ] **Create className utility for Tailwind**
  ```typescript
  // src/lib/utils.ts
  import { type ClassValue, clsx } from 'clsx'
  import { twMerge } from 'tailwind-merge'

  /**
   * Merge Tailwind CSS classes with proper precedence
   */
  export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs))
  }

  /**
   * Format price in Indian Rupees
   */
  export function formatPrice(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  /**
   * Format Indian phone number
   */
  export function formatPhone(phone: string): string {
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length === 12 && cleaned.startsWith('91')) {
      return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`
    }
    return phone
  }

  /**
   * Generate URL slug from text
   */
  export function slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
  ```

### 4.5 Component Library Setup

- [ ] **Install UI component dependencies**
  ```bash
  pnpm add @radix-ui/react-dialog @radix-ui/react-dropdown-menu
  pnpm add @radix-ui/react-navigation-menu @radix-ui/react-tabs
  pnpm add @radix-ui/react-toast @radix-ui/react-select
  pnpm add react-hook-form zod @hookform/resolvers
  pnpm add framer-motion  # For animations
  pnpm add embla-carousel-react  # For carousels
  ```

---

## Phase 5: Core Pages & Components

### 5.1 Base UI Components

- [ ] **Create Button component**
  ```typescript
  // src/components/ui/Button.tsx
  import * as React from 'react'
  import { cn } from '@/lib/utils'

  export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    asChild?: boolean
  }

  const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
      return (
        <button
          className={cn(
            'btn touch-target',
            {
              'btn-primary': variant === 'primary',
              'btn-secondary': variant === 'secondary',
              'btn-outline': variant === 'outline',
              'px-4 py-2 text-sm': size === 'sm',
              'px-6 py-3': size === 'md',
              'px-8 py-4 text-lg': size === 'lg',
            },
            className
          )}
          ref={ref}
          {...props}
        />
      )
    }
  )
  Button.displayName = 'Button'

  export { Button }
  ```

- [ ] **Create Container component**
  ```typescript
  // src/components/ui/Container.tsx
  import { cn } from '@/lib/utils'

  interface ContainerProps {
    children: React.ReactNode
    className?: string
    size?: 'sm' | 'md' | 'lg' | 'full'
  }

  export function Container({ children, className, size = 'lg' }: ContainerProps) {
    return (
      <div
        className={cn(
          'mx-auto px-4 sm:px-6',
          {
            'max-w-4xl': size === 'sm',
            'max-w-6xl': size === 'md',
            'max-w-7xl': size === 'lg',
            'max-w-full': size === 'full',
          },
          className
        )}
      >
        {children}
      </div>
    )
  }
  ```

- [ ] **Create Section component**
  ```typescript
  // src/components/ui/Section.tsx
  import { cn } from '@/lib/utils'
  import { Container } from './Container'

  interface SectionProps {
    children: React.ReactNode
    className?: string
    containerSize?: 'sm' | 'md' | 'lg' | 'full'
    noPadding?: boolean
  }

  export function Section({
    children,
    className,
    containerSize = 'lg',
    noPadding = false,
  }: SectionProps) {
    return (
      <section className={cn(!noPadding && 'section-padding', className)}>
        <Container size={containerSize}>{children}</Container>
      </section>
    )
  }
  ```

### 5.2 Header & Navigation

- [ ] **Create Header component**
  ```typescript
  // src/components/layout/Header.tsx
  'use client'

  import { useState, useEffect } from 'react'
  import Link from 'next/link'
  import Image from 'next/image'
  import { Menu, X, Phone } from 'lucide-react'
  import { Button } from '@/components/ui/Button'
  import { cn } from '@/lib/utils'

  export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20)
      }
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navItems = [
      { label: 'Home', href: '/' },
      { label: 'Menu', labelHindi: 'मेनू', href: '/menu' },
      { label: 'Services', labelHindi: 'सेवाएं', href: '/services' },
      { label: 'Gallery', labelHindi: 'गैलरी', href: '/gallery' },
      { label: 'About', labelHindi: 'हमारे बारे में', href: '/about' },
      { label: 'Contact', labelHindi: 'संपर्क', href: '/contact' },
    ]

    return (
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-transparent'
        )}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-display font-bold text-primary-600">
                AdaEhandi
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CTA Button (Desktop) */}
            <div className="hidden lg:flex items-center space-x-4">
              <a href="tel:+919876543210" className="text-primary-600">
                <Phone className="h-5 w-5" />
              </a>
              <Button asChild>
                <Link href="/contact">Book Now</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-700"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden pb-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-2 text-neutral-700 hover:text-primary-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button className="w-full" asChild>
                <Link href="/contact">Book Now</Link>
              </Button>
            </div>
          )}
        </nav>
      </header>
    )
  }
  ```

- [ ] **Create Footer component**
  ```typescript
  // src/components/layout/Footer.tsx
  import Link from 'next/link'
  import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react'

  export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
      <footer className="bg-neutral-900 text-neutral-200">
        <div className="container-custom">
          {/* Main Footer Content */}
          <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <h3 className="text-lg font-display font-semibold text-white mb-4">
                AdaEhandi
              </h3>
              <p className="text-sm text-neutral-400 mb-4">
                Premium North Indian catering services in Delhi. Making your events memorable with authentic flavors.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-primary-400 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-display font-semibold text-white mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/menu" className="hover:text-primary-400 transition-colors">
                    Our Menu
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-primary-400 transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="hover:text-primary-400 transition-colors">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-primary-400 transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-display font-semibold text-white mb-4">
                Services
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-primary-400 transition-colors">Wedding Catering</li>
                <li className="hover:text-primary-400 transition-colors">Corporate Events</li>
                <li className="hover:text-primary-400 transition-colors">Private Parties</li>
                <li className="hover:text-primary-400 transition-colors">Festival Catering</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-display font-semibold text-white mb-4">
                Contact Us
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 flex-shrink-0 text-primary-400" />
                  <span>123 Defence Colony, New Delhi, 110024</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 flex-shrink-0 text-primary-400" />
                  <a href="tel:+919876543210" className="hover:text-primary-400">
                    +91 98765 43210
                  </a>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 flex-shrink-0 text-primary-400" />
                  <a href="mailto:info@adaehandi.com" className="hover:text-primary-400">
                    info@adaehandi.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-neutral-800 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-400">
              <p>&copy; {currentYear} AdaEhandi. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/privacy" className="hover:text-primary-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-primary-400 transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  ```

### 5.3 Homepage

- [ ] **Create Hero section component**
  ```typescript
  // src/components/sections/Hero.tsx
  'use client'

  import { motion } from 'framer-motion'
  import Image from 'next/image'
  import Link from 'next/link'
  import { Button } from '@/components/ui/Button'
  import { ArrowRight } from 'lucide-react'

  export function Hero() {
    return (
      <section className="relative h-screen min-h-[600px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Premium North Indian cuisine"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="gradient-overlay" />
        </div>

        {/* Content */}
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6">
                Taste of
                <span className="block text-primary-400">North India</span>
              </h1>
              <p className="text-xl md:text-2xl text-neutral-200 mb-8 max-w-2xl">
                Premium catering services for your special moments. Authentic flavors,
                exceptional service, unforgettable experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Book Your Event
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/menu">View Menu</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1 h-3 bg-white rounded-full" />
          </motion.div>
        </div>
      </section>
    )
  }
  ```

- [ ] **Create Featured Menu section**
- [ ] **Create Services Overview section**
- [ ] **Create Testimonials section**
- [ ] **Create CTA (Call-to-Action) section**

### 5.4 Menu Page

- [ ] **Create Menu page layout**
- [ ] **Create MenuFilter component** (category filters)
- [ ] **Create MenuItemCard component**
- [ ] **Create MenuItemModal component** (detailed view)
- [ ] **Implement search functionality**
- [ ] **Add dietary filter (veg/vegan/halal)**

### 5.5 Services Page

- [ ] **Create Services page layout**
- [ ] **Create ServiceCard component**
- [ ] **Create service detail pages** (dynamic routes)
- [ ] **Add package comparison feature**

### 5.6 Gallery Page

- [ ] **Create Gallery page with masonry layout**
- [ ] **Implement lightbox for image viewing**
- [ ] **Add category filters (weddings/corporate/etc.)**
- [ ] **Lazy loading for images**

### 5.7 About Page

- [ ] **Create About page layout**
- [ ] **Add "Our Story" section**
- [ ] **Add "Our Team" section**
- [ ] **Add "Why Choose Us" section**
- [ ] **Add stats/achievements section**

### 5.8 Contact Page

- [ ] **Create Contact page layout**
- [ ] **Create contact form with validation**
- [ ] **Add Google Maps embed**
- [ ] **Add WhatsApp integration**
- [ ] **Display business hours**

---

## Phase 6: Advanced Features

### 6.1 Booking System

- [ ] **Create multi-step booking form**
  - Step 1: Event details (type, date, guest count)
  - Step 2: Package selection
  - Step 3: Menu customization
  - Step 4: Contact information
  - Step 5: Confirmation

- [ ] **Form validation with Zod**
  ```typescript
  // src/lib/validations/booking.ts
  import { z } from 'zod'

  export const bookingSchema = z.object({
    customerName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().regex(/^\+91[0-9]{10}$/, 'Invalid Indian phone number'),
    eventType: z.enum(['wedding', 'corporate', 'private', 'festival', 'birthday', 'other']),
    eventDate: z.date().min(new Date(), 'Event date must be in the future'),
    guestCount: z.number().min(10, 'Minimum 10 guests'),
    venue: z.string().optional(),
    message: z.string().max(1000).optional(),
  })

  export type BookingFormData = z.infer<typeof bookingSchema>
  ```

- [ ] **API route for form submission**
  ```typescript
  // src/app/api/booking/route.ts
  import { NextRequest, NextResponse } from 'next/server'
  import { getPayloadClient } from '@/lib/payload'
  import { bookingSchema } from '@/lib/validations/booking'

  export async function POST(request: NextRequest) {
    try {
      const body = await request.json()
      const validatedData = bookingSchema.parse(body)

      const payload = await getPayloadClient()

      const booking = await payload.create({
        collection: 'booking-inquiries',
        data: {
          ...validatedData,
          status: 'new',
        },
      })

      // Send email notifications
      // Send confirmation email to customer

      return NextResponse.json({ success: true, booking })
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Invalid request' },
        { status: 400 }
      )
    }
  }
  ```

- [ ] **Implement email notifications**
  - Install Resend or Nodemailer
  - Create email templates
  - Send confirmation to customer
  - Send alert to admin

### 6.2 Search & Filtering

- [ ] **Create global search component**
- [ ] **Implement menu item search**
- [ ] **Add advanced filters**
  - Price range
  - Dietary restrictions
  - Cuisine type
  - Event type

### 6.3 WhatsApp Integration

- [ ] **Add WhatsApp floating button**
  ```typescript
  // src/components/WhatsAppButton.tsx
  'use client'

  import { MessageCircle } from 'lucide-react'

  export function WhatsAppButton() {
    const phoneNumber = '+919876543210'
    const message = 'Hello! I would like to inquire about your catering services.'
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    )
  }
  ```

### 6.4 Internationalization (Hindi/English)

- [ ] **Install next-intl**
  ```bash
  pnpm add next-intl
  ```

- [ ] **Configure internationalization**
- [ ] **Create translations for all static content**
- [ ] **Add language switcher**

### 6.5 Analytics & Tracking

- [ ] **Install Vercel Analytics**
  ```bash
  pnpm add @vercel/analytics
  ```

- [ ] **Configure Google Analytics 4**
- [ ] **Set up conversion tracking**
  - Form submissions
  - Phone clicks
  - WhatsApp clicks
  - Menu views

---

## Phase 7: Content Management & Media

### 7.1 Content Entry

- [ ] **Create seed data for development**
  ```typescript
  // src/payload/seed/index.ts
  import type { Payload } from 'payload'

  export async function seed(payload: Payload) {
    // Create sample menu items
    // Create sample service packages
    // Create sample testimonials
  }
  ```

- [ ] **Document content entry guidelines**
- [ ] **Create content templates for editors**

### 7.2 Media Management

- [ ] **Upload initial images**
  - Logo variations
  - Hero images
  - Menu item photos
  - Gallery photos
  - Team photos

- [ ] **Optimize all images**
  ```bash
  # Use sharp CLI or ImageOptim
  # Target: <100KB for thumbnails, <300KB for full images
  ```

- [ ] **Set up image CDN** (Vercel handles this automatically)

### 7.3 SEO Assets

- [ ] **Create og-image.jpg** (1200x630px)
- [ ] **Create favicon.ico** and apple-touch-icon.png
- [ ] **Generate sitemap.xml** (Next.js auto-generates)
- [ ] **Create robots.txt**

---

## Phase 8: Testing & Quality Assurance

### 8.1 Unit Testing Setup

- [ ] **Install Vitest**
  ```bash
  pnpm add -D vitest @testing-library/react @testing-library/jest-dom
  pnpm add -D @vitejs/plugin-react jsdom
  ```

- [ ] **Create vitest.config.ts**
  ```typescript
  import { defineConfig } from 'vitest/config'
  import react from '@vitejs/plugin-react'
  import path from 'path'

  export default defineConfig({
    plugins: [react()],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/test/setup.ts'],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  })
  ```

- [ ] **Write unit tests for utilities**
  - formatPrice
  - formatPhone
  - slugify
  - cn (className merger)

- [ ] **Write component tests**
  - Button variants
  - Form validation
  - Menu filters

### 8.2 E2E Testing Setup

- [ ] **Install Playwright**
  ```bash
  pnpm create playwright
  ```

- [ ] **Write E2E tests**
  - Homepage loads correctly
  - Navigation works
  - Menu filtering works
  - Booking form submission
  - Mobile menu functionality

- [ ] **Run tests in CI/CD**

### 8.3 Accessibility Testing

- [ ] **Install axe-core**
  ```bash
  pnpm add -D @axe-core/playwright
  ```

- [ ] **Run accessibility audits**
  - Lighthouse accessibility score >95
  - Keyboard navigation works
  - Screen reader compatibility
  - Color contrast meets WCAG AA

- [ ] **Test with real screen readers**
  - NVDA (Windows)
  - VoiceOver (macOS/iOS)
  - TalkBack (Android)

### 8.4 Performance Testing

- [ ] **Run Lighthouse audits**
  - Performance score >90
  - Accessibility score >95
  - Best Practices score >95
  - SEO score >95

- [ ] **Test Core Web Vitals**
  - LCP (Largest Contentful Paint) <2.5s
  - FID (First Input Delay) <100ms
  - CLS (Cumulative Layout Shift) <0.1

- [ ] **Test on real devices**
  - iOS Safari
  - Android Chrome
  - Desktop Chrome/Firefox/Safari

### 8.5 Cross-Browser Testing

- [ ] **Test on major browsers**
  - Chrome (latest)
  - Firefox (latest)
  - Safari (latest)
  - Edge (latest)

- [ ] **Test responsive design**
  - Mobile (320px - 767px)
  - Tablet (768px - 1023px)
  - Desktop (1024px+)
  - Large screens (1920px+)

---

## Phase 9: SEO & Performance Optimization

### 9.1 On-Page SEO

- [ ] **Add metadata to all pages**
  ```typescript
  // src/app/menu/page.tsx
  import type { Metadata } from 'next'

  export const metadata: Metadata = {
    title: 'Our Menu | AdaEhandi - Premium North Indian Catering',
    description: 'Explore our authentic North Indian menu featuring Punjabi, Mughlai, and Awadhi cuisines. Perfect for weddings, corporate events, and private parties in Delhi.',
    keywords: ['north indian catering', 'delhi catering', 'punjabi food', 'wedding catering'],
    openGraph: {
      title: 'Our Menu - AdaEhandi Catering',
      description: 'Authentic North Indian cuisine for your special events',
      images: ['/og-menu.jpg'],
    },
  }
  ```

- [ ] **Implement JSON-LD structured data**
  ```typescript
  // src/components/StructuredData.tsx
  export function RestaurantSchema() {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FoodEstablishment',
      name: 'AdaEhandi',
      image: 'https://adaehandi.com/logo.png',
      '@id': 'https://adaehandi.com',
      url: 'https://adaehandi.com',
      telephone: '+919876543210',
      priceRange: '₹₹₹',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Defence Colony',
        addressLocality: 'New Delhi',
        postalCode: '110024',
        addressCountry: 'IN',
      },
      servesCuisine: ['North Indian', 'Punjabi', 'Mughlai'],
      acceptsReservations: 'True',
    }

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    )
  }
  ```

- [ ] **Generate dynamic sitemap**
  ```typescript
  // src/app/sitemap.ts
  import { MetadataRoute } from 'next'
  import { getPayloadClient } from '@/lib/payload'

  export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const payload = await getPayloadClient()

    const menuItems = await payload.find({
      collection: 'menu-items',
      limit: 1000,
    })

    const servicePackages = await payload.find({
      collection: 'service-packages',
      limit: 1000,
    })

    return [
      {
        url: 'https://adaehandi.com',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: 'https://adaehandi.com/menu',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      ...menuItems.docs.map((item) => ({
        url: `https://adaehandi.com/menu/${item.slug}`,
        lastModified: new Date(item.updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
      // ... more pages
    ]
  }
  ```

### 9.2 Performance Optimization

- [ ] **Optimize images**
  - Use Next.js Image component everywhere
  - Enable AVIF/WebP formats
  - Implement lazy loading
  - Add blur placeholders

- [ ] **Code splitting**
  - Use dynamic imports for heavy components
  - Implement route-based code splitting
  - Lazy load below-the-fold content

- [ ] **Implement ISR (Incremental Static Regeneration)**
  ```typescript
  // src/app/menu/page.tsx
  export const revalidate = 3600 // Revalidate every hour

  export default async function MenuPage() {
    // Page will be statically generated and revalidated
  }
  ```

- [ ] **Add loading states**
  ```typescript
  // src/app/menu/loading.tsx
  export default function MenuLoading() {
    return <div>Loading menu...</div>
  }
  ```

### 9.3 Caching Strategy

- [ ] **Configure Next.js caching**
  ```typescript
  // next.config.mjs
  const nextConfig = {
    async headers() {
      return [
        {
          source: '/images/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
      ]
    },
  }
  ```

- [ ] **Implement React Query for API caching** (if using client-side fetching)

---

## Phase 10: Security Hardening

### 10.1 Security Headers

- [ ] **Configure security headers in next.config.mjs**
  ```javascript
  const securityHeaders = [
    {
      key: 'X-DNS-Prefetch-Control',
      value: 'on',
    },
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload',
    },
    {
      key: 'X-Frame-Options',
      value: 'DENY',
    },
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff',
    },
    {
      key: 'Referrer-Policy',
      value: 'strict-origin-when-cross-origin',
    },
    {
      key: 'Content-Security-Policy',
      value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
    },
  ]
  ```

### 10.2 Environment Variables Security

- [ ] **Create .env.example with all required variables**
  ```env
  # Database
  DATABASE_URI=

  # Payload CMS
  PAYLOAD_SECRET=
  NEXT_PUBLIC_SERVER_URL=

  # Email (Resend)
  RESEND_API_KEY=

  # Analytics
  NEXT_PUBLIC_GA_ID=
  ```

- [ ] **Add environment variable validation**
  ```typescript
  // src/lib/env.ts
  import { z } from 'zod'

  const envSchema = z.object({
    DATABASE_URI: z.string().url(),
    PAYLOAD_SECRET: z.string().min(32),
    NEXT_PUBLIC_SERVER_URL: z.string().url(),
    RESEND_API_KEY: z.string(),
  })

  export const env = envSchema.parse(process.env)
  ```

### 10.3 API Route Protection

- [ ] **Add rate limiting**
  ```bash
  pnpm add @upstash/ratelimit @upstash/redis
  ```

  ```typescript
  // src/lib/rate-limit.ts
  import { Ratelimit } from '@upstash/ratelimit'
  import { Redis } from '@upstash/redis'

  export const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, '10 s'),
  })
  ```

- [ ] **Implement CSRF protection for forms**
- [ ] **Sanitize user inputs**

### 10.4 Database Security

- [ ] **Enable SSL for database connection**
- [ ] **Use parameterized queries (Payload handles this)**
- [ ] **Implement row-level security policies**
- [ ] **Regular database backups** (Neon auto-backups)

---

## Phase 11: Deployment & DevOps

### 11.1 Vercel Deployment Setup

- [ ] **Connect GitHub repository to Vercel**
  - Go to vercel.com
  - Import Git Repository
  - Select adaehandi repository
  - Configure project settings

- [ ] **Configure environment variables in Vercel**
  - Go to Project Settings → Environment Variables
  - Add all production environment variables
  - Separate variables for Preview and Production

- [ ] **Configure build settings**
  ```
  Build Command: pnpm build
  Output Directory: .next
  Install Command: pnpm install
  Framework Preset: Next.js
  Node Version: 20.x
  ```

### 11.2 Database Setup (Production)

- [ ] **Create production database on Neon**
  - Create new project: "adaehandi-production"
  - Enable connection pooling
  - Copy connection string

- [ ] **Run production migrations**
  ```bash
  DATABASE_URI=<production-url> pnpm migrate:up
  ```

- [ ] **Set up database backups**
  - Neon provides automatic backups
  - Configure backup retention period
  - Test restore procedure

### 11.3 Domain Configuration

- [ ] **Purchase domain** (e.g., adaehandi.com)

- [ ] **Configure DNS in Vercel**
  - Add domain in Vercel project settings
  - Update DNS records:
    ```
    A record: @ → 76.76.21.21
    CNAME: www → cname.vercel-dns.com
    ```

- [ ] **Configure SSL certificate** (Vercel auto-provisions)

- [ ] **Set up email forwarding** (if needed)

### 11.4 CI/CD Pipeline

- [ ] **Configure GitHub Actions**
  ```yaml
  # .github/workflows/ci.yml
  name: CI

  on:
    pull_request:
      branches: [main]

  jobs:
    test:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - uses: actions/setup-node@v3
          with:
            node-version: '20'
            cache: 'pnpm'
        - run: pnpm install
        - run: pnpm lint
        - run: pnpm type-check
        - run: pnpm test
        - run: pnpm build
  ```

- [ ] **Set up preview deployments**
  - Vercel automatically creates preview deployments for PRs
  - Configure preview environment variables

### 11.5 Monitoring & Error Tracking

- [ ] **Install Sentry**
  ```bash
  pnpm add @sentry/nextjs
  npx @sentry/wizard@latest -i nextjs
  ```

- [ ] **Configure Sentry**
  ```typescript
  // sentry.client.config.ts
  import * as Sentry from '@sentry/nextjs'

  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 1.0,
    environment: process.env.NODE_ENV,
  })
  ```

- [ ] **Set up Vercel Analytics**
  ```typescript
  // src/app/layout.tsx
  import { Analytics } from '@vercel/analytics/react'

  export default function RootLayout({ children }) {
    return (
      <html>
        <body>
          {children}
          <Analytics />
        </body>
      </html>
    )
  }
  ```

- [ ] **Configure uptime monitoring** (UptimeRobot or similar)

### 11.6 Performance Monitoring

- [ ] **Set up Vercel Speed Insights**
  ```bash
  pnpm add @vercel/speed-insights
  ```

- [ ] **Configure performance budgets**
  ```javascript
  // next.config.mjs
  const nextConfig = {
    experimental: {
      optimizePackageImports: ['lucide-react'],
    },
  }
  ```

---

## Phase 12: Post-Launch & Monitoring

### 12.1 Pre-Launch Checklist

- [ ] **Functionality testing**
  - [ ] All pages load correctly
  - [ ] Navigation works on all devices
  - [ ] Forms submit successfully
  - [ ] Images load properly
  - [ ] No console errors
  - [ ] All links work

- [ ] **SEO verification**
  - [ ] All pages have proper meta tags
  - [ ] Sitemap is accessible at /sitemap.xml
  - [ ] Robots.txt is configured
  - [ ] Structured data validates (Google Rich Results Test)
  - [ ] Google Search Console setup

- [ ] **Performance verification**
  - [ ] Lighthouse scores >90
  - [ ] Core Web Vitals pass
  - [ ] Images optimized
  - [ ] No render-blocking resources

- [ ] **Security verification**
  - [ ] HTTPS enabled
  - [ ] Security headers configured
  - [ ] No sensitive data exposed
  - [ ] API routes protected

### 12.2 Launch Day

- [ ] **Deploy to production**
  ```bash
  git checkout main
  git merge develop
  git push origin main
  # Vercel auto-deploys
  ```

- [ ] **Verify production deployment**
  - Check all pages
  - Test booking form
  - Verify email notifications
  - Check database connectivity

- [ ] **Submit to Google Search Console**
  - Add property
  - Submit sitemap
  - Request indexing for key pages

- [ ] **Submit to Bing Webmaster Tools**

- [ ] **Set up Google My Business** (if applicable)

### 12.3 Post-Launch Monitoring (Week 1)

- [ ] **Monitor error tracking** (Sentry)
  - Check for new errors daily
  - Fix critical issues immediately

- [ ] **Monitor analytics**
  - Track visitor count
  - Check bounce rate
  - Monitor conversion rate (form submissions)

- [ ] **Monitor performance**
  - Vercel Speed Insights
  - Core Web Vitals
  - Server response times

- [ ] **Monitor uptime**
  - Set up alerts for downtime
  - Check database connection health

### 12.4 Content & Marketing

- [ ] **Content population**
  - Add all menu items with high-quality photos
  - Upload gallery images
  - Add all service packages
  - Populate testimonials

- [ ] **Social media setup**
  - Create Instagram business account
  - Create Facebook page
  - Link social accounts to website

- [ ] **Local SEO**
  - Google My Business listing
  - Local directory submissions
  - Schema markup for local business

- [ ] **Email marketing setup**
  - Collect email subscribers
  - Create welcome email sequence
  - Set up newsletter (optional)

### 12.5 Ongoing Maintenance

- [ ] **Weekly tasks**
  - Review Sentry error reports
  - Check analytics for anomalies
  - Respond to booking inquiries
  - Backup database (automatic with Neon)

- [ ] **Monthly tasks**
  - Review and approve testimonials
  - Update menu items if needed
  - Check for outdated content
  - Run security updates
  - Review performance metrics

- [ ] **Quarterly tasks**
  - Update packages and dependencies
  - Review and optimize SEO
  - Analyze user behavior (heat maps, recordings)
  - Plan new features based on feedback

---

## Additional Resources

### Documentation Links

- Next.js 15: https://nextjs.org/docs
- Payload CMS 3.0: https://payloadcms.com/docs
- Tailwind CSS: https://tailwindcss.com/docs
- PostgreSQL: https://www.postgresql.org/docs
- Vercel: https://vercel.com/docs
- Neon (PostgreSQL): https://neon.tech/docs

### Design Resources

- Color Palettes: See INDIAN_CATERING_DESIGN_RESEARCH.md
- Typography: See CATERING_WEBSITE_RESEARCH.md
- Mobile Patterns: See DESIGN_PATTERNS_MOBILE_OPTIMIZATION.md
- Best Practices: See TECHNICAL_STACK_DOCUMENTATION.md

### Development Tools

- VS Code Extensions:
  - Tailwind CSS IntelliSense
  - ESLint
  - Prettier
  - Error Lens
  - GitLens

### Testing Tools

- Lighthouse (Chrome DevTools)
- WebPageTest.org
- Google Rich Results Test
- WAVE (Web Accessibility Evaluation Tool)

---

## Success Metrics

### Technical Metrics

- [ ] Lighthouse Performance Score: >90
- [ ] Lighthouse Accessibility Score: >95
- [ ] First Contentful Paint (FCP): <1.5s
- [ ] Largest Contentful Paint (LCP): <2.5s
- [ ] Cumulative Layout Shift (CLS): <0.1
- [ ] Time to Interactive (TTI): <3.5s

### Business Metrics

- [ ] Booking form submission rate: >5%
- [ ] Average session duration: >2 minutes
- [ ] Bounce rate: <50%
- [ ] Mobile traffic: >60%
- [ ] Return visitor rate: >20%

---

## Estimated Timeline

**Total Duration:** 8-12 weeks

- **Phase 1-2 (Setup & Database):** 1 week
- **Phase 3 (Payload CMS):** 1-2 weeks
- **Phase 4 (Design System):** 1 week
- **Phase 5 (Core Pages):** 2-3 weeks
- **Phase 6 (Advanced Features):** 1-2 weeks
- **Phase 7 (Content):** 1 week
- **Phase 8 (Testing):** 1 week
- **Phase 9-10 (SEO & Security):** 1 week
- **Phase 11 (Deployment):** 3-5 days
- **Phase 12 (Launch & Monitoring):** Ongoing

---

## Notes

- This roadmap assumes solo developer or small team
- Adjust timeline based on team size and experience
- Prioritize mobile experience (60-70% of traffic in India)
- Focus on performance (slower connections in some areas)
- Ensure bilingual support (Hindi/English) from the start
- Test on real Indian networks and devices

**Ready to build something amazing!** 🚀
