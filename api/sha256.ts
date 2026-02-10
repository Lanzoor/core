import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHash } from 'crypto';

export default function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ ok: false, error: 'method not allowed' });
    }

    const text = req.body?.text;
    if (typeof text !== 'string') {
        return res.status(400).json({ ok: false, error: 'invalid input type' });
    }

    const result = createHash('sha256').update(text).digest('hex');

    const body = {
        ok: true,
        time: Date.now(),
        result,
    };

    res.status(200).json(body);
}
