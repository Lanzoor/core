import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

document.documentElement.setAttribute('data-theme', 'dark'); // remove later

type Destination = {
    link: string;
    name: string;
    children?: Destination[];
};

const destinations: Destination[] = [
    { link: '/', name: 'Welcome!' },
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
            { link: '/credits/icons', name: 'Icon Credits' },
            { link: '/credits/fonts', name: 'Font Credits' },
        ],
    },
    { link: '/troubleshooting', name: 'Troubleshooting' },
];

function TopPanel() {
    const [navOpen, setNavOpen] = useState(false);
    const [optOpen, setOptOpen] = useState(false);

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

    Array.from(document.getElementsByClassName('navigation-toggle')).forEach((element) => {
        element.addEventListener('click', () => {
            setNavOpen(!navOpen);
        });
    });

    Array.from(document.getElementsByClassName('option-toggle')).forEach((element) => {
        element.addEventListener('click', () => {
            setNavOpen(!optOpen);
        });
    });

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
                        <NavigationItem
                            key={i}
                            {...d}
                        />
                    ))}
                </nav>

                <div id="top-panel--right">
                    <img
                        src="/assets/icons/settings.svg"
                        className="option-toggle"
                        alt="⚙"
                    />
                    <img
                        src="/assets/icons/hamburger.svg"
                        className="navigation-toggle"
                        alt="☰"
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
                        onClick={() => setNavOpen(false)}
                    >
                        <p>Close</p>
                        <img
                            src="/assets/icons/close.svg"
                            alt="×"
                        />
                    </div>

                    <nav>
                        <ul>
                            {destinations.map((d, i) => (
                                <NavigationItem
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
                        <h2>Options</h2>
                        <button onClick={() => setOptOpen(false)}>✕</button>
                    </div>
                </div>
            </div>
        </>
    );
}

function NavigationItem({ link, name, children, inline = true }: Destination & { inline?: boolean }) {
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
                                className={`chevron${open ? ' open' : ''}`}
                            />
                        )}
                    </div>
                </li>

                {children && open && (
                    <ul className={`dropdown${open ? ' open' : ''}`}>
                        {children.map((c, i) => (
                            <NavigationItem
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
    createRoot(root).render(<TopPanel />);
});
