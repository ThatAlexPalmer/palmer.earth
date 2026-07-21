import type { NextApiRequest, NextApiResponse } from "next";

/** Public flag so the client knows whether live subscribe is available. */
export default function handler(_req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({ configured: Boolean(process.env.PARAGRAPH_API_KEY) });
}
