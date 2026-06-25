# GitHub Copilot — portfolio-web

Follow [AGENTS.md](../AGENTS.md) for this repository.

**Before finishing any task:** run `npm run verify` (mandatory). Hooks and CI enforce the same pipeline. See [docs/AUTOMATION.md](../docs/AUTOMATION.md).

## Quick context

Next.js 16 portfolio with a minimal shell in `components/shell/`. Site data in `lib/site-content.js`.

## When suggesting code

- Use `ModulePage` for new module routes.
- Prefer paint-only CSS transitions; avoid transform, filter, opacity fades, canvas, and WebGL.
- Dynamic-import browser-only and heavy libraries.
- Run `npm run verify` before suggesting merges (sync + lint + build).

## Avoid suggesting

- TypeScript migration without request.
- WebGL, boot-screen, custom-cursor, or audio-effect UI.
- New global state libraries.
- Committing `.env` or API secrets.

See [docs/architecture.md](../docs/architecture.md) for system overview.
