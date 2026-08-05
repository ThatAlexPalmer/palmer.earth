/**
 * Nest public read API — vault discovery + holder/TVL aggregate.
 *
 * Freshness model: numbers refresh on visit. The homepage is statically
 * generated and revalidated by Next ISR, so the first visitor after the
 * window expires triggers a background re-fetch. `src/data/nest-stats.json`
 * is only a fallback for when the API is unreachable, so the page never 500s.
 *
 * @see https://docs.nest.credit/developers/api/
 * @see https://api.nest.credit/v1/vaults
 */

import committedNestStats from "@/data/nest-stats.json";

export const NEST_API_BASE = process.env.NEST_API_BASE_URL || "https://api.nest.credit/v1";
export const NEST_STATS_SOURCE_URL = "https://api.nest.credit/v1/vaults";
export const NEST_URL = "https://nest.credit";

/** Keep in sync with the `revalidate` export in src/app/page.tsx. */
export const NEST_REVALIDATE_SECONDS = 3600;

const FETCH_TIMEOUT_MS = 5_000;

export type NestStats = {
    fetchedAt: string;
    source: string;
    vaultCount: number;
    /** Σ numHolders across vaults */
    totalHolders: number;
    totalTvl: number;
    /** compact + "+" suffix, e.g. "181k+" */
    totalHoldersLabel: string;
    /** e.g. "$126M" */
    totalTvlLabel: string;
};

type NestVault = {
    vaultAddress?: unknown;
    symbol?: unknown;
    tvl?: unknown;
    numHolders?: unknown;
};

type NestVaultsResponse = {
    data?: unknown;
};

/**
 * `GET /vaults` defaults to `status=active`, which is only the 11 vaults on the
 * public docs list — it omits partner books like nETHERFI, nBYBIT* and nGRVT*.
 * Nest Studio's "Live Vaults" total is every vault except the `disabled` ones
 * (pUSD, test and dust books), so we ask for all and subtract those.
 */
type NestVaultStatus = "all" | "disabled";

function vaultKey(vault: NestVault): string {
    const address = typeof vault.vaultAddress === "string" ? vault.vaultAddress : "";
    const symbol = typeof vault.symbol === "string" ? vault.symbol : "";
    return (address || symbol).toLowerCase();
}

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

function isNonEmptyString(value: unknown): value is string {
    return typeof value === "string" && value.length > 0;
}

/** Validate a NestStats payload; throws when the shape is wrong. */
export function parseNestStats(value: unknown): NestStats {
    if (!value || typeof value !== "object") {
        throw new Error("[nest] stats payload missing or not an object");
    }

    const v = value as Record<string, unknown>;
    if (
        !isNonEmptyString(v.fetchedAt) ||
        !isNonEmptyString(v.source) ||
        !isNonNegativeFiniteNumber(v.vaultCount) ||
        !isNonNegativeFiniteNumber(v.totalHolders) ||
        !isNonNegativeFiniteNumber(v.totalTvl) ||
        !isNonEmptyString(v.totalHoldersLabel) ||
        !isNonEmptyString(v.totalTvlLabel)
    ) {
        throw new Error("[nest] stats payload has invalid shape");
    }

    return {
        fetchedAt: v.fetchedAt,
        source: v.source,
        vaultCount: v.vaultCount,
        totalHolders: v.totalHolders,
        totalTvl: v.totalTvl,
        totalHoldersLabel: v.totalHoldersLabel,
        totalTvlLabel: v.totalTvlLabel,
    };
}

/** Last known-good snapshot committed to the repo. */
export function getCommittedNestStats(): NestStats {
    return parseNestStats(committedNestStats);
}

/** Sum numHolders + sum tvl across every vault. Throws on empty/invalid input. */
export function aggregateNestVaults(vaults: NestVault[], fetchedAt = new Date().toISOString()): NestStats {
    if (!Array.isArray(vaults) || vaults.length === 0) {
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

async function fetchVaults(status: NestVaultStatus, signal: AbortSignal): Promise<NestVault[]> {
    const res = await fetch(`${NEST_API_BASE}/vaults?status=${status}`, {
        headers: { Accept: "application/json" },
        next: { revalidate: NEST_REVALIDATE_SECONDS },
        signal,
    });

    if (!res.ok) {
        throw new Error(`[nest] vaults?status=${status} fetch failed: ${res.status}`);
    }

    const body = (await res.json()) as NestVaultsResponse;
    if (!Array.isArray(body.data)) {
        throw new Error(`[nest] vaults?status=${status} response did not contain an array`);
    }

    return body.data as NestVault[];
}

/** Live vault totals across every non-disabled vault. Throws on transport or shape failure. */
export async function fetchNestStats(): Promise<NestStats> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
        const [everyVault, disabledVaults] = await Promise.all([fetchVaults("all", controller.signal), fetchVaults("disabled", controller.signal)]);

        const disabled = new Set(disabledVaults.map(vaultKey).filter(Boolean));
        const liveVaults = everyVault.filter((vault) => !disabled.has(vaultKey(vault)));
        const stats = aggregateNestVaults(liveVaults);

        console.info(
            `[nest] ${stats.vaultCount} live vaults (${everyVault.length} total − ${disabled.size} disabled) · ` +
                `${stats.totalTvlLabel} TVL · ${stats.totalHoldersLabel} holders`,
        );

        return stats;
    } finally {
        clearTimeout(timeout);
    }
}

/**
 * Page entry point: live figures when Nest answers, last-known snapshot when
 * it doesn't. Never throws.
 */
export async function loadNestStats(): Promise<NestStats> {
    try {
        return await fetchNestStats();
    } catch (error) {
        console.warn("[nest] live fetch failed; falling back to committed snapshot", error);
        return getCommittedNestStats();
    }
}
