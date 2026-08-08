import { addSubscriber, isValidEmail } from "@/lib/paragraph";

type Body = { email?: string };

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

    const failed = result as { ok: false; status?: number };
    const upstream = failed.status && failed.status >= 400 ? failed.status : 502;
    const clientStatus = upstream === 401 || upstream === 403 ? 503 : upstream;
    const error = clientStatus >= 500 ? "Subscriptions are temporarily unavailable. Try again later." : "Could not subscribe. Try again.";
    return Response.json({ ok: false, error }, { status: clientStatus });
}
