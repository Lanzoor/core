import { createRoot } from 'react-dom/client';
import { BlogEntry } from '@/scripts/blog';

function BlogEntry({ blogEntry }: { blogEntry: BlogEntry }) {
    let date = new Date();

    try {
        date = new Date(Number(blogEntry.date.year), Number(blogEntry.date.month) - 1);
    } catch (error) {
        console.warn(`failed to convert date format whilst parsing ${blogEntry.path}:\n\t${blogEntry.date}\n\t${error}`);
    }

    const lastUpdated = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric',
    }).format(date);

    console.log(lastUpdated);

    return (
        <>
            {blogEntry.title !== '' && (
                <a
                    className="plain"
                    href={'/docs/blog/' + blogEntry.path}
                >
                    <h2>{blogEntry.title}</h2>

                    <p>
                        {blogEntry.description + '\n\n'}
                        Last updated <b>{lastUpdated}</b>
                    </p>
                </a>
            )}
        </>
    );
}

function BlogRoot({ blogEntries }: { blogEntries: BlogEntry[] }) {
    return (
        <>
            <p>
                <b>Found {blogEntries.length} blog entries.</b>
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
