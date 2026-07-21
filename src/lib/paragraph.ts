/** Paragraph publication for @thatalexpalmer */
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
};

type ApiPost = {
    id: string;
    title: string;
    subtitle?: string;
    slug: string;
    publishedAt?: string;
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
        label: d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
    };
}

/**
 * Fetch recent posts. Never throws — returns [] on failure so the homepage still builds.
 */
export async function fetchRecentPosts(limit = 5): Promise<ParagraphPost[]> {
    try {
        const url = `${PARAGRAPH_API_BASE}/v1/publications/${PARAGRAPH_PUBLICATION_ID}/posts?limit=${limit}`;
        const res = await fetch(url, {
            headers: { Accept: "application/json" },
        });

        if (!res.ok) {
            console.warn(`[paragraph] posts fetch failed: ${res.status}`);
            return [];
        }

        const data = (await res.json()) as ApiListResponse;
        const items = Array.isArray(data.items) ? data.items : [];

        return items.map((item) => {
            const { iso, label } = formatDate(item.publishedAt);
            return {
                id: item.id,
                title: item.title,
                subtitle: item.subtitle,
                slug: item.slug,
                url: `${PARAGRAPH_PUBLICATION_URL}/${item.slug}`,
                publishedAt: iso,
                publishedAtLabel: label,
            };
        });
    } catch (err) {
        console.warn("[paragraph] posts fetch error", err);
        return [];
    }
}

export type SubscribeResult = { ok: true } | { ok: false; error: string; status?: number };

/**
 * Add a subscriber via the authenticated Paragraph API.
 * Requires PARAGRAPH_API_KEY on the server.
 */
export async function addSubscriber(email: string): Promise<SubscribeResult> {
    const apiKey = process.env.PARAGRAPH_API_KEY;
    if (!apiKey) {
        return { ok: false, error: "Subscribe is not configured.", status: 503 };
    }

    try {
        const res = await fetch(`${PARAGRAPH_API_BASE}/v1/subscribers`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ email }),
        });

        if (res.ok) {
            return { ok: true };
        }

        let msg = "Could not subscribe. Try again later.";
        try {
            const body = (await res.json()) as { msg?: string; message?: string };
            msg = body.msg || body.message || msg;
        } catch {
            // ignore parse errors
        }

        return { ok: false, error: msg, status: res.status };
    } catch {
        return { ok: false, error: "Network error. Try again later.", status: 502 };
    }
}

export function isValidEmail(email: string): boolean {
    // Practical validation — not full RFC
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}
