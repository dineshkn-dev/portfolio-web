# AGENTS reference (extended)

Companion to [AGENTS.md](../AGENTS.md). Use when the root file is not enough.

## Dependency graph (heavy)

| Package | Loaded when | Notes |
|---------|-------------|-------|
| `three`, `@react-three/fiber` | `use3D` + dynamic `ReactorCanvas` | Opt-in via `localStorage` `jarvis-reactor-3d` |
| `gsap` | Boot sequence, home button click | Dynamic import |
| `cmdk` | Command palette open | Dynamic `CommandPalette` |
| `@use-gesture/react` | Home draggable stats | Dynamic `DraggableStat` |
| `framer-motion` | Legacy `TiltCard`, `lib/motion-ui.js` only | Not in shell |
| `lighthouse` | `npm run perf` | devDependency |

## localStorage / sessionStorage keys

Defined in `lib/jarvis/constants.js` → `STORAGE_KEYS`:

| Key | Values | Purpose |
|-----|--------|---------|
| `jarvis-boot-complete` | session | Skip boot animation |
| `jarvis-voice-consent` | `"true"` | Mic permission UX done |
| `jarvis-voice-enabled` | `"true"` / `"false"` | Voice toggle |
| `jarvis-sfx-muted` | `"true"` / `"false"` | UI sounds |
| `jarvis-reactor-3d` | `"true"` | Enable WebGL (perf opt-in) |

## Intent examples (`lib/jarvis/intents.js`)

- `"open projects"` → navigate `/projects`
- `"voice off"` → disable voice
- `"help"` → help overlay

Regex-based; extend patterns carefully to avoid false positives.

## Command palette (`lib/jarvis/commands.js`)

Built from `buildCommands({ router, jarvis })`. Groups: Navigation, Systems, Voice, etc.

## Perf reporter API

```bash
node scripts/perf-report.mjs --url http://localhost:3000
node scripts/perf-report.mjs --start          # spawns next start
node scripts/perf-report.mjs --mobile
node scripts/perf-report.mjs --routes /,/skills
```

Output: `perf-reports/latest.json` with `routes[].performance`, `lcpMs`, `tbtMs`, `bundle.totalJsKb`.

## Common agent mistakes (avoid)

1. **Re-adding `ModuleTransition` GSAP** — causes layout jerk; wrapper is static.
2. **Framer `x` slide on route mount** — use `AnimatePresence initial={false}` or CSS only.
3. **Importing `framer-motion` in `JarvisProvider`** — bloats every page.
4. **Stopping mic in `speakResponse`** — causes macOS mic flicker.
5. **Always-on `ReactorCanvas`** — regresses Lighthouse ~10+ points.
6. **Editing `perf-reports/latest.json`** — generated; re-run `perf:full`.

## Smoke test script (manual)

1. `/` — hero, typewriter starts after idle, stat drag works
2. `/skills` — select tile, inspect panel updates
3. `/about` — rail + map sync index
4. ⌘K — palette opens, navigate command works
5. Theme toggle — light/dark
6. 768px width — mobile: no custom cursor, voice may be disabled

## File ownership

| Area | Primary files |
|------|----------------|
| Shell | `JarvisShell.js`, `JarvisProvider.js`, `HudNav.js`, `HudFrame.js` |
| Voice | `VoiceController.js`, `intents.js`, `VoiceConsentBanner.js` |
| Home | `app/home/HomeContent.js` |
| Styles | `styles/jarvis/hud.css`, `pages.css`, `modules.css` |
| SEO | `app/layout.js` metadata, `app/sitemap.js`, `app/robots.js` |

## Updating agent docs

When you change commands, routes, or architecture, update in the same PR:

- `AGENTS.md` (if operational)
- `docs/architecture.md` (if structure)
- `llms.txt` links (if new top-level docs)
