export default function handler(req: any, res: any) {
    console.log('Ping invoked', { method: req.method, url: req.url });
    res.status(200).json({
        ok: true,
        message: 'pong!',
        time: Date.now(),
    });
}
