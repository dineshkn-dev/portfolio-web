# Security policy

## Supported versions

| Version | Supported |
|---------|-----------|
| `main` (latest deploy) | Yes |

## Reporting a vulnerability

Email **kandilindinesh@gmail.com** with:

- Description and impact
- Steps to reproduce
- Suggested fix (optional)

Do not open public issues for undisclosed security problems.

## Scope notes for agents and contributors

- **No secrets in git** — no `.env` files, API keys, or private Formspree keys in the repo.
- **Contact form** — client-side POST to Formspree; validate and rate-limit on Formspree dashboard, not in this repo.
- **Dependencies** — run `npm audit` when upgrading packages; report critical issues to the maintainer.

## Out of scope

- Social engineering, physical attacks, third-party hosting (Vercel) configuration outside this repository.
