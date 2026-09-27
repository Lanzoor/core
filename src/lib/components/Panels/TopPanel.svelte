<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/state";
    import { navigationOverlay } from "$lib/overlays.svelte";
    import { Ba, Ia } from "../Links";

    type TopPanelDestination = {
        href: string;
        name: string;
        external?: boolean;
    };

    const topPanelDestinations: TopPanelDestination[] = [
        { href: "/", name: "welcome!" },
        { href: "/profile", name: "profile" },
        { href: "/about", name: "about" },
        { href: "/projects", name: "projects" },
        { href: "/docs", name: "documents" },
    ];

    const HIDE_THRESHOLD = 100;
    let hidden = $state(false);

    function isCurrent(destination: TopPanelDestination) {
        return destination.href === "/"
            ? page.url.pathname === "/"
            : page.url.pathname.startsWith(destination.href);
    }

    onMount(() => {
        let lastY = window.scrollY;

        function handleScroll() {
            const currentY = window.scrollY;
            const isScrollingDown = currentY > lastY;

            hidden = isScrollingDown && currentY > HIDE_THRESHOLD;

            lastY = currentY;
        }

        window.addEventListener("scroll", handleScroll);

        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });
</script>

<div id="top-panel" class:hidden aria-hidden={hidden}>
    <Ba href="/" class="logo">
        <span class="head">lanzoor</span>.<span class="tail">dev</span>
    </Ba>

    <nav class="links">
        {#each topPanelDestinations as destination}
            {#if destination.external}
                <Ia
                    href={destination.href}
                    class={isCurrent(destination) ? "current" : ""}
                    external
                >
                    [ {destination.name} ]
                </Ia>
            {:else}
                <a
                    href={destination.href}
                    class:current={isCurrent(destination)}
                >
                    [ {destination.name} ]
                </a>
            {/if}
        {/each}
    </nav>

    <div class="buttons">
        <button
            onclick={() => (navigationOverlay.open = !navigationOverlay.open)}
        >
            <img
                src="/assets/icons/hamburger.svg"
                alt="☰"
                class="panel-icon"
            /></button
        >
    </div>
</div>

<style lang="css">
    :root {
        --top-panel-max-height: 20vh;

        --top-panel-bg: rgba(0, 0, 0, 0.5);
    }

    #top-panel,
    #top-panel * {
        border-radius: 0;
        user-select: none;
    }

    #top-panel {
        position: fixed;
        inset: 0 0 auto 0;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        gap: 3em;
        padding: clamp(1em, calc(2vw + 1em), 2em);

        max-height: var(--top-panel-max-height);

        z-index: 2147483647;
        background: rgba(0, 0, 0, 0.75);

        backdrop-filter: blur(4px);

        color: #ccc;

        transition:
            transform 0.3s ease-in-out,
            background 0.3s ease,
            box-shadow 0.3s ease;
    }

    #top-panel.hidden {
        transform: translateY(-200%);
    }

    :global(#top-panel .logo) {
        padding: 0;

        text-shadow: none;
        text-decoration: none;

        font-size: clamp(1em, calc(2vw + 1em), 2em);
        font-family: "Noto Sans Mono";

        transition: 0.2s ease;
    }

    :global(#top-panel .logo:hover) {
        text-shadow: 0 0 20px white;
    }

    :global(#top-panel .logo:hover .head) {
        text-shadow: 0 0 20px rgb(174, 103, 255);
        color: rgb(175, 138, 255);
    }

    :global(#top-panel .logo:hover .tail) {
        text-shadow: 0 0 20px #777;
    }

    #top-panel .buttons {
        display: none;
    }

    #top-panel .links {
        height: 100%;

        gap: 0.5em;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        pointer-events: none;
        white-space: nowrap;
    }

    #top-panel .links a {
        text-decoration: none;

        font-family: "JetBrains Mono";
        font-size: 20px;

        padding: 5px 10px;
        color: #aaa;

        pointer-events: auto;

        transition: 0.5s ease;
    }

    #top-panel .links a.current {
        background: rgb(28, 4, 78);
        color: rgb(141, 83, 255);
    }

    #top-panel .links a:not(.current):hover {
        color: rgba(220, 220, 220);
        text-shadow: 0 0 10px rgba(220, 220, 220, 0.5);
    }

    #top-panel .links a.current:hover {
        color: rgb(168, 124, 255);
        text-shadow: 0 0 10px rgb(168, 124, 255, 0.5);
    }

    #top-panel img {
        margin: 0;
        padding: 0;

        max-width: 2em;
        max-height: 2em;
        transition: filter 200ms ease;
    }

    #top-panel img:hover {
        filter: drop-shadow(0 0 10px #bbb);
        cursor: pointer;
    }

    @media (max-width: 1300px) {
        #top-panel .buttons {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            height: 100%;
        }

        #top-panel .links {
            display: none;
        }
    }
</style>
