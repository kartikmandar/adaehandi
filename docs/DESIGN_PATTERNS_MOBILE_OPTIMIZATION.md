# Design Patterns & Mobile Optimization Guide

## Premium Catering Website - Complete Design System

**Date:** 2025-11-17
**Focus:** Mobile-First Design Patterns, UI/UX Best Practices, Performance Optimization
**Purpose:** Comprehensive guide for implementing modern, responsive catering website

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Mobile-First Design Philosophy](#mobile-first-design-philosophy)
3. [Hero Section Patterns](#hero-section-patterns)
4. [Navigation Patterns](#navigation-patterns)
5. [Layout Systems](#layout-systems)
6. [Menu Display Patterns](#menu-display-patterns)
7. [Gallery & Image Patterns](#gallery--image-patterns)
8. [Form Design Patterns](#form-design-patterns)
9. [Loading & Performance Patterns](#loading--performance-patterns)
10. [Animation & Interaction Patterns](#animation--interaction-patterns)
11. [Trust Signals & Social Proof](#trust-signals--social-proof)
12. [Accessibility Patterns](#accessibility-patterns)
13. [Component Library Recommendations](#component-library-recommendations)
14. [Footer Design Patterns](#footer-design-patterns)
15. [Mobile Optimization Checklist](#mobile-optimization-checklist)

---

## Executive Summary

### Why Mobile-First Matters

**Critical Statistics:**

- **60-70%** of restaurant/catering website traffic is mobile
- **40%** of users abandon sites that take >3 seconds to load
- **70%+** of diners search on phones before deciding
- **96.3%** of users access internet via mobile phone

**Mobile-First Means:**

- Design for smallest screen first, then scale up
- Touch-friendly interfaces (44x44px minimum targets)
- Fast loading on 4G/3G networks
- Thumb-zone optimization
- Progressive enhancement

### Design Goals

**Performance Targets:**

- Load time: <3 seconds on 4G
- Lighthouse score: 90+ all metrics
- Core Web Vitals: All green
- Images optimized: WebP/AVIF
- Minimal JavaScript bundle

**UX Targets:**

- One-thumb navigation
- Clear visual hierarchy
- Instant feedback on actions
- Seamless transitions
- Accessibility: WCAG AA minimum

---

## Mobile-First Design Philosophy

### The Mobile-First Approach

**Definition:** Design and develop for mobile devices first, then progressively enhance for larger screens.

**Why Mobile-First?**

1. Forces focus on essential content
2. Easier to scale up than scale down
3. Better performance baseline
4. Matches actual user behavior
5. Future-proof (mobile usage growing)

### Screen Size Breakpoints

```css
/* Mobile First Breakpoints */
/* Base: Mobile (320px - 639px) */
/* sm: 640px - 767px (large phones) */
/* md: 768px - 1023px (tablets) */
/* lg: 1024px - 1279px (small laptops) */
/* xl: 1280px - 1535px (desktops) */
/* 2xl: 1536px+ (large screens) */

/* Tailwind CSS Default Breakpoints */
@media (min-width: 640px) {
  /* sm */
}
@media (min-width: 768px) {
  /* md */
}
@media (min-width: 1024px) {
  /* lg */
}
@media (min-width: 1280px) {
  /* xl */
}
@media (min-width: 1536px) {
  /* 2xl */
}
```

### Touch Target Sizing

**Minimum Touch Targets:**

- **Apple:** 44x44 pixels
- **Google Material Design:** 48x48 pixels
- **Research Optimal:** 42-72 pixels
- **Most Preferred:** 60 pixels

**Spacing Between Targets:**

- Minimum: 8px (Material Design)
- Recommended: 12-16px for critical actions

**Example Implementation:**

```css
/* Touch-friendly button */
.btn-primary {
  min-height: 48px;
  min-width: 48px;
  padding: 12px 24px;
  font-size: 16px;
  margin: 8px;
}

/* Touch-friendly navigation */
.nav-link {
  padding: 16px;
  min-height: 48px;
  display: flex;
  align-items: center;
}
```

### Thumb Zone Design

**Thumb Zone Areas:**

- **Natural (Green):** Bottom center - easiest to reach
- **Stretch (Yellow):** Top and sides - requires stretching
- **Hard to Reach (Red):** Top corners - avoid placing important actions

**Best Practices:**

- Place primary CTAs in bottom 1/3 of screen
- Use bottom navigation bars for key functions
- Keep hamburger menu accessible (top-left or bottom)
- Avoid placing critical actions in top corners

**Example Layout:**

```
┌─────────────────┐
│  Logo   Menu ☰ │  ← Stretch Zone
│                 │
│   Hero Image    │
│                 │
│   Content       │  ← Natural Zone
│                 │
│  [Book Now]     │  ← Perfect for CTA
└─────────────────┘
    Bottom Nav      ← Easy Reach
```

---

## Hero Section Patterns

### Pattern 1: Full-Screen Image Hero

**Best For:** Premium branding, emotional impact
**Mobile Optimization:** Vertical images, text overlay contrast

**Structure:**

```html
<section class="hero relative h-screen">
  <img src="hero-biryani.jpg" alt="Signature biryani" class="h-full w-full object-cover" />
  <div class="absolute inset-0 flex items-center justify-center bg-black/40">
    <div class="px-4 text-center text-white">
      <h1 class="mb-4 text-4xl font-bold md:text-6xl">Authentic North Indian Catering</h1>
      <p class="mb-8 text-xl">Delhi's Premier Catering Service</p>
      <button class="btn-primary">Request Quote</button>
    </div>
  </div>
</section>
```

**Mobile Considerations:**

- Use `vh` units for full-screen on mobile
- Optimize image for portrait orientation
- Ensure text contrast (40-60% overlay opacity)
- Keep text concise (2-3 lines max on mobile)
- CTA button min 48px height

---

### Pattern 2: Split Hero (Image + Content)

**Best For:** Balanced information + visual appeal
**Mobile Optimization:** Stack vertically on mobile

**Desktop Layout:**

```
┌──────────┬──────────┐
│          │          │
│  Content │  Image   │
│          │          │
└──────────┴──────────┘
```

**Mobile Layout:**

```
┌──────────┐
│  Image   │
├──────────┤
│ Content  │
└──────────┘
```

**Implementation:**

```html
<section class="hero">
  <div class="container mx-auto">
    <div class="flex flex-col items-center gap-8 md:flex-row">
      <!-- Content (first on mobile) -->
      <div class="order-2 w-full px-4 md:order-1 md:w-1/2">
        <h1 class="mb-4 text-3xl font-bold md:text-5xl">Elevate Your Events</h1>
        <p class="mb-6 text-lg">From intimate gatherings to grand celebrations</p>
        <button class="btn-primary">View Packages</button>
      </div>
      <!-- Image (second on mobile) -->
      <div class="order-1 w-full md:order-2 md:w-1/2">
        <img src="event-setup.jpg" alt="Event setup" class="rounded-lg shadow-xl" />
      </div>
    </div>
  </div>
</section>
```

---

### Pattern 3: Video Background Hero

**Best For:** Dynamic, modern feel
**Mobile Optimization:** Critical - use static image fallback

**Implementation:**

```html
<section class="hero relative h-screen">
  <!-- Video for desktop -->
  <video
    autoplay
    muted
    loop
    playsinline
    class="absolute inset-0 hidden h-full w-full object-cover md:block"
  >
    <source src="cooking-video.mp4" type="video/mp4" />
  </video>

  <!-- Static image for mobile -->
  <img
    src="cooking-poster.jpg"
    alt="Our kitchen"
    class="absolute inset-0 h-full w-full object-cover md:hidden"
  />

  <div class="relative z-10 flex h-full items-center justify-center">
    <div class="px-4 text-center text-white">
      <h1>Experience Culinary Excellence</h1>
      <button class="btn-primary">Book Now</button>
    </div>
  </div>
</section>
```

**Video Best Practices:**

- **File Size:** <5MB (compress heavily)
- **Duration:** 10-20 seconds loop
- **Format:** MP4 (H.264 codec)
- **Attributes:** `autoplay muted loop playsinline`
- **Mobile:** ALWAYS use static image fallback
- **Accessibility:** Provide pause button option

---

### Pattern 4: Minimal Text Hero

**Best For:** Minimalist, sophisticated brands
**Mobile Optimization:** Large, readable text

**Example:**

```html
<section class="hero bg-cream flex h-screen items-center justify-center">
  <div class="px-4 text-center">
    <h1 class="mb-4 font-serif text-5xl md:text-7xl">Adaehandi</h1>
    <p class="mb-8 text-xl text-gray-600 md:text-2xl">North Indian Catering, Redefined</p>
    <div class="flex flex-col justify-center gap-4 sm:flex-row">
      <button class="btn-primary">View Menus</button>
      <button class="btn-secondary">Contact Us</button>
    </div>
  </div>
</section>
```

---

### Pattern 5: Carousel/Slider Hero

**Best For:** Showcasing multiple offerings
**Mobile Optimization:** Swipeable, auto-height

**Caution:** Can impact performance - use sparingly

**Best Practices:**

- Max 3-5 slides
- Auto-advance every 5-7 seconds
- Pause on hover/tap
- Clear navigation dots
- Swipe gestures on mobile
- Preload next image
- Lazy load subsequent slides

---

## Navigation Patterns

### Mobile Navigation Decision Tree

```
Is your site content-focused with <5 main sections?
├─ YES → Tab Bar (Bottom Navigation)
└─ NO → Is it complex with many sections?
    ├─ YES → Hamburger Menu (Drawer)
    └─ NO → Consider Hybrid Approach
```

### Pattern 1: Hamburger Menu (Navigation Drawer)

**Best For:** Content-heavy sites, many menu items
**Pros:** Clean interface, maximizes screen space
**Cons:** Less discoverable, requires extra tap

**Implementation:**

```html
<!-- Mobile Header -->
<header class="sticky top-0 z-50 bg-white shadow-md">
  <div class="container mx-auto flex items-center justify-between px-4 py-3">
    <div class="logo">
      <img src="logo.svg" alt="Brand" class="h-10" />
    </div>
    <button class="hamburger md:hidden" aria-label="Menu">
      <svg class="h-6 w-6"><!-- hamburger icon --></svg>
    </button>
    <!-- Desktop Nav -->
    <nav class="hidden gap-6 md:flex">
      <a href="#home">Home</a>
      <a href="#services">Services</a>
      <a href="#gallery">Gallery</a>
      <a href="#contact">Contact</a>
    </nav>
  </div>
</header>

<!-- Mobile Drawer -->
<div class="drawer fixed inset-0 z-50 translate-x-full transform bg-black/50 transition-transform">
  <div class="drawer-content ml-auto h-full w-4/5 bg-white p-6">
    <button class="close mb-8">✕</button>
    <nav class="flex flex-col gap-6 text-xl">
      <a href="#home">Home</a>
      <a href="#services">Services</a>
      <a href="#gallery">Gallery</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </nav>
  </div>
</div>
```

**Animation Best Practices:**

```css
/* Slide-in animation */
.drawer {
  transition: transform 250ms ease-out;
}

.drawer.open {
  transform: translateX(0);
}

/* Use transform for better performance */
/* Avoid animating width or left */
```

**Drawer Width Guidelines:**

- Mobile: 70-85% of screen width
- Tablet: 250-300px fixed width

---

### Pattern 2: Bottom Tab Bar

**Best For:** 3-5 main sections, app-like experience
**Pros:** Always visible, one-tap access, thumb-friendly
**Cons:** Limited to 5 items, takes screen space

**Perfect For Food Apps:** Home, Menu, Orders, Account, More

**Implementation:**

```html
<nav
  class="bottom-nav fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white md:hidden"
>
  <div class="flex justify-around">
    <a href="#home" class="nav-item flex flex-col items-center px-3 py-2">
      <svg class="h-6 w-6"><!-- home icon --></svg>
      <span class="mt-1 text-xs">Home</span>
    </a>
    <a href="#menu" class="nav-item flex flex-col items-center px-3 py-2">
      <svg class="h-6 w-6"><!-- menu icon --></svg>
      <span class="mt-1 text-xs">Menu</span>
    </a>
    <a href="#gallery" class="nav-item flex flex-col items-center px-3 py-2">
      <svg class="h-6 w-6"><!-- gallery icon --></svg>
      <span class="mt-1 text-xs">Gallery</span>
    </a>
    <a href="#contact" class="nav-item flex flex-col items-center px-3 py-2">
      <svg class="h-6 w-6"><!-- contact icon --></svg>
      <span class="mt-1 text-xs">Contact</span>
    </a>
  </div>
</nav>
```

**Design Specifications:**

- Height: 56-64px
- Icon size: 24x24px
- Text: 10-12px
- Active state: Color change + indicator

---

### Pattern 3: Sticky Header with CTA

**Best For:** Conversion-focused sites
**Mobile Optimization:** Compact, single-row

**Implementation:**

```html
<header class="sticky top-0 z-50 bg-white py-3 shadow-md">
  <div class="container mx-auto flex items-center justify-between px-4">
    <img src="logo.svg" alt="Brand" class="h-8" />
    <div class="flex items-center gap-3">
      <button class="hamburger md:hidden">
        <svg class="h-6 w-6"><!-- menu icon --></svg>
      </button>
      <a href="tel:+91XXXXXXXXXX" class="md:hidden">
        <svg class="h-6 w-6"><!-- phone icon --></svg>
      </a>
      <button class="btn-primary hidden md:block">Book Now</button>
    </div>
  </div>
</header>
```

---

### Pattern 4: Mega Menu (Desktop) + Drawer (Mobile)

**Best For:** Complex sites with many categories
**Example:** Wedding Catering > North Indian > Vegetarian > Punjabi

**Mobile Strategy:**

- Use accordion/collapsible sections
- Breadcrumbs for current location
- Back button for navigation

---

## Layout Systems

### Grid System Overview

**12-Column Grid (Standard):**

```
Mobile:     1 column  (stacked)
Tablet:     2-3 columns
Desktop:    3-4 columns
Large:      4-6 columns
```

**Common Grid Patterns:**

1. **Card Grid** (Services, Menu Items)
   - Mobile: 1 column
   - Tablet: 2 columns
   - Desktop: 3-4 columns

2. **Featured + Grid** (Hero Item + Supporting)
   - Mobile: Stacked
   - Desktop: 2/3 featured + 1/3 grid

3. **Masonry Grid** (Gallery, Pinterest-style)
   - Varying heights
   - Fills available space efficiently

---

### Layout Pattern 1: Card-Based Design

**Best For:** Menu items, services, packages

**Mobile-Optimized Card:**

```html
<div class="card overflow-hidden rounded-lg bg-white shadow-md">
  <!-- Image -->
  <div class="relative aspect-[4/3]">
    <img src="dal-makhani.jpg" alt="Dal Makhani" class="h-full w-full object-cover" />
  </div>

  <!-- Content -->
  <div class="p-4">
    <h3 class="mb-2 text-xl font-bold">Dal Makhani</h3>
    <p class="mb-3 text-sm text-gray-600">
      Creamy black lentils slow-cooked with butter and spices
    </p>
    <div class="flex items-center justify-between">
      <span class="text-lg font-bold">₹350</span>
      <span class="text-sm text-green-600">✓ Vegetarian</span>
    </div>
  </div>
</div>
```

**Grid Implementation:**

```html
<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  <!-- Cards repeat -->
</div>
```

---

### Layout Pattern 2: Hero + Grid Hybrid

**Best For:** Featured content + supporting items

```html
<div class="container mx-auto px-4">
  <!-- Mobile: Stacked, Desktop: 2-column -->
  <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
    <!-- Featured (2 columns on desktop) -->
    <div class="lg:col-span-2">
      <div class="featured-card overflow-hidden rounded-lg">
        <img
          src="featured-event.jpg"
          alt="Wedding catering"
          class="aspect-video w-full object-cover"
        />
        <div class="p-6">
          <h2 class="mb-2 text-3xl font-bold">Wedding Packages</h2>
          <p>Start from ₹999 per guest</p>
        </div>
      </div>
    </div>

    <!-- Supporting items (1 column) -->
    <div class="flex flex-col gap-6">
      <div class="card"><!-- Corporate Events --></div>
      <div class="card"><!-- Private Parties --></div>
    </div>
  </div>
</div>
```

---

### Layout Pattern 3: Alternating Content Sections

**Best For:** Long-form content, about pages

**Pattern:**

```
┌─────────────────┐
│  Image   Text   │  Section 1
├─────────────────┤
│  Text    Image  │  Section 2
├─────────────────┤
│  Image   Text   │  Section 3
└─────────────────┘
```

**Mobile: Always Image → Text**

**Implementation:**

```html
<section class="py-12">
  <div class="container mx-auto px-4">
    <div class="flex flex-col items-center gap-8 md:flex-row">
      <div class="w-full md:w-1/2">
        <img src="section1.jpg" class="rounded-lg" />
      </div>
      <div class="w-full md:w-1/2">
        <h2>Our Story</h2>
        <p>Content...</p>
      </div>
    </div>
  </div>
</section>

<!-- Next section: reverse on desktop -->
<section class="bg-gray-50 py-12">
  <div class="container mx-auto px-4">
    <div class="flex flex-col items-center gap-8 md:flex-row-reverse">
      <!-- Image and content swap positions on desktop -->
    </div>
  </div>
</section>
```

---

## Menu Display Patterns

### Pattern 1: Category Tabs + Grid

**Best For:** Multiple menu categories
**Mobile: Horizontal scrolling tabs**

```html
<div class="menu-section">
  <!-- Category Tabs -->
  <div class="tabs mb-6 flex gap-4 overflow-x-auto border-b">
    <button class="tab active">Appetizers</button>
    <button class="tab">Main Course</button>
    <button class="tab">Desserts</button>
    <button class="tab">Beverages</button>
  </div>

  <!-- Menu Items Grid -->
  <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    <!-- Menu item cards -->
  </div>
</div>
```

**Mobile Tab Styling:**

```css
.tabs {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Hide scrollbar */
}

.tabs::-webkit-scrollbar {
  display: none;
}

.tab {
  white-space: nowrap;
  padding: 12px 24px;
  min-width: fit-content;
}
```

---

### Pattern 2: Accordion Menu

**Best For:** Text-heavy menus, detailed descriptions
**Mobile: Native accordion, easy to scan**

```html
<div class="menu-accordion">
  <div class="accordion-item border-b">
    <button class="accordion-header flex w-full items-center justify-between py-4">
      <span class="text-lg font-bold">North Indian Specialties</span>
      <svg class="h-5 w-5 transform transition-transform">
        <!-- chevron -->
      </svg>
    </button>
    <div class="accordion-content hidden px-4 pb-4">
      <!-- Menu items -->
      <div class="menu-item flex justify-between py-3">
        <div>
          <h4 class="font-semibold">Dal Makhani</h4>
          <p class="text-sm text-gray-600">Creamy black lentils...</p>
        </div>
        <span class="font-bold">₹350</span>
      </div>
      <!-- More items -->
    </div>
  </div>
  <!-- More categories -->
</div>
```

---

### Pattern 3: Filterable Menu with Search

**Best For:** Large menus, dietary preferences
**Mobile: Sticky filter bar**

```html
<div class="menu-with-filters">
  <!-- Search & Filters (sticky on mobile) -->
  <div class="sticky top-16 z-40 border-b bg-white py-4">
    <div class="container mx-auto px-4">
      <!-- Search -->
      <input
        type="search"
        placeholder="Search dishes..."
        class="mb-3 w-full rounded-lg border p-3"
      />

      <!-- Filter Chips -->
      <div class="flex gap-2 overflow-x-auto">
        <button class="chip active">All</button>
        <button class="chip">Vegetarian</button>
        <button class="chip">Vegan</button>
        <button class="chip">Jain</button>
        <button class="chip">Gluten-Free</button>
      </div>
    </div>
  </div>

  <!-- Menu Grid -->
  <div class="container mx-auto px-4 py-6">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <!-- Filterable menu items -->
    </div>
  </div>
</div>
```

**Filter Chip Styling:**

```css
.chip {
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #e5e7eb;
  white-space: nowrap;
  transition: all 0.2s;
}

.chip.active {
  background: #ff9933; /* Saffron */
  color: white;
  border-color: #ff9933;
}
```

---

### Pattern 4: Pricing Table Layout

**Best For:** Package comparisons
**Mobile: Horizontal scroll or stacked**

**Option A: Horizontal Scroll (3+ columns)**

```html
<div class="overflow-x-auto">
  <div class="flex min-w-max gap-4 p-4">
    <div class="pricing-card min-w-[280px]"><!-- Package 1 --></div>
    <div class="pricing-card min-w-[280px]"><!-- Package 2 --></div>
    <div class="pricing-card min-w-[280px]"><!-- Package 3 --></div>
  </div>
</div>
```

**Option B: Stacked (Mobile)**

```html
<div class="flex flex-col gap-6 md:flex-row">
  <div class="pricing-card flex-1">
    <h3>Peshkash</h3>
    <div class="price">₹999/person</div>
    <ul class="features">
      <li>✓ 3 Appetizers</li>
      <li>✓ 4 Main Courses</li>
      <li>✓ 2 Desserts</li>
    </ul>
    <button class="btn-primary w-full">Select</button>
  </div>
  <!-- More packages -->
</div>
```

---

### Digital Menu Best Practices (2025 Trends)

**Minimalist Layouts:**

- Plenty of white space
- Consistent fonts
- Clean lines
- Focus customers on key items

**Visual Hierarchy:**

- Arrange by profitability/popularity
- Eye naturally goes to: Top-right, center, top-left
- Use boxes, colors, icons to highlight

**Pricing Psychology:**

- Remove currency symbols (₹) → Higher order value
- Use charm pricing (.99 endings)
- Anchor pricing (expensive item makes others seem reasonable)

**Mobile Optimization:**

- Readable font size (minimum 16px)
- Touch-friendly spacing
- Easy-to-scan categories
- Quick filtering

---

## Gallery & Image Patterns

### Pattern 1: Masonry Grid (Pinterest-Style)

**Best For:** Food photography, varying aspect ratios
**Mobile: 1-2 columns, Desktop: 3-4 columns**

**Characteristics:**

- Images maintain original aspect ratio
- No cropping
- Efficient space usage
- Dynamic, interesting layout

**Implementation with CSS Grid:**

```css
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 10px;
  gap: 16px;
}

.masonry-item {
  grid-row-end: span 20; /* Adjust based on image height */
}

/* Mobile */
@media (max-width: 640px) {
  .masonry-grid {
    grid-template-columns: 1fr;
  }
}
```

---

### Pattern 2: Uniform Grid with Lightbox

**Best For:** Professional portfolios, consistent look
**Mobile: 2 columns, Desktop: 3-4 columns**

```html
<div class="gallery grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
  <button class="gallery-item group relative aspect-square overflow-hidden rounded-lg">
    <img
      src="dish1.jpg"
      alt="Biryani"
      class="h-full w-full object-cover transition-transform group-hover:scale-110"
    />
    <div class="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20"></div>
  </button>
  <!-- More items -->
</div>

<!-- Lightbox Modal -->
<div class="lightbox fixed inset-0 z-50 hidden bg-black/90">
  <button class="close absolute top-4 right-4 text-4xl text-white">×</button>
  <div class="flex h-full items-center justify-center p-4">
    <img src="" alt="" class="max-h-full max-w-full" />
  </div>
  <!-- Prev/Next arrows -->
</div>
```

**Lightbox Features:**

- Click image to open full-screen
- Prev/Next navigation
- Swipe gestures on mobile
- ESC key to close
- Click outside to close
- Keyboard navigation (arrow keys)

---

### Pattern 3: Carousel/Slider Gallery

**Best For:** Featured images, limited space
**Mobile: Swipeable**

```html
<div class="carousel relative">
  <div class="carousel-track flex snap-x snap-mandatory overflow-x-auto">
    <div class="carousel-slide min-w-full snap-start">
      <img src="slide1.jpg" alt="" class="w-full" />
    </div>
    <div class="carousel-slide min-w-full snap-start">
      <img src="slide2.jpg" alt="" class="w-full" />
    </div>
    <!-- More slides -->
  </div>

  <!-- Navigation Dots -->
  <div class="dots mt-4 flex justify-center gap-2">
    <button class="dot h-2 w-2 rounded-full bg-gray-300"></button>
    <button class="dot h-2 w-2 rounded-full bg-gray-800"></button>
    <!-- More dots -->
  </div>
</div>
```

**CSS for smooth scrolling:**

```css
.carousel-track {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.carousel-track::-webkit-scrollbar {
  display: none;
}
```

---

### Pattern 4: Grid with Category Filter

**Best For:** Multiple event types/categories
**Mobile: Filter chips with horizontal scroll**

```html
<div class="filtered-gallery">
  <!-- Category Filters -->
  <div class="filters mb-6 flex gap-3 overflow-x-auto pb-2">
    <button class="filter-btn active" data-category="all">All</button>
    <button class="filter-btn" data-category="weddings">Weddings</button>
    <button class="filter-btn" data-category="corporate">Corporate</button>
    <button class="filter-btn" data-category="private">Private Events</button>
  </div>

  <!-- Gallery Grid -->
  <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
    <div class="gallery-item" data-category="weddings">
      <img src="wedding1.jpg" alt="" class="aspect-square w-full rounded-lg object-cover" />
    </div>
    <!-- More items -->
  </div>
</div>
```

---

### Image Lazy Loading Pattern

**Critical for mobile performance**

```html
<!-- Next.js Image Component (Automatic) -->
<Image
  src="/food-image.jpg"
  alt="Description"
  width={800}
  height={600}
  loading="lazy"  <!-- Default behavior -->
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

<!-- Native HTML Lazy Loading -->
<img src="image.jpg"
     alt="Description"
     loading="lazy"
     class="w-full" />
```

**Intersection Observer (Custom Implementation):**

```javascript
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src
      img.classList.add('loaded')
      imageObserver.unobserve(img)
    }
  })
})

document.querySelectorAll('img[data-src]').forEach((img) => {
  imageObserver.observe(img)
})
```

---

## Form Design Patterns

### Pattern 1: Simple Contact Form

**Mobile Optimization:**

- Vertical layout (always stacked)
- Large input fields (min 44px height)
- Clear labels
- Inline validation
- Autocomplete attributes

```html
<form class="contact-form mx-auto max-w-lg p-6">
  <!-- Name -->
  <div class="form-group mb-4">
    <label for="name" class="mb-2 block text-sm font-medium"> Your Name * </label>
    <input
      type="text"
      id="name"
      name="name"
      required
      autocomplete="name"
      class="input-field focus:ring-saffron focus:border-saffron w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2"
    />
  </div>

  <!-- Email -->
  <div class="form-group mb-4">
    <label for="email" class="mb-2 block text-sm font-medium"> Email Address * </label>
    <input
      type="email"
      id="email"
      name="email"
      required
      autocomplete="email"
      class="input-field w-full rounded-lg border px-4 py-3"
    />
  </div>

  <!-- Phone -->
  <div class="form-group mb-4">
    <label for="phone" class="mb-2 block text-sm font-medium"> Phone Number * </label>
    <input
      type="tel"
      id="phone"
      name="phone"
      required
      autocomplete="tel"
      pattern="[0-9]{10}"
      placeholder="10-digit mobile number"
      class="input-field w-full rounded-lg border px-4 py-3"
    />
  </div>

  <!-- Message -->
  <div class="form-group mb-6">
    <label for="message" class="mb-2 block text-sm font-medium"> Message </label>
    <textarea
      id="message"
      name="message"
      rows="4"
      class="input-field w-full rounded-lg border px-4 py-3"
    ></textarea>
  </div>

  <!-- Submit -->
  <button type="submit" class="btn-primary w-full py-4 text-lg">Send Message</button>
</form>
```

**Form Best Practices:**

- 3-5 fields maximum (completion rates drop with more)
- Use proper input types (`email`, `tel`, `date`)
- Enable autocomplete for faster filling
- Show required fields clearly
- Provide inline validation (real-time feedback)
- Disable submit until valid
- Show success/error states clearly

---

### Pattern 2: Booking/Inquiry Form

**Fields Specific to Catering:**

```html
<form class="booking-form">
  <!-- Event Type -->
  <div class="form-group mb-4">
    <label class="block text-sm font-medium mb-2">Event Type *</label>
    <div class="grid grid-cols-2 gap-3">
      <label class="radio-card">
        <input type="radio" name="eventType" value="wedding" required />
        <span class="card-label">Wedding</span>
      </label>
      <label class="radio-card">
        <input type="radio" name="eventType" value="corporate" />
        <span class="card-label">Corporate</span>
      </label>
      <label class="radio-card">
        <input type="radio" name="eventType" value="private" />
        <span class="card-label">Private Party</span>
      </label>
      <label class="radio-card">
        <input type="radio" name="eventType" value="other" />
        <span class="card-label">Other</span>
      </label>
    </div>
  </div>

  <!-- Guest Count -->
  <div class="form-group mb-4">
    <label for="guestCount" class="block text-sm font-medium mb-2">
      Expected Guest Count *
    </label>
    <select id="guestCount" name="guestCount" required
            class="w-full px-4 py-3 border rounded-lg">
      <option value="">Select range</option>
      <option value="10-50">10-50 guests</option>
      <option value="51-100">51-100 guests</option>
      <option value="101-200">101-200 guests</option>
      <option value="201-500">201-500 guests</option>
      <option value="500+">500+ guests</option>
    </select>
  </div>

  <!-- Event Date -->
  <div class="form-group mb-4">
    <label for="eventDate" class="block text-sm font-medium mb-2">
      Event Date *
    </label>
    <input type="date"
           id="eventDate"
           name="eventDate"
           required
           min="2025-11-18"  <!-- Tomorrow's date -->
           class="w-full px-4 py-3 border rounded-lg" />
  </div>

  <!-- Dietary Preferences -->
  <div class="form-group mb-4">
    <label class="block text-sm font-medium mb-2">Dietary Preferences</label>
    <div class="space-y-2">
      <label class="flex items-center">
        <input type="checkbox" name="diet" value="vegetarian" class="mr-2" />
        Pure Vegetarian
      </label>
      <label class="flex items-center">
        <input type="checkbox" name="diet" value="jain" class="mr-2" />
        Jain (No onion/garlic)
      </label>
      <label class="flex items-center">
        <input type="checkbox" name="diet" value="vegan" class="mr-2" />
        Vegan Options
      </label>
    </div>
  </div>

  <button type="submit" class="btn-primary w-full py-4">
    Request Quote
  </button>
</form>
```

**Conditional Logic:**

- Show different fields based on event type
- Adjust menu options based on guest count
- Show/hide catering options based on dietary needs

---

### Pattern 3: Progressive Form (Multi-Step)

**Best For:** Complex bookings, reduce abandonment
**Mobile: One question per screen**

```html
<div class="multi-step-form">
  <!-- Progress Indicator -->
  <div class="progress-bar mb-8">
    <div class="mb-2 flex justify-between">
      <span class="step-indicator active">1. Event Details</span>
      <span class="step-indicator">2. Menu Selection</span>
      <span class="step-indicator">3. Contact Info</span>
    </div>
    <div class="h-2 rounded-full bg-gray-200">
      <div class="bg-saffron h-full rounded-full" style="width: 33%"></div>
    </div>
  </div>

  <!-- Step 1 -->
  <div class="step active" data-step="1">
    <h2 class="mb-6 text-2xl font-bold">Tell us about your event</h2>
    <!-- Event type, date, guest count -->
    <button class="btn-primary w-full" onclick="nextStep()">Continue</button>
  </div>

  <!-- Step 2 -->
  <div class="step hidden" data-step="2">
    <h2 class="mb-6 text-2xl font-bold">Select your menu</h2>
    <!-- Menu preferences -->
    <div class="flex gap-4">
      <button class="btn-secondary flex-1" onclick="prevStep()">Back</button>
      <button class="btn-primary flex-1" onclick="nextStep()">Continue</button>
    </div>
  </div>

  <!-- Step 3 -->
  <div class="step hidden" data-step="3">
    <h2 class="mb-6 text-2xl font-bold">How can we reach you?</h2>
    <!-- Contact details -->
    <button class="btn-primary w-full" type="submit">Submit Request</button>
  </div>
</div>
```

**Benefits:**

- Less overwhelming
- Higher completion rates
- Better mobile UX
- Can save progress between steps

---

### Form Validation Patterns

**Inline Validation:**

```html
<div class="form-group">
  <input type="email" id="email" class="input-field" aria-describedby="email-error" />
  <p id="email-error" class="mt-1 hidden text-sm text-red-500">
    Please enter a valid email address
  </p>
</div>
```

**Success State:**

```css
.input-field.valid {
  border-color: #10b981; /* Green */
}

.input-field.invalid {
  border-color: #ef4444; /* Red */
}
```

---

## Loading & Performance Patterns

### Pattern 1: Skeleton Screens

**Best For:** Content-heavy pages, perceived performance
**Better than:** Spinners for wait times <10 seconds

**Benefits:**

- Creates illusion of faster loading
- Shows page structure immediately
- Reduces perceived wait time
- Better UX than blank screen

**Implementation:**

```html
<!-- Skeleton for Menu Card -->
<div class="skeleton-card animate-pulse">
  <div class="aspect-[4/3] rounded-t-lg bg-gray-200"></div>
  <div class="p-4">
    <div class="mb-3 h-6 w-3/4 rounded bg-gray-200"></div>
    <div class="mb-2 h-4 w-full rounded bg-gray-200"></div>
    <div class="h-4 w-5/6 rounded bg-gray-200"></div>
    <div class="mt-4 flex justify-between">
      <div class="h-6 w-1/4 rounded bg-gray-200"></div>
      <div class="h-6 w-1/3 rounded bg-gray-200"></div>
    </div>
  </div>
</div>
```

**Tailwind Animation:**

```css
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

---

### Pattern 2: Progressive Loading

**Strategy:** Load visible content first, then below-fold

**Implementation:**

```javascript
// Load critical content immediately
async function loadCriticalContent() {
  const hero = await fetchHeroData()
  renderHero(hero)

  const featured = await fetchFeaturedItems()
  renderFeatured(featured)
}

// Load below-fold content after critical content
async function loadSecondaryContent() {
  const gallery = await fetchGallery()
  renderGallery(gallery)

  const testimonials = await fetchTestimonials()
  renderTestimonials(testimonials)
}

// Execute in order
loadCriticalContent().then(() => {
  loadSecondaryContent()
})
```

---

### Pattern 3: Image Loading States

**Blur-Up Effect (LQIP - Low Quality Image Placeholder):**

```html
<div class="image-container relative">
  <!-- Blur placeholder (tiny base64) -->
  <img
    src="data:image/jpeg;base64,/9j/4AAQ..."
    alt=""
    class="absolute inset-0 h-full w-full object-cover blur-lg"
  />

  <!-- Full resolution image -->
  <img
    src="full-image.jpg"
    alt="Biryani"
    onload="this.style.opacity=1"
    class="relative h-full w-full object-cover opacity-0 transition-opacity duration-500"
  />
</div>
```

---

### Pattern 4: Infinite Scroll vs Pagination

**Infinite Scroll:**

- **Pros:** Seamless browsing, mobile-friendly
- **Cons:** Difficult to return to position, footer inaccessible
- **Best For:** Social feeds, discovery browsing

**Pagination:**

- **Pros:** User control, SEO-friendly, footer accessible
- **Cons:** Extra clicks
- **Best For:** Search results, catalogs

**Hybrid: "Load More" Button**

```html
<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
  <!-- Initial 12 items -->
</div>

<div class="mt-8 text-center">
  <button class="btn-secondary" onclick="loadMore()">Load More Items</button>
  <p class="mt-2 text-sm text-gray-500">Showing 12 of 48</p>
</div>
```

---

## Animation & Interaction Patterns

### Micro-Interactions

**Definition:** Small, subtle animations that provide feedback

**Common Examples:**

1. Button hover/active states
2. Form input focus
3. Card hover lift
4. Icon animations
5. Toggle switches

**Button Micro-Interaction:**

```css
.btn-primary {
  transition: all 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

---

### Scroll-Triggered Animations

**Fade In on Scroll:**

```css
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```

```javascript
// Intersection Observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  },
  { threshold: 0.1 }
)

document.querySelectorAll('.fade-in').forEach((el) => {
  observer.observe(el)
})
```

---

### Mobile Menu Animations

**Slide-In Drawer:**

```css
.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  height: 100vh;
  background: white;
  transform: translateX(100%);
  transition: transform 250ms ease-out;
  z-index: 100;
}

.mobile-menu.open {
  transform: translateX(0);
}

/* Backdrop */
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  pointer-events: none;
  transition: opacity 250ms ease;
  z-index: 99;
}

.backdrop.visible {
  opacity: 1;
  pointer-events: auto;
}
```

**Performance Note:**

- Use `transform` and `opacity` for animations (GPU-accelerated)
- Avoid animating `width`, `height`, `left`, `top` (causes reflow)

---

### Toast Notification Pattern

**Success Toast:**

```html
<div
  class="toast toast-success fixed top-4 right-4 translate-x-[400px] transform rounded-lg bg-green-500 px-6 py-4 text-white shadow-lg transition-transform"
>
  <div class="flex items-center gap-3">
    <svg class="h-6 w-6"><!-- checkmark icon --></svg>
    <p class="font-medium">Booking request sent successfully!</p>
  </div>
</div>
```

**Error Toast:**

```html
<div
  class="toast toast-error fixed top-4 right-4 rounded-lg bg-red-500 px-6 py-4 text-white shadow-lg"
>
  <div class="flex items-center gap-3">
    <svg class="h-6 w-6"><!-- error icon --></svg>
    <p class="font-medium">Please fill in all required fields</p>
  </div>
</div>
```

**JavaScript:**

```javascript
function showToast(message, type = 'success') {
  const toast = document.createElement('div')
  toast.className = `toast toast-${type} ...classes`
  toast.textContent = message
  document.body.appendChild(toast)

  // Show
  setTimeout(() => toast.classList.add('show'), 100)

  // Hide after 3s
  setTimeout(() => {
    toast.classList.remove('show')
    setTimeout(() => toast.remove(), 300)
  }, 3000)
}
```

---

## Trust Signals & Social Proof

### Pattern 1: Testimonial Carousel

**Mobile-Optimized:**

```html
<section class="testimonials bg-gray-50 py-12">
  <div class="container mx-auto px-4">
    <h2 class="mb-8 text-center text-3xl font-bold">What Our Clients Say</h2>

    <div class="testimonial-slider flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
      <div
        class="testimonial-card min-w-[300px] snap-start rounded-lg bg-white p-6 shadow-md md:min-w-[400px]"
      >
        <div class="mb-4 flex items-center gap-4">
          <img src="client1.jpg" alt="Client" class="h-12 w-12 rounded-full" />
          <div>
            <h4 class="font-bold">Priya Sharma</h4>
            <div class="text-yellow-500">★★★★★</div>
          </div>
        </div>
        <p class="text-gray-600">
          "Absolutely fantastic catering for our wedding! The dal makhani was to die for..."
        </p>
      </div>
      <!-- More testimonials -->
    </div>
  </div>
</section>
```

---

### Pattern 2: Stats Counter

**Show impressive numbers:**

```html
<section class="stats py-12">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
      <div class="stat">
        <div class="text-saffron mb-2 text-4xl font-bold md:text-5xl">500+</div>
        <div class="text-gray-600">Events Catered</div>
      </div>
      <div class="stat">
        <div class="text-saffron mb-2 text-4xl font-bold md:text-5xl">50K+</div>
        <div class="text-gray-600">Happy Guests</div>
      </div>
      <div class="stat">
        <div class="text-saffron mb-2 text-4xl font-bold md:text-5xl">15+</div>
        <div class="text-gray-600">Years Experience</div>
      </div>
      <div class="stat">
        <div class="text-saffron mb-2 text-4xl font-bold md:text-5xl">4.9/5</div>
        <div class="text-gray-600">Average Rating</div>
      </div>
    </div>
  </div>
</section>
```

---

### Pattern 3: Badges & Certifications

```html
<div class="badges flex flex-wrap justify-center gap-4">
  <div class="badge flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow">
    <svg class="h-6 w-6 text-green-500"><!-- verified icon --></svg>
    <span class="text-sm font-medium">FSSAI Certified</span>
  </div>
  <div class="badge flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow">
    <svg class="h-6 w-6 text-blue-500"><!-- award icon --></svg>
    <span class="text-sm font-medium">Best Caterer 2024</span>
  </div>
</div>
```

---

## Accessibility Patterns

### WCAG 2.1 AA Compliance

**Key Requirements:**

1. **Color Contrast**
   - Normal text: 4.5:1 minimum
   - Large text (18pt+): 3:1 minimum
   - Graphics/UI components: 3:1 minimum

2. **Touch Targets**
   - Minimum 44x44 pixels (iOS)
   - Minimum 48x48 pixels (Android)
   - Adequate spacing (8px minimum)

3. **Keyboard Navigation**
   - All interactive elements accessible via Tab key
   - Clear focus indicators
   - Skip to main content link
   - Logical tab order

4. **Screen Reader Support**
   - Semantic HTML (`<nav>`, `<main>`, `<article>`)
   - ARIA labels where needed
   - Alt text for all images
   - Form labels properly associated

---

### Screen Reader-Friendly Navigation

```html
<nav role="navigation" aria-label="Main Navigation">
  <ul>
    <li><a href="#home">Home</a></li>
    <li><a href="#services">Services</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>

<!-- Skip to main content -->
<a href="#main-content" class="skip-link sr-only focus:not-sr-only"> Skip to main content </a>

<main id="main-content" role="main">
  <!-- Page content -->
</main>
```

**Screen Reader Only Class:**

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.sr-only.focus:not-sr-only {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

---

### Accessible Forms

```html
<form>
  <div class="form-group">
    <!-- Properly associated label -->
    <label for="email" class="mb-2 block">
      Email Address <span class="text-red-500" aria-label="required">*</span>
    </label>
    <input
      type="email"
      id="email"
      name="email"
      required
      aria-required="true"
      aria-describedby="email-help email-error"
      class="input-field"
    />

    <!-- Help text -->
    <p id="email-help" class="mt-1 text-sm text-gray-500">We'll never share your email</p>

    <!-- Error message (hidden by default) -->
    <p id="email-error" class="mt-1 hidden text-sm text-red-500" role="alert">
      Please enter a valid email address
    </p>
  </div>
</form>
```

---

### Focus Management

```css
/* Remove default outline, add custom */
*:focus {
  outline: none;
}

/* Visible focus indicator */
*:focus-visible {
  outline: 2px solid #ff9933; /* Saffron */
  outline-offset: 2px;
}

/* For links */
a:focus-visible {
  outline: 2px solid #ff9933;
  outline-offset: 4px;
}

/* For buttons */
button:focus-visible {
  box-shadow: 0 0 0 3px rgba(255, 153, 51, 0.3);
}
```

---

## Component Library Recommendations

### Tailwind CSS Templates for Restaurants

**Free Options:**

1. **TailFood**
   - Minimal design, fast loading
   - Sections: Menu, About, Gallery, Order
   - Fully responsive
   - Tailwind CSS 3.x

2. **Foodies (TUK.dev)**
   - Fully responsive, retina ready
   - Cross-browser tested
   - WCAG accessibility compliant
   - Customizable

3. **Bistro Tailwind**
   - Simple restaurant template
   - Clean design
   - Mobile-optimized

**Premium Options:**

1. **Swigo by DexignZone**
   - Modern, stylish
   - Perfect for fast food, burger restaurants, pizzerias, cafes
   - Menu displays, reservation systems
   - $30-50

2. **Zenka by Pagedone**
   - Contemporary design
   - Tailored for restaurants, cafes, bistros
   - Captivating visuals
   - Figma + Tailwind CSS

3. **DINE Template**
   - Personalize fonts, colors, layouts, animations
   - Professional, attractive online presence
   - Full Tailwind customization

---

### React Component Libraries

**shadcn/ui** (Recommended)

- Copy-paste components
- Built with Radix UI + Tailwind
- Highly customizable
- Accessible by default
- No package to install

**Headless UI** (by Tailwind Labs)

- Unstyled, accessible components
- Perfect for custom designs
- Menu, Dialog, Disclosure, etc.

**Radix UI**

- Low-level UI primitives
- Fully accessible
- Unstyled (bring your own styles)

---

### UI Component Needs for Catering Site

**Essential Components:**

- [ ] Navigation (Drawer, Tab Bar)
- [ ] Hero Section (variants)
- [ ] Card (Menu items, Services)
- [ ] Button (Primary, Secondary, variants)
- [ ] Form (Input, Select, Textarea, Checkbox, Radio)
- [ ] Modal/Dialog
- [ ] Carousel/Slider
- [ ] Tabs
- [ ] Accordion
- [ ] Toast/Notification
- [ ] Loading Spinner/Skeleton
- [ ] Image Gallery + Lightbox
- [ ] Testimonial Card
- [ ] Pricing Table
- [ ] Footer

---

## Footer Design Patterns

### Pattern 1: Comprehensive Footer

**Mobile: Stacked sections, Desktop: Multi-column**

```html
<footer class="bg-gray-900 py-12 text-white">
  <div class="container mx-auto px-4">
    <!-- Desktop: 4 columns, Mobile: Stacked -->
    <div class="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      <!-- Column 1: About -->
      <div>
        <h3 class="mb-4 text-xl font-bold">Adaehandi</h3>
        <p class="mb-4 text-sm text-gray-400">
          Premium North Indian catering for weddings, corporate events, and private celebrations in
          Delhi NCR.
        </p>
        <div class="flex gap-3">
          <a href="#" aria-label="Facebook" class="social-icon">
            <svg class="h-6 w-6"><!-- FB icon --></svg>
          </a>
          <a href="#" aria-label="Instagram" class="social-icon">
            <svg class="h-6 w-6"><!-- IG icon --></svg>
          </a>
          <a href="#" aria-label="YouTube" class="social-icon">
            <svg class="h-6 w-6"><!-- YT icon --></svg>
          </a>
        </div>
      </div>

      <!-- Column 2: Quick Links -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Quick Links</h3>
        <ul class="space-y-2 text-sm text-gray-400">
          <li><a href="#about" class="hover:text-white">About Us</a></li>
          <li><a href="#services" class="hover:text-white">Services</a></li>
          <li><a href="#menu" class="hover:text-white">Menu</a></li>
          <li><a href="#gallery" class="hover:text-white">Gallery</a></li>
          <li><a href="#contact" class="hover:text-white">Contact</a></li>
        </ul>
      </div>

      <!-- Column 3: Contact -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Contact Us</h3>
        <ul class="space-y-3 text-sm text-gray-400">
          <li class="flex items-start gap-2">
            <svg class="mt-0.5 h-5 w-5"><!-- location icon --></svg>
            <span>123 Main Street<br />New Delhi 110001</span>
          </li>
          <li class="flex items-center gap-2">
            <svg class="h-5 w-5"><!-- phone icon --></svg>
            <a href="tel:+91XXXXXXXXXX" class="hover:text-white">+91 XXXX-XXXXXX</a>
          </li>
          <li class="flex items-center gap-2">
            <svg class="h-5 w-5"><!-- email icon --></svg>
            <a href="mailto:info@adaehandi.com" class="hover:text-white">info@adaehandi.com</a>
          </li>
          <li class="flex items-center gap-2">
            <svg class="h-5 w-5"><!-- whatsapp icon --></svg>
            <a href="https://wa.me/91XXXXXXXXXX" class="hover:text-white">WhatsApp Us</a>
          </li>
        </ul>
      </div>

      <!-- Column 4: Newsletter -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Stay Updated</h3>
        <p class="mb-4 text-sm text-gray-400">
          Get special offers and event tips delivered to your inbox.
        </p>
        <form class="flex flex-col gap-2">
          <input
            type="email"
            placeholder="Your email"
            class="focus:border-saffron rounded border border-gray-700 bg-gray-800 px-4 py-2 text-white"
          />
          <button type="submit" class="btn-primary py-2">Subscribe</button>
        </form>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div
      class="flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-6 text-sm text-gray-400 md:flex-row"
    >
      <p>&copy; 2025 Adaehandi. All rights reserved.</p>
      <div class="flex gap-6">
        <a href="#privacy" class="hover:text-white">Privacy Policy</a>
        <a href="#terms" class="hover:text-white">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>
```

---

### Pattern 2: Minimal Footer

**Best For:** Clean, simple sites\*\*

```html
<footer class="border-t bg-white py-8">
  <div class="container mx-auto px-4">
    <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
      <p class="text-sm text-gray-600">&copy; 2025 Adaehandi. Premium North Indian Catering.</p>
      <div class="flex gap-6">
        <a href="#" class="hover:text-saffron text-gray-600">Facebook</a>
        <a href="#" class="hover:text-saffron text-gray-600">Instagram</a>
        <a href="#" class="hover:text-saffron text-gray-600">Contact</a>
      </div>
    </div>
  </div>
</footer>
```

---

## Mobile Optimization Checklist

### Performance

- [ ] Images optimized (WebP/AVIF, compressed)
- [ ] Lazy loading implemented
- [ ] Critical CSS inlined
- [ ] JavaScript bundle minimized
- [ ] HTTP/2 or HTTP/3 enabled
- [ ] CDN for static assets
- [ ] Gzip/Brotli compression
- [ ] Remove unused CSS/JS
- [ ] Preload critical resources
- [ ] Target <3s load time on 4G

### Design

- [ ] Mobile-first approach used
- [ ] Touch targets min 44x44px
- [ ] Adequate spacing between targets (8px+)
- [ ] Thumb-zone optimized layout
- [ ] Readable font sizes (16px+ body text)
- [ ] High contrast text (4.5:1 minimum)
- [ ] No horizontal scrolling
- [ ] Content fits viewport width
- [ ] Hamburger menu or tab bar
- [ ] Large, tappable CTAs

### UX

- [ ] Forms optimized for mobile
- [ ] Input types correct (tel, email, date)
- [ ] Autocomplete enabled
- [ ] Inline validation provided
- [ ] Loading states shown
- [ ] Error messages clear
- [ ] Success confirmation visible
- [ ] Skeleton screens for loading
- [ ] Smooth animations (60fps)
- [ ] Swipe gestures work

### Accessibility

- [ ] Semantic HTML used
- [ ] ARIA labels where needed
- [ ] Alt text on all images
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader tested
- [ ] Color not sole indicator
- [ ] Skip to main content link
- [ ] Form labels properly associated
- [ ] WCAG AA compliant

### Content

- [ ] Hero section optimized
- [ ] Above-fold CTA present
- [ ] Menu readable on mobile
- [ ] Gallery works on mobile
- [ ] Videos have mobile fallback
- [ ] Contact info easily accessible
- [ ] Click-to-call buttons
- [ ] WhatsApp integration (India)
- [ ] Maps embedded and responsive
- [ ] Social sharing works

### Testing

- [ ] Tested on iPhone Safari
- [ ] Tested on Android Chrome
- [ ] Tested on various screen sizes
- [ ] Tested on 3G/4G speeds
- [ ] Lighthouse score 90+
- [ ] Core Web Vitals green
- [ ] Cross-browser tested
- [ ] Real device testing done
- [ ] User testing conducted
- [ ] Analytics tracking verified

---

## Additional Best Practices

### Dark Mode Toggle

```html
<button class="theme-toggle" aria-label="Toggle dark mode">
  <svg class="sun-icon hidden dark:block"><!-- sun --></svg>
  <svg class="moon-icon block dark:hidden"><!-- moon --></svg>
</button>
```

```javascript
// Check system preference or localStorage
const theme =
  localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

document.documentElement.classList.toggle('dark', theme === 'dark')

// Toggle function
function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark')
  localStorage.setItem('theme', isDark ? 'dark' : 'light')
}
```

---

### Breadcrumbs Navigation

**SEO & UX Benefits:**

```html
<nav aria-label="Breadcrumb" class="mb-6">
  <ol class="flex items-center gap-2 text-sm text-gray-600">
    <li><a href="/" class="hover:text-saffron">Home</a></li>
    <li>
      <svg class="h-4 w-4"><!-- chevron --></svg>
    </li>
    <li><a href="/services" class="hover:text-saffron">Services</a></li>
    <li>
      <svg class="h-4 w-4"><!-- chevron --></svg>
    </li>
    <li aria-current="page" class="font-medium text-gray-900">Wedding Packages</li>
  </ol>
</nav>
```

---

### Search with Autocomplete

```html
<div class="search-wrapper relative">
  <input
    type="search"
    id="menuSearch"
    placeholder="Search menu items..."
    autocomplete="off"
    class="w-full rounded-lg border px-4 py-3 pr-10"
  />

  <div
    class="autocomplete-results absolute mt-1 hidden w-full rounded-lg border bg-white shadow-lg"
  >
    <!-- Results populated via JS -->
  </div>
</div>
```

---

## Conclusion

This guide provides comprehensive patterns for building a modern, mobile-optimized premium catering website. Key takeaways:

**Mobile-First is Essential:**

- 60-70% of traffic is mobile
- Design for smallest screen first
- Progressive enhancement for larger screens

**Performance Matters:**

- <3s load time target
- Optimize images aggressively
- Use lazy loading extensively
- Minimize JavaScript

**User Experience:**

- Touch-friendly (44px+ targets)
- Clear visual hierarchy
- Instant feedback
- Seamless interactions

**Accessibility:**

- WCAG AA minimum
- Screen reader support
- Keyboard navigation
- High contrast

**Trust & Conversion:**

- Social proof visible
- Clear CTAs
- Simple forms
- Professional design

---

_Document created: 2025-11-17_
_Focus: Mobile-First Design Patterns_
_Target: Premium Catering Website_
_Version: 1.0_
