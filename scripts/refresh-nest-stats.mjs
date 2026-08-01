/**
 * Fetch Nest vaults, aggregate SUM holders + SUM TVL (via shared nest-aggregate.mjs),
 * and write src/data/nest-stats.json only when metrics change (or file is missing).
 *
 * On empty/invalid Nest data: exit non-zero and do not overwrite the last good JSON.
 * If only fetchedAt would change (holders/TVL/count flat), skip write so GHA has nothing to commit.
 *
 * Usage: node scripts/refresh-nest-stats.mjs
 *        pnpm nest:refresh
 */

import { readFile, writeFile, mkdir, rename } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { aggregateNestVaults } from "../src/lib/nest-aggregate.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_PATH = path.join(ROOT, "src", "data", "nest-stats.json");

const NEST_API_BASE = process.env.NEST_API_BASE_URL || "https://api.nest.credit/v1";
const FETCH_TIMEOUT_MS = 15_000;

async function fetchVaults() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
        const res = await fetch(`${NEST_API_BASE}/vaults`, {
            headers: { Accept: "application/json" },
            cache: "no-store",
            signal: controller.signal,
        });

        if (!res.ok) {
            throw new Error(`[nest] vaults fetch failed: ${res.status}`);
        }

        const body = await res.json();
        if (!Array.isArray(body?.data)) {
            throw new Error("[nest] vaults response did not contain an array");
        }

        return body.data;
    } finally {
        clearTimeout(timeout);
    }
}

async function readPreviousStats() {
    try {
        const raw = await readFile(OUT_PATH, "utf8");
        return JSON.parse(raw);
    } catch (err) {
        if (err && (err.code === "ENOENT" || err.name === "SyntaxError")) {
            return null;
        }
        throw err;
    }
}

/** True when vaultCount / totalHolders / totalTvl differ (ignore fetchedAt). */
function metricsChanged(prev, next) {
    if (!prev || typeof prev !== "object") {
        return true;
    }
    return (
        prev.vaultCount !== next.vaultCount ||
        prev.totalHolders !== next.totalHolders ||
        prev.totalTvl !== next.totalTvl
    );
}

async function writeStatsAtomic(stats) {
    await mkdir(path.dirname(OUT_PATH), { recursive: true });
    const tmpPath = `${OUT_PATH}.${process.pid}.tmp`;
    const body = `${JSON.stringify(stats, null, 4)}\n`;
    await writeFile(tmpPath, body, "utf8");
    await rename(tmpPath, OUT_PATH);
}

async function main() {
    const vaults = await fetchVaults();
    // Committed snapshot omits vaults[] (includeVaults defaults false).
    const stats = aggregateNestVaults(vaults);
    const previous = await readPreviousStats();

    if (!metricsChanged(previous, stats)) {
        console.log(
            `[nest] metrics unchanged (vaults=${stats.vaultCount} holders=${stats.totalHoldersLabel} tvl=${stats.totalTvlLabel}); skipped write`,
        );
        return;
    }

    await writeStatsAtomic(stats);

    console.log(
        `[nest] wrote ${path.relative(ROOT, OUT_PATH)}: vaults=${stats.vaultCount} holders=${stats.totalHoldersLabel} tvl=${stats.totalTvlLabel}`,
    );
}

main().catch((err) => {
    console.error(err?.message || err);
    process.exit(1);
});
