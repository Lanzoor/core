import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Core } from '@/main';

// @ts-ignore
import '@/components/navigation/Navigation.css';

Core.loadCSS('/out/components/navigation/Navigation.css');

type Context = 'inline-links' | 'panel-links';
type Link = {
    link: string;
    name: string;
    context?: Context[];
    children?: Link[];
};

const destinations: Link[] = [
    { link: '/', name: 'Welcome!' },
    { link: '/about', name: 'About' },
    { link: '/map', name: 'Site Map', context: ['panel-links'] },
    // {
    //     link: '/projects',
    //     name: 'Projects',
    //     children: [
    //         { link: '/projects', name: 'Project Portal' },
    //         { link: 'https://www.youtube.com/@lanzoorgaming', name: 'Videos' },
    //         { link: '/projects/conlangs', name: 'Conlangs' },
    //     ],
    // },
    {
        link: '/docs',
        name: 'Documents',
        children: [
            { link: '/docs', name: 'Document Portal' },
            { link: '/docs/announcements', name: 'Announcements' },
            { link: '/api/docs', name: 'API Docs' },
        ],
    },
    {
        link: '/credits',
        name: 'Credits',
        context: ['panel-links'],
        children: [
            { link: '/credits', name: 'Credits' },
            { link: '/credits/contributors', name: 'Contributors' },
            { link: '/credits/fonts', name: 'Font Credits' },
            { link: '/credits/assets', name: 'Asset Credits' },
        ],
    },
    { link: '/troubleshooting', name: 'Troubleshooting', context: ['panel-links'] },
];

let theme = localStorage.getItem('theme') || 'dark';
const themes: string[] = ['dark', 'light'];

// if (!themes.includes(theme)) {
theme = 'dark';
localStorage.setItem('theme', theme);
// }

document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.setAttribute('data-theme', theme);
});

let overlayStates = {
    navigation: false,
    // options: false,
};

function setNavigation(value?: boolean) {
    overlayStates.navigation = value !== undefined ? value : !overlayStates.navigation;

    let navigationOverlay = document.getElementById('navigation-overlay');

    if (navigationOverlay) {
        navigationOverlay.className = overlayStates.navigation ? 'active' : '';
    }
}

// function toggleTheme() {
//     if (theme == 'dark') {
//         theme = 'light';
//     } else {
//         theme = 'dark';
//     }

//     document.documentElement.setAttribute('data-theme', theme);
// }

function Destination({ value, context }: { value: Link; context?: Context }) {
    const [open, setOpen] = useState(false);
    const valueContext = value.context ?? ['inline-links', 'panel-links'];

    if (context == 'inline-links' && valueContext.includes('inline-links')) {
        return (
            <a
                href={value.link}
                target={value.link.startsWith('http') ? '_blank' : '_self'}
            >
                {`[ ${value.name.toLowerCase()} ]`}
            </a>
        );
    } else if (context == 'panel-links' && valueContext.includes('panel-links')) {
        return (
            <>
                <li>
                    <div onClick={() => value.children && setOpen(!open)}>
                        <a
                            href={value.children ? undefined : value.link}
                            target={value.link.startsWith('http') ? '_blank' : '_self'}
                        >
                            {value.name}
                        </a>
                        {value.children && (
                            <img
                                src="/assets/icons/caret-down.svg"
                                alt="▼"
                                className={`panel-icon chevron${open ? ' open' : ''}`}
                            />
                        )}
                    </div>
                </li>

                {value.children && open && (
                    <ul className={`dropdown${open ? ' open' : ''}`}>
                        {value.children.map((d, i) => (
                            <Destination
                                key={i}
                                value={d}
                                context="panel-links"
                            />
                        ))}
                    </ul>
                )}
            </>
        );
    }
}

function TopPanelRoot() {
    return (
        <>
            <div id="top-panel">
                <a
                    href="/"
                    className="logo plain"
                >
                    <span className="lanzoordev-head">lanzoor</span>.<span className="lanzoordev-tail">dev</span>
                </a>

                <nav id="top-panel--links">
                    {destinations.map((d, i) => (
                        <Destination
                            key={i}
                            value={d}
                            context="inline-links"
                        />
                    ))}
                </nav>

                <div id="top-panel--buttons">
                    {/* <img
                        src="/assets/icons/settings.svg"
                        alt="⚙"
                        className="panel-icon"
                        onClick={() => toggleOpt()}
                    /> */}
                    <img
                        src="/assets/icons/hamburger.svg"
                        alt="☰"
                        className="panel-icon"
                        id="toggle--navigation"
                    />
                    {/* <img
                                src="/assets/icons/color-mode.svg"
                                alt="t"
                                className="panel-icon"
                                id="toggle--theme"
                            /> */}
                </div>
            </div>
        </>
    );
}

function OverlayRoot() {
    return (
        <>
            <div id="navigation-overlay">
                <div id="navigation-panel">
                    <div id="navigation--close">
                        <p>Close</p>
                        <img
                            src="/assets/icons/close.svg"
                            alt="×"
                            className="panel-icon"
                        />
                    </div>

                    <nav>
                        <ul>
                            {destinations.map((d, i) => (
                                <Destination
                                    key={i}
                                    value={d}
                                    context="panel-links"
                                />
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
            {/*
            <div
                id="option-overlay"
                className={optOpen ? 'active' : ''}
            >
                <div id="option-panel">
                    <div id="option-header">
                        <p>Options</p>

                        <img
                            src="/assets/icons/close.svg"
                            alt="×"
                            className="panel-icon"
                            onClick={() => toggleOpt(false)}
                        />
                    </div>

                    <div id="options">
                        <div className="option">
                            <div>
                                <img
                                    src="/assets/icons/close.svg"
                                    alt="×"
                                    className="panel-icon"
                                />
                                <p>Theme</p>
                            </div>

                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={theme === 'dark'}
                                    onChange={toggleTheme}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
}

document.addEventListener('DOMContentLoaded', () => {
    const topPanelRoot = document.createElement('div');
    topPanelRoot.id = 'top-panel-root';
    document.body.appendChild(topPanelRoot);
    createRoot(topPanelRoot).render(<TopPanelRoot />);

    const overlayRoot = document.createElement('div');
    overlayRoot.id = 'overlay-root';
    document.body.appendChild(overlayRoot);
    createRoot(overlayRoot).render(<OverlayRoot />);

    // Handle click events
    document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;

        if (target.closest('#toggle--navigation')) setNavigation();
        if (target.closest('#navigation--close')) setNavigation(false);
        // if (target.closest('#toggle--theme')) toggleTheme();
        if (target.closest('#navigation-overlay') && !target.closest('#navigation-panel')) setNavigation(false);
    });

    window.addEventListener('keydown', (keyboardEvent: KeyboardEvent) => {
        if (keyboardEvent.key === 'Escape') {
            setNavigation(false);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    let lastY = window.scrollY;

    const handleScroll = () => {
        const currentY = window.scrollY;
        const scrollingDown = currentY > lastY;
        const scrollAtTop = currentY === 0;

        document.getElementById('top-panel')?.classList.toggle('hidden', scrollingDown);
        document.getElementById('top-panel')?.classList.toggle('at-top', scrollAtTop);

        lastY = currentY;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    if (window.scrollY === 0) {
        document.getElementById('top-panel')?.classList.add('at-top');
    }
});

type Connection = {
    imageSrc: string;
    connectionName?: string;
    connectionLink?: string;
    handleName?: string;
};

const connections: Connection[] = [
    {
        imageSrc: '/assets/icons/discord.svg',
        connectionName: 'Discord',
        connectionLink: 'https://www.discord.com',
        handleName: '@lanzoor | 1160164047111606292',
    },

    {
        imageSrc: '/assets/icons/reddit.svg',
        connectionName: 'Reddit',
        connectionLink: 'https://www.reddit.com/user/Lanzoor/',
        handleName: '@Lanzoor',
    },
    {
        imageSrc: '/assets/icons/github.svg',
        connectionName: 'GitHub',
        connectionLink: 'https://github.com/Lanzoor',
        handleName: 'Lanzoor',
    },
    {
        imageSrc: '/assets/icons/steam.svg',
        connectionName: 'Steam',
        connectionLink: 'https://steamcommunity.com/id/lanzoor/',
        handleName: 'lanzoor | Lanzoor13',
    },
    {
        imageSrc: '/assets/icons/youtube.svg',
        connectionName: 'YouTube',
        connectionLink: 'https://www.youtube.com/@lanzoorgaming',
        handleName: '@lanzoorgaming',
    },
    {
        imageSrc: '/assets/icons/gmail.svg',
        connectionName: 'lanzoorsupport@gmail.com',
    },
];

function Connection({ connection }: { connection: Connection }) {
    return (
        <>
            <div className="connection">
                <img
                    src={connection.imageSrc}
                    alt={''}
                />

                {connection.connectionName && <div>{connection.connectionName}</div>}

                {connection.connectionLink && connection.handleName && (
                    <a
                        href={connection.connectionLink}
                        target="_blank"
                    >
                        {connection.handleName}
                    </a>
                )}
            </div>
        </>
    );
}

function BottomNavigationRoot() {
    return (
        <>
            <div className="flex-child">
                <h1>lanzoor.dev</h1>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat sit veritatis illum eos. Laudantium architecto velit officiis. Fugit accusamus eligendi blanditiis adipisci, vel consectetur molestiae, corrupti veniam perferendis temporibus est.
                <footer>
                    frontend <b id="footer--frontend">...</b> | backend <b id="footer--backend">...</b>
                </footer>
            </div>

            <div className="flex-child">
                <h2>Navigation</h2>
                Lorem Ipsum Dolor
            </div>

            <div
                className="flex-child"
                id="connections"
            >
                <h2>Connections</h2>

                {connections.map((c, i) => (
                    <Connection connection={c} />
                ))}
            </div>
        </>
    );
}

document.addEventListener('DOMContentLoaded', () => {
    const root = document.createElement('section');
    root.id = 'bottom-navigation';
    root.className = 'fixed-bg';
    document.body.appendChild(root);
    createRoot(root).render(<BottomNavigationRoot />);
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const data = await Core.pingServer('https://api.lanzoor.dev/status');

        const lastUpdated = document.getElementById('footer--last-updated');
        const frontend = document.getElementById('footer--frontend');
        const backend = document.getElementById('footer--backend');

        if (lastUpdated) lastUpdated.textContent = new Date(data.lastUpdated).toLocaleString('en-US', { month: 'long', day: 'numeric', hour: 'numeric' });
        if (frontend) frontend.textContent = data.versions.frontend;
        if (backend) backend.textContent = data.versions.backend;
    } catch (error) {
        console.warn('failed to fetch from status:\n\t', error);
    }
});
