import React from 'react';
import { createRoot } from 'react-dom/client';

import { useState, useEffect } from 'react';

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

function NavItem({ link, name, children }: Destination) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <a
                href={children ? undefined : link}
                target={link.startsWith('/') ? '_self' : '_blank'}
                onClick={() => children && setOpen(!open)}
            >
                {name}
            </a>

            {children && open && (
                <div className="dropdown">
                    {children.map((c, i) => (
                        <NavItem
                            key={i}
                            {...c}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function TopPanel() {
    const [navOpen, setNavOpen] = useState(false);
    const [optOpen, setOptOpen] = useState(false);

    useEffect(() => {
        console.log('e');
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setNavOpen(false);
                setOptOpen(false);
            }
        };

        window.addEventListener('keydown', handleKey);

        return () => {
            window.removeEventListener('keydown', handleKey);
        };
    }, [setNavOpen, setOptOpen]);

    return (
        <>
            <div id="top-panel">
                <div
                    id="top-panel--left"
                    onClick={() => (location.href = '/')}
                >
                    <a className="plain">lanzoor.dev</a>
                </div>

                <nav id="top-panel--links">
                    {destinations.map((d, i) => (
                        <NavItem
                            key={i}
                            {...d}
                        />
                    ))}
                </nav>

                <div id="top-panel--right">
                    <img
                        src="/assets/icons/settings.svg"
                        onClick={() => setOptOpen(!optOpen)}
                    />
                    <img
                        src="/assets/icons/hamburger.svg"
                        onClick={() => setNavOpen(!navOpen)}
                    />
                </div>
            </div>

            {navOpen && <div id="navigation-overlay">NAV</div>}
            {optOpen && <div id="option-overlay">OPTIONS</div>}
        </>
    );
}

document.addEventListener('DOMContentLoaded', () => {
    const root = document.createElement('div');
    root.id = 'top-panel-root';
    document.body.appendChild(root);

    createRoot(root).render(<TopPanel />);
});
