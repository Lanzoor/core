<script lang="ts">
    import Breadcrumbs from "$lib/components/Navigation/Breadcrumbs.svelte";
    import entries from "./(entries)/entries.json";

    const map = new Map<string, typeof entries>();

    for (const entry of entries) {
        const [major, minor] = entry.version.slice(1).split("-");

        if (!major || !minor) continue;

        const id = `v${major}.${minor}`;

        if (!map.has(id)) {
            map.set(id, []);
        }

        map.get(id)!.push(entry);
    }

    let searchQuery = $state("");
    let status = $state(
        "Search a version name, and warp into an entry by pressing Enter!",
    );

    function normalize(query: string) {
        return query.trim().toLowerCase().replace(/\./g, "-");
    }

    const groups = $derived(
        [...map]
            .map(([id, entries]) => ({
                id,
                entries: entries.filter((entry) => {
                    const query = normalize(searchQuery);

                    return (
                        entry.version.includes(query) ||
                        entry.title?.toLowerCase().includes(query)
                    );
                }),
            }))
            .filter((group) => group.entries.length > 0),
    );

    function warpIntoVersion() {
        const normalized = normalize(searchQuery);

        if (!normalized) return;

        const entry = entries.find(
            (entry) => entry.version.toLowerCase() === normalized,
        );

        if (!entry) {
            status = `Sorry, we couldn't find a version named ${searchQuery}. Please try again!`;
            return;
        }

        window.location.href = `/changelog/${entry.version}`;
    }
</script>

<section>
    <Breadcrumbs />

    <h1>Changelog</h1>

    <p>
        This page contains a list of all changes and updates made to the
        website.
        <b>You can use the search bar below to search for a version!</b>
    </p>

    <p>
        For the changelog conventions, please refer to <a
            href="/conventions/changelog">this article</a
        >.<br />
        All versions of <code>core</code> follow the
        <a href="/conventions/versioning">versioning conventions</a>.
    </p>

    <blockquote class="warning">
        <b class="col bright yellow">Not all changes require a new changelog!</b
        ><br />
        If a change was very small, urgent, or not assigned a version tag, it won't
        show up here.
    </blockquote>
</section>

<section id="entries">
    <p>
        <b>Found {entries.length} changelog entries.</b>
    </p>

    <div class="search-options enable-spacing">
        <p>
            {status}
        </p>

        <div class="search-bar">
            <input
                type="text"
                id="search-bar"
                bind:value={searchQuery}
                placeholder="Search for a version (e.g. v26.1.0)"
                onkeydown={(e) => e.key === "Enter" && warpIntoVersion()}
            />

            <button id="search-button" onclick={warpIntoVersion}> Warp </button>
        </div>
    </div>

    {#each groups as group}
        <h1>Version group {group.id}</h1>

        <ul>
            {#each group.entries as entry}
                <li>
                    <h2>
                        <a href="/projects/core/changelog/{entry.version}">
                            {entry.version}
                        </a>{#if entry.title}: {entry.title}{/if}<br />
                    </h2>

                    <p class="dim">
                        pushed on
                        <b
                            >{new Date(entry.published).toLocaleString(
                                "en-US",
                                {
                                    timeZone: "Asia/Seoul",
                                    dateStyle: "long",
                                },
                            )}</b
                        >
                    </p>
                </li>
            {/each}
        </ul>
    {/each}

    <p class="dim">
        Please note that versions prior to <code>v26.23.3</code> aren't listed here,
        as they were not documented.
    </p>
</section>

<style lang="css">
    .search-options {
        margin: 2em auto;
    }

    .search-options .search-bar {
        display: flex;
        justify-content: center;
        align-items: stretch;
        gap: 0;
    }

    .search-options .search-bar input {
        width: 750px;
    }

    .search-options .search-bar button {
        background: #7155ff;
        color: white;

        padding: 0 10px;

        transition: 0.5s ease;
    }
    .search-options .search-bar button:hover {
        background: #aa91ff;
    }
</style>
