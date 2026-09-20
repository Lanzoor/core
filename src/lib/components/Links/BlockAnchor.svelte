<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        href,
        class: className,
        children,
        external,
        ...rest
    }: {
        href: string;
        children: Snippet;
        class?: string;
        external?: boolean;
        [key: string]: unknown;
    } = $props();
</script>

<a
    class={`-ba -block-anchor ${className ?? ""}`}
    {href}
    {...rest}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    data-sveltekit-reload
>
    {@render children()}
</a>
