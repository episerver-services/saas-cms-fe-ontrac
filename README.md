# OnTrac – SaaS CMS Production Frontend

This is the production-ready **Next.js 15** front-end for **OnTrac**, powered by the **Optimizely SaaS CMS Delivery API**.  
It integrates layout-aware GraphQL content rendering with a clean architecture optimised for performance, testing, and scalability.

---

## 🧩 Features

• ✅ GraphQL content querying from Optimizely SaaS CMS  
• 🔧 Environment-based layout + homepage config  
• 🐳 Docker-optimised CI/CD and deploy flow  
• 🧪 Unit tests with Jest + React Testing Library  
• 🧪 E2E browser testing via Playwright  
• 🧪 BDD testing via Cucumber + Gherkin  
• 📐 GraphQL SDK codegen using graphql-codegen  
• 📄 SEO metadata generation from CMS  
• 👓 Draft mode and preview route handling  
• 📂 Clear folder structure for blocks and layouts  
• 🎨 Storybook integration for component development

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
# === Optimizely Delivery API ===
OPTIMIZELY_BEARER_TOKEN=your_real_token_here

# Homepage content ID and version
OPTIMIZELY_CONTENT_ID=contentreference:/content/ontrac/en/homepage/
OPTIMIZELY_CONTENT_VERSION=published

# Layout content ID and version
OPTIMIZELY_LAYOUT_ID=contentreference:/content/ontrac/en/layout/
OPTIMIZELY_LAYOUT_VERSION=published

# === Frontend Config ===
SITE_DOMAIN=http://localhost:3000
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
- `tests/`

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
📁 mocks/
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

## 📌 Known Gaps & Next Steps

• [ ] Expand unit test coverage  
• [ ] Add E2E tests for fallback and preview mode  
• [ ] See `docs/project-status.md` for implementation tracker  
• [ ] Improve Storybook theme support if theming is added

---

## 👨‍💻 Maintainer

**Owen Liversidge**  
Frontend Architect – Optimizely SaaS CMS  
Weymouth, UK | owen.liversidge@optimizely.com
