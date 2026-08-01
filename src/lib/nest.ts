/**
 * Nest public read API — vault discovery + holder/TVL stats.
 * @see https://docs.nest.credit/developers/api/
 * @see https://api.nest.credit/v1/vaults
 */

export const NEST_API_BASE = process.env.NEST_API_BASE_URL || "https://api.nest.credit/v1";
export const NEST_STATS_SOURCE_URL = "https://api.nest.credit/v1/vaults";
export const NEST_URL = "https://nest.credit";

export type NestStats = {
    fetchedAt: string;
    source: string;
    vaultCount: number;
    /** Σ numHolders — NOT unique wallets */
    totalHolders: number;
    totalTvl: number;
    /** compact + "+" suffix required, e.g. "181k+" */
    totalHoldersLabel: string;
    /** e.g. "$142M" */
    totalTvlLabel: string;
    vaults?: Array<{ slug?: string; name?: string; numHolders: number; tvl: number }>;
};

type NestVault = {
    slug?: unknown;
    name?: unknown;
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

function optionalString(value: unknown): string | undefined {
    return typeof value === "string" && value.length > 0 ? value : undefined;
}

/** Sum numHolders + sum tvl across vaults. Throws on empty/invalid input. */
export function aggregateNestVaults(vaults: NestVault[], fetchedAt = new Date().toISOString()): NestStats {
    if (vaults.length === 0) {
        throw new Error("[nest] vaults response was empty");
    }

    let totalTvl = 0;
    let totalHolders = 0;
    const normalized: NonNullable<NestStats["vaults"]> = [];

    vaults.forEach((vault, index) => {
        if (!vault || !isNonNegativeFiniteNumber(vault.tvl) || !isNonNegativeFiniteNumber(vault.numHolders)) {
            throw new Error(`[nest] vault ${index} has invalid holder or TVL data`);
        }

        totalTvl += vault.tvl;
        totalHolders += vault.numHolders;
        normalized.push({
            slug: optionalString(vault.slug),
            name: optionalString(vault.name),
            numHolders: vault.numHolders,
            tvl: vault.tvl,
        });
    });

    return {
        fetchedAt,
        source: NEST_STATS_SOURCE_URL,
        vaultCount: vaults.length,
        totalHolders,
        totalTvl,
        totalHoldersLabel: `${formatCompactCount(totalHolders)}+`,
        totalTvlLabel: formatUsdCompact(totalTvl),
        vaults: normalized,
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
