# Conventions — portfolio-web

## File naming

| Pattern | Example |
|---------|---------|
| Route page (server) | `app/skills/page.js` |
| Client content | `app/skills/SkillsContent.js` |
| Hud component | `components/hud/HudNav.js` |
| Canvas | `components/canvas/ReactorBackdrop.jsx` |
| Hook | `hooks/useTypewriter.js` |
| Hud lib | `lib/hud/constants.js` |
| Global content | `lib/site-content.js` |

## React

- Default to Server Components in `page.js`; mark interactive trees `"use client"`.
- Colocate state in the smallest client subtree possible.
- Prefer `dynamic(() => import(...), { ssr: false })` for browser-only or heavy deps.
- Use `useReducedMotion` from `@/hooks/useReducedMotion` — not `framer-motion` in shell.

## CSS

- HUD styles: `styles/hud/` — use existing classes (`hud-card`, `hud-title`, `hud-panel-swap`).
- Panel enter animation: `.hud-panel-swap` only (opacity), no `x`/`y` route transitions.
- Avoid `backdrop-filter` on large surfaces (macOS GPU cost).
- Viewport-locked pages: `ModulePage` with `viewportFit` + `compact`.

## Imports

```javascript
import { useHud } from "@/components/hud/HudProvider";
import { HUD_MODULES } from "@/lib/hud/constants";
import { projects } from "@/lib/site-content";
```

## Content changes

Edit **`lib/site-content.js`** for:

- Projects, skills, timeline, cockpit copy, social links

Do not duplicate strings in components.

## Git / agent behavior

- Run `npm run lint` before handing off work.
- No commits unless user requests.
- Keep PRs focused; update `AGENTS.md` if commands or architecture change materially.
