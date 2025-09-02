# OnTrac – SaaS CMS Frontend (Optimizely Head)

This is the production-grade **Next.js 15** frontend for **OnTrac**, powered by the **Optimizely SaaS CMS GraphQL Delivery API (v2)**.

It implements layout-aware rendering from CMS content, supports preview mode, and is structured for performance, testability, and developer handoff.

The current production site is live at: https://www.ontrac.com/  
_Note: This repo powers the future rebuild, which is still under active development._

---

## 🧩 Features

• ✅ GraphQL client + codegen setup using Optimizely schema  
• ✅ Layout-aware CMS rendering (blocks, pages, homepage, VB)  
• ✅ Draft mode support for unpublished content  
• ✅ Component mocking for Storybook-first development  
• 🧪 Unit testing with Jest + React Testing Library  
• 🧪 E2E browser testing via Playwright  
• 🧪 BDD testing via Cucumber + Gherkin  
• 🐳 Docker-ready production build and preview flows  
• 🎨 Clear folder structure for CMS blocks, layouts, and routes  
• 🚧 CMS component mapping and visual styles in progress

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/episerver-services/saas-cms-fe-ontrac.git
cd saas-cms-fe-ontrac
pnpm install
```

### 2. Configure Environment

Create `.env.local`:

```env
OPTIMIZELY_API_URL="https://cg.optimizely.com/content/v2"
OPTIMIZELY_SINGLE_KEY=your_single_delivery_key_here
OPTIMIZELY_PREVIEW_SECRET=your_base64_encoded_preview_secret
OPTIMIZELY_REVALIDATE_SECRET=
NEXT_PUBLIC_CMS_URL=your-cms-instance-domain.cms.optimizely.com
```

---

### 🧪 Mock Preview Mode (Local Testing)

To test Visual Builder preview routes without connecting to a live Optimizely CMS, enable mock mode:

1. **In your `.env.local`:**

   ```env
   MOCK_OPTIMIZELY=true
   NEXT_PUBLIC_MOCK_OPTIMIZELY=true
   ```

2. **Access this test route in your browser:**

   ```
   http://localhost:3000/draft/1234/my-test-slug
   ```

   You should see a mocked "hero block" or other placeholder content. This allows full testing of the preview rendering logic, draft mode, and layout without requiring CMS content or credentials.

> ⚠️ Don't forget to **disable mock mode** (`MOCK_OPTIMIZELY=false`) when connecting to real CMS data.

---

## 🧪 BDD Testing (Cucumber)

```bash
pnpm test:bdd
```

Sample:

```gherkin
Feature: Homepage content rendering

  Scenario: Display homepage with mocked CMS content
    Given the CMS is returning homepage content
    When the user visits the homepage
    Then the page should include the title "OnTrac"
    And the page should include the call to action
```

---

## 🧪 Unit & E2E Testing

Run **unit tests** with Jest:

```bash
pnpm test
```

Run **Playwright E2E** tests:

```bash
pnpm test:playwright
```

---

## 📚 Storybook

```bash
pnpm storybook
```

---

## 🗂️ Project Structure

```
📁 app/
📁 lib/
📁 features/
📁 e2e/
📁 mocks/
📁 public/
📁 .storybook/
📄 codegen.ts
📄 Dockerfile
📄 docker-compose.yml
📄 tsconfig.json
📄 README.md
```

---

## 📦 PNPM Scripts

| Command                | Description                     |
| ---------------------- | ------------------------------- |
| `pnpm dev`             | Start dev server                |
| `pnpm build`           | Production build                |
| `pnpm start`           | Start production server         |
| `pnpm test`            | Run Jest unit tests             |
| `pnpm test:bdd`        | Run Cucumber tests              |
| `pnpm test:playwright` | Run Playwright E2E tests        |
| `pnpm storybook`       | Launch Storybook UI             |
| `pnpm codegen`         | Generate GraphQL TypeScript SDK |

---

## 🛠️ Docker Support

```bash
docker build -t saas-cms-fe-ontrac .
docker run -p 3000:3000 --env-file .env.local saas-cms-fe-ontrac
```

---

## ⚠️ Handoff Notes

✅ Layout-aware routing and block rendering  
✅ CMS integration using GraphQL schema and SDK  
✅ Visual Builder fallback support (via experience wrappers)  
✅ Draft mode for unpublished pages and blocks  
✅ Mock-driven development support via Storybook
