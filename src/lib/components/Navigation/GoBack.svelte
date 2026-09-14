<script lang="ts">
    import { page } from "$app/state";

    let { target, plural, href } = $props<{
        target?: string;
        plural?: boolean;
        href?: string;
    }>();

    const parentPath = $derived(page.url.pathname.replace(/\/[^/]+\/?$/, "/"));
</script>

<a href={href ?? parentPath}>
    ../ Go back {#if target}to {target} page{#if plural}s{/if}{/if}
</a>
