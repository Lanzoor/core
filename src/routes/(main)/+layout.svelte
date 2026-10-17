<script lang="ts">
    import "../../app.css";

    import { onMount } from "svelte";

    import TopPanel from "$lib/components/Panels/TopPanel.svelte";
    import FooterPanel from "$lib/components/Panels/FooterPanel.svelte";
    import NavigationPanel from "$lib/components/Overlays/NavigationPanel.svelte";
    import LegalNotice from "$lib/components/Overlays/LegalNotice.svelte";

    import WarpPanel from "$lib/components/Overlays/WarpPanel.svelte";
    import { handleEscape } from "$lib/overlays.svelte";

    import Konami from "$lib/components/EasterEggs/Konami.svelte";

    import { page } from "$app/state";
    import { defaultOptions, pageIndex } from "$lib/map";
    import { normalizePath } from "$lib/path";
    import { cleanupOldData } from "$lib/cleanup";

    const currentPage = $derived(
        pageIndex.get(normalizePath(page.url.pathname)),
    );

    const options = $derived(currentPage?.options ?? defaultOptions);

    let { children } = $props();

    let hydrated = $state(false);

    onMount(() => {
        hydrated = true;

        cleanupOldData();

        const listener = handleEscape();

        document.addEventListener("keydown", listener);

        return () => {
            document.removeEventListener("keydown", listener);
        };
    });
</script>

<svelte:head>
    {#if options && options.useSitemapMetadata}
        <title>
            {currentPage?.title
                ? `${currentPage.title}${currentPage.options.titlePad ? " | lanzoor.dev" : ""}`
                : "lanzoor.dev"}
        </title>
        <meta
            property="og:type"
            content={currentPage?.metadata?.ogType ?? "website"}
        />
        <meta
            property="og:title"
            content={currentPage?.metadata?.ogTitle ??
                currentPage?.title ??
                "lanzoor.dev"}
        />
        <meta
            property="og:description"
            content={currentPage?.description ?? ""}
        />
        <meta name="description" content={currentPage?.description ?? ""} />
        <meta
            name="theme-color"
            content={currentPage?.metadata?.themeColor ?? "#6f27f5"}
        /><meta property="og:url" content={page.url.href} />
    {/if}
</svelte:head>

{#if options.topPanel}
    <TopPanel />
{/if}

{#if options.legalNotice}
    <LegalNotice />
{/if}

{#if !hydrated}
    <div id="hydration">
        <h1>Loading Page...</h1>

        <p>
            The page is currently loading. This probably shouldn't take more
            than a second!<br />
            If this message persists, please try again in a few minutes, or
            <a href="#connections">get in touch</a> with the details.
        </p>
    </div>
{/if}

<main>
    {@render children()}
</main>

{#if options.footerPanel}
    <FooterPanel />
{/if}

<NavigationPanel />

<WarpPanel />

<Konami />
