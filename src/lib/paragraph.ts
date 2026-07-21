/**
 * Paragraph integration for @thatalexpalmer
 *
 * Public posts: GET /v1/publications/{id}/posts (no auth)
 * Subscribe:    POST /v1/subscribers with Bearer API key
 * @see https://paragraph.com/docs/api-reference/subscribers/add-a-new-subscriber
 * @see https://public.api.paragraph.com/api  (OpenAPI server)
 */

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

/** Fetch recent posts. Never throws — returns [] on failure so the homepage still builds. */
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
 * Add a subscriber via Paragraph's official API.
 * Publication is identified by the API key (not the publication id in the body).
 *
 *   curl -X POST "https://public.api.paragraph.com/api/v1/subscribers" \
 *     -H "Authorization: Bearer $PARAGRAPH_API_KEY" \
 *     -H "Content-Type: application/json" \
 *     -d '{"email": "reader@example.com"}'
 */
export async function addSubscriber(email: string): Promise<SubscribeResult> {
    const apiKey = process.env.PARAGRAPH_API_KEY;
    if (!apiKey) {
        return {
            ok: false,
            error: "Missing PARAGRAPH_API_KEY on the server.",
            status: 503,
        };
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
            const body = (await res.json()) as { msg?: string; message?: string; success?: boolean };
            msg = body.msg || body.message || msg;
        } catch {
            // ignore parse errors
        }

        // Map auth failures to a clearer server-config message
        if (res.status === 401 || res.status === 403) {
            return { ok: false, error: "Subscribe is misconfigured (invalid API key).", status: res.status };
        }

        return { ok: false, error: msg, status: res.status };
    } catch {
        return { ok: false, error: "Network error. Try again later.", status: 502 };
    }
}

export function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}
