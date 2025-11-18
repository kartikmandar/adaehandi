# Technical Stack Documentation
## Next.js 15 + Payload CMS + Vercel Deployment

**Date:** 2025-11-17
**Project:** Premium Indian Catering Website
**Stack:** Next.js 15, Payload CMS 3.0, Vercel, PostgreSQL/MongoDB
**Purpose:** Complete technical implementation guide

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Technology Stack Overview](#technology-stack-overview)
3. [Next.js 15 - Core Framework](#nextjs-15---core-framework)
4. [Payload CMS 3.0 - Content Management](#payload-cms-30---content-management)
5. [Vercel - Hosting & Deployment](#vercel---hosting--deployment)
6. [Database Choices](#database-choices)
7. [Project Structure](#project-structure)
8. [Image Optimization & Storage](#image-optimization--storage)
9. [SEO & Analytics](#seo--analytics)
10. [Authentication & Security](#authentication--security)
11. [Performance Optimization](#performance-optimization)
12. [Development Workflow](#development-workflow)
13. [Deployment Pipeline](#deployment-pipeline)
14. [Best Practices Checklist](#best-practices-checklist)

---

## Executive Summary

This document provides comprehensive technical guidance for building a premium catering website using modern, production-ready technologies optimized for performance, SEO, and developer experience.

### Why This Stack?

**Next.js 15:**
- ✅ React Server Components for optimal performance
- ✅ Built-in image optimization crucial for food photography
- ✅ Excellent SEO capabilities
- ✅ Fast page loads (critical for Indian internet speeds)
- ✅ TypeScript support for type safety

**Payload CMS 3.0:**
- ✅ Code-first, TypeScript-native
- ✅ Installs directly into Next.js app
- ✅ Fully customizable admin panel
- ✅ Local API (no network latency)
- ✅ Perfect for developer control

**Vercel:**
- ✅ Built by Next.js creators (seamless integration)
- ✅ Global CDN for fast delivery
- ✅ Automatic optimization
- ✅ Zero-config deployments
- ✅ Preview deployments for every PR

### Performance Goals

- **Load Time:** <3 seconds (4G connection)
- **Lighthouse Score:** 90+ (all metrics)
- **Core Web Vitals:** Green across the board
- **Mobile Experience:** Flawless (primary user device)

---

## Technology Stack Overview

### Core Technologies

```
Frontend Framework: Next.js 15 (App Router)
Language: TypeScript 5+
CMS: Payload CMS 3.0
Database: PostgreSQL (Neon) or MongoDB Atlas
Hosting: Vercel
Image Storage: Vercel Blob / Cloudinary
Styling: Tailwind CSS
```

### Supporting Technologies

```
Authentication: Payload built-in
Forms: React Hook Form
Validation: Zod
Analytics: Google Analytics 4
SEO: Next.js Metadata API + Schema.org
Email: Resend / SendGrid
Payments: Razorpay (for Indian market)
```

### Development Tools

```
Package Manager: pnpm (or npm/yarn)
Version Control: Git + GitHub
Code Quality: ESLint, Prettier
Type Checking: TypeScript strict mode
Testing: Vitest, Playwright (optional)
```

---

## Next.js 15 - Core Framework

### Key Features & Improvements

#### 1. **App Router (Stable)**

The App Router is the future of Next.js and is built around React Server Components.

**Benefits:**
- Server Components by default (zero client JS)
- Simplified data fetching
- Layouts that persist across navigation
- Improved performance
- Better TypeScript support

**Structure:**
```
app/
  ├── layout.tsx          # Root layout (persistent)
  ├── page.tsx           # Homepage
  ├── about/
  │   └── page.tsx       # /about route
  ├── services/
  │   ├── page.tsx       # /services route
  │   └── [slug]/
  │       └── page.tsx   # /services/[slug] dynamic route
  └── api/
      └── contact/
          └── route.ts   # API route
```

#### 2. **Server Components (Default)**

Components in App Router are Server Components unless you add `"use client"`.

**Server Components:**
```typescript
// app/components/MenuSection.tsx
// This is a Server Component (default)

async function MenuSection() {
  // Can fetch data directly
  const menus = await fetch('https://api.example.com/menus')
  const data = await menus.json()

  return (
    <section>
      {data.map(menu => (
        <MenuCard key={menu.id} {...menu} />
      ))}
    </section>
  )
}

export default MenuSection
```

**Client Components:**
```typescript
// app/components/ContactForm.tsx
"use client" // Needed for interactivity

import { useState } from 'react'

export default function ContactForm() {
  const [name, setName] = useState('')

  return (
    <form>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </form>
  )
}
```

**Golden Rule:**
- Keep most UI as Server Components
- Only use `"use client"` when you need:
  - useState, useEffect, other React hooks
  - Browser APIs
  - Event handlers (onClick, onChange, etc.)

#### 3. **Image Optimization**

Next.js `<Image>` component is critical for food photography websites.

**Features:**
- Automatic format optimization (WebP, AVIF)
- Lazy loading by default
- Responsive images
- Blur placeholders
- Prevents layout shift

**Example:**
```typescript
import Image from 'next/image'

export default function HeroSection() {
  return (
    <div className="relative h-screen">
      <Image
        src="/hero-biryani.jpg"
        alt="Signature biryani platter"
        fill
        priority // For above-the-fold images
        quality={90}
        className="object-cover"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQ..." // Blur placeholder
      />
    </div>
  )
}
```

**Best Practices:**
- Use `priority` on hero images
- Use `loading="lazy"` (default) for below-fold images
- Optimize source images before upload (max 3000px width)
- Use Next.js Image for ALL images (not raw `<img>`)

#### 4. **Metadata & SEO**

Next.js 15 provides excellent SEO capabilities through the Metadata API.

**Static Metadata:**
```typescript
// app/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Premium North Indian Catering | Delhi NCR',
    template: '%s | Your Brand Name'
  },
  description: 'Authentic North Indian catering services for weddings, corporate events, and private celebrations in Delhi NCR',
  keywords: ['catering Delhi', 'North Indian catering', 'wedding catering', 'corporate catering'],
  openGraph: {
    title: 'Premium North Indian Catering',
    description: 'Authentic catering services in Delhi NCR',
    images: ['/og-image.jpg'],
  },
}
```

**Dynamic Metadata:**
```typescript
// app/services/[slug]/page.tsx
import { Metadata } from 'next'

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const service = await getService(params.slug)

  return {
    title: service.title,
    description: service.description,
    openGraph: {
      images: [service.image],
    },
  }
}
```

#### 5. **Rendering Strategies**

Next.js 15 offers flexible rendering options:

**Static Generation (SSG) - Default & Recommended:**
```typescript
// app/about/page.tsx
// Automatically static when no dynamic data

export default function AboutPage() {
  return <div>About Us</div>
}
```

**Server-Side Rendering (SSR):**
```typescript
// app/dashboard/page.tsx
export const dynamic = 'force-dynamic' // Force SSR

export default async function Dashboard() {
  const data = await fetchUserData()
  return <div>{data}</div>
}
```

**Incremental Static Regeneration (ISR):**
```typescript
// app/blog/[slug]/page.tsx
export const revalidate = 3600 // Revalidate every hour

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug)
  return <article>{post.content}</article>
}
```

#### 6. **Parallel Data Fetching**

Fetch data in parallel to reduce loading time:

```typescript
async function MenuPage() {
  // These fetch in parallel automatically!
  const [appetizers, mains, desserts] = await Promise.all([
    getAppetizers(),
    getMains(),
    getDesserts()
  ])

  return (
    <>
      <MenuSection items={appetizers} />
      <MenuSection items={mains} />
      <MenuSection items={desserts} />
    </>
  )
}
```

#### 7. **Streaming & Suspense**

Show UI progressively as data loads:

```typescript
import { Suspense } from 'react'

export default function Page() {
  return (
    <div>
      <h1>Our Menus</h1>
      <Suspense fallback={<MenuSkeleton />}>
        <MenuList />
      </Suspense>
    </div>
  )
}

async function MenuList() {
  const menus = await getMenus() // Slow data fetch
  return <div>{/* Render menus */}</div>
}
```

---

## Payload CMS 3.0 - Content Management

### Why Payload CMS?

**Key Advantages:**
1. **Code-First:** Define everything in TypeScript
2. **Next.js Native:** Installs directly into your Next.js app
3. **Local API:** Query database directly without HTTP requests
4. **Full Control:** Customize everything
5. **Type-Safe:** Auto-generated TypeScript types

### Installation

```bash
npx create-payload-app@latest
# Or add to existing Next.js app:
npm install payload @payloadcms/next @payloadcms/richtext-lexical sharp graphql --legacy-peer-deps
```

### Core Concepts

#### 1. **Collections**

Collections are groups of documents (like posts, menus, services).

**Example Collection:**
```typescript
// payload/collections/MenuItems.ts
import { CollectionConfig } from 'payload/types'

export const MenuItems: CollectionConfig = {
  slug: 'menu-items',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true, // Hindi + English support
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Appetizers', value: 'appetizers' },
        { label: 'Main Course', value: 'mains' },
        { label: 'Desserts', value: 'desserts' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
    },
    {
      name: 'isVegetarian',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'isJain',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'spiceLevel',
      type: 'select',
      options: ['Mild', 'Medium', 'Hot', 'Extra Hot'],
    },
  ],
}
```

#### 2. **Media/Uploads Collection**

Handle image uploads:

```typescript
// payload/collections/Media.ts
import { CollectionConfig } from 'payload/types'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'public/media', // Local storage
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 576,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
```

#### 3. **Global Settings**

For site-wide settings like contact info, social links:

```typescript
// payload/globals/Settings.ts
import { GlobalConfig } from 'payload/types'

export const Settings: GlobalConfig = {
  slug: 'settings',
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
    },
    {
      name: 'contactEmail',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'whatsapp',
      type: 'text',
      required: true,
    },
    {
      name: 'socialMedia',
      type: 'group',
      fields: [
        { name: 'instagram', type: 'text' },
        { name: 'facebook', type: 'text' },
        { name: 'youtube', type: 'text' },
      ],
    },
  ],
}
```

#### 4. **Payload Configuration**

Main config file:

```typescript
// payload.config.ts
import { buildConfig } from 'payload/config'
import { postgresAdapter } from '@payloadcms/db-postgres'
// or: import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import { MenuItems } from './payload/collections/MenuItems'
import { Media } from './payload/collections/Media'
import { Settings } from './payload/globals/Settings'

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  collections: [MenuItems, Media],
  globals: [Settings],

  // Database
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),

  // Rich Text Editor
  editor: lexicalEditor({}),

  // TypeScript
  typescript: {
    outputFile: 'payload-types.ts',
  },

  // Admin Panel
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- Admin Panel',
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg',
    },
  },

  // File Storage (for Vercel deployment)
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
```

#### 5. **Querying Data with Local API**

The Local API lets you query directly without HTTP:

```typescript
// app/components/FeaturedMenus.tsx
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

export default async function FeaturedMenus() {
  const payload = await getPayloadHMR({ config: configPromise })

  const menus = await payload.find({
    collection: 'menu-items',
    where: {
      featured: { equals: true },
    },
    limit: 6,
    sort: '-createdAt',
  })

  return (
    <section>
      {menus.docs.map(menu => (
        <MenuCard key={menu.id} {...menu} />
      ))}
    </section>
  )
}
```

**REST API Alternative:**
```typescript
// For client components or external apps
const response = await fetch('https://yoursite.com/api/menu-items')
const data = await response.json()
```

#### 6. **Authentication**

Payload provides built-in authentication:

```typescript
// payload/collections/Users.ts
import { CollectionConfig } from 'payload/types'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true, // Enable authentication
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'editor', 'viewer'],
      required: true,
      defaultValue: 'viewer',
    },
  ],
}
```

#### 7. **Custom Admin UI**

Fully customize the admin panel:

```typescript
// payload.config.ts
export default buildConfig({
  admin: {
    components: {
      // Custom logo
      graphics: {
        Logo: '/custom-logo.tsx',
        Icon: '/custom-icon.tsx',
      },
      // Custom views
      views: {
        Dashboard: '/custom-dashboard.tsx',
      },
    },
    // Custom CSS
    css: '/admin-styles.css',
  },
})
```

---

## Vercel - Hosting & Deployment

### Why Vercel?

- **Built for Next.js** - Created by the same team
- **Zero Configuration** - Deploy in seconds
- **Global CDN** - Fast worldwide
- **Automatic HTTPS** - Free SSL
- **Preview Deployments** - Every PR gets its own URL
- **Edge Functions** - Run code close to users
- **Analytics** - Built-in performance monitoring

### Deployment Setup

#### 1. **Connect GitHub Repository**

```bash
# Push your code to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/catering-website.git
git push -u origin main

# Then connect on Vercel dashboard:
# 1. Go to vercel.com
# 2. Click "New Project"
# 3. Import your GitHub repo
# 4. Configure and deploy
```

#### 2. **Environment Variables**

Set these in Vercel dashboard (Settings > Environment Variables):

```env
# Database
DATABASE_URI=postgresql://user:pass@host:5432/dbname
# or
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname

# Payload
PAYLOAD_SECRET=your-secret-key-here
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com

# File Storage (Vercel Blob)
BLOB_READ_WRITE_TOKEN=vercel_blob_xxx

# Email (optional)
RESEND_API_KEY=re_xxx

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Payment (Razorpay for India)
RAZORPAY_KEY_ID=rzp_live_xxx
RAZORPAY_KEY_SECRET=xxx
```

**Accessing in Code:**
```typescript
// Server-side (safe)
const dbUri = process.env.DATABASE_URI

// Client-side (only NEXT_PUBLIC_ vars)
const gaId = process.env.NEXT_PUBLIC_GA_ID
```

#### 3. **Build Configuration**

Vercel auto-detects Next.js. Override if needed:

```json
// vercel.json (optional)
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

#### 4. **Domain Setup**

```
1. Vercel Dashboard > Your Project > Settings > Domains
2. Add your custom domain (e.g., yourcompany.com)
3. Update DNS records (Vercel provides instructions)
4. SSL automatically provisioned
```

### Vercel Features

#### **Preview Deployments**

Every pull request gets a unique URL:
```
https://catering-website-git-feature-menu-yourusername.vercel.app
```

Share with clients for review before merging to production!

#### **Edge Functions**

Run serverless functions at the edge (closest to user):

```typescript
// app/api/contact/route.ts
export const runtime = 'edge' // Run on the edge

export async function POST(request: Request) {
  const body = await request.json()
  // Handle form submission
  return Response.json({ success: true })
}
```

#### **Analytics**

Enable Vercel Analytics for real performance data:

```typescript
// app/layout.tsx
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

#### **Image Optimization**

Vercel automatically optimizes images via Next.js Image component.

**Limits on Free Plan:**
- 1,000 source images optimized per month
- 1GB bandwidth

**For high-traffic sites:**
- Upgrade Vercel plan
- Or use external service (Cloudinary, Vercel Blob)

---

## Database Choices

### MongoDB vs PostgreSQL

#### **MongoDB (Document Database)**

**Best For:**
- Flexible, evolving schemas
- Nested/embedded documents
- Rapid development
- Projects with dynamic fields

**Pros:**
- ✅ Closer match to Payload's data structure
- ✅ One document per collection item (simple)
- ✅ No migrations needed for schema changes
- ✅ Great for localization (Hindi + English)

**Cons:**
- ❌ Less rigid data integrity
- ❌ Not ideal for complex relational data

**Setup:**
```bash
# MongoDB Atlas (free tier available)
1. Create account at mongodb.com/cloud/atlas
2. Create cluster (free M0)
3. Create database user
4. Whitelist IP (0.0.0.0/0 for Vercel)
5. Get connection string
```

**Connection:**
```typescript
// payload.config.ts
import { mongooseAdapter } from '@payloadcms/db-mongodb'

export default buildConfig({
  db: mongooseAdapter({
    url: process.env.MONGODB_URI,
  }),
})
```

---

#### **PostgreSQL (Relational Database)**

**Best For:**
- Structured, relational data
- Projects requiring strict schemas
- Complex queries and joins
- Long-term data integrity

**Pros:**
- ✅ Strong ACID compliance
- ✅ Excellent for complex queries
- ✅ Better for reporting
- ✅ Scales well for large datasets

**Cons:**
- ❌ Requires migrations
- ❌ More complex setup with Payload
- ❌ Less flexible for schema changes

**Setup:**
```bash
# Neon (PostgreSQL for Vercel)
1. Go to neon.tech
2. Create project
3. Get connection string
```

**Connection:**
```typescript
// payload.config.ts
import { postgresAdapter } from '@payloadcms/db-postgres'

export default buildConfig({
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
})
```

**Migrations:**
```bash
# Generate migration after schema changes
npm run payload migrate:create

# Run migrations
npm run payload migrate
```

### **Recommendation for Catering Website:**

**Use MongoDB** if:
- You want rapid development
- Schema might evolve
- Localization is important (Hindi + English)
- You prefer simpler setup

**Use PostgreSQL** if:
- You have strict data requirements
- You need complex reporting
- You're comfortable with migrations
- You prioritize long-term data integrity

**For this project: MongoDB Atlas (Free tier is generous)**

---

## Project Structure

### Recommended Next.js 15 + Payload Structure

```
catering-website/
├── app/                          # Next.js App Router
│   ├── (frontend)/              # Route group (doesn't affect URL)
│   │   ├── layout.tsx           # Frontend layout
│   │   ├── page.tsx             # Homepage
│   │   ├── about/
│   │   │   └── page.tsx         # About page
│   │   ├── services/
│   │   │   ├── page.tsx         # Services listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # Individual service
│   │   ├── gallery/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   └── components/          # Frontend-specific components
│   │       ├── Hero.tsx
│   │       ├── MenuCard.tsx
│   │       └── ContactForm.tsx
│   │
│   ├── (payload)/               # Admin panel (optional grouping)
│   │   └── admin/
│   │       └── [[...segments]]/
│   │           └── page.tsx     # Payload admin UI
│   │
│   └── api/                     # API routes
│       ├── contact/
│       │   └── route.ts
│       └── [...slug]/
│           └── route.ts         # Payload REST API
│
├── components/                   # Shared components
│   ├── ui/                      # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   └── shared/                  # Cross-app components
│       ├── Header.tsx
│       └── Footer.tsx
│
├── payload/                      # Payload CMS configuration
│   ├── collections/
│   │   ├── MenuItems.ts
│   │   ├── Services.ts
│   │   ├── Gallery.ts
│   │   ├── Testimonials.ts
│   │   ├── Media.ts
│   │   └── Users.ts
│   ├── globals/
│   │   └── Settings.ts
│   └── access/                  # Access control functions
│       └── isAdmin.ts
│
├── lib/                         # Utility functions
│   ├── utils.ts                 # General utilities
│   └── payload.ts               # Payload helper functions
│
├── public/                      # Static files
│   ├── images/
│   ├── fonts/
│   └── favicon.ico
│
├── styles/                      # Global styles
│   └── globals.css
│
├── types/                       # TypeScript types
│   └── index.ts
│
├── .env.local                   # Local environment variables
├── .gitignore
├── next.config.js              # Next.js configuration
├── payload.config.ts           # Payload configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── package.json
└── README.md
```

### Key Files Explained

#### **app/layout.tsx** (Root Layout)
```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Premium Catering - Delhi NCR',
  description: 'Authentic North Indian catering services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
```

#### **next.config.js**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['your-blob-storage.vercel-storage.com'],
    formats: ['image/avif', 'image/webp'],
  },
  // For Payload Admin UI
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
```

---

## Image Optimization & Storage

### Challenge: Vercel Has No Persistent File Storage

Vercel is serverless - files uploaded during runtime don't persist across deployments.

### Solutions

#### **1. Vercel Blob Storage (Recommended)**

**Pros:**
- ✅ Official Vercel solution
- ✅ Zero configuration
- ✅ Automatic optimization
- ✅ Fast CDN delivery
- ✅ Simple pricing

**Setup:**
```bash
# Install
npm install @payloadcms/storage-vercel-blob

# Add to Vercel project
vercel blob add
# This creates BLOB_READ_WRITE_TOKEN automatically
```

**Configuration:**
```typescript
// payload.config.ts
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

export default buildConfig({
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
```

**Pricing:**
- Free: 1GB storage, 100GB bandwidth
- Pro: $20/month for more

---

#### **2. Cloudinary (Alternative)**

**Pros:**
- ✅ Generous free tier (25GB storage, 25GB bandwidth)
- ✅ Powerful transformations
- ✅ Great for food photography
- ✅ Automatic format optimization

**Setup:**
```bash
npm install @payloadcms/plugin-cloud-storage cloudinary

# Get credentials from cloudinary.com
```

**Configuration:**
```typescript
// payload.config.ts
import { cloudinaryAdapter } from '@payloadcms/plugin-cloud-storage/cloudinary'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'

export default buildConfig({
  plugins: [
    cloudStorage({
      collections: {
        media: {
          adapter: cloudinaryAdapter({
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY,
            apiSecret: process.env.CLOUDINARY_API_SECRET,
            folder: 'catering-website',
          }),
        },
      },
    }),
  ],
})
```

---

#### **3. AWS S3 (Enterprise)**

Best for very high traffic or enterprise needs.

```bash
npm install @payloadcms/plugin-cloud-storage @aws-sdk/client-s3
```

---

### Image Optimization Best Practices

**1. Source Images:**
```
- Max width: 3000px
- Format: JPEG for photos, PNG for graphics
- Compress before upload (80-85% quality)
```

**2. Next.js Image Component:**
```typescript
import Image from 'next/image'

// Responsive image
<Image
  src={menuItem.image.url}
  alt={menuItem.image.alt}
  width={800}
  height={600}
  className="rounded-lg"
  quality={85}
  placeholder="blur"
  blurDataURL={menuItem.image.blurDataURL}
/>
```

**3. Lazy Loading:**
- Next.js does this automatically
- Only images in viewport load initially
- Crucial for gallery pages with many images

**4. WebP/AVIF:**
- Next.js automatically serves modern formats
- Falls back to JPEG/PNG for older browsers
- 25-35% smaller file sizes

---

## SEO & Analytics

### Next.js SEO Features

#### 1. **Metadata API**

```typescript
// app/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Premium North Indian Catering | Delhi NCR',
  description: 'Authentic tandoori, biryani, and Mughlai cuisine for weddings and corporate events in Delhi',
  keywords: ['catering Delhi', 'North Indian catering', 'wedding catering', 'corporate catering NCR'],

  openGraph: {
    title: 'Premium North Indian Catering',
    description: 'Authentic catering services in Delhi NCR',
    url: 'https://yoursite.com',
    siteName: 'Your Company',
    images: [
      {
        url: 'https://yoursite.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Premium catering services',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Premium North Indian Catering',
    description: 'Authentic catering services in Delhi NCR',
    images: ['https://yoursite.com/twitter-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
```

#### 2. **Sitemap**

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yoursite.com'

  // Get dynamic routes from Payload
  const services = await getServices()

  const serviceUrls = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(service.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...serviceUrls,
  ]
}
```

#### 3. **Robots.txt**

```typescript
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: 'https://yoursite.com/sitemap.xml',
  }
}
```

#### 4. **Structured Data (Schema.org)**

Critical for local SEO and rich snippets:

```typescript
// app/page.tsx
export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    name: 'Your Catering Company',
    image: 'https://yoursite.com/logo.jpg',
    '@id': 'https://yoursite.com',
    url: 'https://yoursite.com',
    telephone: '+91-XXXXXXXXXX',
    priceRange: '₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Your Address',
      addressLocality: 'Delhi',
      postalCode: '110001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.6139,
      longitude: 77.2090,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '09:00',
      closes: '21:00',
    },
    servesCuisine: 'North Indian',
    acceptsReservations: 'True',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Page content */}
    </>
  )
}
```

**Additional Schema Types:**

```typescript
// For individual menu items
{
  "@context": "https://schema.org/",
  "@type": "MenuItem",
  "name": "Dal Makhani",
  "description": "Creamy black lentils slow-cooked with butter and spices",
  "image": "https://yoursite.com/dal-makhani.jpg",
  "offers": {
    "@type": "Offer",
    "price": "350",
    "priceCurrency": "INR"
  },
  "nutrition": {
    "@type": "NutritionInformation",
    "calories": "250"
  }
}

// For events/catering services
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Wedding Catering",
  "provider": {
    "@type": "Organization",
    "name": "Your Company"
  },
  "areaServed": {
    "@type": "City",
    "name": "Delhi"
  }
}
```

### Analytics Integration

#### **Google Analytics 4**

```typescript
// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

#### **Vercel Analytics**

```bash
npm install @vercel/analytics
```

```typescript
// app/layout.tsx
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

---

## Authentication & Security

### Payload CMS Authentication

Payload provides robust authentication out of the box.

#### **Admin Users Collection**

```typescript
// payload/collections/Users.ts
import { CollectionConfig } from 'payload/types'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 7200, // 2 hours
    verify: false, // Set to true for email verification
    maxLoginAttempts: 5,
    lockTime: 600 * 1000, // 10 minutes
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'createdAt'],
  },
  access: {
    create: () => false, // Only admins can create users (set in admin panel)
    read: () => true,
    update: ({ req: { user } }) => {
      // Users can only update themselves
      if (user.role === 'admin') return true
      return {
        id: {
          equals: user.id,
        },
      }
    },
    delete: ({ req: { user } }) => user.role === 'admin',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
        {
          label: 'Viewer',
          value: 'viewer',
        },
      ],
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
}
```

#### **Access Control**

```typescript
// payload/access/isAdmin.ts
import { Access } from 'payload/types'

export const isAdmin: Access = ({ req: { user } }) => {
  return user?.role === 'admin'
}

export const isAdminOrEditor: Access = ({ req: { user } }) => {
  return user?.role === 'admin' || user?.role === 'editor'
}
```

**Apply to Collections:**

```typescript
// payload/collections/MenuItems.ts
import { isAdminOrEditor } from '../access/isAdmin'

export const MenuItems: CollectionConfig = {
  slug: 'menu-items',
  access: {
    create: isAdminOrEditor,
    read: () => true, // Public
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  // ... fields
}
```

### Security Best Practices

#### **1. Environment Variables**

```env
# Strong secret key
PAYLOAD_SECRET=generate-with-openssl-rand-base64-32

# Database credentials
DATABASE_URI=postgresql://...

# Never commit .env to git
```

#### **2. CORS Configuration**

```typescript
// payload.config.ts
export default buildConfig({
  cors: [
    'https://yourdomain.com',
    'https://www.yourdomain.com',
    process.env.NODE_ENV === 'development' && 'http://localhost:3000',
  ].filter(Boolean),
  csrf: [
    'https://yourdomain.com',
    'https://www.yourdomain.com',
    process.env.NODE_ENV === 'development' && 'http://localhost:3000',
  ].filter(Boolean),
})
```

#### **3. Rate Limiting**

For API routes:

```typescript
// lib/rateLimit.ts
import { RateLimiter } from 'limiter'

const limiter = new RateLimiter({
  tokensPerInterval: 10,
  interval: 'minute',
})

export async function rateLimit() {
  const remainingRequests = await limiter.removeTokens(1)
  if (remainingRequests < 0) {
    throw new Error('Rate limit exceeded')
  }
}
```

```typescript
// app/api/contact/route.ts
import { rateLimit } from '@/lib/rateLimit'

export async function POST(req: Request) {
  try {
    await rateLimit()
    // Handle request
  } catch (error) {
    return Response.json(
      { error: 'Too many requests' },
      { status: 429 }
    )
  }
}
```

#### **4. Input Validation**

Use Zod for type-safe validation:

```bash
npm install zod
```

```typescript
// lib/validations.ts
import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^[0-9]{10}$/),
  eventType: z.enum(['wedding', 'corporate', 'private']),
  guestCount: z.number().min(10).max(10000),
  date: z.string().datetime(),
  message: z.string().max(1000).optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
```

```typescript
// app/api/contact/route.ts
import { contactFormSchema } from '@/lib/validations'

export async function POST(req: Request) {
  const body = await req.json()

  // Validate
  const result = contactFormSchema.safeParse(body)

  if (!result.success) {
    return Response.json(
      { error: 'Invalid input', details: result.error },
      { status: 400 }
    )
  }

  // Process valid data
  const data = result.data
  // ...
}
```

---

## Performance Optimization

### Critical Optimizations for Indian Market

Indian internet speeds vary widely. Optimize aggressively.

#### **1. Image Optimization (Most Important)**

Food websites are image-heavy - this is critical:

```typescript
// Always use Next.js Image
import Image from 'next/image'

// Good
<Image
  src={dish.image}
  alt={dish.name}
  width={800}
  height={600}
  quality={85}
  placeholder="blur"
  priority={false} // Only true for hero images
/>

// Bad (never do this)
<img src={dish.image} alt={dish.name} />
```

**Image Checklist:**
- ✅ All images through `<Image>` component
- ✅ WebP/AVIF automatic conversion
- ✅ Lazy loading (default)
- ✅ Blur placeholders
- ✅ Responsive sizes
- ✅ CDN delivery (Vercel/Cloudinary)

#### **2. Font Optimization**

```typescript
// app/layout.tsx
import { Inter, Playfair_Display } from 'next/font/google'

// Load only needed weights and subsets
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-playfair',
})

export default function RootLayout({ children }) {
  return (
    <html className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

#### **3. Code Splitting**

Automatically done by Next.js, but you can optimize further:

```typescript
// Dynamic imports for heavy components
import dynamic from 'next/dynamic'

const ImageGallery = dynamic(() => import('@/components/ImageGallery'), {
  loading: () => <GallerySkeleton />,
  ssr: false, // If component doesn't need SSR
})

export default function GalleryPage() {
  return (
    <div>
      <h1>Our Gallery</h1>
      <ImageGallery />
    </div>
  )
}
```

#### **4. Database Query Optimization**

```typescript
// Bad: N+1 queries
const services = await payload.find({ collection: 'services' })
for (const service of services.docs) {
  const images = await payload.find({
    collection: 'media',
    where: { service: { equals: service.id } }
  })
}

// Good: Single query with relationships
const services = await payload.find({
  collection: 'services',
  depth: 2, // Populate relationships
})
```

#### **5. Caching Strategy**

```typescript
// app/services/page.tsx
// Revalidate every hour
export const revalidate = 3600

export default async function ServicesPage() {
  const services = await getServices()
  return <ServicesList services={services} />
}
```

**Different Caching Strategies:**
```typescript
// Static (default)
export const dynamic = 'force-static'

// Server-side render every request
export const dynamic = 'force-dynamic'

// ISR - regenerate every N seconds
export const revalidate = 60
```

#### **6. Minimize JavaScript**

```typescript
// Keep most components as Server Components
// Only use "use client" when necessary

// ✅ Good - Server Component
async function MenuSection() {
  const menus = await getMenus()
  return <div>{/* render */}</div>
}

// ❌ Unnecessary - doesn't need client JS
"use client"
function MenuSection() {
  const [menus, setMenus] = useState([])
  useEffect(() => {
    fetch('/api/menus').then(/* ... */)
  }, [])
}
```

#### **7. Bundle Analysis**

```bash
# Install
npm install @next/bundle-analyzer

# Configure
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // your config
})

# Run analysis
ANALYZE=true npm run build
```

---

## Development Workflow

### Local Development Setup

```bash
# Clone repo
git clone https://github.com/yourusername/catering-website.git
cd catering-website

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Run database (if using MongoDB locally)
# Or connect to MongoDB Atlas / Neon Postgres

# Generate Payload types
npm run payload generate:types

# Run development server
npm run dev
```

**Access:**
- Frontend: http://localhost:3000
- Admin Panel: http://localhost:3000/admin

### Git Workflow

**Branch Strategy:**
```bash
main          # Production
├── develop   # Development
└── feature/* # Feature branches
```

**Feature Development:**
```bash
# Create feature branch
git checkout -b feature/wedding-packages

# Make changes, commit
git add .
git commit -m "Add wedding package page"

# Push and create PR
git push origin feature/wedding-packages
# Create PR on GitHub for review
```

### Code Quality Tools

#### **ESLint Configuration**

```json
// .eslintrc.json
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

#### **Prettier Configuration**

```json
// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

#### **Pre-commit Hooks**

```bash
npm install --save-dev husky lint-staged

# Initialize husky
npx husky install
```

```json
// package.json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

---

## Deployment Pipeline

### Automated Deployment Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npm run type-check

      - name: Build
        run: npm run build
        env:
          DATABASE_URI: ${{ secrets.DATABASE_URI }}
          PAYLOAD_SECRET: ${{ secrets.PAYLOAD_SECRET }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### Deployment Checklist

**Before First Deployment:**
- [ ] Environment variables set in Vercel
- [ ] Database created and accessible
- [ ] Domain configured
- [ ] Analytics set up
- [ ] Error tracking configured (Sentry, etc.)

**Before Each Deployment:**
- [ ] All tests passing
- [ ] Lint checks passing
- [ ] Type checks passing
- [ ] Build successful locally
- [ ] Database migrations run (if using Postgres)
- [ ] Environment variables updated (if changed)

**After Deployment:**
- [ ] Smoke test critical paths
- [ ] Check Vercel deployment logs
- [ ] Verify images loading
- [ ] Test contact form
- [ ] Check analytics tracking
- [ ] Test on mobile device

---

## Best Practices Checklist

### TypeScript

- [ ] Strict mode enabled
- [ ] No `any` types (or justified)
- [ ] All props typed
- [ ] Payload types auto-generated
- [ ] Zod for runtime validation

### Performance

- [ ] All images use `<Image>` component
- [ ] Critical images have `priority`
- [ ] Non-critical images lazy-loaded
- [ ] Fonts optimized (next/font)
- [ ] Minimal client-side JavaScript
- [ ] Code splitting where appropriate
- [ ] Database queries optimized

### SEO

- [ ] Metadata on all pages
- [ ] Open Graph tags
- [ ] Structured data (Schema.org)
- [ ] Sitemap generated
- [ ] Robots.txt configured
- [ ] Image alt text
- [ ] Semantic HTML

### Accessibility

- [ ] WCAG AA compliance
- [ ] Color contrast ratios pass
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] ARIA labels where needed
- [ ] Focus indicators visible

### Security

- [ ] Environment variables secure
- [ ] HTTPS enforced
- [ ] CORS configured
- [ ] Rate limiting on forms
- [ ] Input validation
- [ ] SQL/NoSQL injection prevention
- [ ] XSS protection

### Mobile

- [ ] Mobile-first design
- [ ] Touch targets 44x44px minimum
- [ ] Text readable (16px+)
- [ ] Fast on 4G
- [ ] No horizontal scroll
- [ ] Hamburger menu works

### Indian Market Specific

- [ ] WhatsApp integration
- [ ] Click-to-call buttons
- [ ] Bilingual support (where needed)
- [ ] Rupee currency formatting
- [ ] Local SEO optimized
- [ ] Festival/wedding focus
- [ ] Fast loading on varied speeds

---

## Common Issues & Solutions

### Issue: Images Not Loading

**Problem:** Images show broken after deployment

**Solution:**
```typescript
// next.config.js
module.exports = {
  images: {
    domains: [
      'your-blob-storage.vercel-storage.com',
      'res.cloudinary.com',
    ],
  },
}
```

### Issue: Build Fails on Vercel

**Problem:** Works locally, fails on Vercel

**Solutions:**
1. Check environment variables in Vercel dashboard
2. Ensure database is accessible from Vercel IPs
3. Check build logs for specific error
4. Verify all dependencies in package.json
5. Check Node version compatibility

### Issue: Slow Page Loads

**Problem:** Pages load slowly, especially in India

**Solutions:**
1. Optimize images (most common cause)
2. Reduce JavaScript bundle size
3. Enable ISR caching
4. Use CDN for static assets
5. Minimize API calls
6. Implement proper loading states

### Issue: Payload Admin Panel Not Loading

**Problem:** /admin returns 404 or blank

**Solutions:**
1. Verify Payload config is correct
2. Check admin route setup
3. Ensure database connection works
4. Check browser console for errors
5. Verify PAYLOAD_SECRET is set

---

## Resources & Documentation

### Official Documentation

- **Next.js 15:** https://nextjs.org/docs
- **Payload CMS 3:** https://payloadcms.com/docs
- **Vercel:** https://vercel.com/docs
- **TypeScript:** https://www.typescriptlang.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs

### Helpful Guides

- **Next.js + Payload Guide:** https://payloadcms.com/posts/blog/the-ultimate-guide-to-using-nextjs-with-payload
- **Vercel Deployment:** https://vercel.com/guides/how-to-deploy-nextjs
- **Image Optimization:** https://nextjs.org/docs/app/building-your-application/optimizing/images

### Community

- **Next.js Discord:** https://nextjs.org/discord
- **Payload Discord:** https://discord.gg/payload
- **GitHub Issues:** Report bugs and request features

---

## Conclusion

This stack provides a modern, performant, and scalable foundation for your premium catering website:

✅ **Next.js 15** - Fast, SEO-friendly, great DX
✅ **Payload CMS** - Flexible, code-first content management
✅ **Vercel** - Zero-config deployment, global CDN
✅ **TypeScript** - Type safety and better tooling
✅ **Optimized** - Fast loading even on slower connections

**Next Steps:**
1. Set up development environment
2. Configure Payload collections for catering content
3. Build out pages using research from design docs
4. Implement SEO best practices
5. Deploy to Vercel
6. Launch and iterate based on analytics

---

*Document created: 2025-11-17*
*Stack Version: Next.js 15, Payload CMS 3.0, Vercel*
*Target: Production-ready catering website*
*Version: 2.0 - Updated with Production Best Practices*

---

# PART 2: PRODUCTION BEST PRACTICES (2025)

## Table of Contents - Best Practices

15. [Next.js 15 Production Best Practices](#nextjs-15-production-best-practices)
16. [PostgreSQL Best Practices](#postgresql-best-practices)
17. [Payload CMS Production Patterns](#payload-cms-production-patterns)
18. [Tailwind CSS Best Practices](#tailwind-css-best-practices)
19. [Vercel Production Deployment](#vercel-production-deployment)
20. [TypeScript Strict Mode & Type Safety](#typescript-strict-mode--type-safety)
21. [Testing Strategy](#testing-strategy)
22. [Security Best Practices](#security-best-practices)
23. [Error Handling & Logging](#error-handling--logging)
24. [Monitoring & Observability](#monitoring--observability)
25. [API Routes Best Practices](#api-routes-best-practices)

---

## Next.js 15 Production Best Practices

### Modern Features for 2025

#### **1. Turbopack (Production Ready)**

Next.js 15 features Turbopack as the default bundler—no longer experimental—and is production-ready, already used by major companies.

**Enable in Development:**
```json
// package.json
{
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start"
  }
}
```

**Benefits:**
- Faster builds (up to 30% faster refresh times)
- Rust-based tooling for better performance
- Improved tree-shaking
- Better development experience

---

#### **2. Server vs Client Component Patterns**

**When to Use Server Components:**
- Fetching data from databases/APIs
- Using API keys, tokens, secrets
- Reducing JavaScript sent to browser
- Improving First Contentful Paint (FCP)
- Static content rendering

**When to Use Client Components:**
- State and event handlers (onClick, onChange)
- Lifecycle hooks (useEffect, useState)
- Browser-only APIs (localStorage, window)
- Custom hooks
- Interactive elements

**Composing Pattern:**
```typescript
// ✅ CORRECT: Pass Server Component as children to Client Component
// layout.tsx (Server Component)
import ClientNav from './ClientNav'
import ServerSidebar from './ServerSidebar'

export default function Layout({ children }) {
  return (
    <div>
      <ClientNav>
        <ServerSidebar /> {/* Server Component as children */}
      </ClientNav>
      {children}
    </div>
  )
}

// ClientNav.tsx (Client Component)
'use client'

export default function ClientNav({ children }) {
  return (
    <nav>
      {children} {/* Server Component rendered here */}
    </nav>
  )
}
```

**❌ INCORRECT Pattern:**
```typescript
// ClientComponent.tsx
'use client'
import ServerComponent from './ServerComponent' // ❌ Can't import Server into Client

export default function ClientComponent() {
  return <ServerComponent /> // ❌ Won't work
}
```

---

#### **3. React 19 Integration**

Next.js 15 has React 19 fully integrated with streaming capabilities.

**Use the `use()` Hook:**
```typescript
import { use } from 'react'

async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

function Component() {
  const data = use(getData()) // Await promises directly in components
  return <div>{data.title}</div>
}
```

---

#### **4. Production Checklist**

**Before Deployment:**

**Security:**
- [ ] Environment variables in `.gitignore`
- [ ] Only `NEXT_PUBLIC_` vars exposed to client
- [ ] Content Security Policy configured
- [ ] CORS properly set up

**Performance:**
- [ ] Run Lighthouse audit (90+ score)
- [ ] Check Core Web Vitals (LCP, INP, CLS)
- [ ] Enable caching where appropriate
- [ ] Use ISR for semi-dynamic pages

**SEO:**
- [ ] Metadata on all pages
- [ ] Sitemap generated
- [ ] Robots.txt configured
- [ ] Schema.org structured data

**Example CSP Configuration:**
```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' *.google-analytics.com;
      style-src 'self' 'unsafe-inline';
      img-src * blob: data:;
      media-src 'none';
      connect-src *;
      font-src 'self';
    `.replace(/\s{2,}/g, ' ').trim()
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  }
]

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}
```

---

#### **5. Rendering Strategies in Detail**

**Static Site Generation (SSG):**
```typescript
// Best for: Marketing pages, blogs, documentation
// Builds at build time, served as static HTML

export default async function Page() {
  const data = await fetch('https://api.example.com/data')
  return <div>{/* content */}</div>
}
```

**Server-Side Rendering (SSR):**
```typescript
// Best for: Dashboards, user-specific pages
// Rendered on each request

export const dynamic = 'force-dynamic'

export default async function UserDashboard() {
  const user = await getCurrentUser()
  return <div>{user.name}</div>
}
```

**Incremental Static Regeneration (ISR):**
```typescript
// Best for: Product pages, blogs with occasional updates
// Combines benefits of SSG and SSR

export const revalidate = 3600 // Revalidate every hour

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id)
  return <div>{product.name}</div>
}
```

**Game Detail Pages Example:**
```typescript
// Game detail pages use SSR for fresh data
export const dynamic = 'force-dynamic'

export default async function GamePage({ params }) {
  const game = await fetchGameData(params.id)
  return <GameDetails game={game} />
}

// Category listings use ISR
export const revalidate = 3600

export default async function CategoryPage() {
  const games = await fetchGames()
  return <GameList games={games} />
}
```

---

## PostgreSQL Best Practices

### Why PostgreSQL for This Project

Since you're using PostgreSQL, here are production-ready practices:

#### **1. Connection Pooling**

**Critical for Serverless:** Each function invocation can create new connections, quickly exhausting PostgreSQL's connection limit (typically 100-500).

**Solution: Use a Connection Pooler**

**Option A: Neon (Recommended for Vercel)**
```typescript
// lib/db.ts
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export default sql
```

**Option B: PgBouncer**
```bash
# Connection string with pgBouncer
DATABASE_URL="postgresql://user:pass@pgbouncer-host:6432/dbname?pgbouncer=true"
```

**Prisma with Connection Pooling:**
```typescript
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL") // For migrations
}

// Use connection pooling URL for queries
// Use direct URL for migrations
```

**Connection Limits:**
```typescript
// payload.config.ts
import { postgresAdapter } from '@payloadcms/db-postgres'

export default buildConfig({
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
      max: 20, // Maximum connections
      min: 2,  // Minimum connections
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    },
  }),
})
```

---

#### **2. Database Indexing**

**Single Query Optimization Can Boost Performance by 100x**

**Identify Slow Queries:**
```sql
-- Enable query logging (in PostgreSQL config)
log_min_duration_statement = 1000  -- Log queries > 1 second

-- Or use EXPLAIN
EXPLAIN ANALYZE SELECT * FROM menu_items WHERE category = 'appetizers';
```

**Create Indexes:**
```sql
-- Index on frequently queried columns
CREATE INDEX idx_menu_items_category ON menu_items(category);

-- Multi-column index for date range queries
CREATE INDEX idx_events_date_range ON events(start_date, end_date);

-- Text search index
CREATE INDEX idx_menu_items_search ON menu_items USING GIN(to_tsvector('english', name || ' ' || description));
```

**Payload CMS Migration Example:**
```typescript
// migrations/2025-11-17-add-indexes.ts
import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(`
    CREATE INDEX IF NOT EXISTS idx_menu_items_category
    ON menu_items(category);

    CREATE INDEX IF NOT EXISTS idx_menu_items_featured
    ON menu_items(featured);
  `)
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(`
    DROP INDEX IF EXISTS idx_menu_items_category;
    DROP INDEX IF EXISTS idx_menu_items_featured;
  `)
}
```

**Best Practices:**
- Create one index per unique query pattern
- Index foreign keys
- Index columns used in WHERE, ORDER BY, JOIN
- Don't over-index (slows down writes)
- PostgreSQL creates B-tree indexes by default

---

#### **3. Query Optimization**

**Use EXPLAIN to Analyze:**
```typescript
// In development, log query plans
const result = await payload.db.drizzle.execute(`
  EXPLAIN ANALYZE
  SELECT * FROM menu_items
  WHERE category = 'appetizers'
  AND is_vegetarian = true
`)
console.log(result)
```

**Optimize N+1 Queries:**
```typescript
// ❌ BAD: N+1 queries
const services = await payload.find({ collection: 'services' })
for (const service of services.docs) {
  const images = await payload.find({
    collection: 'media',
    where: { service: { equals: service.id } }
  })
}

// ✅ GOOD: Single query with joins
const services = await payload.find({
  collection: 'services',
  depth: 2, // Populate relationships in single query
})
```

---

## Payload CMS Production Patterns

### PostgreSQL Migration Workflow

#### **1. Development vs Production**

**Development:** Can use "db push" for rapid iteration
```bash
# Automatically pushes schema changes (dev only)
npm run payload db:push
```

**Production:** MUST use migrations

**Why?**
- Control and auditability of schema changes
- Safer deployments
- No uncontrolled schema drift
- Rollback capability

---

#### **2. Disable Push in Production**

**Critical:** Turn off database push before going to production.

```typescript
// payload.config.ts
export default buildConfig({
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
    push: process.env.NODE_ENV === 'development', // Only in dev
  }),
})
```

---

#### **3. Migration Workflow**

**Create Migration:**
```bash
npm run payload migrate:create
```

This creates a file like: `migrations/2025-11-17_143022_add_menu_categories.ts`

**Run Migrations:**

**Option A: In CI/CD Before Build**
```json
// package.json
{
  "scripts": {
    "build": "payload migrate && next build"
  }
}
```

**Option B: At Runtime (Long-running servers)**
```typescript
// payload.config.ts
import * as migrations from './migrations'

export default buildConfig({
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
    prodMigrations: migrations, // Run on server startup
  }),
})
```

**Best Practice: CI/CD Approach**
- Ensures database is ready before deployment
- Fails fast if migration has issues
- No runtime performance impact

---

#### **4. Custom Admin UI Components**

**Performance Considerations:**

```typescript
// ❌ BAD: Heavy component without optimization
'use client'
import React from 'react'

export default function CustomField() {
  const [data, setData] = React.useState([])

  // Fetches on every render
  React.useEffect(() => {
    fetch('/api/heavy-data').then(r => r.json()).then(setData)
  }, [])

  return <div>{/* render */}</div>
}

// ✅ GOOD: Optimized with memoization
'use client'
import React from 'react'

export default React.memo(function CustomField() {
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    let cancelled = false
    fetch('/api/heavy-data')
      .then(r => r.json())
      .then(d => !cancelled && setData(d))
    return () => { cancelled = true }
  }, [])

  return <div>{/* render */}</div>
})
```

**Use Payload's Native Components:**
```typescript
// Reuse Payload's UI components for consistency
import { Button, Label } from '@payloadcms/ui'

export function CustomField() {
  return (
    <div>
      <Label>Custom Field</Label>
      <Button>Click Me</Button>
    </div>
  )
}
```

**React Best Practices for Custom Components:**
- Use memoization (`React.memo`, `useMemo`, `useCallback`)
- Proper cleanup in `useEffect`
- Lazy load heavy components
- Use Payload's built-in hooks (`useField`, `useForm`)

---

#### **5. Payload Hooks**

```typescript
// Use hooks in client components
'use client'
import { useField, useForm } from '@payloadcms/ui'

export function CustomPriceField() {
  const { value, setValue } = useField<number>({ path: 'price' })
  const { getFields } = useForm()

  const category = getFields().category?.value

  // Auto-adjust price based on category
  React.useEffect(() => {
    if (category === 'premium') {
      setValue(value * 1.2)
    }
  }, [category])

  return <input type="number" value={value} onChange={(e) => setValue(+e.target.value)} />
}
```

---

## Tailwind CSS Best Practices

### Design System Configuration

#### **1. Centralized Theme Configuration**

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './payload/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Indian color palette
        saffron: {
          DEFAULT: '#FF9933',
          light: '#FFB366',
          dark: '#CC7700',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E6C966',
          dark: '#B8941F',
        },
        maroon: {
          DEFAULT: '#800000',
          light: '#A62929',
          dark: '#5C0000',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-playfair)'],
        hindi: ['var(--font-hind)'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
}

export default config
```

---

#### **2. Class Organization**

**Use Prettier Plugin for Auto-Sorting:**
```bash
npm install -D prettier prettier-plugin-tailwindcss
```

```json
// .prettierrc
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

**Before:**
```tsx
<div className="text-white bg-saffron p-4 rounded-lg hover:bg-saffron-dark transition-colors">
```

**After (Auto-sorted):**
```tsx
<div className="rounded-lg bg-saffron p-4 text-white transition-colors hover:bg-saffron-dark">
```

---

#### **3. Component Abstraction**

**When to Use @apply:**

```css
/* ✅ GOOD: For complex, reused patterns */
.btn-primary {
  @apply rounded-lg bg-saffron px-6 py-3 text-white transition-all hover:bg-saffron-dark hover:shadow-lg;
}

/* ❌ AVOID: For simple, one-off styles */
.my-div {
  @apply p-4; /* Just use className="p-4" */
}
```

**Better: Create React Components:**
```typescript
// components/ui/Button.tsx
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-all',
  {
    variants: {
      variant: {
        primary: 'bg-saffron text-white hover:bg-saffron-dark',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        outline: 'border-2 border-saffron text-saffron hover:bg-saffron hover:text-white',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  )
}
```

---

#### **4. JIT Mode & Tree-Shaking**

Modern Tailwind (v3+) uses JIT by default—no manual purging needed.

**How it Works:**
- Generates only used classes
- No "purge" step required
- Smaller CSS bundles automatically
- Faster build times

**Verify Tree-Shaking:**
```bash
npm run build

# Check output CSS size
ls -lh .next/static/css/
```

**Typical Production CSS:** 10-30KB compressed

---

#### **5. Custom Utilities via Plugins**

```typescript
// tailwind.config.ts
import plugin from 'tailwindcss/plugin'

export default {
  // ... config
  plugins: [
    plugin(function({ addUtilities, theme }) {
      addUtilities({
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.text-shadow-sm': {
          'text-shadow': '0 1px 2px rgba(0, 0, 0, 0.1)',
        },
      })
    }),
  ],
}
```

**Usage:**
```tsx
<h1 className="text-balance text-shadow-sm">
  Premium North Indian Catering
</h1>
```

---

## Vercel Production Deployment

### Edge Functions & Optimization

#### **1. Edge Runtime**

**When to Use Edge:**
- Geographically distributed users
- Low-latency requirements
- Simple compute operations
- No Node.js-specific dependencies

```typescript
// app/api/availability/route.ts
export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date')

  // Check availability from database
  const available = await checkAvailability(date)

  return Response.json({ available })
}
```

**Limitations:**
- No Node.js APIs (`fs`, `path`, `__dirname`)
- Environment is closer to browser than Node.js
- 4MB response limit
- No streaming responses > 30 seconds

---

#### **2. Middleware for Edge**

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // A/B testing
  const bucket = Math.random() < 0.5 ? 'a' : 'b'
  const response = NextResponse.next()
  response.cookies.set('bucket', bucket)

  // Regional personalization
  const country = request.geo?.country || 'US'
  response.headers.set('x-user-country', country)

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

---

#### **3. Fluid Compute (Auto-Optimization)**

Enable in Vercel project settings:

- Automatically optimizes functions for performance and cost
- Zero configuration required
- Can reduce serverless costs by 20-30%

```typescript
// Automatically handled by Vercel when Fluid is enabled
// No code changes needed
```

---

#### **4. Caching Strategies**

```typescript
// Public, cached for 1 hour, stale-while-revalidate
export async function GET() {
  return Response.json(
    { data: 'menu items' },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    }
  )
}

// Private, never cached
export async function GET() {
  return Response.json(
    { user: 'data' },
    {
      headers: {
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
      },
    }
  )
}
```

---

#### **5. Environment Variables Best Practices**

**Dashboard Management:**
```
1. Vercel Dashboard > Project > Settings > Environment Variables
2. Add variables for Production, Preview, Development
3. Encrypted by default
```

**Local Development:**
```bash
# Pull env vars from Vercel
vercel env pull .env.local
```

**Naming Convention:**
```env
# Good naming pattern
DATABASE_URL=...
NEXT_PUBLIC_API_URL=...
STRIPE_SECRET_KEY=...
STRIPE_PUBLISHABLE_KEY=...

# Use SERVICE_PURPOSE_KEY pattern
EMAIL_SMTP_HOST=...
EMAIL_SMTP_PORT=...
STORAGE_S3_BUCKET=...
STORAGE_S3_REGION=...
```

**Critical:**
- NEVER commit `.env.local` to git
- Use `NEXT_PUBLIC_` prefix only for client-exposed vars
- Rotate secrets regularly
- Use Vercel's "Sensitive" flag for passwords/keys

---

## TypeScript Strict Mode & Type Safety

### Strict Configuration

#### **1. Enable Strict Mode**

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,  // Enable ALL strict checks
    "noUncheckedIndexedAccess": true,  // Extra safety
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

#### **2. Avoid `any` Type**

```typescript
// ❌ BAD
function processData(data: any) {
  return data.value
}

// ✅ GOOD: Use unknown for truly unknown types
function processData(data: unknown) {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return (data as { value: string }).value
  }
  throw new Error('Invalid data')
}

// ✅ BETTER: Use generic types
function processData<T extends { value: string }>(data: T) {
  return data.value
}
```

---

#### **3. Next.js Typed Routes (15.5+)**

```typescript
// next.config.ts
const config = {
  experimental: {
    typedRoutes: true,  // Enable typed routes
  },
}

export default config
```

**Usage:**
```typescript
import Link from 'next/link'

// ✅ TypeScript knows all valid routes
<Link href="/services/wedding-catering">  // Valid
<Link href="/invalid-route">  // ❌ TypeScript error!

// Auto-completion for dynamic routes
<Link href={{
  pathname: '/services/[slug]',
  params: { slug: 'wedding-catering' }
}}>
```

---

#### **4. Type-Safe Environment Variables**

```typescript
// lib/env.ts
import { z } from 'zod'

const envSchema = z.object({
  // Server-only
  DATABASE_URI: z.string().url(),
  PAYLOAD_SECRET: z.string().min(32),
  BLOB_READ_WRITE_TOKEN: z.string(),

  // Client-exposed
  NEXT_PUBLIC_GA_ID: z.string().startsWith('G-'),
  NEXT_PUBLIC_API_URL: z.string().url(),
})

const env = envSchema.parse({
  DATABASE_URI: process.env.DATABASE_URI,
  PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
  BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
})

export default env

// Usage:
import env from '@/lib/env'
const db = connectDB(env.DATABASE_URI)  // ✅ Type-safe!
```

---

#### **5. Modern TypeScript Patterns**

**`satisfies` Operator:**
```typescript
// Enforce type constraints while maintaining flexibility
const config = {
  colors: {
    primary: '#FF9933',
    secondary: '#D4AF37',
  },
  spacing: {
    small: 8,
    medium: 16,
  }
} satisfies Record<string, Record<string, string | number>>

// TypeScript knows exact types
config.colors.primary  // string
config.spacing.small   // number
```

**Template Literal Types:**
```typescript
type EventType = 'wedding' | 'corporate' | 'private'
type EventStatus = 'pending' | 'confirmed' | 'completed'

// Dynamic string type
type EventKey = `${EventType}_${EventStatus}`
// Results in: "wedding_pending" | "wedding_confirmed" | "wedding_completed" | ...

const event: EventKey = 'wedding_confirmed'  // ✅
const invalid: EventKey = 'invalid_status'   // ❌ Error
```

---

## Testing Strategy

### Vitest for Unit & Integration Tests

#### **1. Setup Vitest**

```bash
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom
```

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
```

```typescript
// vitest.setup.ts
import '@testing-library/jest-dom'
```

---

#### **2. Example Unit Tests**

```typescript
// components/ui/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('applies correct variant classes', () => {
    render(<Button variant="primary">Primary</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-saffron')
  })

  it('handles click events', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)

    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
```

---

### Playwright for E2E Tests

#### **1. Setup Playwright**

```bash
npm install -D @playwright/test
npx playwright install
```

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

---

#### **2. Example E2E Tests**

```typescript
// e2e/contact-form.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test('should submit inquiry successfully', async ({ page }) => {
    await page.goto('/contact')

    // Fill form
    await page.fill('[name="name"]', 'John Doe')
    await page.fill('[name="email"]', 'john@example.com')
    await page.fill('[name="phone"]', '9876543210')
    await page.selectOption('[name="eventType"]', 'wedding')
    await page.fill('[name="message"]', 'Need catering for 200 guests')

    // Submit
    await page.click('button[type="submit"]')

    // Verify success message
    await expect(page.locator('text=Thank you for your inquiry')).toBeVisible()
  })

  test('should validate required fields', async ({ page }) => {
    await page.goto('/contact')
    await page.click('button[type="submit"]')

    // Check for validation errors
    await expect(page.locator('text=Name is required')).toBeVisible()
    await expect(page.locator('text=Email is required')).toBeVisible()
  })
})
```

---

#### **3. Testing Best Practices**

**Run Tests in CI:**
```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm run test:unit

      - name: Run E2E tests
        run: npm run test:e2e
```

**Test Organization:**
```
project/
├── __tests__/           # Unit tests
│   ├── components/
│   ├── lib/
│   └── utils/
├── e2e/                 # E2E tests
│   ├── contact.spec.ts
│   ├── booking.spec.ts
│   └── menu.spec.ts
```

---

## Security Best Practices

### CSRF Protection

#### **1. Server Actions (Built-in Protection)**

Server Actions have built-in CSRF protection:
- Same-Site cookies by default
- Origin header checked against Host header

```typescript
// app/actions.ts
'use server'

export async function submitInquiry(formData: FormData) {
  // ✅ Automatically protected against CSRF
  const name = formData.get('name')
  // Process form...
}
```

---

#### **2. Custom API Routes Need Protection**

```bash
npm install @edge-csrf/nextjs
```

```typescript
// middleware.ts
import { createCsrfMiddleware } from '@edge-csrf/nextjs'

const csrfMiddleware = createCsrfMiddleware({
  cookie: {
    name: '_csrf',
    secure: process.env.NODE_ENV === 'production',
  },
})

export async function middleware(request: NextRequest) {
  const response = await csrfMiddleware(request)
  return response
}
```

---

### XSS Prevention

```typescript
// ✅ GOOD: Sanitize user input
import DOMPurify from 'isomorphic-dompurify'

export async function saveReview(data: { review: string }) {
  const sanitized = DOMPurify.sanitize(data.review)
  await db.reviews.create({ content: sanitized })
}

// ✅ GOOD: Next.js automatically escapes in JSX
<div>{userInput}</div>  // Safe!

// ❌ DANGEROUS: dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: userInput }} />  // XSS risk!

// ✅ SAFE: Sanitize first
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />
```

---

### Authentication & Authorization

```typescript
// lib/auth.ts
import { cookies } from 'next/headers'

export async function getCurrentUser() {
  const session = cookies().get('session')
  if (!session) return null

  // Verify session
  const user = await verifySession(session.value)
  return user
}

// Protect API routes
export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}
```

**Use in Server Components:**
```typescript
export default async function Dashboard() {
  const user = await requireAuth()

  return <div>Welcome {user.name}</div>
}
```

---

## Error Handling & Logging

### Error Boundaries

```typescript
// app/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to error service
    console.error('Error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Something went wrong!</h2>
        <button onClick={reset} className="btn-primary mt-4">
          Try again
        </button>
      </div>
    </div>
  )
}
```

**Global Error Handler:**
```typescript
// app/global-error.tsx
'use client'

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
}) {
  return (
    <html>
      <body>
        <h2>Application Error</h2>
        <p>{error.digest}</p>
      </body>
    </html>
  )
}
```

---

### Production Error Logging

**Security Note:** Error details are sanitized in production:

```typescript
// Production error object
{
  message: "An error occurred",  // Generic message
  digest: "a1b2c3d4"  // Hash for server-side logs
}

// Development error object
{
  message: "Database connection failed: invalid credentials",  // Full details
  stack: "Error: Database connection...\n  at..."
}
```

---

## Monitoring & Observability

### Sentry Integration

```bash
npm install @sentry/nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
})
```

```typescript
// sentry.server.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
})
```

---

## API Routes Best Practices

### Validation & Error Handling

```typescript
// app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^[0-9]{10}$/),
  message: z.string().max(1000),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate
    const result = contactSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.errors },
        { status: 400 }
      )
    }

    // Process
    await sendEmail(result.data)

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

---

## Final Production Checklist

### Pre-Launch

- [ ] TypeScript strict mode enabled
- [ ] All tests passing (unit + E2E)
- [ ] Lighthouse score 90+ on all metrics
- [ ] Core Web Vitals all green
- [ ] Security headers configured
- [ ] CSRF protection implemented
- [ ] XSS sanitization in place
- [ ] Rate limiting on forms
- [ ] Error tracking (Sentry) configured
- [ ] Analytics integrated (GA4 + Vercel)
- [ ] Environment variables secured
- [ ] Database migrations tested
- [ ] PostgreSQL indexes created
- [ ] Connection pooling configured
- [ ] Image optimization verified
- [ ] SEO metadata complete
- [ ] Sitemap generated
- [ ] Robots.txt configured
- [ ] Schema.org markup added
- [ ] Mobile experience tested
- [ ] Cross-browser tested
- [ ] SSL certificate active
- [ ] Domain configured
- [ ] Backup strategy in place

---

*Updated: 2025-11-17*
*Version: 2.0 - Production Best Practices Added*
