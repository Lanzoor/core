console.info('main.ts import triggered');

export namespace Core {
    /**
     * Fetches data from a given API route.
     * @param {string} route - The API endpoint.
     * @returns {Promise<any | undefined>}
     */

    export async function pingServer(route: string, options?: RequestInit): Promise<any | undefined> {
        try {
            //             const urlRegex = /^https:\/\/(www|api)\.[^/]+(\/.*)?$/;
            //             const pathRegex = /^(\/[a-zA-Z0-9_-]+)+\/?$/;
            //             if (!urlRegex.test(route) || !pathRegex.test(route)) {
            //                 console.warn(`route ${route} did not match the recommended fetch API structure.
            // this warning exits purely for preventing mistakes, and may (or should) be ignored if you know what you're doing`);
            //             }

            const result = await fetch(route, options);

            if (!result.ok) {
                console.error(`failed to ping ${route}: ${route} responded with an error\n\t`, Error(result.statusText));
                return;
            }

            const jsonResult = await result.json();

            if (jsonResult.ok === true) {
                return jsonResult;
            } else {
                console.error(`failed to ping ${route}: ${route} responded with an error\n\t`, Error(jsonResult));
                return jsonResult;
            }
        } catch (error) {
            console.error(`failed to ping service at ${route}\n\t`, error);
        }
    }

    export function pickRandom<T>(array: T[]): T {
        return array[Math.floor(Math.random() * array.length)];
    }

    export function randInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    export async function sleep(timeMs: number): Promise<any> {
        return new Promise((p) => setTimeout(p, timeMs));
    }

    export namespace DOM {
        export function isMobileDevice() {
            return (navigator as any).userAgentData?.mobile || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || ('ontouchstart' in window && navigator.maxTouchPoints > 0);
        }

        export function loadCSS(href: string) {
            const cssInjectionMessage = `\n\ncss injections are intended; for more information, please refer to /troubleshooting/css-injection.html`;

            try {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = href;
                document.head.appendChild(link);
                console.info(
                    `successfully injected <link> tag for ${href}
if the styles somehow don't load, please ensure that the correct CSS file is injected`,
                    cssInjectionMessage
                );
            } catch (error) {
                console.error(`failed to inject <link> tag for ${href}:\n\t`, error, `\nthis may cause weird styles when components are loaded`, cssInjectionMessage);
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
    }
}

export async function trackPageView() {
    try {
        if (navigator.doNotTrack === '1') return;

        let isTrackingAllowed = localStorage.getItem('isTrackingAllowed');

        if (isTrackingAllowed === null) {
            isTrackingAllowed = 'true';
            localStorage.setItem('isTrackingAllowed', isTrackingAllowed);
        }

        if (isTrackingAllowed !== 'true') {
            return;
        }

        await fetch('https://api.lanzoor.dev/analytics', {
            method: 'POST',
            keepalive: true,
            headers: {
                'Content-Type': 'application/json',
                'X-Client': process.env.NEXT_PUBLIC_ANALYTICS_SECRET || '',
            },
            body: JSON.stringify({
                path: location.pathname + location.search,
            }),
        });
    } catch {}
}

if (typeof window !== 'undefined') {
    trackPageView();
}

// IMPORTANT: For now, main.ts does not get loaded when loading any page within /public. Instead, it is loaded via Navigation.tsx via imports. I'll have to figure out how to run this script while minimizing the amount of script tags in HTML scripts. But for now... this is more than enough. Thanks for listening to my T ED talk. It helps me out... a lot.
