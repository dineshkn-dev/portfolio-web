#!/usr/bin/env node
/**
 * Syncs machine-readable manifest + llms.txt routes from source of truth.
 * Run automatically via: npm run sync:agent, pre-commit, CI --check
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const checkOnly = process.argv.includes("--check");

const ROUTE_LABELS = {
    "/": "Portfolio home",
    "/skills": "Skills overview",
    "/about": "Experience timeline",
    "/projects": "Selected work",
    "/contact": "Contact form",
};

function pagePathForRoute(routePath) {
    if (routePath === "/") return "app/page.js";
    const seg = routePath.replace(/^\//, "");
    return `app/${seg}/page.js`;
}

function parseSiteRoutes(constantsSrc) {
    const block = constantsSrc.match(/export const SITE_ROUTES\s*=\s*\[([\s\S]*?)\];/);
    if (!block) throw new Error("SITE_ROUTES not found in lib/site/constants.js");

    const routes = [];
    const re = /\{\s*id:\s*"([^"]+)"\s*,\s*label:\s*"([^"]+)"\s*,\s*path:\s*"([^"]+)"/g;
    let m;
    while ((m = re.exec(block[1])) !== null) {
        routes.push({ id: m[1], label: m[2], path: m[3] });
    }
    if (!routes.length) throw new Error("No routes parsed from SITE_ROUTES");
    return routes;
}

function parsePackageScripts(pkg) {
    const chore = [
        "dev",
        "build",
        "start",
        "lint",
        "verify",
        "verify:ci",
        "sync:agent",
        "agent:check",
        "perf",
        "perf:full",
        "dev:perf",
    ];
    return chore
        .filter((name) => pkg.scripts[name])
        .map((name) => ({ name, command: pkg.scripts[name] }));
}

const SCRIPT_DESCRIPTIONS = {
    dev: "Dev server → http://localhost:3000",
    build: "Production build",
    start: "Production server (after build)",
    lint: "ESLint",
    verify: "**Required before finishing** — sync docs + lint + build",
    "verify:ci": "verify + Lighthouse perf audit (CI)",
    "sync:agent": "Sync routes/manifest into agent docs (auto in hooks)",
    "agent:check": "Validate agent doc files exist",
    perf: "Lighthouse audit (server running)",
    "perf:full": "build + Lighthouse → perf-reports/latest.json",
    "dev:perf": "dev + one audit when ready",
};

function renderRoutesSection(routes) {
    return routes
        .map((r) => {
            const hint = ROUTE_LABELS[r.path] ?? r.label;
            return `- \`${r.path}\` — ${hint}`;
        })
        .join("\n");
}

function renderScriptsTable(scripts) {
    const header = "| Command | Purpose |\n|---------|---------|";
    const rows = scripts.map(
        (s) => `| \`npm run ${s.name}\` | ${SCRIPT_DESCRIPTIONS[s.name] ?? s.command} |`
    );
    return [header, ...rows].join("\n");
}

function replaceBetweenMarkers(content, startMarker, endMarker, body) {
    const start = content.indexOf(startMarker);
    const end = content.indexOf(endMarker);
    if (start === -1 || end === -1 || end <= start) {
        throw new Error(`Markers not found: ${startMarker} / ${endMarker}`);
    }
    const before = content.slice(0, start + startMarker.length);
    const after = content.slice(end);
    return `${before}\n${body}\n${after}`;
}

function stableManifestJson(manifest) {
    return `${JSON.stringify({ routes: manifest.routes, scripts: manifest.scripts }, null, 2)}\n`;
}

async function writeOrCheck(filePath, nextContent, { stableCompare = false } = {}) {
    const rel = path.relative(root, filePath);
    if (!checkOnly) {
        await writeFile(filePath, nextContent, "utf8");
        console.log(`  ✓ synced ${rel}`);
        return;
    }
    const prev = existsSync(filePath) ? await readFile(filePath, "utf8") : "";
    const compareNext = stableCompare
        ? stableManifestJson(JSON.parse(nextContent))
        : nextContent;
    const comparePrev = stableCompare && prev ? stableManifestJson(JSON.parse(prev)) : prev;
    if (comparePrev !== compareNext) {
        console.error(`  ✗ out of date: ${rel} (run: npm run sync:agent)`);
        process.exitCode = 1;
    } else {
        console.log(`  ✓ ${rel}`);
    }
}

async function main() {
    console.log(checkOnly ? "🔍 Checking agent manifest…\n" : "🔄 Syncing agent manifest…\n");

    const constantsSrc = await readFile(path.join(root, "lib/site/constants.js"), "utf8");
    const routes = parseSiteRoutes(constantsSrc);

    for (const r of routes) {
        const pageFile = path.join(root, pagePathForRoute(r.path));
        if (!existsSync(pageFile)) {
            console.error(`❌ Missing page for ${r.path}: expected ${pagePathForRoute(r.path)}`);
            process.exit(1);
        }
    }

    const pkg = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
    const scripts = parsePackageScripts(pkg);

    const manifest = {
        generatedAt: new Date().toISOString(),
        routes,
        scripts,
    };

    await mkdir(path.join(root, "docs/generated"), { recursive: true });
    await writeOrCheck(
        path.join(root, "docs/generated/manifest.json"),
        `${JSON.stringify(manifest, null, 2)}\n`,
        { stableCompare: true }
    );

    let llms = await readFile(path.join(root, "llms.txt"), "utf8");
    llms = replaceBetweenMarkers(
        llms,
        "<!-- AGENT-SYNC:ROUTES:START -->",
        "<!-- AGENT-SYNC:ROUTES:END -->",
        renderRoutesSection(routes)
    );
    await writeOrCheck(path.join(root, "llms.txt"), llms);

    let agents = await readFile(path.join(root, "AGENTS.md"), "utf8");
    agents = replaceBetweenMarkers(
        agents,
        "<!-- AGENT-SYNC:SCRIPTS:START -->",
        "<!-- AGENT-SYNC:SCRIPTS:END -->",
        renderScriptsTable(scripts)
    );
    await writeOrCheck(path.join(root, "AGENTS.md"), agents);

    if (process.exitCode === 1) {
        console.error("\n❌ Agent manifest out of sync. Run: npm run sync:agent\n");
    } else {
        console.log(checkOnly ? "\n✅ Agent manifest in sync\n" : "\n✅ Agent manifest synced\n");
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
