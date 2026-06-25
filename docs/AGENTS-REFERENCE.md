# AGENTS reference (extended)

Companion to [AGENTS.md](../AGENTS.md). Use when the root file is not enough.

## Dependency graph (heavy)

| Package | Loaded when | Notes |
|---------|-------------|-------|
| `lighthouse` | `npm run perf` | devDependency |

## localStorage / sessionStorage keys

Defined in `lib/site/constants.js` → `SITE_STORAGE_KEYS`:

| Key | Values | Purpose |
|-----|--------|---------|
| `portfolio-theme` | `"dark"` / `"light"` | Persist selected color theme |

## Perf reporter API

```bash
node scripts/perf-report.mjs --url http://localhost:3000
node scripts/perf-report.mjs --start          # spawns next start
node scripts/perf-report.mjs --mobile
node scripts/perf-report.mjs --routes /,/skills
```

Output: `perf-reports/latest.json` with `routes[].performance`, `lcpMs`, `tbtMs`, `bundle.totalJsKb`.

## Common agent mistakes (avoid)

1. **Re-adding boot/WebGL/audio/custom cursor effects** — this repo intentionally uses a minimal shell.
2. **Adding route mount slide animations** — keep page changes static or use paint-only CSS transitions.
3. **Importing animation libraries in `ShellProvider` or `PortfolioShell`** — bloats every page.
4. **Editing `perf-reports/latest.json`** — generated; re-run `perf:full`.

## Smoke test script (manual)

1. `/` — hero, proof panel, featured work
2. `/skills` — select tile, inspect panel updates
3. `/about` — rail + map sync index
4. Theme toggle — light/dark
5. 768px width — mobile drawer, no text overlap

## File ownership

| Area | Primary files |
|------|----------------|
| Shell | `PortfolioShell.js`, `ShellProvider.js`, `SiteNav.js` |
| Home | `app/home/HomeContent.js` |
| Styles | `styles/shell/shell.css`, `home.css`, `pages.css`, `responsive.css` |
| SEO | `app/layout.js` metadata, `app/sitemap.js`, `app/robots.js` |

## Updating agent docs

When you change commands, routes, or architecture, update in the same PR:

- `AGENTS.md` (if operational)
- `docs/architecture.md` (if structure)
- `llms.txt` links (if new top-level docs)
