# Performance reports

This folder stores Lighthouse audit output from `npm run perf`.

## Run an audit

```sh
# Terminal 1 — dev or production server
npm run dev
# or: npm run build && npm run start

# Terminal 2 — audit (shareable output)
npm run perf
```

Fully automated (build + start + audit + stop):

```sh
npm run perf:full
```

## Share with Cursor / your AI assistant

After a run, attach or paste either file:

- `perf-reports/latest.md` — human-readable table
- `perf-reports/latest.json` — full metrics for optimization

Example prompt:

> Please optimize my portfolio using the metrics in `perf-reports/latest.json`.

## Options

```sh
npm run perf -- --mobile
npm run perf -- --url http://localhost:3000 --routes /,/skills
```

Reports are gitignored except this README.
