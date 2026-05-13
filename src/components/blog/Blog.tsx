import { createRoot } from 'react-dom/client';
import { BlogEntry } from '@/scripts/blog';

function BlogEntry({ blogEntry }: { blogEntry: BlogEntry }) {
    let tagEntries = ['important', 'announcement', 'guide', 'api'];

    let blogClassList = ['tag', ...blogEntry.tags.filter((b) => tagEntries.includes(b))];
    let blogClassName = blogClassList.join(' ');

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

    console.log(lastUpdated);

    return (
        <>
            {blogEntry.title !== '' && (
                <div className="blog">
                    <a href={'/docs/blog/' + blogEntry.path}>
                        <h2>{blogEntry.title}</h2>
                    </a>

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

                        <span className="dim">
                            <b>{lastUpdated}</b>
                            {' • '}
                            {(blogEntry.tags.length > 0 && (
                                <>
                                    <span id="tags">
                                        {blogEntry.tags.map((b, i) => {
                                            return (
                                                <span
                                                    className={blogClassName}
                                                    key={i}
                                                >
                                                    {b}
                                                </span>
                                            );
                                        })}
                                    </span>
                                    <br />
                                </>
                            )) || <>no tags provided</>}
                        </span>
                    </p>
                </div>
            )}
        </>
    );
}

function BlogRoot({ blogEntries }: { blogEntries: BlogEntry[] }) {
    return (
        <>
            <p>
                <b>Found {blogEntries.length} blog entries.</b>{' '}
                <i>
                    Some entries may be ignored if crucial information <span className="dim">(such as the title)</span> are missing.
                </i>
            </p>

            {blogEntries.map((d, i) => (
                <BlogEntry
                    blogEntry={d}
                    key={i}
                />
            ))}
        </>
    );
}

document.addEventListener('DOMContentLoaded', () => {
    const blogs = document.getElementById('blogs');

    if (!blogs) return;

    fetch('/docs/blog/entries.json')
        .then((res) => res.json())
        .then((data: BlogEntry[]) => {
            createRoot(blogs).render(<BlogRoot blogEntries={data} />);
        });
});
