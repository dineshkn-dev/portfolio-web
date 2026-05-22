#!/usr/bin/env node
/**
 * End-to-end verification — run before every handoff (agents + CI).
 * Usage: npm run verify | npm run verify:ci
 */

import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const includePerf = process.argv.includes("--perf") || process.env.VERIFY_PERF === "1";

const steps = [
    { name: "Sync agent manifest (--check)", cmd: "node", args: ["scripts/sync-agent-manifest.mjs", "--check"] },
    { name: "Agent doc files", cmd: "node", args: ["scripts/validate-agent-docs.mjs"] },
    { name: "ESLint", cmd: "npm", args: ["run", "lint"] },
    { name: "Production build", cmd: "npm", args: ["run", "build"] },
];

if (includePerf) {
    steps.push({ name: "Lighthouse perf:full", cmd: "npm", args: ["run", "perf:full"] });
}

console.log("\n🛡️  portfolio-web verify\n");

for (const step of steps) {
    process.stdout.write(`▶ ${step.name}… `);
    const r = spawnSync(step.cmd, step.args, {
        cwd: root,
        stdio: "inherit",
        shell: step.cmd === "npm",
    });
    if (r.status !== 0) {
        console.error(`\n❌ Verify failed at: ${step.name}\n`);
        process.exit(r.status ?? 1);
    }
}

console.log("\n✅ Verify passed\n");
