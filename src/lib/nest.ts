/**
 * Nest public read API — vault discovery + holder/TVL stats.
 * @see https://docs.nest.credit/developers/api/
 * @see https://api.nest.credit/v1/vaults
 */

export const NEST_API_BASE = process.env.NEST_API_BASE_URL || "https://api.nest.credit/v1";
export const NEST_STATS_SOURCE_URL = "https://api.nest.credit/v1/vaults";
export const NEST_URL = "https://nest.credit";

export type NestStats = {
    totalTvl: number;
    totalVaultHolders: number;
    vaultCount: number;
    fetchedAt: string;
    /** e.g. "$142M" */
    totalTvlLabel: string;
    /** e.g. "181k+" */
    totalVaultHoldersLabel: string;
};

type NestVault = {
    tvl?: unknown;
    numHolders?: unknown;
};

type NestVaultsResponse = {
    data?: unknown;
};

function formatCompactCount(n: number): string {
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

function formatUsdCompact(n: number): string {
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

function isNonNegativeFiniteNumber(value: unknown): value is number {
    return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

export function aggregateNestVaults(vaults: NestVault[], fetchedAt = new Date().toISOString()): NestStats {
    if (vaults.length === 0) {
        throw new Error("[nest] vaults response was empty");
    }

    let totalTvl = 0;
    let totalVaultHolders = 0;

    vaults.forEach((vault, index) => {
        if (!vault || !isNonNegativeFiniteNumber(vault.tvl) || !isNonNegativeFiniteNumber(vault.numHolders)) {
            throw new Error(`[nest] vault ${index} has invalid holder or TVL data`);
        }

        totalTvl += vault.tvl;
        totalVaultHolders += vault.numHolders;
    });

    return {
        totalTvl,
        totalVaultHolders,
        vaultCount: vaults.length,
        fetchedAt,
        totalTvlLabel: formatUsdCompact(totalTvl),
        totalVaultHoldersLabel: `${formatCompactCount(totalVaultHolders)}+`,
    };
}

/** Fetch and aggregate every vault exposed by Nest's public API. */
export async function fetchNestStats(): Promise<NestStats> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5_000);

    try {
        const res = await fetch(`${NEST_API_BASE}/vaults`, {
            headers: { Accept: "application/json" },
            next: { revalidate: 86_400 },
            signal: controller.signal,
        });

        if (!res.ok) {
            throw new Error(`[nest] vaults fetch failed: ${res.status}`);
        }

        const body = (await res.json()) as NestVaultsResponse;
        if (!Array.isArray(body.data)) {
            throw new Error("[nest] vaults response did not contain an array");
        }

        return aggregateNestVaults(body.data as NestVault[]);
    } finally {
        clearTimeout(timeout);
    }
}
