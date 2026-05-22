#!/usr/bin/env node
/**
 * Lighthouse performance audit for shareable reports.
 *
 * Usage:
 *   npm run perf              # server already running (dev or start)
 *   npm run perf:full         # build → start → audit → stop
 *   npm run perf -- --mobile  # mobile form factor
 */

import { spawn } from "node:child_process";
import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const REPORT_DIR = path.join(ROOT, "perf-reports");

const DEFAULT_ROUTES = ["/", "/skills", "/about", "/projects", "/contact"];
const DEFAULT_PORT = Number(process.env.PERF_PORT || 3000);
const DEFAULT_BASE = process.env.PERF_URL || `http://localhost:${DEFAULT_PORT}`;

function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

function parseArgs(argv) {
    const opts = {
        baseUrl: DEFAULT_BASE,
        routes: [...DEFAULT_ROUTES],
        startServer: false,
        mobile: false,
        skipBundle: false,
    };

    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        if (arg === "--start") opts.startServer = true;
        else if (arg === "--mobile") opts.mobile = true;
        else if (arg === "--skip-bundle") opts.skipBundle = true;
        else if (arg === "--url" && argv[i + 1]) {
            opts.baseUrl = argv[++i].replace(/\/$/, "");
        } else if (arg === "--routes" && argv[i + 1]) {
            opts.routes = argv[++i].split(",").map((r) => (r.startsWith("/") ? r : `/${r}`));
        } else if (arg === "--help" || arg === "-h") {
            console.log(`
HUD portfolio performance reporter

  npm run perf              Audit routes (server must be running)
  npm run perf:full         Build, start production server, audit, stop
  npm run perf -- --mobile  Mobile Lighthouse profile

Options:
  --url <base>       Base URL (default: http://localhost:3000)
  --routes a,b,c     Comma-separated paths (default: all main routes)
  --start            Start "next start" before auditing (used by perf:full)
  --mobile           Mobile form factor
  --skip-bundle      Skip .next chunk size summary

Output:
  perf-reports/latest.json   Full metrics (paste into chat)
  perf-reports/latest.md     Human-readable summary
  perf-reports/<timestamp>/  Archived copy
`);
            process.exit(0);
        }
    }

    return opts;
}

async function waitForServer(baseUrl, attempts = 45) {
    for (let i = 0; i < attempts; i++) {
        try {
            const res = await fetch(baseUrl, { signal: AbortSignal.timeout(3000) });
            if (res.status < 500) return true;
        } catch {
            /* retry */
        }
        await sleep(1000);
    }
    return false;
}

function startNextServer(port) {
    if (!existsSync(path.join(ROOT, ".next"))) {
        console.error("❌ No production build (.next). Run: npm run build");
        process.exit(1);
    }

    const proc = spawn("npx", ["next", "start", "-p", String(port)], {
        cwd: ROOT,
        stdio: ["ignore", "pipe", "pipe"],
        env: { ...process.env, NODE_ENV: "production" },
    });

    proc.stdout?.on("data", (d) => process.stdout.write(d));
    proc.stderr?.on("data", (d) => process.stderr.write(d));

    return proc;
}

async function collectBundleSizes() {
    const staticDir = path.join(ROOT, ".next", "static", "chunks");
    if (!existsSync(staticDir)) return null;

    const files = await readdir(staticDir);
    const chunks = [];

    for (const file of files) {
        if (!file.endsWith(".js")) continue;
        const full = path.join(staticDir, file);
        const st = await stat(full);
        chunks.push({ file, kb: Math.round(st.size / 1024) });
    }

    chunks.sort((a, b) => b.kb - a.kb);
    const totalKb = chunks.reduce((s, c) => s + c.kb, 0);

    return {
        totalJsKb: totalKb,
        topChunks: chunks.slice(0, 12),
        chunkCount: chunks.length,
    };
}

function extractRouteMetrics(lhr, route) {
    const a = lhr.audits;
    const score = (cat) =>
        lhr.categories[cat]?.score != null ? Math.round(lhr.categories[cat].score * 100) : null;

    return {
        route,
        url: lhr.finalUrl,
        performance: score("performance"),
        accessibility: score("accessibility"),
        bestPractices: score("best-practices"),
        fcp: a["first-contentful-paint"]?.displayValue ?? "—",
        lcp: a["largest-contentful-paint"]?.displayValue ?? "—",
        tbt: a["total-blocking-time"]?.displayValue ?? "—",
        cls: a["cumulative-layout-shift"]?.displayValue ?? "—",
        speedIndex: a["speed-index"]?.displayValue ?? "—",
        tti: a["interactive"]?.displayValue ?? "—",
        fcpMs: a["first-contentful-paint"]?.numericValue ?? null,
        lcpMs: a["largest-contentful-paint"]?.numericValue ?? null,
        tbtMs: a["total-blocking-time"]?.numericValue ?? null,
        clsValue: a["cumulative-layout-shift"]?.numericValue ?? null,
    };
}

async function auditRoute(url, chrome, mobile) {
    const options = {
        logLevel: "error",
        output: "json",
        onlyCategories: ["performance", "accessibility", "best-practices"],
        port: chrome.port,
        formFactor: mobile ? "mobile" : "desktop",
        screenEmulation: mobile ? undefined : { disabled: true },
    };

    const result = await lighthouse(url, options);
    return result?.lhr;
}

function buildMarkdown(report) {
    const lines = [
        "# Portfolio performance report",
        "",
        `**Generated:** ${report.generatedAt}`,
        `**Base URL:** ${report.baseUrl}`,
        `**Mode:** ${report.mode}`,
        `**Machine:** ${report.environment}`,
        "",
    ];

    if (report.bundle) {
        lines.push(
            "## Bundle (production build)",
            "",
            `- Total JS chunks: **${report.bundle.totalJsKb} KB** (${report.bundle.chunkCount} files)`,
            "",
            "| Chunk | Size (KB) |",
            "|-------|-----------|"
        );
        for (const c of report.bundle.topChunks) {
            lines.push(`| ${c.file} | ${c.kb} |`);
        }
        lines.push("");
    }

    lines.push(
        "## Lighthouse by route",
        "",
        "| Route | Perf | A11y | LCP | FCP | TBT | CLS |",
        "|-------|------|------|-----|-----|-----|-----|"
    );

    for (const r of report.routes) {
        lines.push(
            `| ${r.route} | ${r.performance ?? "—"} | ${r.accessibility ?? "—"} | ${r.lcp} | ${r.fcp} | ${r.tbt} | ${r.cls} |`
        );
    }

    const avgPerf = Math.round(
        report.routes.reduce((s, r) => s + (r.performance ?? 0), 0) / report.routes.length
    );
    const worstLcp = report.routes.reduce(
        (max, r) => (r.lcpMs != null && r.lcpMs > max ? r.lcpMs : max),
        0
    );

    lines.push(
        "",
        "## Summary",
        "",
        `- Average performance score: **${avgPerf}**`,
        `- Worst LCP: **${worstLcp ? `${Math.round(worstLcp)} ms` : "—"}**`,
        "",
        "## Share with Cursor / AI",
        "",
        "Copy `perf-reports/latest.md` or attach `perf-reports/latest.json` in chat.",
        "",
        "```",
        "Please optimize my portfolio using perf-reports/latest.json",
        "```",
        ""
    );

    return lines.join("\n");
}

async function main() {
    const opts = parseArgs(process.argv.slice(2));
    const port = new URL(opts.baseUrl).port || DEFAULT_PORT;
    let serverProc = null;

    console.log("\n🔬 HUD Performance Reporter\n");

    if (opts.startServer) {
        console.log(`▶ Starting production server on port ${port}…`);
        serverProc = startNextServer(port);
        await sleep(2000);
    }

    const ready = await waitForServer(opts.baseUrl);
    if (!ready) {
        console.error(
            `\n❌ Could not reach ${opts.baseUrl}\n\n` +
                `   Start the app first:\n` +
                `     npm run dev     → then npm run perf\n` +
                `     npm run perf:full   (build + start + audit)\n`
        );
        if (serverProc) serverProc.kill("SIGTERM");
        process.exit(1);
    }

    console.log(`✓ Server ready at ${opts.baseUrl}\n`);

    let chrome;
    try {
        chrome = await chromeLauncher.launch({
            chromeFlags: ["--headless", "--no-sandbox", "--disable-gpu"],
        });

        const routeResults = [];
        for (const route of opts.routes) {
            const url = `${opts.baseUrl}${route === "/" ? "" : route}`;
            process.stdout.write(`  Auditing ${route} … `);
            const lhr = await auditRoute(url, chrome, opts.mobile);
            if (!lhr) {
                console.log("failed");
                continue;
            }
            routeResults.push(extractRouteMetrics(lhr, route));
            console.log(`perf ${Math.round((lhr.categories.performance?.score ?? 0) * 100)}`);
        }

        const bundle = opts.skipBundle ? null : await collectBundleSizes();

        const report = {
            generatedAt: new Date().toISOString(),
            baseUrl: opts.baseUrl,
            mode: opts.mobile ? "mobile" : "desktop",
            environment: `${process.platform} · Node ${process.version} · ${process.env.npm_package_name || "portfolio-web"}`,
            routes: routeResults,
            bundle,
        };

        const stamp = report.generatedAt.replace(/[:.]/g, "-");
        const archiveDir = path.join(REPORT_DIR, stamp);
        await mkdir(archiveDir, { recursive: true });
        await mkdir(REPORT_DIR, { recursive: true });

        const json = JSON.stringify(report, null, 2);
        const md = buildMarkdown(report);

        await writeFile(path.join(REPORT_DIR, "latest.json"), json);
        await writeFile(path.join(REPORT_DIR, "latest.md"), md);
        await writeFile(path.join(archiveDir, "report.json"), json);
        await writeFile(path.join(archiveDir, "report.md"), md);

        console.log("\n✅ Reports written:");
        console.log(`   ${path.relative(ROOT, path.join(REPORT_DIR, "latest.md"))}`);
        console.log(`   ${path.relative(ROOT, path.join(REPORT_DIR, "latest.json"))}`);
        console.log(`\n📋 Quick summary (avg perf ${Math.round(routeResults.reduce((s, r) => s + (r.performance ?? 0), 0) / routeResults.length)})\n`);
        console.log(md.split("## Share")[0].trim());
    } finally {
        if (chrome) await chrome.kill();
        if (serverProc) {
            console.log("\n■ Stopping production server…");
            serverProc.kill("SIGTERM");
        }
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
