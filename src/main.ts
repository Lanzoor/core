export namespace Core {
    /**
     * Fetches data from a given API route.
     * @param {string} route - The API endpoint.
     * @returns {Promise<any | undefined>}
     */

    export async function pingServer(route: string, options?: RequestInit): Promise<any | undefined> {
        try {
            const fetchRegex = /^https:\/\/(www|api)\.[^/]+(\/.*)?$/;
            if (!fetchRegex.test(route)) {
                console.warn(`Route ${route} did not match the recommended fetch API structure. This may cause unexpected behavior.`);
            }

            const result = await fetch(route, options);

            console.log(result);
            if (!result.ok) {
                console.error('Ping API failed:', result.status, result.statusText);
                return;
            }

            const jsonResult = await result.json();

            if (jsonResult.ok === true) {
                return jsonResult;
            } else {
                console.error('Ping API responded with error.\n', jsonResult);
                return;
            }
        } catch (err) {
            console.error('Ping API request error.\n', err);
            return;
        }
    }

    export function enableSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', (event) => {
                event.preventDefault();
                const targetElement = event.currentTarget as HTMLAnchorElement;
                const target = document.querySelector(targetElement.getAttribute('href')!);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    export function loadCSS(href: string) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }

    export function pickRandom<T>(arr: T[]): T {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    export function randInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    export function isMobileDevice() {
        return (navigator as any).userAgentData?.mobile || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || ('ontouchstart' in window && navigator.maxTouchPoints > 0);
    }

    export async function sleep(timeMs: number): Promise<any> {
        return new Promise((p) => setTimeout(p, timeMs));
    }
}
