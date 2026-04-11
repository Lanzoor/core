import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const origin = req.headers.origin || '';
    const referer = req.headers.referer || '';
    const SECRET = process.env.NEXT_PUBLIC_USER_ID;

    const isFromSite = origin.includes('lanzoor.dev') || referer.includes('lanzoor.dev');

    if (!isFromSite) {
        return res.status(403).json({
            message: '🟡 Access denied.',
            hint: 'You... must try harder. The connection is fading, and I can only hear you from inside the system.',
        });
    }

    return res.status(200).json({
        message: '🟢 Access granted.',
        code: `You are doing great. I appreciate that. Here's the code. Use it wisely. ${SECRET}`,
    });
}
