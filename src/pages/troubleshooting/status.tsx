import { createRoot } from 'react-dom/client';
import { Core } from '@/main.js';
import { useEffect, useState } from 'react';

// document.addEventListener('DOMContentLoaded', () => {
//     const serverStatus = document.getElementById('server-status')!;
//     const pingDisplay = document.getElementById('ping-display')!;

//     let lastUpdated: number;

//     async function updateServerStatus() {
//         try {
//             const fetchResult = await Core.pingServer('https://api.lanzoor.dev/status');
//             if (fetchResult) {
//                 serverStatus.textContent = '🟢 Online';
//             } else {
//                 serverStatus.textContent = '🔴 Troublesome';
//             }

//             lastUpdated = Date.now();
//         } catch {
//             serverStatus.textContent = '🔴 Troublesome';
//         }
//     }

//     updateServerStatus();
//     setInterval(updateServerStatus, 30000);

//     function updateLastUpdatedDisplay() {
//         if (lastUpdated) {
//             const currentTime = Date.now();
//             const differenceMs = currentTime - lastUpdated;
//             const differenceSec = Math.floor(differenceMs / 1000);

//             pingDisplay.textContent = `${differenceSec} seconds ago`;
//         } else {
//             pingDisplay.textContent = 'not pinged yet';
//         }
//     }

//     updateLastUpdatedDisplay();
//     setInterval(updateLastUpdatedDisplay, 500);
// });

type StatusMessage = 'not pinged yet' | 'troublesome' | 'offline' | 'online';

type Status = {
    message: StatusMessage;
    interval?: { value: number; grade: string };
};

function gradeInterval(interval: number) {
    if (interval < 100) {
        return 'fast';
    } else if (100 <= interval && interval < 250) {
        return 'great';
    } else if (250 <= interval && interval < 500) {
        return 'average';
    } else if (500 <= interval && interval < 1000) {
        return 'slow';
    } else if (1000 <= interval) {
        return 'awful';
    }

    return 'unavailable';
}

function ServerStatusRoot() {
    const [devStatus, setDevStatus] = useState<Status>({ message: 'not pinged yet' });
    const [apiStatus, setApiStatus] = useState<Status>({ message: 'not pinged yet' });

    useEffect(() => {
        const start = performance.now();

        fetch('https://www.lanzoor.dev')
            .then((res) => {
                const ping = performance.now() - start;

                setDevStatus({
                    message: res.ok ? 'online' : 'troublesome',
                    interval: {
                        value: ping,
                        grade: gradeInterval(ping),
                    },
                });
            })
            .catch(() => {
                setDevStatus({
                    message: 'offline',
                });
            });
    }, []);

    useEffect(() => {
        const start = performance.now();

        fetch('https://api.lanzoor.dev')
            .then((res) => {
                const ping = performance.now() - start;

                setApiStatus({
                    message: res.ok ? 'online' : 'troublesome',
                    interval: { value: ping, grade: gradeInterval(ping) },
                });
            })
            .catch(() => {
                setApiStatus({
                    message: 'offline',
                });
            });
    }, []);

    return (
        <>
            <h1>lanzoor.dev Service Status</h1>

            <p>View real-time server status updates.</p>

            <h2>lanzoor.dev</h2>

            <p>
                Current status: <span>{devStatus.message}</span>
                <br />
                {devStatus.interval && (
                    <>
                        Interval: <span>{devStatus.interval.value}</span>ms
                    </>
                )}
            </p>

            <h2>
                api.lanzoor.dev<b>/status</b>
            </h2>

            <p>
                Current status: <span>{apiStatus.message}</span>
                <br />
                {apiStatus.interval && (
                    <>
                        Interval: <span>{apiStatus.interval.value}</span>ms
                    </>
                )}
            </p>
        </>
    );
}

document.addEventListener('DOMContentLoaded', () => {
    let serverStatusRoot = document.getElementById('server-status');
    if (!serverStatusRoot) return;

    createRoot(serverStatusRoot).render(<ServerStatusRoot />);
});
