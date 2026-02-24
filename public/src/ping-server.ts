async function pingServer(route: string): Promise<any | undefined> {
    try {
        const res = await fetch(route);

        if (!res.ok) {
            console.error('Ping API failed:', res.status, res.statusText);
            return;
        }

        const jsonResult = await res.json();

        if (jsonResult.ok === true) {
            return jsonResult;
        } else {
            console.error('Ping API responded with error:', jsonResult);
            return;
        }
    } catch (err) {
        console.error('Ping API request error:', err);
        return;
    }
}
