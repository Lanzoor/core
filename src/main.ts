export namespace CoreOutput {
    type Color = {
        terminal: number;
        web: string;
    };

    const ColorMap: Record<string, Color> = {
        BLACK: { terminal: 0, web: 'black' },
        RED: { terminal: 1, web: 'red' },
        GREEN: { terminal: 2, web: 'green' },
        YELLOW: { terminal: 3, web: 'yellow' },
        BLUE: { terminal: 4, web: 'blue' },
        MAGENTA: { terminal: 5, web: 'magenta' },
        CYAN: { terminal: 6, web: 'cyan' },
        WHITE: { terminal: 7, web: 'white' },
        DEFAULT: { terminal: 9, web: 'inherit' },
        BRIGHT_BLACK: { terminal: 60, web: 'gray' },
        BRIGHT_RED: { terminal: 61, web: 'tomato' },
        BRIGHT_GREEN: { terminal: 62, web: 'lightgreen' },
        BRIGHT_YELLOW: { terminal: 63, web: 'lightyellow' },
        BRIGHT_BLUE: { terminal: 64, web: 'cornflowerblue' },
        BRIGHT_MAGENTA: { terminal: 65, web: 'violet' },
        BRIGHT_CYAN: { terminal: 66, web: 'lightcyan' },
        BRIGHT_WHITE: { terminal: 67, web: 'white' },
    };

    const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';

    export namespace Logger {
        function log(symbol: string, message: any, colorKey: string): void {
            const color = ColorMap[colorKey] ?? ColorMap.DEFAULT;

            if (isBrowser) {
                console.log(`[%c${symbol}%c] ${String(message)}`, `color: ${color.web}`, 'color: inherit');
            } else {
                console.log(`\x1b[${30 + color.terminal}m[${symbol}]\x1b[39m ${String(message)}`);
            }
        }

        function generateContext() {
            return {
                time: Date.now(),
            };
        }

        export function debug(message: any) {
            log('.', message, 'BRIGHT_BLACK');
        }
        export function info(message: any) {
            log('i', message, 'GREEN');
        }
        export function warn(message: any, error?: Error) {
            log('w', message, 'YELLOW');

            if (error) {
                console.warn(error);
            }
        }
        export function error(message: any, error: Error) {
            log('!', message, 'RED');
            console.error(error);
        }
        export function fatal(message: any, error: Error) {
            log('!!!', message, 'MAGENTA');
            console.error(error);
        }
    }
}

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
                CoreOutput.Logger.warn(`route ${route} did not match the recommended fetch API URL\nthis warning exits purely for mistakes and may cause unexpected behavior`);
            }

            const result = await fetch(route, options);

            console.log(result);
            if (!result.ok) {
                CoreOutput.Logger.error(`${route} returned an error`, Error(result.statusText));
                return;
            }

            const jsonResult = await result.json();

            if (jsonResult.ok === true) {
                return jsonResult;
            } else {
                CoreOutput.Logger.error(`${route} returned an error`, jsonResult);
                return jsonResult;
            }
        } catch (error) {
            CoreOutput.Logger.error(`failed to ping service at ${route}`, error as Error);
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
        try {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            document.head.appendChild(link);
            CoreOutput.Logger.info(`successfully injected <link> tag for ${href}`);
        } catch (error) {
            CoreOutput.Logger.error(`failed to inject <link> tag for ${href}, this may cause weird styles when components are loaded`, error as Error);
        }
    }

    export function pickRandom<T>(array: T[]): T {
        return array[Math.floor(Math.random() * array.length)];
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
