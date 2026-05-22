# Contributing

Thanks for helping improve this portfolio. **AI agents:** read [AGENTS.md](AGENTS.md) first.

## Setup

```sh
git clone https://github.com/dineshkn-dev/portfolio-web.git
cd portfolio-web
npm install
npm run dev
```

## Before opening a PR

```sh
npm run verify
```

Git hooks run sync + lint on commit and full verify on push. CI runs verify + perf on every PR.

See [docs/AUTOMATION.md](docs/AUTOMATION.md).

## Scope guidelines

- **Copy / data** → `lib/site-content.js`
- **New page** → follow [docs/conventions.md](docs/conventions.md) + `AGENTS.md` checklist
- **HUD / shell** → `components/hud/`
- **Styles** → `styles/hud/` (keep tokens in `styles/base.css`)

## Commit messages

- Complete sentences; explain **why**, not only what.
- One logical change per commit when possible.

## Performance

- Do not enable WebGL by default.
- Share `perf-reports/latest.json` when claiming perf improvements.
- Avoid `backdrop-filter` on large HUD surfaces without measurement.

## Agent-generated PRs

Include in the PR description:

- Commands run (`lint`, `build`, `perf:full`)
- Routes manually checked
- Any `AGENTS.md` / docs updates included

## Questions

Open an issue or contact [kandilindinesh@gmail.com](mailto:kandilindinesh@gmail.com).
