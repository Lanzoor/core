<script lang="ts">
    import Breadcrumbs from "$lib/components/Navigation/Breadcrumbs.svelte";
    import type { BlogEntry } from "$lib/types";
    import entries from "./(entries)/entries.json";

    const availableTags = [
        "important",
        "serious",
        "announcement",
        "blog",
        "personal",
        "core",
        "core-api",
        "monthly-recap",
    ];

    let searchQuery = $state("");
    let searchTags = $state<string[]>([]);

    type SortingOrder = "ascending" | "descending";

    let sortingOrder = $state<SortingOrder>("descending");

    function sortEntries(entries: BlogEntry[]) {
        return [...entries].sort((a, b) => {
            const result = a.published.localeCompare(b.published);

            return sortingOrder === "ascending" ? result : -result;
        });
    }

    function matchesSearchQuery(entry: BlogEntry) {
        const query = searchQuery.trim().toLowerCase();

        if (query === "") {
            return true;
        }

        return (
            entry.title.toLowerCase().includes(query) ||
            entry.description?.toLowerCase().includes(query) ||
            entry.tags?.some((tag) => tag.toLowerCase().includes(query))
        );
    }

    function matchesSelectedTags(entry: BlogEntry) {
        return searchTags.every((tag) => entry.tags?.includes(tag));
    }

    function groupByMonth(entries: BlogEntry[]) {
        return Object.values(
            entries.reduce(
                (groups, entry) => {
                    const month = entry.published.slice(0, 7);

                    (groups[month] ??= []).push(entry);

                    return groups;
                },
                {} as Record<string, typeof entries>,
            ),
        );
    }

    const sortedEntries = $derived(sortEntries(entries));

    const filteredEntries = $derived(
        sortedEntries.filter(
            (entry) => matchesSearchQuery(entry) && matchesSelectedTags(entry),
        ),
    );

    const groups = $derived(groupByMonth(filteredEntries));
</script>

<section>
    <Breadcrumbs />

    <header>
        <h1>Blog Portal</h1>

        <p>
            Hello there! This is a page where you can find all of my blogs.<br
            />
            <i>Click one of the headers below to warp into that page.</i>
        </p>
    </header>

    <p>
        <b>Found {sortedEntries.length} blog entries.</b>
    </p>
</section>

<section id="search">
    <h1>Search Options</h1>

    <div class="search-bar">
        <input
            type="text"
            placeholder="Search for a blog entry..."
            bind:value={searchQuery}
        />
    </div>

    <p>You can narrow down the searches by providing one or more tags:</p>

    <div class="tag-bar">
        {#each availableTags as tag}
            <button
                class:active={searchTags.includes(tag)}
                class="tag"
                onclick={() => {
                    if (searchTags.includes(tag)) {
                        searchTags = searchTags.filter((x) => x !== tag);
                    } else {
                        searchTags = [...searchTags, tag];
                    }
                }}
            >
                {"#"}<span class="tagname {tag}">{tag}</span>
            </button>
        {/each}
    </div>

    <p>
        Currently sorting by: <button
            class="{sortingOrder} adaptive-text-shadow"
            onclick={() =>
                (sortingOrder =
                    sortingOrder === "ascending" ? "descending" : "ascending")}
            >{sortingOrder} order</button
        > <span class="dim">(click to change)</span>
    </p>
</section>

<section>
    {#each groups as group}
        <h1>
            {new Date(group[0].published).toLocaleString("en-US", {
                timeZone: "Asia/Seoul",
                month: "long",
                year: "numeric",
            })}
        </h1>

        {#each group as blog}
            <div>
                <h2>
                    <a href={`/blog/${blog.slug}`}>
                        {blog.title}
                    </a>
                </h2>

                <p>
                    {#if blog.description}
                        {blog.description}
                    {:else}
                        <i>No description provided.</i>
                    {/if}<br />
                    <span class="dim">
                        <b
                            >{new Date(blog.published).toLocaleString("en-US", {
                                timeZone: "Asia/Seoul",
                                dateStyle: "long",
                            })}</b
                        >
                    </span>

                    •

                    {#if !blog.tags}
                        <i>No tags provided.</i>
                    {:else}
                        {#each blog.tags as tag}
                            <span class="tag active">
                                {"#"}<span class={`tagname ${tag}`}>
                                    {tag}
                                </span>{" "}
                            </span>
                        {/each}
                    {/if}
                </p>
            </div>
        {/each}
    {/each}
</section>

<style lang="css">
    .tag {
        color: #555;
    }

    .tag,
    .tag .tagname {
        transition: 0.2s ease;
    }

    .tag.active .tagname {
        font-weight: 500;

        text-shadow: 0 0 20px
            oklch(from currentColor calc(l * 0.7) calc(c * 2) calc(h + 10));
    }

    .tag.active .tagname.important {
        color: var(--red);
    }
    .tag.active .tagname.serious {
        color: rgb(255, 120, 176);
    }

    .tag.active .tagname.announcement {
        color: var(--cyan);
    }

    .tag.active .tagname.blog {
        color: rgb(136, 120, 255);
    }
    .tag.active .tagname.monthly-recap {
        color: var(--bright-yellow);
    }
    .tag.active .tagname.core {
        color: var(--bright-green);
    }
    .tag.active .tagname.core-api {
        color: var(--bright-orange);
    }
    .tag.active .tagname.personal {
        color: var(--bright-purple);
    }

    #search {
        border-top: 2px solid #555;
        border-bottom: 2px solid #555;
        background: #121212;
    }

    .tag-bar {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1em;
    }

    .search-bar {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        justify-content: center;
    }

    .search-bar input[type="text"] {
        width: 1000px;
    }

    #search button.ascending {
        color: var(--green);
    }

    #search button.descending {
        color: var(--orange);
    }
</style>
