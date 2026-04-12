import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.lanzoor.dev');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { code } = req.body;

    if (code === process.env.NEXT_PUBLIC_GATEWAY) {
        return res.status(200).json({
            message: process.env.NEXT_PUBLIC_BACKGROUND_URL,
            content: process.env.NEXT_PUBLIC_NOTICE_SECOND_CONTENT,
        });
    } else {
        return res.status(403);
    }
}
