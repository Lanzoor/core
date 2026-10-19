<script lang="ts">
    import { page } from "$app/state";
    import { getPageData, pageIndex } from "$lib/map";
    import { Ia } from "../Links";

    const currentPage = $derived(getPageData(page.url.pathname));

    const breadcrumbs = $derived.by(() => {
        const result = [];

        let current = currentPage;

        while (current) {
            result.unshift(current);
            current = current.parent;
        }

        const home = pageIndex.get("/");

        if (home && result[0]?.path !== "/") {
            result.unshift(home);
        }

        return result;
    });
</script>

<div class="breadcrumbs">
    {#each breadcrumbs as crumb, i}
        {#if i !== 0}
            <div class="separator">›</div>
        {/if}

        <Ia href={crumb.path} class="keep-color">
            {crumb.path === "/" ? "Home" : crumb.title}
        </Ia>
    {/each}
</div>
