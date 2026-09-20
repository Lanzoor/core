<script lang="ts">
    import type { HTMLAnchorAttributes } from "svelte/elements";

    let {
        external = false,
        showArrow = external,

        href,
        class: className,
        children,

        ...props
    }: HTMLAnchorAttributes & {
        external?: boolean;
        showArrow?: boolean;
    } = $props();
</script>

<a
    {href}
    class={external ? `-external-link ${className ?? ""}` : className}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    {...props}
    data-sveltekit-reload
>
    {@render children?.()}

    {#if external && showArrow}
        <img
            class="arrow"
            aria-hidden="true"
            alt=""
            src="/assets/icons/external-link.svg"
        />
    {/if}
</a>

<style>
    :global(.-external-link) {
        color: #fff;
        display: inline-flex;
        align-items: baseline;
        justify-content: center;
        gap: 0.5em;
    }

    :global(.-external-link:hover) {
        color: #ddd;
    }

    :global(.-external-link > .arrow) {
        width: 0.8em;
        height: 0.8em;
    }
</style>
