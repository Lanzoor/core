<script lang="ts">
    import Sidebar from "$lib/components/Layouts/Sidebar.svelte";
    import { Ba, Ia } from "$lib/components/Links";

    let { children } = $props();
</script>

<svelte:head>
    <title>Shitter Explained, For Real!!</title>
</svelte:head>

{#snippet sidebar()}
    <Ba href="/docs/shitter/intro">
        <h2>Shitter Explained,<br />For Real!!</h2>
    </Ba>

    <Ia href="/docs/shitter/part-0">
        Part 0: <span class="dim">A SHOT IN THE DARK</span>
    </Ia>
    <Ia href="/docs/shitter/part-1">
        Part 1: <span class="dim">NO SOUND, NO MEMORY</span>
    </Ia>
    <Ia href="/docs/shitter/part-2">
        Part 2: <span class="dim">SHIP OF FOOLS</span>
    </Ia>
    <Ia href="/docs/shitter/part-3">
        Part 3: <span class="dim">THE WITLESS</span>
    </Ia>
    <Ia href="/docs/shitter/part-4">
        Part 4: <span class="dim">DEATH AT 20,000 VOLTS</span>
    </Ia>
    <Ia href="/docs/shitter/part-5">
        Part 5: <span class="dim">HEART OF THE SUNRISE</span>
    </Ia>
    <Ia href="/docs/shitter/appendix">Appendix</Ia>
{/snippet}

<Sidebar {sidebar} class="shitter-sidebar enable-initial-padding">
    {@render children()}
</Sidebar>

<style>
    :global {
        .shitter-sidebar {
            flex: 0 0 25em;
            padding: 2em;

            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 0.5em;
        }

        .shitter-sidebar h2 {
            text-align: center;
            align-self: center;
        }

        .shitter-sidebar a:not(.-block-anchor) {
            border-radius: 2em;
            font-size: 0.9em;
            padding: 0.25em 1em;
            color: white;

            transition: background 0.2s ease;
        }

        .shitter-sidebar a:not(.-block-anchor):hover {
            background: rgba(255, 255, 255, 0.1);
            text-decoration: none;
        }
    }
</style>
