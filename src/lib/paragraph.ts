export const PARAGRAPH_PUBLICATION_ID = "CYbcj5aaaKn4zqXpKysG";
export const PARAGRAPH_SLUG = "thatalexpalmer";
export const PARAGRAPH_PUBLICATION_URL = `https://paragraph.com/@${PARAGRAPH_SLUG}`;
export const PARAGRAPH_API_BASE = "https://public.api.paragraph.com/api";

export type ParagraphPost = {
    id: string;
    title: string;
    subtitle?: string;
    slug: string;
    url: string;
    publishedAt: string | null;
    publishedAtLabel: string;
    views: number | null;
    viewsLabel: string | null;
};

type ApiPost = {
    id: string;
    title: string;
    subtitle?: string;
    slug: string;
    publishedAt?: string;
    views?: number;
};

type ApiListResponse = {
    items?: ApiPost[];
};

function formatDate(epochMs: string | undefined): { iso: string | null; label: string } {
    if (!epochMs) return { iso: null, label: "" };
    const n = Number(epochMs);
    if (!Number.isFinite(n) || n <= 0) return { iso: null, label: "" };
    const d = new Date(n);
    return {
        iso: d.toISOString(),
        label: d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" }),
    };
}

export function formatViews(n: number): string {
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

function mapPosts(items: ApiPost[]): ParagraphPost[] {
    return items.map((item) => {
        const { iso, label } = formatDate(item.publishedAt);
        const views = typeof item.views === "number" && Number.isFinite(item.views) ? item.views : null;
        return {
            id: item.id,
            title: item.title,
            subtitle: item.subtitle,
            slug: item.slug,
            url: `${PARAGRAPH_PUBLICATION_URL}/${item.slug}`,
            publishedAt: iso,
            publishedAtLabel: label,
            views,
            viewsLabel: views != null ? formatViews(views) : null,
        };
    });
}

export async function fetchRecentPosts(limit = 5): Promise<ParagraphPost[]> {
    const apiKey = process.env.PARAGRAPH_API_KEY;

    if (apiKey) {
        try {
            const res = await fetch(`${PARAGRAPH_API_BASE}/v1/posts?limit=${limit}&status=published`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
                next: { revalidate: 86_400 },
            });
            if (res.ok) {
                const data = (await res.json()) as ApiListResponse;
                const items = Array.isArray(data.items) ? data.items : [];
                if (items.length > 0) return mapPosts(items);
            } else {
                console.warn(`[paragraph] auth posts fetch failed: ${res.status}`);
            }
        } catch (error) {
            console.warn("[paragraph] auth posts fetch error", error);
        }
    }

    try {
        const url = `${PARAGRAPH_API_BASE}/v1/publications/${PARAGRAPH_PUBLICATION_ID}/posts?limit=${limit}`;
        const res = await fetch(url, {
            headers: { Accept: "application/json" },
            next: { revalidate: 86_400 },
        });

        if (!res.ok) {
            console.warn(`[paragraph] posts fetch failed: ${res.status}`);
            return [];
        }

        const data = (await res.json()) as ApiListResponse;
        const items = Array.isArray(data.items) ? data.items : [];
        return mapPosts(items);
    } catch (error) {
        console.warn("[paragraph] posts fetch error", error);
        return [];
    }
}

export type SubscribeResult = { ok: true } | { ok: false; status?: number };

export async function addSubscriber(email: string): Promise<SubscribeResult> {
    const apiKey = process.env.PARAGRAPH_API_KEY;
    if (!apiKey) {
        console.error("[paragraph] subscription unavailable: missing server configuration");
        return { ok: false, status: 503 };
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8_000);

    try {
        const res = await fetch(`${PARAGRAPH_API_BASE}/v1/subscribers`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ email }),
            signal: controller.signal,
        });

        if (res.ok) {
            return { ok: true };
        }

        console.warn(`[paragraph] subscription request failed: ${res.status}`);
        return { ok: false, status: res.status };
    } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
            return { ok: false, status: 504 };
        }
        console.error("[paragraph] subscription request failed", error);
        return { ok: false, status: 502 };
    } finally {
        clearTimeout(timeout);
    }
}

export function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}
