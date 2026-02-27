import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        console.log('Ping invoked!', { method: req.method, url: req.url });

        const userId = process.env.DISCORD_USER_ID;
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);

        const data = await response.json();

        const body = {
            ok: true,
            time: Date.now(),
            data,
        };

        res.status(200).json(body);
    } catch (err: any) {
        res.status(400).json({ ok: false, error: err.message });
    }
}
