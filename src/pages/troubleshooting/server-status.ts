import { Core } from '@/main.js';

document.addEventListener('DOMContentLoaded', () => {
    const serverStatus = document.getElementById('server-status')!;
    const pingDisplay = document.getElementById('ping-display')!;

    let lastUpdated: number;

    async function updateServerStatus() {
        try {
            const fetchResult = await Core.pingServer('https://api.lanzoor.dev/status');
            if (fetchResult) {
                serverStatus.textContent = '🟢 Online';
            } else {
                serverStatus.textContent = '🔴 Troublesome';
            }

            lastUpdated = Date.now();
        } catch {
            serverStatus.textContent = '🔴 Troublesome';
        }
    }

    updateServerStatus();
    setInterval(updateServerStatus, 30000);

    function updateLastUpdatedDisplay() {
        if (lastUpdated) {
            const currentTime = Date.now();
            const differenceMs = currentTime - lastUpdated;
            const differenceSec = Math.floor(differenceMs / 1000);

            pingDisplay.textContent = `${differenceSec} seconds ago`;
        } else {
            pingDisplay.textContent = 'not pinged yet';
        }
    }

    updateLastUpdatedDisplay();
    setInterval(updateLastUpdatedDisplay, 500);
});
