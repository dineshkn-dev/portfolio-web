# AGENTS.md — portfolio-web

Instructions for AI coding agents (Cursor, Copilot, Codex, Claude Code, etc.).  
Humans: see [README.md](README.md). Deep reference: [docs/AGENTS-REFERENCE.md](docs/AGENTS-REFERENCE.md).

## Automation (mandatory — do not skip)

**Before marking any task complete**, run:

```sh
npm run verify
```

This automatically: syncs agent docs from source (`JARVIS_MODULES`, `package.json`), validates agent files, lints, and production-builds. Hooks and CI run the same pipeline — you must not hand off failing `verify`.

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

Next.js 16 (App Router) portfolio with a **JARVIS HUD** shell: cockpit home (`/`), module pages (`/skills`, `/about`, `/projects`, `/contact`), voice intents, command palette (⌘K), optional WebGL backdrop (opt-in only).

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
components/jarvis/      # Shell: provider, nav, voice, palette, boot
components/canvas/      # ReactorBackdrop (CSS) + ReactorCanvas (WebGL, lazy)
lib/jarvis/             # constants, commands, intents, keyboard
lib/site-content.js     # Copy, projects, skills, social links — edit content here
styles/jarvis/          # HUD CSS (prefer CSS over new motion libs)
hooks/                  # useTypewriter, useReducedMotion, useViewportPager
scripts/perf-report.mjs # Performance reporter
perf-reports/           # Generated metrics (gitignored except README)
```

## Architecture rules

1. **Shell wraps everything** — `app/layout.js` → `JarvisShell` → `JarvisProvider` → page children.
2. **Module pages** use `ModulePage` from `components/jarvis/ModulePage.js` for consistent headers.
3. **Content lives in** `lib/site-content.js` — avoid hardcoding copy in components.
4. **Client boundaries** — `"use client"` only where needed (hooks, browser APIs, gestures).
5. **Performance** — WebGL off by default (`STORAGE_KEYS.reactor3d`). Lazy-load: `CommandPalette`, `BootSequence`, `VoiceController`, `gsap`, `@use-gesture/react`. No route-level slide animations; use `.hud-panel-swap` CSS only.
6. **Motion** — Use `hooks/useReducedMotion.js`, not `framer-motion` in shell/provider. Page modules: CSS animations, not horizontal `x` slides on route enter.
7. **Voice** — Do not stop mic during TTS; avoid restart loops on `no-speech`. See `VoiceController.js`.

## Code style

- JavaScript (not TypeScript). Path alias: `@/*` → repo root.
- Match existing patterns: minimal diffs, no over-abstraction, no drive-by refactors.
- ESLint: `eslint-config-next` core-web-vitals.
- CSS: global tokens in `styles/base.css`; JARVIS in `styles/jarvis/*.css`.
- Fonts: `lib/fonts.js` — Space Grotesk + IBM Plex Mono only (do not re-add Orbitron/Sora without perf review).

## Adding a new HUD module route

1. Add entry to `JARVIS_MODULES` in `lib/jarvis/constants.js`.
2. Create `app/<name>/page.js` (dynamic import content + `PageFallback`).
3. Create `app/<name>/<Name>Content.js` using `ModulePage`.
4. Add nav intent in `lib/jarvis/intents.js` and command in `lib/jarvis/commands.js` if voice-accessible.
5. Run `npm run verify` (syncs docs + lint + build).

## Do not touch (without explicit user request)

- `perf-reports/*` generated output (except `perf-reports/README.md`)
- `.env*` / secrets / API keys
- `package-lock.json` unless dependencies changed intentionally
- Git config, force-push, or amend commits you did not create
- Re-enable always-on WebGL or heavy `backdrop-filter` on HUD cards

## Security

- No secrets in repo. Formspree endpoint is public client endpoint in `lib/site-content.js`.
- Do not log or commit voice consent tokens beyond existing `localStorage` keys in `STORAGE_KEYS`.
- Sanitize any new user-facing HTML; prefer React text nodes.

## Testing & verification checklist

After **any** code change: `npm run verify` (required).

After UI/perf work also: `npm run verify:ci` or check CI perf artifact; smoke `/`, one module, ⌘K, theme toggle, mobile width.

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
