<script lang="ts">
    let { links }: { links: string[] } = $props();

    let overflow = $derived(links.length > 3 || links.join("").length >= 100);
</script>

<blockquote>
    <b>Redirects Information</b><br />
    {#if !overflow}
        This page can also be accessed through
        {#each links as link, i}
            <code>{link}</code
            >{#if i < links.length - 2}{", "}{/if}{#if i === links.length - 2}{" and "}{/if}{#if i === links.length - 1}{"."}{/if}
        {/each}
    {:else}
        This page can also be accessed through {links.length} redirect sources.

        <details>
            <summary>Show all sources</summary>

            <ul>
                {#each links as link, _}
                    <li>
                        <a href={link}>
                            <code>{link}</code>
                        </a>
                    </li>
                {/each}
            </ul>
        </details>
    {/if}
</blockquote>
