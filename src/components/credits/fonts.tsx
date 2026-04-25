import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

type Font = {
    fontName: string;
    internalName: string;
    creator: string;
    creatorUrl: string;
    fontUrls: string[];
    loadMethod: string;
    usage: string;
    licenseName?: string;
    licenseUrl?: string;
};

const OFL = 'The SIL Open Font License';
const OFLUrl = 'https://openfontlicense.org/open-font-license-official-text/';
const fonts = [
    {
        fontName: 'Geist',
        internalName: 'geist',
        creator: 'Vercel',
        creatorUrl: 'https://vercel.com',
        fontUrls: ['https://vercel.com/font'],
        loadMethod: 'Google Fonts',
        usage: 'primary text, documents, headers and more',
        licenseName: OFL,
        licenseUrl: OFLUrl,
    },

    {
        fontName: 'Space Grotesk',
        internalName: 'space-grotesk',
        creator: 'Florian Karsten',
        creatorUrl: 'https://floriankarsten.com/',
        fontUrls: ['https://floriankarsten.github.io/space-grotesk/', 'https://fonts.floriankarsten.com/space-grotesk'],
        loadMethod: 'Google Fonts',
        usage: 'semi-primary text, design, headers and more',
    },

    {
        fontName: 'JetBrains Mono',
        internalName: 'jetbrains-mono',
        creator: 'JetBrains',
        creatorUrl: 'https://www.jetbrains.com/',
        fontUrls: ['https://www.jetbrains.com/lp/mono/'],
        loadMethod: 'Google Fonts',
        usage: 'alternative headers, monospaced text, code and more',
        licenseName: OFL,
        licenseUrl: OFLUrl,
    },

    {
        fontName: 'Fira Code',
        internalName: 'fira-code',
        creator: 'tonsky',
        creatorUrl: 'https://github.com/tonsky',
        fontUrls: ['https://github.com/tonsky/FiraCode'],
        loadMethod: 'Google Fonts',
        usage: 'alternative monospaced text, code and design',
        licenseName: OFL,
        licenseUrl: OFLUrl,
    },

    {
        fontName: 'Fairfax HD',
        internalName: 'fairfax-hd',
        creator: 'KreativeKorp',
        creatorUrl: 'https://www.kreativekorp.com/',
        fontUrls: ['https://www.kreativekorp.com/software/fonts/fairfaxhd/'],
        loadMethod: 'distribution',
        usage: 'alternative monospace text, unicode support',
    },

    {
        fontName: 'Noto Sans',
        internalName: 'noto-sans',
        creator: 'Google Fonts',
        creatorUrl: 'https://fonts.google.com',
        fontUrls: ['https://fonts.google.com/noto'],
        loadMethod: 'Google Fonts',
        usage: 'alternative primary, unicode support',
    },

    {
        fontName: 'Noto Sans Mono',
        internalName: 'noto-sans-mono',
        creator: 'Google Fonts',
        creatorUrl: 'https://fonts.google.com',
        fontUrls: ['https://fonts.google.com/noto'],
        loadMethod: 'Google Fonts',
        usage: 'alternative primary, unicode support',
    },

    {
        fontName: 'Brass Mono Code',
        internalName: 'brass-mono',
        creator: 'fontsecapeter',
        creatorUrl: 'https://github.com/fonsecapeter/',
        fontUrls: ['https://github.com/fonsecapeter/brass_mono'],
        loadMethod: 'distribution',
        usage: 'alternative primary, design and more',
        licenseName: OFL,
        licenseUrl: OFLUrl,
    },
];

function FontDisplay({ font }: { font: Font }) {
    return (
        <div className={`font-display ${font.internalName}`}>
            <h1>{font.fontName}</h1>
            <span className="dim">
                Internal name: <code>{font.internalName}</code>
            </span>{' '}
            <br />
            Made by:{' '}
            <a
                href={font.creatorUrl}
                target="_blank"
                rel="noopener noreferrer"
            >
                {font.creator}
            </a>
            {' | '}
            {font.fontUrls.map((url, i) => (
                <React.Fragment key={url}>
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {font.fontUrls.length === 1 ? 'link' : `link ${i + 1}`}
                    </a>
                    {i < font.fontUrls.length - 1 && ' | '}
                </React.Fragment>
            ))}
            <br />
            Loaded via <i>{font.loadMethod}</i> <br />
            Usage: <b>{font.usage}</b> <br />
            {font.licenseUrl && font.licenseName && (
                <>
                    Licensed under{' '}
                    <a
                        href={font.licenseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {font.licenseName}
                    </a>
                </>
            )}
        </div>
    );
}

function FontCreditsRoot() {
    return (
        <>
            {fonts.map((f) => (
                <FontDisplay
                    key={f.internalName}
                    font={f}
                />
            ))}
        </>
    );
}

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('font-grid')!;
    createRoot(root).render(<FontCreditsRoot />);
});
