/**
 * Pure Nest vault aggregation (SUM holders + SUM TVL) shared by:
 * - `src/lib/nest.ts` (page/API path)
 * - `scripts/refresh-nest-stats.mjs` (daily GHA / CLI, no TS toolchain)
 *
 * Keep formatters + aggregate rules here only — do not re-implement in callers.
 * @see https://api.nest.credit/v1/vaults
 */

export const NEST_STATS_SOURCE_URL = "https://api.nest.credit/v1/vaults";

export function formatCompactCount(n) {
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

export function formatUsdCompact(n) {
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

export function isNonNegativeFiniteNumber(value) {
    return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function optionalString(value) {
    return typeof value === "string" && value.length > 0 ? value : undefined;
}

/**
 * Sum numHolders + sum tvl across vaults. Throws on empty/invalid input.
 * @param {Array<{ slug?: unknown; name?: unknown; tvl?: unknown; numHolders?: unknown }>} vaults
 * @param {{ fetchedAt?: string; includeVaults?: boolean }} [opts]
 */
export function aggregateNestVaults(vaults, opts = {}) {
    const fetchedAt = opts.fetchedAt ?? new Date().toISOString();
    const includeVaults = opts.includeVaults === true;

    if (!Array.isArray(vaults) || vaults.length === 0) {
        throw new Error("[nest] vaults response was empty");
    }

    let totalTvl = 0;
    let totalHolders = 0;
    const normalized = [];

    vaults.forEach((vault, index) => {
        if (!vault || !isNonNegativeFiniteNumber(vault.tvl) || !isNonNegativeFiniteNumber(vault.numHolders)) {
            throw new Error(`[nest] vault ${index} has invalid holder or TVL data`);
        }

        totalTvl += vault.tvl;
        totalHolders += vault.numHolders;

        if (includeVaults) {
            normalized.push({
                slug: optionalString(vault.slug),
                name: optionalString(vault.name),
                numHolders: vault.numHolders,
                tvl: vault.tvl,
            });
        }
    });

    const stats = {
        fetchedAt,
        source: NEST_STATS_SOURCE_URL,
        vaultCount: vaults.length,
        totalHolders,
        totalTvl,
        totalHoldersLabel: `${formatCompactCount(totalHolders)}+`,
        totalTvlLabel: formatUsdCompact(totalTvl),
    };

    if (includeVaults) {
        stats.vaults = normalized;
    }

    return stats;
}
