import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
    console.log('Ping invoked', { method: req.method, url: req.url });

    const body = {
        ok: true,
        message: 'pong!',
        time: Date.now(),
    };

    res.status(200).json(body);
}
