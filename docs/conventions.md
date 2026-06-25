# Conventions — portfolio-web

## File naming

| Pattern | Example |
|---------|---------|
| Route page (server) | `app/skills/page.js` |
| Client content | `app/skills/SkillsContent.js` |
| Shell component | `components/shell/SiteNav.js` |
| Hook | `hooks/useViewportPager.js` |
| Site constants | `lib/site/constants.js` |
| Global content | `lib/site-content.js` |

## React

- Default to Server Components in `page.js`; mark interactive trees `"use client"`.
- Colocate state in the smallest client subtree possible.
- Prefer `dynamic(() => import(...), { ssr: false })` for browser-only or heavy deps.
- Use `useReducedMotion` from `@/hooks/useReducedMotion` for any new motion-sensitive interaction.

## CSS

- Shell/page styles: `styles/shell/` — use existing classes (`site-card`, `site-title`, `site-panel-swap`).
- Motion: use paint-only transitions such as color, border-color, or background-color. Avoid transform, filter, opacity fades, canvas, and WebGL.
- Avoid `backdrop-filter` on large surfaces (macOS GPU cost).
- Viewport-locked pages: `ModulePage` with `viewportFit` + `compact`.

## Imports

```javascript
import { useShell } from "@/components/shell/ShellProvider";
import { SITE_ROUTES } from "@/lib/site/constants";
import { projects } from "@/lib/site-content";
```

## Content changes

Edit **`lib/site-content.js`** for:

- Projects, skills, timeline, homepage copy, social links

Do not duplicate strings in components.

## Git / agent behavior

- Run `npm run verify` before handing off work.
- No commits unless user requests.
- Keep PRs focused; update `AGENTS.md` if commands or architecture change materially.
