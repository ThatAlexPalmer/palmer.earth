import type { NextApiRequest, NextApiResponse } from "next";
import { addSubscriber, isValidEmail } from "@/lib/paragraph";

type Body = { email?: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    if (!process.env.PARAGRAPH_API_KEY) {
        return res.status(503).json({
            ok: false,
            error: "Subscribe is not configured on this deployment.",
            configured: false,
        });
    }

    const { email } = (req.body || {}) as Body;
    const trimmed = typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!trimmed || !isValidEmail(trimmed)) {
        return res.status(400).json({ ok: false, error: "Enter a valid email address." });
    }

    const result = await addSubscriber(trimmed);
    if (result.ok === true) {
        return res.status(200).json({ ok: true });
    }

    // Note: strictNullChecks is off in this repo, so we can't rely on union narrowing
    const failed = result as { ok: false; error: string; status?: number };
    const upstream = failed.status && failed.status >= 400 ? failed.status : 502;
    // Don't leak upstream 401/403 details to the client
    const clientStatus = upstream === 401 || upstream === 403 ? 502 : upstream;
    return res.status(clientStatus).json({ ok: false, error: failed.error });
}
