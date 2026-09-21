<script>
    import Redirects from "$lib/components/Information/Redirects.svelte";
    import { Ia } from "$lib/components/Links";
    import PersonalDictBreadcrumbs from "$lib/components/Navigation/PersonalDictBreadcrumbs.svelte";
</script>

<section>
    <PersonalDictBreadcrumbs />

    <h1>727 (WYSI, WHEN YOU SEE IT)</h1>

    <Redirects
        links={[
            "/docs/personal-dict/wysi",
            "/docs/personal-dict/when-you-see-it",
        ]}
    />

    <p>
        A very walc <Ia external href="https://osu.ppy.sh/">osu!</Ia> reference. Read
        <Ia external href="https://osugame.fandom.com/wiki/727">this article</Ia
        > for more information.
    </p>
</section>
