# Dinesh K N - Portfolio Website

This repository contains the source code for my personal portfolio website, showcasing my skills, experience, and projects.

> **AI agents:** start with [AGENTS.md](AGENTS.md) · [llms.txt](llms.txt) · `npm run agent:check`

## Live Website
Visit: **[dineshkn.site](https://www.dineshkn.site/)**

## Tech Stack
- **Framework:** Next.js 16 (App Router), React 19
- **Styling:** Tailwind CSS, custom CSS
- **Analytics:** Vercel Analytics, Vercel Speed Insights
- **Deployment:** Vercel

## Features
- Showcase my **skills**, **projects**, and **experience**
- Fully **responsive** and **optimized** for all devices
- Integrated **contact form** via Formspree
- SEO optimized with Open Graph and Twitter Card metadata
- Auto-generated **sitemap** and **robots.txt**

## Installation & Setup
To run this project locally:

1. **Clone the repository**
   ```sh
   git clone https://github.com/dineshkn-dev/portfolio-web.git
   cd portfolio-web
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Run the development server**
   ```sh
   npm run dev
   ```

4. **Open in browser**
   Go to [http://localhost:3000](http://localhost:3000) to view it locally.

## Performance audits

Generate shareable Lighthouse reports (for optimization reviews or sharing with AI tools):

```sh
# With dev or production server already running:
npm run perf

# Dev server + one audit when localhost:3000 is ready:
npm run dev:perf

# Fully automated: build → start → audit → stop:
npm run perf:full
```

Output is written to:

- `perf-reports/latest.md` — summary table
- `perf-reports/latest.json` — full metrics

Copy either file into chat when asking for performance help. See `perf-reports/README.md` for options (`--mobile`, custom routes, etc.).

## AI agent documentation

This repo follows open [AGENTS.md](https://agents.md/) conventions (Agentic AI Foundation) plus [llms.txt](https://llmstxt.org/) discovery.

| File | Purpose |
|------|---------|
| [AGENTS.md](AGENTS.md) | Primary instructions for coding agents |
| [CLAUDE.md](CLAUDE.md) | Claude Code entry |
| [llms.txt](llms.txt) | LLM link index |
| [docs/architecture.md](docs/architecture.md) | System design |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contributor + agent PR guide |

**One command for all chores:** `npm run verify` (sync docs, lint, build)

Validate agent files: `npm run agent:check` · Automation: [docs/AUTOMATION.md](docs/AUTOMATION.md)

## Contact
- **Email:** [kandilindinesh@gmail.com](mailto:kandilindinesh@gmail.com)
- **LinkedIn:** [linkedin.com/in/dinesh-kn](https://www.linkedin.com/in/dinesh-kn/)
- **GitHub:** [github.com/dineshkn-dev](https://github.com/dineshkn-dev)

## License
This project is licensed under the MIT License.
