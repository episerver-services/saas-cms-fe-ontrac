# Optimizely SaaS CMS FE Template

A minimal, production-ready **Next.js 15** front-end template using the App Router and TypeScript to integrate with the **Optimizely SaaS CMS Delivery API**.

Built for real-world headless CMS use cases: authenticated content, CI/CD pipelines, scalable rendering, and full test coverage (unit, E2E, and BDD).

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

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/episerver-services/saas-cms-fe-poc-owen.git
cd saas-cms-fe-poc-owen
pnpm install
```

### 2. Configure Environment

Create `.env.local` with your Delivery API token and layout content:

```env
# === Optimizely Delivery API ===
OPTIMIZELY_BEARER_TOKEN=your_real_token_here

# Homepage content ID and version
OPTIMIZELY_CONTENT_ID=contentreference:/content/optimizely.com/en/homepage/
OPTIMIZELY_CONTENT_VERSION=published

# Layout content ID and version
OPTIMIZELY_LAYOUT_ID=contentreference:/content/optimizely.com/en/layout/
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
    Then the page should include the title "Optimizely FE PoC"
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
| `pnpm codegen`         | Generate GraphQL TypeScript SDK |

---

## 🛠️ Docker Support

Build the production image:

```bash
docker build -t saas-cms-fe-poc-owen .
```

Run it locally:

```bash
docker run -p 3000:3000 --env-file .env.local saas-cms-fe-poc-owen
```

👉 **Tip:** Pass secrets like `OPTIMIZELY_BEARER_TOKEN` via `--env-file` or secret manager — never hardcode in Dockerfile.

---

## 📌 Known Gaps & Next Steps

• [ ] Expand unit test coverage  
• [ ] Add E2E tests for fallback and preview mode  
• [ ] See `docs/project-status.md` for implementation tracker

---

## 👨‍💻 Maintainer

**Owen Liversidge**  
Frontend Architect – Optimizely SaaS CMS  
Weymouth, UK | [LinkedIn](https://www.linkedin.com/in/owenliversidge/)
