<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        sidebar,
        children,
        class: className,
    }: {
        sidebar: Snippet;
        children: Snippet;
        class?: string;
    } = $props();
</script>

<div class="sidebar-layout">
    <nav class={`sidebar ${className ?? ""}`}>
        {@render sidebar()}
    </nav>

    <div class="enable-initial-padding main">
        {@render children()}
    </div>
</div>

<style>
    .sidebar-layout {
        display: flex;
        height: 100vh;
        overflow: hidden;
    }

    .sidebar {
        height: 100vh;
        overflow-y: auto;
    }

    .main {
        flex: 1;
        min-width: 0;
        height: 100vh;
        overflow: auto;
    }

    @media (max-width: 1024px) {
        .sidebar {
            display: none;
        }
    }
</style>
