import { addSubscriber, isValidEmail } from "@/lib/paragraph";

type Body = { email?: string };

/** POST /api/subscribe { "email": "reader@example.com" }
 * @see https://paragraph.com/docs/api-reference/subscribers/add-a-new-subscriber
 */
export async function POST(request: Request) {
    let body: Body;
    try {
        body = (await request.json()) as Body;
    } catch {
        return Response.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
    }

    const trimmed = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    if (!trimmed || !isValidEmail(trimmed)) {
        return Response.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
    }

    const result = await addSubscriber(trimmed);
    if (result.ok === true) {
        return Response.json({ ok: true });
    }

    const failed = result as { ok: false; error: string; status?: number };
    const upstream = failed.status && failed.status >= 400 ? failed.status : 502;
    const clientStatus = upstream === 401 || upstream === 403 ? 503 : upstream;
    return Response.json({ ok: false, error: failed.error }, { status: clientStatus });
}
