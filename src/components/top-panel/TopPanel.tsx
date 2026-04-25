import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import './TopPanel.css';

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = '/out/components/top-panel/TopPanel.css';
document.head.appendChild(link);

const isLoaded = Array.from(document.styleSheets).some((sheet) => {
    return sheet.href && sheet.href.includes('main.css');
});

if (!isLoaded) {
    console.warn('The top panel script was invoked, but required styles were not loaded.');
}

type Destination = {
    link: string;
    name: string;
    children?: Destination[];
};

const themes: string[] = ['dark', 'light'];

const destinations: Destination[] = [
    { link: '/', name: 'Welcome!' },
    { link: '/map', name: 'Site Map' },
    {
        link: '/projects',
        name: 'Projects',
        children: [
            { link: '/projects', name: 'Project Portal' },
            { link: 'https://www.youtube.com/@lanzoorgaming', name: 'Videos' },
            { link: '/projects/conlangs', name: 'Conlangs' },
        ],
    },
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
        children: [
            { link: '/credits', name: 'Credits' },
            { link: '/credits/contributors', name: 'Contributors' },
            { link: '/credits/fonts', name: 'Font Credits' },
            { link: '/credits/assets', name: 'Asset Credits' },
        ],
    },
    { link: '/troubleshooting', name: 'Troubleshooting' },
];

function PanelRoot() {
    const [navOpen, setNavOpen] = useState(false);
    const [optOpen, setOptOpen] = useState(false);
    const [theme, setTheme] = useState(() => {
        const stored = localStorage.getItem('theme');
        return stored || 'dark';
    });

    useEffect(() => {
        if (!themes.includes(theme)) {
            setTheme('dark');
        }

        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setNavOpen(false);
                setOptOpen(false);
            }
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    function toggleNav(force: boolean = false) {
        if (force) {
            return setNavOpen(false);
        }

        setNavOpen((prev) => !prev);
    }

    function toggleOpt(force: boolean = false) {
        if (force) {
            return setOptOpen(false);
        }

        setOptOpen((prev) => !prev);
    }

    function toggleTheme() {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }

    useEffect(() => {
        const navButtons = Array.from(document.getElementsByClassName('navigation-toggle'));
        const optButtons = Array.from(document.getElementsByClassName('option-toggle'));

        navButtons.forEach((el) => el.addEventListener('click', () => toggleNav()));
        optButtons.forEach((el) => el.addEventListener('click', () => toggleOpt()));

        return () => {
            navButtons.forEach((el) => el.removeEventListener('click', () => toggleNav()));
            optButtons.forEach((el) => el.removeEventListener('click', () => toggleOpt()));
        };
    }, []);

    return (
        <>
            <div id="top-panel">
                <div id="top-panel--left">
                    <a
                        href="/"
                        className="plain"
                    >
                        lanzoor.dev
                    </a>
                </div>

                <nav id="top-panel--links">
                    {destinations.map((d, i) => (
                        <Destination
                            key={i}
                            {...d}
                        />
                    ))}
                </nav>

                <div id="top-panel--right">
                    <img
                        src="/assets/icons/settings.svg"
                        alt="⚙"
                        className="panel-icon"
                        onClick={() => toggleOpt()}
                    />
                    <img
                        src="/assets/icons/hamburger.svg"
                        alt="☰"
                        className="panel-icon"
                        onClick={() => toggleNav()}
                    />
                </div>
            </div>

            <div
                id="navigation-overlay"
                className={navOpen ? 'active' : ''}
            >
                <div id="navigation-panel">
                    <div
                        id="navigation--close"
                        onClick={() => {
                            toggleNav(false);
                        }}
                    >
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
                                    {...d}
                                    inline={false}
                                />
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>

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
            </div>
        </>
    );
}

function Destination({ link, name, children, inline = true }: Destination & { inline?: boolean }) {
    const [open, setOpen] = useState(false);

    if (inline) {
        return (
            <div>
                <a
                    href={link}
                    target={link.startsWith('http') ? '_blank' : '_self'}
                >
                    {name}
                </a>
            </div>
        );
    } else {
        return (
            <>
                <li>
                    <div onClick={() => children && setOpen(!open)}>
                        <a
                            href={children ? undefined : link}
                            target={link.startsWith('http') ? '_blank' : '_self'}
                        >
                            {name}
                        </a>
                        {children && (
                            <img
                                src="/assets/icons/caret-down.svg"
                                alt="▼"
                                className={`panel-icon chevron${open ? ' open' : ''}`}
                            />
                        )}
                    </div>
                </li>

                {children && open && (
                    <ul className={`dropdown${open ? ' open' : ''}`}>
                        {children.map((c, i) => (
                            <Destination
                                key={i}
                                {...c}
                                inline={false}
                            />
                        ))}
                    </ul>
                )}
            </>
        );
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const root = document.createElement('div');
    root.id = 'top-panel-root';
    document.body.appendChild(root);
    createRoot(root).render(<PanelRoot />);
});
