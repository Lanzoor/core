import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Core } from '@/main';

// @ts-ignore
import '@/components/toc/toc.css';

Core.DOM.loadCSS('/out/components/toc/toc.css');

function ToCPanel() {
    const ltTracks = Array.from(document.getElementsByClassName('toc-track')).map((e) => e as HTMLElement);

    return (
        <>
            <ul>
                {ltTracks.map((el, i) => (
                    <TocPanelItem
                        key={i}
                        element={el}
                    />
                ))}
            </ul>
        </>
    );
}

function TocPanelItem({ element }: { element: HTMLElement }) {
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
    const tocPanel = document.createElement('div');
    tocPanel.id = 'toc-panel';

    const main = document.querySelector('main');
    document.body.insertBefore(tocPanel, main);

    createRoot(tocPanel).render(<ToCPanel />);
});
