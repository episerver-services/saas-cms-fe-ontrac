# 📊 Project Status: OnTrac SaaS CMS FE Template

This file tracks the current implementation progress of the custom frontend template for the Optimizely SaaS CMS project.

✅ = Complete  
🔄 = In Progress  
🔲 = Not Started
❌ = Not in current scope

_Last updated: 01 September 2025_

---

## 🧱 Phase 1: Project Setup & Infrastructure

| Task                                 | Status | Notes                                              |
| ------------------------------------ | ------ | -------------------------------------------------- |
| **Project scaffold & folder layout** | ✅     | App Router, `/app`, `/lib`, etc. all in place      |
| **Environment config (.env setup)**  | 🔄     | `.env.local` expected by codegen + Docker          |
| **TypeScript + ESLint config**       | ✅     | `tsconfig.json`, `eslint.config.ts` are valid      |
| **GitHub CI/CD pipelines**           | ✅     | `ci-cd.yaml` handles lint, build, test via Actions |
| **Commit linting / Husky hooks**     | ✅     | `.husky/pre-commit` present with `lint-staged`     |

---

## 📦 Phase 2: CMS Integration (Headless Foundation)

| Task                               | Status | Notes                                                       |
| ---------------------------------- | ------ | ----------------------------------------------------------- |
| GraphQL API connection             | 🔲     | Optimizely CMS disconnected — integration pending           |
| SDK setup with graphql-codegen     | 🔲     | graphql-codegen removed; no generated SDK in use            |
| Content ID config (home, layout)   | 🔲     | CMS-driven layout/homepage config removed                   |
| Preview mode support (draft route) | 🔲     | Draft mode routes and API removed; not active in this build |
| Fallback & error handling          | ✅     | `not-found.tsx` still handles unresolved routes cleanly     |

---

## 🧱 Phase 3: Core Rendering Logic

| Task                                 | Status | Notes                                                                |
| ------------------------------------ | ------ | -------------------------------------------------------------------- |
| Page routing (`[locale]/[slug]`)     | ✅     | Catch-all route remains implemented                                  |
| Catch-all content renderer           | 🔲     | Content renderer stripped back; CMS not currently connected          |
| Component factory mapper             | 🔲     | Factory logic removed; static fallback block only in use             |
| Slot renderer for named areas        | 🔲     | No slot rendering — layout rendering removed with CMS disconnect     |
| ID resolution (inline/shared blocks) | 🔲     | No Visual Builder or GraphQL runtime guards present                  |
| Rich text and media component base   | 🔲     | CMS-driven block components removed; only static placeholders remain |

---

## 🌐 Phase 4: Performance & Delivery

| Task                           | Status | Notes                                                                              |
| ------------------------------ | ------ | ---------------------------------------------------------------------------------- |
| Rendering model enforcement    | 🔲     | ISR not currently configured; no CMS-connected content or revalidation setup       |
| CDN-based image transformation | 🔄     | Next.js image config present, but image usage minimal; CDN optimisation unverified |
| Core Web Vitals planning       | 🔄     | Some layout choices hint at performance planning; full Vitals strategy not applied |

---

## 🛡️ Phase 5: Accessibility, SEO & Metadata

| Task                       | Status | Notes                                                               |
| -------------------------- | ------ | ------------------------------------------------------------------- |
| Metadata from CMS          | 🔲     | CMS metadata integration removed; future layout-aware SEO TBD       |
| Accessibility baseline     | 🔄     | Placeholder structure OK; no ARIA or WCAG validation yet            |
| Skip links, ARIA audit     | ✅     | Skip link implemented in `layout.tsx`; other checks not yet applied |
| robots.txt / sitemap setup | ❌     | No sitemap or robots.txt routes in current codebase                 |
| Core Web Vitals reporting  | 🔲     | `VitalsInit` placeholder exists; actual CWV logging logic removed   |

---

## 🧪 Phase 6: Unit & E2E Test Frameworks

| Task                          | Status | Notes                                                                       |
| ----------------------------- | ------ | --------------------------------------------------------------------------- |
| Jest unit test setup          | ✅     | Jest + RTL config present; minimal test coverage so far                     |
| RTL + jest-dom assertions     | ✅     | Matchers like `toBeInTheDocument` available via `@testing-library/jest-dom` |
| Component unit test coverage  | 🔄     | Starter tests in place (e.g. `ContentAreaMapper`); most components untested |
| E2E/Browsers tests (optional) | 🔲     | Playwright not yet present; E2E testing deferred until CMS integration      |

---

## 🧱 Phase 7: Visual Builder

| Task                                 | Status | Notes                                                                |
| ------------------------------------ | ------ | -------------------------------------------------------------------- |
| Visual Builder support planned       | ✅     | VB now in scope — core infrastructure and preview mode supported     |
| Experience content query (GraphQL)   | ✅     | `_Experience` and preview mode supported via VisualBuilder route     |
| Visual block component compatibility | 🔄     | Component mapping in progress; partial support for dynamic rendering |
| Layout awareness and slot mapping    | 🔄     | Layout-aware rendering started; slot renderer partially implemented  |
| Safe guards for Experience types     | ✅     | `SafeVisualBuilderExperience` types and guards fully implemented     |

## 📁 Phase 8: Docs & Developer Experience

| Task                    | Status | Notes                                              |
| ----------------------- | ------ | -------------------------------------------------- |
| Markdown documentation  | ✅     | All internal guides in `/docs` or README           |
| Code comments + JSDoc   | ✅     | Function-level JSDoc added throughout key files    |
| Dev commands (scripts)  | ✅     | Clean, test, build, preview all covered via `pnpm` |
| DX setup (editorconfig) | ✅     | Formatting and linting enforced across team setups |
