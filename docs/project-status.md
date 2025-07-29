# 📊 Project Status: Optimizely SaaS CMS FE Template

This file tracks the current implementation progress of the custom frontend template for the Optimizely SaaS CMS project.

✅ = Complete  
🔄 = In Progress  
🔲 = Not Started

_Last updated: 29 July 2025_

---

## 🧱 Phase 1: Project Setup & Infrastructure

| Task                             | Status | Notes                                        |
| -------------------------------- | ------ | -------------------------------------------- |
| Project scaffold & folder layout | ✅     | Uses App Router + `/app` layout              |
| Environment config (.env setup)  | ✅     | `.env.local` found; Docker-ready             |
| TypeScript + ESLint config       | ✅     | `tsconfig.json`, `eslint.config.ts` in place |
| GitHub CI/CD pipelines           | ✅     | `.github/` workflows present                 |
| Commit linting / Husky hooks     | ✅     | `.husky/pre-commit` set up with lint-staged  |

---

## 📦 Phase 2: CMS Integration (Headless Foundation)

| Task                               | Status | Notes                                                |
| ---------------------------------- | ------ | ---------------------------------------------------- |
| GraphQL API connection             | ✅     | ENV-based bearer token wiring complete               |
| SDK setup with graphql-codegen     | ✅     | Codegen present in `codegen.ts` and `lib/optimizely` |
| Content ID config (home, layout)   | ✅     | ENV vars support root layout/content                 |
| Preview mode support (draft route) | ✅     | All preview routes (including draft mode API) exist  |
| Fallback & error handling          | ✅     | not-found.tsx refactored, build passes cleanly       |

---

## 🧱 Phase 3: Core Rendering Logic

| Task                                 | Status | Notes                                                               |
| ------------------------------------ | ------ | ------------------------------------------------------------------- |
| Page routing (`[locale]/[slug]`)     | ✅     | Implemented via catch-all dynamic route                             |
| Catch-all content renderer           | ✅     | Working via shared layout/content rendering                         |
| Component factory mapper             | ✅     | Uses `__typename` switcher                                          |
| Slot renderer for named areas        | ✅     | Base implementation working; nested slots now supported recursively |
| ID resolution (inline/shared blocks) | ✅     | Visual Builder runtime shape guard added; next: nested slot support |
| Rich text and media component base   | ✅     | CTA, Text, Image components supported                               |

---

## 🌐 Phase 4: Performance & Delivery

| Task                           | Status | Notes                                                                                  |
| ------------------------------ | ------ | -------------------------------------------------------------------------------------- |
| Rendering model enforcement    | ✅     | ISR + webhook-based revalidation working                                               |
| CDN-based image transformation | ✅     | Global Next.js image loader handles both Cloudinary and Optimizely URLs                |
| Core Web Vitals planning       | ✅     | Images audited and optimised (priority, sizes, unoptimized); layout CLS fixes in place |

---

## 🛡️ Phase 5: Accessibility, SEO & Metadata

| Task                       | Status | Notes                                                          |
| -------------------------- | ------ | -------------------------------------------------------------- |
| Metadata from CMS          | ✅     | Pulled from CMSPage or SEOExperience via generateMetadata.     |
| Accessibility baseline     | 🔄     | aria-expanded, aria-hidden, and skip links logic in progress.  |
| Skip links, ARIA audit     | 🔄     | Skip link is present in layout; full audit work still ongoing. |
| robots.txt / sitemap setup | ✅     | `sitemap.xml` route complete, robust, and tested.              |
| Core Web Vitals reporting. | ✅     | VitalsInit logs CWV in `layout.tsx`; dev-only for now.         |

---

## 🧪 Phase 6: Unit & E2E Test Frameworks

| Task                          | Status | Notes                                                           |
| ----------------------------- | ------ | --------------------------------------------------------------- |
| Jest unit test setup          | ✅     | Config added, runs with JSDOM + RTL                             |
| RTL + jest-dom assertions     | ✅     | `toBeInTheDocument` and other matchers working                  |
| Component unit test coverage  | ✅     | `ContentAreaMapper` tested (blocks + recursion); more to follow |
| E2E/Browsers tests (optional) | ✅     | Playwright installed; homepage test running and passing         |

---

## 📁 Phase 8: Docs & Developer Experience

| Task                    | Status | Notes                                              |
| ----------------------- | ------ | -------------------------------------------------- |
| Markdown documentation  | ✅     | All internal guides in `/docs` or README           |
| Code comments + JSDoc   | ✅     | Function-level JSDoc added throughout key files    |
| Dev commands (scripts)  | ✅     | Clean, test, build, preview all covered via `pnpm` |
| DX setup (editorconfig) | ✅     | Formatting and linting enforced across team setups |

---

## ⏱️ Estimated Remaining Workload

| Phase | Remaining Tasks                        | Complexity | Notes                                                        |
| ----- | -------------------------------------- | ---------- | ------------------------------------------------------------ |
| 7     | Visual Builder scaffolding (optional)  | Medium     | If next client uses VB, implement `ExperienceRenderer`       |
| 3     | Fallback UI for invalid VB composition | Low        | Already logged as handled in `FallbackErrorUI`, test pending |
