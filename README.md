# OnTrac – SaaS CMS Production Frontend

This is the production-ready **Next.js 15** front-end for **OnTrac**, powered by the **Optimizely SaaS CMS Delivery API**.  
It integrates layout-aware GraphQL content rendering with a clean architecture optimised for performance, testing, and scalability.

The current production site is live at: https://www.ontrac.com/  
_Note: This repo powers the future rebuild, which is still under active development._

---

## 🧩 Features

• ✅ GraphQL client + codegen setup (ready for CMS integration)
• 🔧 Environment-based layout + homepage config  
• 🐳 Docker-optimised CI/CD and deploy flow  
• 🧪 Unit tests with Jest + React Testing Library  
• 🧪 E2E browser testing via Playwright  
• 🧪 BDD testing via Cucumber + Gherkin  
• 📐 `codegen.ts` configured for future schema + fragment generation  
• 📄 SEO metadata generation from CMS  
• 👓 Draft mode and preview route handling  
• 📂 Clear folder structure for blocks and layouts  
• 🎨 Storybook integration for component development
• 🚧 Component mapping and CMS integration in progress  
• 📦 Placeholder mocks and stub components included for handoff

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/episerver-services/saas-cms-fe-ontrac.git
cd saas-cms-fe-ontrac
pnpm install
```

### 2. Configure Environment

Create `.env.local` with your Delivery API token and layout content:

```env
# ┌────────────────────────────────────────────┐
# │ Optimizely GraphQL API Configuration       │
# └────────────────────────────────────────────┘

OPTIMIZELY_API_URL="https://cg.optimizely.com/content/v2"
OPTIMIZELY_SINGLE_KEY=your_single_delivery_key_here

# Combine App Key and Secret and Base64 encode:
# echo -n 'your-app-key:your-app-secret' | base64
OPTIMIZELY_PREVIEW_SECRET=your_base64_encoded_preview_secret

# Optional revalidation secret for ISR
OPTIMIZELY_REVALIDATE_SECRET=

# This should match your CMS instance domain
NEXT_PUBLIC_CMS_URL=your-cms-instance-domain.cms.optimizely.com
```

### 3. Start Development

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

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

Test files live in:

- `app/components/__tests__/`
- `e2e/`

---

## 📚 Storybook

```bash
pnpm storybook
```

Visual UI component development via [Storybook](https://storybook.js.org). Add stories to `.storybook/`.

---

## 🗂️ Project Structure

```
📁 app/
│ ├─ (site)/[locale]/[slug]/      # Dynamic CMS page route
│ ├─ components/                  # Blocks, layout, draft mode, etc.
│ ├─ __tests__/                   # Unit tests
│ ├─ (draft)/                     # Preview handler
│ ├─ api/
│ ├─ globals.css
│ └─ metadata.ts

📁 lib/
│ ├─ optimizely/                  # SDK, queries, utils
│ ├─ utils/
│ └─ content/

📁 features/                      # BDD tests (Cucumber)
📁 e2e/                           # E2E tests (Playwright)
📁 mocks/                         # Mock data for testing components before CMS is live
📁 public/
📁 .storybook/
📁 .github/

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

Build the production image:

```bash
docker build -t saas-cms-fe-ontrac .
```

Run it locally:

```bash
docker run -p 3000:3000 --env-file .env.local saas-cms-fe-ontrac
```

👉 **Tip:** Pass secrets like `OPTIMIZELY_BEARER_TOKEN` via `--env-file` or secret manager — never hardcode in Dockerfile.

---

## ⚠️ Handoff Notes

The current implementation includes:

✅ All architectural scaffolding for a production-grade head  
✅ GraphQL client and codegen setup (no schema integrated yet)  
✅ Routing, layout, draft mode, and metadata support  
✅ Placeholder blocks and mock data for Storybook development

The following is expected to be completed by the next team:

❌ CMS schema integration and GraphQL fragment generation  
❌ Component development and mapping to CMS content types  
❌ Styling and brand theming  
❌ Visual Builder layout rendering  
❌ Personalization, experiments, and DAM asset support

See `/docs/project-status.md` for a detailed task tracker.
