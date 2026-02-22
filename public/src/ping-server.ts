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

const serverStatus = document.getElementById('server-status')!;
const pingDisplay = document.getElementById('ping-display')!;
const updateDisplay = document.getElementById('update-display')!;

let defaultUptimeDisplay = updateDisplay.textContent;

let lastUpdated: number | undefined;

async function updateServerStatus() {
    const fetchResult = await pingServer('https://lanzoor.dev/api/status/');
    if (fetchResult) {
        updateDisplay.textContent = new Date(fetchResult.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric' });

        serverStatus.textContent = '🟢 Online';
    } else {
        updateDisplay.textContent = defaultUptimeDisplay;

        serverStatus.textContent = '🔴 Troublesome';
    }

    lastUpdated = Date.now();
}

document.addEventListener('DOMContentLoaded', () => {
    updateServerStatus();
    setInterval(updateServerStatus, 30000);
});

function updateLastUpdatedDisplay() {
    if (lastUpdated) {
        const currentTime = Date.now();
        const differenceMs = currentTime - lastUpdated;
        const differenceSec = Math.floor(differenceMs / 1000);

        pingDisplay.textContent = `${differenceSec} seconds ago`;
    } else {
        pingDisplay.textContent = 'not pinged yet';
    }

    requestAnimationFrame(updateLastUpdatedDisplay);
}

updateLastUpdatedDisplay();
