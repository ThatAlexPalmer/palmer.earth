import committedNestStats from "@/data/nest-stats.json";

export const NEST_API_BASE = process.env.NEST_API_BASE_URL || "https://api.nest.credit/v1";
export const NEST_STATS_SOURCE_URL = "https://api.nest.credit/v1/vaults/stats";
export const NEST_URL = "https://nest.credit";

const FETCH_TIMEOUT_MS = 5_000;

export type NestStats = {
    fetchedAt: string;
    source: string;
    totalHolders: number;
    totalTvl: number;
    totalHoldersLabel: string;
    totalTvlLabel: string;
};

export type NestVaultTotals = {
    totalHolders: number;
    totalTvl: number;
};

type NestStatsResponse = {
    data?: unknown;
};

type NestVaultStatus = "all" | "disabled";

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

export function parseNestStats(value: unknown): NestStats {
    if (!value || typeof value !== "object") {
        throw new Error("[nest] stats payload missing or not an object");
    }

    const v = value as Record<string, unknown>;
    if (
        !isNonEmptyString(v.fetchedAt) ||
        !isNonEmptyString(v.source) ||
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
        totalHolders: v.totalHolders,
        totalTvl: v.totalTvl,
        totalHoldersLabel: v.totalHoldersLabel,
        totalTvlLabel: v.totalTvlLabel,
    };
}

export function getCommittedNestStats(): NestStats {
    return parseNestStats(committedNestStats);
}

export function liveNestStats(everyVault: NestVaultTotals, disabledVaults: NestVaultTotals, fetchedAt = new Date().toISOString()): NestStats {
    const totalHolders = everyVault.totalHolders - disabledVaults.totalHolders;
    const totalTvl = everyVault.totalTvl - disabledVaults.totalTvl;

    if (!isNonNegativeFiniteNumber(totalHolders) || !isNonNegativeFiniteNumber(totalTvl)) {
        throw new Error("[nest] live totals resolved to invalid numbers");
    }

    return {
        fetchedAt,
        source: NEST_STATS_SOURCE_URL,
        totalHolders,
        totalTvl,
        totalHoldersLabel: `${formatCompactCount(totalHolders)}+`,
        totalTvlLabel: formatUsdCompact(totalTvl),
    };
}

async function fetchTotals(status: NestVaultStatus, signal: AbortSignal): Promise<NestVaultTotals> {
    const res = await fetch(`${NEST_API_BASE}/vaults/stats?status=${status}`, {
        headers: { Accept: "application/json" },
        cache: "no-store",
        signal,
    });

    if (!res.ok) {
        throw new Error(`[nest] vaults/stats?status=${status} fetch failed: ${res.status}`);
    }

    const body = (await res.json()) as NestStatsResponse;
    if (!body.data || typeof body.data !== "object") {
        throw new Error(`[nest] vaults/stats?status=${status} response did not contain stats`);
    }

    const { totalHolders, totalTvl } = body.data as Record<string, unknown>;
    if (!isNonNegativeFiniteNumber(totalHolders) || !isNonNegativeFiniteNumber(totalTvl)) {
        throw new Error(`[nest] vaults/stats?status=${status} response had invalid totals`);
    }

    return { totalHolders, totalTvl };
}

export async function fetchNestStats(): Promise<NestStats> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
        const [everyVault, disabledVaults] = await Promise.all([fetchTotals("all", controller.signal), fetchTotals("disabled", controller.signal)]);
        const stats = liveNestStats(everyVault, disabledVaults);

        console.info(
            `[nest] live totals = all − disabled · ${stats.totalTvlLabel} TVL · ${stats.totalHoldersLabel} holders ` +
                `(all ${everyVault.totalHolders} − disabled ${disabledVaults.totalHolders})`,
        );

        return stats;
    } finally {
        clearTimeout(timeout);
    }
}

export async function loadNestStats(): Promise<NestStats> {
    try {
        return await fetchNestStats();
    } catch (error) {
        console.warn("[nest] live fetch failed; falling back to committed snapshot", error);
        return getCommittedNestStats();
    }
}
