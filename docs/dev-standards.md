# 🧑‍💻 Developer Standards

This document defines conventions and expectations for contributors working on the client FE repository. These standards help ensure a consistent, maintainable, and accessible codebase.

_Last updated: 29 July 2025_

---

## 📁 Folder Structure

- `app/`: Next.js App Router layout, dynamic routes, and shared components
- `lib/`: Custom utilities and Optimizely SDK logic
- `features/`: BDD feature files (Gherkin format)
- `e2e/`: Playwright E2E tests
- `public/`: Static assets
- `docs/`: Project documentation

---

## 🧼 Code Style & Formatting

- TypeScript is required — no plain `.js` files in the main app
- Format code using **Prettier** (`.prettierrc` respected)
- Run `pnpm lint` before committing
- Use named imports and avoid default exports where possible
- Group imports: external → internal → styles/assets

Example:

```ts
import { useEffect } from 'react'
import { getPageByURL } from '@/lib/optimizely/fetch'
import styles from './example.module.css'
```

---

## 📘 Documentation Standards

### JSDoc Usage

- All functions, components, and modules **must** be annotated with JSDoc comments.
- Required tags include:
  - `@param` – for all function arguments
  - `@returns` – for return values (or `void`)
  - `@throws` – for known error conditions (optional but encouraged)
- Use `/** ... */` block format at the function or export level.
- Keep descriptions clear, concise, and meaningful for both internal and public-facing modules.

### Example:

```ts
/**
 * Calculates VAT-inclusive price.
 *
 * @param price - The base price
 * @param vat - VAT percentage
 * @returns The final price including VAT
 */
function calculatePrice(price: number, vat: number): number {
  return price + price * (vat / 100)
}
```

---

## 📘 Naming Conventions

- Components: `PascalCase` → `HeroBlock.tsx`, `ContentAreaMapper.tsx`
- Variables: `camelCase` → `pageData`, `isDraftMode`
- Constants: `UPPER_SNAKE_CASE` → `IS_BUILD`
- Filenames: Match component name → `content-area-mapper.test.tsx` for `ContentAreaMapper.tsx`

---

## 🔐 Environment Variables

All runtime configuration is via `.env.*` files. Key variables include:

- `OPTIMIZELY_BEARER_TOKEN`
- `OPTIMIZELY_CONTENT_ID`
- `SITE_DOMAIN`

Use `dotenv-cli` for running in dev with custom environment configs (see `pnpm dev:*` scripts).

---

## 🧪 Testing Strategy

| Type | Tool               | Folder           |
| ---- | ------------------ | ---------------- |
| Unit | Jest + RTL         | `app/__tests__/` |
| BDD  | Cucumber + Gherkin | `features/`      |
| E2E  | Playwright         | `e2e/`           |

Tests should cover:

- All block components and slot rendering logic (including nested/recursive slots)
- Error boundaries and fallbacks
- Home and layout routing
- Preview/draft toggles

Run tests via:

```bash
pnpm test
pnpm test:playwright
pnpm test:bdd
```

---

## ♿ Accessibility

Follow WCAG 2.1 AA compliance:

- Use `aria-*` attributes for toggles, accordions, and skip links
- Use semantic elements: `<nav>`, `<main>`, `<button>`, `<h1>` etc.
- Ensure keyboard operability and visible focus styles
- Avoid `overflow-x: hidden` unless explicitly required

---

## 🚦 Git & CI

- Use short, clear commit messages
- Follow `feature/`, `bugfix/`, `chore/` prefixes (optional)
- `pre-commit` hooks enforce linting and formatting
- All tests run via GitHub Actions on every PR or push

---

## 📦 Codegen

GraphQL types and SDK methods are generated via:

```bash
pnpm codegen
```

Do not edit generated files manually.

- GraphQL queries live in: `lib/optimizely/queries/`
- Generated SDK outputs to: `lib/optimizely/sdk.ts`
- Config in: `codegen.ts`

---

## 🧪 Preview Mode & Draft Handling

- Draft mode is enabled via `/draft` route
- Calls `draftMode().enable()` to toggle Next.js preview mode
- Works for both CMS pages and VB experiences
- Never expose unpublished content outside of draft routes

---

## 📌 Contributions

- Follow this doc before raising PRs
- PRs must pass linting, unit tests, and Playwright checks
- Keep all business logic outside components where possible

---

## 🔗 References

- [Next.js Docs](https://nextjs.org/docs)
- [Optimizely SaaS CMS Docs](https://docs.developers.optimizely.com)
- [WCAG 2.1](https://www.w3.org/TR/WCAG21/)
