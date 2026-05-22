#!/usr/bin/env node
/**
 * Validates AI-agent documentation files exist.
 * Run: npm run agent:check
 */

import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const required = [
    "AGENTS.md",
    "CLAUDE.md",
    "llms.txt",
    "llms-full.txt",
    "CONTRIBUTING.md",
    "SECURITY.md",
    "docs/architecture.md",
    "docs/conventions.md",
    "docs/AGENTS-REFERENCE.md",
    ".github/copilot-instructions.md",
    ".cursor/rules/project-core.mdc",
    "perf-reports/README.md",
    "docs/generated/manifest.json",
    "docs/AUTOMATION.md",
    ".github/workflows/ci.yml",
];

const missing = required.filter((f) => !existsSync(path.join(root, f)));

if (missing.length) {
    console.error("❌ Missing agent documentation:\n", missing.map((f) => `  - ${f}`).join("\n"));
    process.exit(1);
}

console.log("✅ Agent documentation OK (" + required.length + " files)");
