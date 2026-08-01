import { fetchNestStats } from "@/lib/nest";

/**
 * POST /api/nest-refresh — live Nest vault aggregate (cache: no-store).
 * Auth: Authorization: Bearer $CRON_SECRET only. Does not write the repo.
 * In non-production, optional ?secret= is accepted for local convenience.
 */
export async function POST(request: Request) {
    if (!isAuthorized(request)) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const stats = await fetchNestStats();
        return Response.json(stats);
    } catch (error) {
        console.error("[nest-refresh]", error);
        return Response.json({ error: "Failed to fetch Nest stats" }, { status: 502 });
    }
}

function isAuthorized(request: Request): boolean {
    const secret = process.env.CRON_SECRET;
    if (!secret) {
        // Fail closed when unset (especially production).
        return false;
    }

    const auth = request.headers.get("authorization");
    if (auth === `Bearer ${secret}`) {
        return true;
    }

    // Dev convenience only — never in production.
    if (process.env.NODE_ENV !== "production") {
        const url = new URL(request.url);
        if (url.searchParams.get("secret") === secret) {
            return true;
        }
    }

    return false;
}
