# AGENTS.md — portfolio-web

Instructions for AI coding agents (Cursor, Copilot, Codex, Claude Code, etc.).  
Humans: see [README.md](README.md). Deep reference: [docs/AGENTS-REFERENCE.md](docs/AGENTS-REFERENCE.md).

## Automation (mandatory — do not skip)

**Before marking any task complete**, run:

```sh
npm run verify
```

This automatically: syncs agent docs from source (`SITE_ROUTES`, `package.json`), validates agent files, lints, and production-builds. Hooks and CI run the same pipeline — you must not hand off failing `verify`.

| Trigger | What runs |
|---------|-----------|
| **You (always)** | `npm run verify` before done |
| **git commit** | `sync:agent` + `agent:check` + lint-staged on staged files |
| **git push** | `npm run verify` |
| **GitHub PR** | CI: verify + perf artifact |

If you add/remove routes or npm scripts, `sync:agent` updates `llms.txt`, `AGENTS.md`, and `docs/generated/manifest.json` — **commit those files** with your change.

Perf-only deep check: `npm run verify:ci` (includes Lighthouse).

Details: [docs/AUTOMATION.md](docs/AUTOMATION.md).

## Project summary

Next.js 16 (App Router) portfolio with a minimal portfolio shell: home (`/`), skills, experience, selected work, and contact pages.

**Live:** https://www.dineshkn.site  
**Deploy:** Vercel (static prerender). No backend in-repo; contact form uses Formspree.

## Commands (run in repo root)

<!-- AGENT-SYNC:SCRIPTS:START -->
| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server → http://localhost:3000 |
| `npm run build` | Production build |
| `npm run start` | Production server (after build) |
| `npm run lint` | ESLint |
| `npm run verify` | **Required before finishing** — sync docs + lint + build |
| `npm run verify:ci` | verify + Lighthouse perf audit (CI) |
| `npm run sync:agent` | Sync routes/manifest into agent docs (auto in hooks) |
| `npm run agent:check` | Validate agent doc files exist |
| `npm run perf` | Lighthouse audit (server running) |
| `npm run perf:full` | build + Lighthouse → perf-reports/latest.json |
| `npm run dev:perf` | dev + one audit when ready |
<!-- AGENT-SYNC:SCRIPTS:END -->

Also: `npm install` for dependencies.

**Do not** commit unless the user explicitly asks. **Do not** force-push `main`.

## Repository map

```
app/                    # Routes + page content (*Content.js)
components/shell/         # Shell, provider, nav, shared ModulePage layout
lib/site/                # constants (routes, storage keys)
lib/site-content.js     # Copy, projects, skills, social links — edit content here
styles/shell/             # Portfolio shell/page CSS
hooks/                  # useReducedMotion, useViewportPager
scripts/perf-report.mjs # Performance reporter
perf-reports/           # Generated metrics (gitignored except README)
```

## Architecture rules

1. **Shell wraps everything** — `app/layout.js` → `PortfolioShell` → `ShellProvider` → page children.
2. **Module pages** use `ModulePage` from `components/shell/ModulePage.js` for consistent headers.
3. **Content lives in** `lib/site-content.js` — avoid hardcoding copy in components.
4. **Client boundaries** — `"use client"` only where needed (hooks, browser APIs, gestures).
5. **Performance** — Keep the shell light: no WebGL backdrop, boot screen, custom cursor, audio layer, or route-level slide animations.
6. **Motion** — Prefer paint-only CSS transitions such as color, border-color, and background-color; avoid transform, filter, opacity fades, canvas, WebGL, and motion libraries.

## Code style

- JavaScript (not TypeScript). Path alias: `@/*` → repo root.
- Match existing patterns: minimal diffs, no over-abstraction, no drive-by refactors.
- ESLint: `eslint-config-next` core-web-vitals.
- CSS: global tokens in `styles/base.css`; shell/page styling in `styles/shell/*.css`.
- Fonts: `lib/fonts.js` — Space Grotesk + IBM Plex Mono only (do not re-add Orbitron/Sora without perf review).

## Adding a new portfolio route

1. Add entry to `SITE_ROUTES` in `lib/site/constants.js`.
2. Create `app/<name>/page.js` (dynamic import content + `PageFallback`).
3. Create `app/<name>/<Name>Content.js` using `ModulePage`.
4. Run `npm run verify` (syncs docs + lint + build).

## Do not touch (without explicit user request)

- `perf-reports/*` generated output (except `perf-reports/README.md`)
- `.env*` / secrets / API keys
- `package-lock.json` unless dependencies changed intentionally
- Git config, force-push, or amend commits you did not create
- Re-add WebGL/boot/audio/custom-cursor effects or heavy `backdrop-filter` on page cards

## Security

- No secrets in repo. Formspree endpoint is public client endpoint in `lib/site-content.js`.
- Sanitize any new user-facing HTML; prefer React text nodes.

## Testing & verification checklist

After **any** code change: `npm run verify` (required).

After UI/perf work also: `npm run verify:ci` or check CI perf artifact; smoke `/`, one module, theme toggle, mobile width.

## PR / commit messages

- Complete sentences; focus on **why**.
- Scope: one concern per PR when possible.

## Related agent files

| File | Role |
|------|------|
| [docs/architecture.md](docs/architecture.md) | System diagram & data flow |
| [docs/conventions.md](docs/conventions.md) | Naming & file patterns |
| [docs/AUTOMATION.md](docs/AUTOMATION.md) | Hooks, CI, mandatory `verify` |
| [llms.txt](llms.txt) | LLM discovery index (inference-time) |
| [CLAUDE.md](CLAUDE.md) | Claude Code pointer |
| [.cursor/rules/](.cursor/rules/) | Cursor-specific rules |
| [.github/copilot-instructions.md](.github/copilot-instructions.md) | GitHub Copilot |
