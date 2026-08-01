/**
 * Fetch Nest vaults, aggregate SUM holders + SUM TVL (same rules as src/lib/nest.ts),
 * and write src/data/nest-stats.json only on success.
 *
 * On empty/invalid Nest data: exit non-zero and do not overwrite the last good JSON.
 *
 * Usage: node scripts/refresh-nest-stats.mjs
 *        pnpm nest:refresh
 */

import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_PATH = path.join(ROOT, "src", "data", "nest-stats.json");

const NEST_API_BASE = process.env.NEST_API_BASE_URL || "https://api.nest.credit/v1";
const NEST_STATS_SOURCE_URL = "https://api.nest.credit/v1/vaults";
const FETCH_TIMEOUT_MS = 15_000;

function formatCompactCount(n) {
    if (n >= 1_000_000) {
        const v = n / 1_000_000;
        return `${v >= 10 ? Math.round(v) : v.toFixed(1).replace(/\.0$/, "")}M`;
    }
    if (n >= 1_000) {
        const v = n / 1_000;
        return `${v >= 10 ? Math.round(v) : v.toFixed(1).replace(/\.0$/, "")}k`;
    }
    return `${Math.round(n)}`;
}

function formatUsdCompact(n) {
    if (n >= 1_000_000_000) {
        const v = n / 1_000_000_000;
        return `$${v >= 10 ? Math.round(v) : v.toFixed(1).replace(/\.0$/, "")}B`;
    }
    if (n >= 1_000_000) {
        const v = n / 1_000_000;
        return `$${v >= 10 ? Math.round(v) : v.toFixed(1).replace(/\.0$/, "")}M`;
    }
    if (n >= 1_000) {
        const v = n / 1_000;
        return `$${v >= 10 ? Math.round(v) : v.toFixed(1).replace(/\.0$/, "")}k`;
    }
    return `$${Math.round(n)}`;
}

function isNonNegativeFiniteNumber(value) {
    return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

/** Match aggregateNestVaults in src/lib/nest.ts; omit vaults[] from committed file. */
function aggregateNestVaults(vaults, fetchedAt = new Date().toISOString()) {
    if (vaults.length === 0) {
        throw new Error("[nest] vaults response was empty");
    }

    let totalTvl = 0;
    let totalHolders = 0;

    vaults.forEach((vault, index) => {
        if (!vault || !isNonNegativeFiniteNumber(vault.tvl) || !isNonNegativeFiniteNumber(vault.numHolders)) {
            throw new Error(`[nest] vault ${index} has invalid holder or TVL data`);
        }

        totalTvl += vault.tvl;
        totalHolders += vault.numHolders;
    });

    return {
        fetchedAt,
        source: NEST_STATS_SOURCE_URL,
        vaultCount: vaults.length,
        totalHolders,
        totalTvl,
        totalHoldersLabel: `${formatCompactCount(totalHolders)}+`,
        totalTvlLabel: formatUsdCompact(totalTvl),
    };
}

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

async function main() {
    const vaults = await fetchVaults();
    const stats = aggregateNestVaults(vaults);

    await mkdir(path.dirname(OUT_PATH), { recursive: true });
    await writeFile(OUT_PATH, `${JSON.stringify(stats, null, 4)}\n`, "utf8");

    console.log(
        `[nest] wrote ${path.relative(ROOT, OUT_PATH)}: vaults=${stats.vaultCount} holders=${stats.totalHoldersLabel} tvl=${stats.totalTvlLabel}`,
    );
}

main().catch((err) => {
    console.error(err?.message || err);
    process.exit(1);
});
