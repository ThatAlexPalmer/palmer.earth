import type { NextApiRequest, NextApiResponse } from "next";
import { addSubscriber, isValidEmail } from "@/lib/paragraph";

type Body = { email?: string };

/**
 * POST /api/subscribe  { "email": "reader@example.com" }
 *
 * Proxies to Paragraph:
 *   POST https://public.api.paragraph.com/api/v1/subscribers
 *   Authorization: Bearer $PARAGRAPH_API_KEY
 *
 * @see https://paragraph.com/docs/api-reference/subscribers/add-a-new-subscriber
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ ok: false, error: "Method not allowed" });
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

    const failed = result as { ok: false; error: string; status?: number };
    const upstream = failed.status && failed.status >= 400 ? failed.status : 502;
    const clientStatus = upstream === 401 || upstream === 403 ? 503 : upstream;
    return res.status(clientStatus).json({ ok: false, error: failed.error });
}
