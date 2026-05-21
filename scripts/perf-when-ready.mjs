#!/usr/bin/env node
/** Waits for dev server, runs one perf audit (used by npm run dev:perf). */

import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const baseUrl = process.env.PERF_URL || "http://localhost:3000";

async function waitForServer(attempts = 90) {
    for (let i = 0; i < attempts; i++) {
        try {
            const res = await fetch(baseUrl, { signal: AbortSignal.timeout(2000) });
            if (res.status < 500) return true;
        } catch {
            /* retry */
        }
        await new Promise((r) => setTimeout(r, 1000));
    }
    return false;
}

console.log("⏳ Waiting for dev server before performance audit…\n");

const ready = await waitForServer();
if (!ready) {
    console.error(`❌ Timed out waiting for ${baseUrl}`);
    process.exit(1);
}

const child = spawn("node", ["scripts/perf-report.mjs", "--url", baseUrl], {
    cwd: ROOT,
    stdio: "inherit",
    env: process.env,
});

child.on("exit", (code) => process.exit(code ?? 0));
