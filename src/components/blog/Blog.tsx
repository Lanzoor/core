import { Fragment } from 'react/jsx-runtime';
import { createRoot } from 'react-dom/client';
import { BlogEntry } from '@/scripts/blog';
import { Core } from '@/main';

function formatBlogEntryDate(blogEntry: BlogEntry) {
    let blogEntryDate = new Date();

    try {
        blogEntryDate = new Date(Number(blogEntry.date.year), Number(blogEntry.date.month) - 1);
    } catch (error) {
        console.warn(`failed to convert date format whilst parsing ${blogEntry.path}:\n\t${blogEntry.date}\n\t${error}`);
        return;
    }

    const lastUpdated = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        year: 'numeric',
    }).format(blogEntryDate);

    return lastUpdated;
}

function BlogEntry({ blogEntry }: { blogEntry: BlogEntry }) {
    let lastUpdated = formatBlogEntryDate(blogEntry);

    return (
        <>
            {blogEntry.title !== '' && (
                <div className="blog">
                    <h2 className="no-margin">
                        <a href={'/docs/blog/' + blogEntry.path}>{blogEntry.title}</a>
                    </h2>

                    <hr />

                    <p>
                        {(blogEntry.description !== '' && (
                            <>
                                {blogEntry.description}
                                <br />
                            </>
                        )) || (
                            <>
                                No description provided.
                                <br />
                            </>
                        )}

                        <span className="dim">{lastUpdated && <b>{lastUpdated}</b>}</span>
                        {' • '}
                        {(blogEntry.tags.length > 0 && (
                            <>
                                <span className="tags">
                                    {blogEntry.tags.map((be, i) => {
                                        return (
                                            <span
                                                className={'tag ' + be}
                                                key={i}
                                            >
                                                {be}
                                            </span>
                                        );
                                    })}
                                </span>
                                <br />
                            </>
                        )) || <>no tags provided</>}
                    </p>
                </div>
            )}
        </>
    );
}

function BlogRoot({ blogEntries }: { blogEntries: BlogEntry[] }) {
    let currentEntryMonth: string | null = null;

    return (
        <>
            <p>
                <b>Found {blogEntries.length} blog entries.</b>{' '}
                <i>
                    Some entries may be ignored if crucial information <span className="dim">(such as the title)</span> are missing.
                </i>
            </p>
            {blogEntries.map((be, i) => {
                const showHeader = currentEntryMonth !== be.date.month;
                if (showHeader) currentEntryMonth = be.date.month;

                return (
                    <Fragment key={i}>
                        {showHeader && <h1 className="no-margin">{formatBlogEntryDate(be)}</h1>}
                        <BlogEntry blogEntry={be} />
                    </Fragment>
                );
            })}
        </>
    );
}

document.addEventListener('DOMContentLoaded', async () => {
    const blogs = document.getElementById('blogs');

    if (!blogs) return;

    let blogEntries = await Core.pingServer('/docs/blog/entries.json');

    blogEntries.sort((a: BlogEntry, b: BlogEntry) => {
        const aDate = Number(a.date.year) * 100 + Number(a.date.month);
        const bDate = Number(b.date.year) * 100 + Number(b.date.month);

        return bDate - aDate;
    });

    createRoot(blogs).render(<BlogRoot blogEntries={blogEntries} />);
});
