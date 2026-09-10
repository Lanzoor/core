import { normalizePath } from "$lib/path";

import { redirect, type Handle } from "@sveltejs/kit";

type CoreRedirect = {
    from: string[];
    to: string;
    permanent?: boolean;
    preservePath?: boolean;
};

const redirects: CoreRedirect[] = [
    {
        from: ["/documents"],
        to: "/docs",
        preservePath: true,
    },
    {
        from: ["/docs/math/googology/CIN", "/docs/math/googology/cin"],
        to: "/docs/math/googology/consistent-illion-notation",
        preservePath: true,
    },
    {
        from: ["/projects/core/changelog"],
        to: "/changelog",
        preservePath: true,
    },
    {
        from: ["/docs/blog"],
        to: "/blog",
    },
    {
        from: ["/docs/shitter"],
        to: "/docs/shitter/intro",
    },
    {
        from: ["/site-map"],
        to: "/map",
        preservePath: true,
    },
    {
        from: ["/testing", "/tests"],
        to: "/test",
    },
    {
        from: ["/legacy", "/archived", "/archive"],
        to: "https://legacy.lanzoor.dev",
        preservePath: true,
    },
    {
        from: ["/legal/tos", "/legal/terms-of-service", "/tos", "/terms"],
        to: "/legal/terms",
        preservePath: true,
    },
    {
        from: ["/privacy-policy", "/privacy", "/legal/privacy-policy"],
        to: "/legal/privacy",
        preservePath: true,
    },
    {
        from: ["/api"],
        to: "https://api.lanzoor.dev",
        preservePath: true,
    },
    {
        from: ["/projects/core-api/changelog"],
        to: "https://api.lanzoor.dev/docs/changelog",
        preservePath: true,
    },
    {
        from: ["/projects/conlangs"],
        to: "/conlangs",
        preservePath: true,
    },

    // rickroll redirects
    {
        from: ["/it-all-begins"],
        to: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
        from: ["/it-all-stops"],
        to: "https://www.youtube.com/watch?v=xMHJGd3wwZk",
    },
    {
        from: ["/it-all-japanese"],
        to: "https://www.youtube.com/watch?v=RrESvSRNpeo",
    },

    {
        from: ["/repo", "/source", "/source-code"],
        to: "https://github.com/Lanzoor/core",
    },
    {
        from: ["/repo-real"],
        to: "https://github.com/Lanzoor/core",
    },
    {
        from: ["/projects/anti-lanzoor"],
        to: "https://archive.lanzoor.dev/anti-lanzoor",
        preservePath: true,
    },
    {
        from: ["/docs/personal-dict/commit-more-more-jump"],
        to: "/docs/personal-dict/commit-mmj",
        preservePath: true,
    },
    {
        from: ["/docs/personal-dict/wuduhell"],
        to: "/docs/personal-dict/wuduhel",
        preservePath: true,
    },
];

export const handle: Handle = async ({ event, resolve }) => {
    const pathname = normalizePath(event.url.pathname);

    for (const entry of redirects) {
        const code = entry.permanent === true ? 308 : 307;

        for (const rawFrom of entry.from) {
            const from = normalizePath(rawFrom);

            if (pathname === from) {
                throw redirect(code, entry.to);
            }

            if (entry.preservePath && pathname.startsWith(`${from}/`)) {
                throw redirect(code, entry.to + pathname.slice(from.length));
            }
        }
    }

    return resolve(event);
};
