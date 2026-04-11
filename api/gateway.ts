import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const origin = req.headers.origin || '';
    const referer = req.headers.referer || '';

    const isFromSite = origin.includes('lanzoor.dev') || referer.includes('lanzoor.dev');

    if (!isFromSite) {
        return res.status(403).json({
            message: '⚠ Access denied.',
            hint: 'You are not inside the system.',
        });
    }

    return res.status(200).json({
        message: '🟢 Access granted.',
        code: 'GATEWAY-OPEN-1337',
    });
}
