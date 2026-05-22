# GitHub Copilot — portfolio-web

Follow [AGENTS.md](../AGENTS.md) for this repository.

**Before finishing any task:** run `npm run verify` (mandatory). Hooks and CI enforce the same pipeline. See [docs/AUTOMATION.md](../docs/AUTOMATION.md).

## Quick context

Next.js 16 HUD-themed portfolio. Shell in `components/hud/`. Site data in `lib/site-content.js`.

## When suggesting code

- Use `ModulePage` for new module routes.
- Prefer CSS (`hud-panel-swap`) over Framer Motion for enter animations.
- Dynamic-import browser-only and heavy libraries.
- Run `npm run verify` before suggesting merges (sync + lint + build).

## Avoid suggesting

- TypeScript migration without request.
- Always-on Three.js background.
- New global state libraries.
- Committing `.env` or API secrets.

See [docs/architecture.md](../docs/architecture.md) for system overview.
