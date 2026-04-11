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
            message: 'Correct. Go on.',
        });
    } else {
        return res.status(403).json({
            message: 'Incorrect. Try again.',
        });
    }
}
