import { getCommittedNestStats } from "@/lib/nest";

/** GET /api/nest-stats — committed NestStats JSON (snapshot only). */
export async function GET() {
    try {
        const stats = getCommittedNestStats();
        return Response.json(stats);
    } catch (error) {
        console.error("[nest-stats]", error);
        return Response.json({ error: "Committed nest stats unavailable" }, { status: 500 });
    }
}
