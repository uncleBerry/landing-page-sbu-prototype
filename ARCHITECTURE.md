# Modern Landing Page Architecture (Next.js 15 + Sanity CMS + GSAP)

This document establishes the enterprise-level, performance-first architecture foundation for an App Router-based landing page. It separates content management, design elements, interactions, validation, and analytics into independent modular directories.

---

## 1. Directory Structure Blueprint

Below is the complete, scalable directory layout for the Next.js 15 project:

```text
├── .env.example                # Structured Environment secrets example
├── next.config.ts              # Next.js configuration (optimizations, image domains)
├── tailwind.config.ts          # Tailwind config with Design Tokens (colors, spacing, typography)
├── tsconfig.json               # Path aliases configuration (@/*)
├── package.json                # Project dependencies and script tasks
│
├── app/                        # Next.js 15 App Router Entry point
│   ├── layout.tsx              # Root HTML wrapper: applies fonts, tracking, smooth scroll
│   ├── page.tsx                # Main dynamic server-side entry for Landing Page
│   ├── providers.tsx           # Global Client Contexts (Framer Motion settings, analytics, GSAP client-side registers)
│   ├── sitemap.ts              # Dynamic SEO sitemap mapping from Sanity API
│   ├── robots.ts               # Dynamic bot guidelines
│   ├── (routes)/               # Optional route groups for additional subpages (e.g. Terms, Privacy)
│   └── api/                    # Server-side API endpoints
│       ├── draft-mode/         # Enables/disables live preview mode securely
│       │   ├── enable/route.ts
│       │   └── disable/route.ts
│       └── contact/            # Secure endpoint supporting React Hook Form + Zod backend validation
│           └── route.ts
│
├── components/                 # Atomic UI Blocks
│   ├── common/                 # Base visual components (Design System core elements)
│   │   ├── button.tsx          # Multi-variant button component
│   │   ├── container.tsx       # Standard width boundaries (max-w-7xl)
│   │   ├── image-optimized.tsx # Wrapper around next/image for optimized layout shifting
│   │   └── typography.tsx      # Standardized heading & body elements
│   ├── sections/               # Sections constructed via Sanity Block Builder
│   │   ├── hero.tsx            # Animated high-impact header
│   │   ├── features.tsx        # Interactive bento grid or column features
│   │   ├── social-proof.tsx    # Testimonial sliders or logo trust bars
│   │   └── footer.tsx          # Structured bottom menus & links
│   ├── animations/             # Complex GSAP/Framer Motion wrapper logic
│   │   ├── smooth-scroll.tsx   # Lenis/GSAP-based smooth scrolling initialization
│   │   ├── fade-in.tsx         # Framer motion entry animation controller
│   │   └── magnetic-button.tsx # Interactive button trigger using GSAP physics
│   └── forms/                  # Conversional elements
│       └── landing-form.tsx    # High-conversion signup/contact form (React Hook Form + Zod)
│
├── sanity/                     # Sanity CMS Core Integration
│   ├── env.ts                  # Safe schema environment variable parsers
│   ├── client.ts               # Configured client (with automatic caching and fresh preview toggles)
│   ├── image.ts                # Sanity image-url asset-builder integration
│   ├── live.ts                 # Sanity Live visual editing configuration
│   └── schemaTypes/            # Content schemas & types
│       ├── index.ts            # Schema bundle resolver
│       ├── documents/          # Document objects (e.g. page, systemPreferences, testimonial)
│       │   ├── page.ts
│       │   └── seo.ts
│       └── objects/            # Modular blocks (e.g. heroBlock, featureBlock, textBlock)
│           ├── heroBlock.ts
│           └── portableText.ts
│
├── lib/                        # Pure Code utilities & helper adapters
│   ├── analytics.ts            # Abstract event-trackers (Vercel Analytics, GA, Metapixel)
│   ├── utils.ts                # Tailwind merge (cn) class utility
│   ├── validation.ts           # Centralized Zod verification structures
│   └── gsap-setup.ts           # Client-side GSAP and ScrollTrigger plugin declarations
```

---

## 2. Structural & Architectural Explanations

### A. Next.js 15 Performance-First Architecture
*   **React Server Components (RSC) by Default**: All sections (`Hero`, `Features`, `Testimonials`) render on the server, ensuring rapid First Contentful Paint (FCP) and superb SEO crawling capabilities.
*   **Partial Prerendering (PPR)**: Dynamic blocks (such as personal-country geo-offers or active user stats counters) are wrapped inside Suspense, allowing instantaneous static shells to serve while the dynamic API payload streams safely.
*   **Interactions Isolation**: Interactive sub-components (such as contact forms, image galleries, and mouse tracers) toggle `"use client"` selectively at the lowest level of the DOM tree rather than making whole pages client-rendered.

### B. Scalable Sanity CMS Strategy
*   **Modular Page Builder Pattern**: The schema defines a flexible `page` document featuring a block-builder array enabling administrators to dynamically reorder (`Hero`, `ImageGrid`, `TestimonialSection`, `FAQ`) natively.
*   **Visual Editing (Draft Mode)**: Utilizes Next.js `draft-mode` combined with Sanity Client Live Preview to allow administrators to see content and layout updates in real-time within the local edit sidebar window.

### C. Combined Animation Architecture (GSAP & Framer Motion)
*   **Framer Motion (Micro-Interactions)**: Perfect for basic declarative layout animations, hover states, fade-ins, and button clicks due to its lightweight interface and tight React component binding.
*   **GSAP + Lenis (Immersive Scrolling & Physics)**: Optimal for timeline scrubbing animations, ScrollTrigger triggers, smooth inertia mouse scroll override, and complex physics layouts. 
*   **Single Layout Hook**: Registered inside `app/providers.tsx` to prevent redundant instances of `ScrollTrigger` or duplication of animation frame loops.

### D. Conversion Elements (Form & Validation)
*   **React Hook Form (RMC) with Zod Resolver**: Prevents wasteful React re-renders by tracking form inputs without global state hooks.
*   **Unified Validation Contract**: Zod schemas are defined in `/lib/validation.ts` and shared between the Client-side Form and Server-side API endpoint `/app/api/contact/route.ts` to block invalid or malicious data.

---

## 3. Best Practices Rules & Guidelines

### Naming Conventions
1.  **React Components**: Always PascalCase (e.g., `MagneticButton.tsx`).
2.  **Helper Files**: always camelCase (e.g., `gsapSetup.ts`, `validation.ts`).
3.  **App router folders**: lowercase, kebab-case (e.g., `/api/draft-mode/`).
4.  **Tailwind Theme Extension**: Always use kebab-case inside `tailwind.config.ts` or standard CSS variables mapping back to functional names.

### Image Optimization Strategy
*   Use `next/image` with responsive custom resolutions (`sizes="(max-width: 768px) 100vw, 50vw"`) to serve optimized `.webp`/`.avif` shapes.
*   Define `placeholder="blur"` mapping to Sanity's `.lqip` (low-quality image placeholder) to eliminate abrupt layout shifting.

### SEO-Ready Metadata Architecture
*   Leverage Next.js static metadata generators `generateMetadata()` at the page level. This allows fetching custom keywords, social preview visuals (OpenGraph), and specific alt parameters instantly from the Sanity document.

---

## 4. Recommended Package Installations

Install these packages to set up the core framework:

```bash
# Core Utilities & UI Engines
npm install clsx tailwind-merge lucide-react

# Animations & Motion Engines
npm install gsap @studio-freight/lenis framer-motion

# Forms & Validation
npm install react-hook-form @hookform/resolvers zod

# Sanity CMS Client Integration
npm install @sanity/client @sanity/image-url next-sanity
```
