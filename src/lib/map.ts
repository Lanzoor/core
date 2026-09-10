import { normalizePath } from "./path";

export type PageOptions = {
    titlePad?: boolean;
    breadcrumbs?: boolean;
    topPanel?: boolean;
    footerPanel?: boolean;
    legalNotice?: boolean;
    useSitemapMetadata?: boolean;
};

export const defaultOptions: PageOptions = {
    titlePad: true,
    breadcrumbs: true,
    topPanel: true,
    footerPanel: true,
    legalNotice: true,
    useSitemapMetadata: true,
};

export type Page = {
    path: string;
    title: string;
    description?: string;

    options?: {};

    metadata?: {
        ogTitle?: string;
        ogImage?: string;
        ogType?: string;
        themeColor?: string;
    };

    children?: Page[];
};

export type IndexedSitePage = Omit<Page, "children" | "options"> & {
    options: PageOptions;
    parent?: IndexedSitePage;
};

export const sitemap: Page[] = [
    {
        path: "/",
        title: "Welcome!",
        description:
            "A website by Lanzoor, including projects, showcases, documents, and more!",

        metadata: {
            ogTitle: "lanzoor.dev",
            themeColor: "#6f27f5",
        },
    },
    {
        path: "/about",
        title: "About",

        options: {
            legalNotice: false,
        },

        // children: [
        //     {
        //         path: '/about/donations',
        //         title: 'Donations',
        //     },
        // ],
    },
    {
        path: "/blog",
        title: "Blog",
        description: "Official updates, notices, or important announcements.",
    },
    {
        path: "/changelog",
        title: "Changelog",
        description: "A list of all changes and updates made to the website.",
    },
    {
        path: "/conlangs",
        title: "Conlangs",
        description: "A collection of my constructed languages.",

        children: [
            {
                path: "/conlangs/proto-lanzavel",
                title: "Proto-Lanzavel",
            },
        ],
    },
    {
        path: "/conventions",
        title: "Conventions",

        children: [
            {
                path: "/conventions/changelog",
                title: "Changelog Conventions",

                description: "Conventions for changelog pages and entries.",
            },
            {
                path: "/conventions/versioning",
                title: "Versioning Conventions",

                description:
                    "Conventions for version strings of Lanzaforge projects.",
            },
        ],
    },
    {
        path: "/contact",
        title: "Contact",

        description:
            "A list of the contact methods you can use to get in touch.",
    },
    {
        path: "/credits",
        title: "Credits",
        children: [
            {
                path: "/credits/assets",
                title: "Asset Credits",
                description:
                    "Attributions for all of the assets used within this website.",
            },
            {
                path: "/credits/contributors",
                title: "Contributors",
                description:
                    "Credits for all of the amazing people who helped build this website.",
            },
            {
                path: "/credits/fonts",
                title: "Font Credits",
                description:
                    "Attributions for all of the fonts used within this website.",
            },
        ],
    },
    {
        path: "/docs",
        title: "Documents",
        children: [
            {
                path: "/docs/linguistics",
                title: "Linguistics",
                description: "My documents related to linguistics.",

                children: [
                    {
                        path: "/docs/linguistics/english",
                        title: "English",

                        description: "My documents related to English.",
                        children: [
                            {
                                path: "/docs/linguistics/english/prepositions",
                                title: "Prepositions",

                                description:
                                    "My analysis on English prepositions.",
                            },
                        ],
                    },
                ],
            },
            {
                path: "/docs/math",
                title: "Math",
                description: "My documents related to math.",

                children: [
                    {
                        path: "/docs/googology",
                        title: "Googology",
                        children: [
                            {
                                path: "/docs/googology/consistent-illion-notation",
                                title: "Consistent Illion Notation",
                            },
                        ],
                    },
                ],
            },
            {
                path: "/docs/personal-dict",
                title: "Personal Dictionary",
                description:
                    "A personal dictionary containing all of the peak words and references me and my friends use.",
            },
        ],
    },
    {
        path: "/domains",
        title: "Domains",
        description: "Information about the domains related to this website.",
    },
    {
        path: "/games",
        title: "Games",
        description: "A collection of games made by Lanzoor.",
    },
    {
        path: "/legal",
        title: "Legal",
        description: "A section that holds all of the Legal Information.",

        options: {
            legalNotice: false,
        },

        children: [
            {
                path: "/legal/privacy",
                title: "Privacy Policy",
                description:
                    "A detailed privacy policy explaining what information is collected, how it is used, and how it is handled.",

                options: {
                    legalNotice: false,
                },
            },
            {
                path: "/legal/terms",
                title: "Terms Of Service",
                description:
                    "The terms and conditions governing your use of this website and its services.",

                options: {
                    legalNotice: false,
                },
            },
        ],
    },
    {
        path: "/map",
        title: "Site Map",
    },
    {
        path: "/profile",
        title: "Profile",
        description: "A short section dedicated to my profile.",
    },
    {
        path: "/projects",
        title: "Projects",
        children: [
            {
                path: "/projects/core",
                title: "core",

                children: [
                    {
                        path: "/projects/core/changelog",
                        title: "core Changelog",
                    },
                ],
            },
            {
                path: "/projects/core-api",
                title: "core-api",
            },
        ],
    },
    {
        path: "/tools",
        title: "Tools",
        description:
            "A collection of some handy tools designed for everyone to use.",

        children: [
            {
                path: "/tools/manual-bpm-checker",
                title: "Manual BPM Checker",
                description: "A simple yet effective manual BPM checker.",

                options: {
                    footerPanel: false,
                },
            },
            {
                path: "/tools/number-formatter",
                title: "Number Formatter",
                description:
                    "A tool that formats extremely large numbers into more readable representations.",
            },
        ],
    },
];

function mergeOptions(options?: Partial<PageOptions>): PageOptions {
    return {
        ...defaultOptions,
        ...options,
    };
}

function createPageIndex(pages: Page[]) {
    const pageIndex = new Map<string, IndexedSitePage>();

    function dfs(page: Page, parent?: IndexedSitePage) {
        const indexedPage: IndexedSitePage = {
            ...page,
            options: mergeOptions(page.options),
            parent,
        };

        pageIndex.set(page.path, indexedPage);

        for (const child of page.children ?? []) {
            dfs(child, indexedPage); // fuck recursion
        }
    }

    pages.forEach((page) => dfs(page));

    return pageIndex;
}

export const pageIndex = createPageIndex(sitemap);

export function getPageData(page: string) {
    return pageIndex.get(normalizePath(page));
}
