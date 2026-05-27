import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Core } from '@/main';

// @ts-ignore
import '@/components/left-panel/LeftPanel.css';

Core.DOM.loadCSS('/out/components/left-panel/LeftPanel.css');

function LeftPanel() {
    const ltTracks = Array.from(document.getElementsByClassName('lt-track')).map((e) => e as HTMLElement);

    return (
        <>
            <ul>
                {ltTracks.map((el, i) => (
                    <LeftPanelItem
                        key={i}
                        element={el}
                    />
                ))}
            </ul>
        </>
    );
}

function LeftPanelItem({ element }: { element: HTMLElement }) {
    const tag = element.tagName.toLowerCase();
    if (!/^h[1-3]$/i.test(tag)) return null;
    const level = parseInt(tag[1]!);

    return (
        <li
            className={`lt-${tag}`}
            style={{ paddingLeft: `${(level - 1) * 48}px` }}
        >
            <a href={`#${element.id}`}>{element.textContent}</a>
        </li>
    );
}

document.addEventListener('DOMContentLoaded', () => {
    const leftPanel = document.createElement('div');
    leftPanel.id = 'left-panel';

    const main = document.querySelector('main');
    document.body.insertBefore(leftPanel, main);

    createRoot(leftPanel).render(<LeftPanel />);
});
