import type { VercelRequest, VercelResponse } from '@vercel/node';

async function pingUrl(url: string) {
    try {
        const start = performance.now();
        await fetch(url, { method: 'HEAD' });
        const end = performance.now();

        return `${(end - start).toFixed(2)}ms`;
    } catch {
        return 'unreachable';
    }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const githubPing = await pingUrl('https://github.com');
        const googlePing = await pingUrl('https://google.com');
        const selfPing = await pingUrl('https://www.lanzoor.dev/api/status');

        return res.status(200).json({
            ok: true,
            time: new Date().toLocaleTimeString(),
            status: 'on',

            githubPing,
            googlePing,
            selfPing,
        });
    } catch (err: any) {
        return res.status(500).json({
            ok: false,
            error: err.message,
        });
    }
}
