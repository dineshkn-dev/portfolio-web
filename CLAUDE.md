# Claude Code — portfolio-web

Read **[AGENTS.md](AGENTS.md)** first for commands, boundaries, and architecture.

## Claude-specific notes

- Prefer editing `lib/site-content.js` for copy changes instead of scattering strings.
- For performance work, run `npm run perf:full` and cite metrics from `perf-reports/latest.json`.
- Use Plan mode for large HUD layout refactors; keep shell changes in `components/hud/`.
- Do not add TypeScript or new state libraries without user approval.

Extended reference: [docs/AGENTS-REFERENCE.md](docs/AGENTS-REFERENCE.md).
