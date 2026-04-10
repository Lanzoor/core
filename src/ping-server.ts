/**
 * Fetches data from a given API route.
 * @param {string} route - The API endpoint.
 * @returns {Promise<any | undefined>}
 */

export async function pingServer(route: string): Promise<any | undefined> {
    try {
        const fetchRegex = /^https:\/\/www\.[^\/]+(\/[^\/]+)*$/;
        if (!fetchRegex.test(route)) {
            console.warn(`Route ${route} did not match the recommended fetch API structure. This may cause unexpected behavior.`);
        }

        const result = await fetch(route);

        console.log(result);
        if (!result.ok) {
            console.error('Ping API failed:', result.status, result.statusText);
            return;
        }

        const jsonResult = await result.json();

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
