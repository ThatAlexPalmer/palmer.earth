/**
 * Nest public read API — vault discovery + holder/TVL stats.
 * @see https://docs.nest.credit/developers/api/
 * @see https://api.nest.credit/v1/vaults
 */

export const NEST_API_BASE = "https://api.nest.credit/v1";
export const NEST_URL = "https://nest.credit";

export type NestStats = {
    totalTvl: number | null;
    maxVaultHolders: number | null;
    vaultCount: number;
    /** e.g. "$140M" */
    totalTvlLabel: string | null;
    /** e.g. "70k" */
    maxVaultHoldersLabel: string | null;
};

type NestVault = {
    name?: string;
    slug?: string;
    tvl?: number | null;
    numHolders?: number | null;
};

type NestVaultsResponse = {
    data?: NestVault[];
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

const empty: NestStats = {
    totalTvl: null,
    maxVaultHolders: null,
    vaultCount: 0,
    totalTvlLabel: null,
    maxVaultHoldersLabel: null,
};

/**
 * Aggregate public Nest vault stats.
 * - totalTvl: sum of per-vault TVL
 * - maxVaultHolders: largest single-vault numHolders (do NOT sum across vaults —
 *   multi-vault users would be double-counted)
 */
export async function fetchNestStats(): Promise<NestStats> {
    try {
        const res = await fetch(`${NEST_API_BASE}/vaults`, {
            headers: { Accept: "application/json" },
        });
        if (!res.ok) {
            console.warn(`[nest] vaults fetch failed: ${res.status}`);
            return empty;
        }

        const body = (await res.json()) as NestVaultsResponse;
        const vaults = Array.isArray(body.data) ? body.data : [];
        if (vaults.length === 0) return empty;

        let totalTvl = 0;
        let maxHolders = 0;
        let hasTvl = false;
        let hasHolders = false;

        for (const v of vaults) {
            if (typeof v.tvl === "number" && Number.isFinite(v.tvl)) {
                totalTvl += v.tvl;
                hasTvl = true;
            }
            if (typeof v.numHolders === "number" && Number.isFinite(v.numHolders)) {
                hasHolders = true;
                if (v.numHolders > maxHolders) maxHolders = v.numHolders;
            }
        }

        return {
            totalTvl: hasTvl ? totalTvl : null,
            maxVaultHolders: hasHolders ? maxHolders : null,
            vaultCount: vaults.length,
            totalTvlLabel: hasTvl ? formatUsdCompact(totalTvl) : null,
            maxVaultHoldersLabel: hasHolders ? formatCompactCount(maxHolders) : null,
        };
    } catch (err) {
        console.warn("[nest] vaults fetch error", err);
        return empty;
    }
}
