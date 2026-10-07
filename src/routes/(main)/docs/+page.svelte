<script>
    import Breadcrumbs from "$lib/components/Navigation/Breadcrumbs.svelte";
    import { getPageData } from "$lib/map";
</script>

<section>
    <Breadcrumbs />

    <header>
        <h1>Document Portal</h1>

        <p>
            <b>This is a page where you can find all of my documents.</b><br />
            Most of them are just me overanalyzing some niche topic.
        </p>
    </header>

    <h2>Topics</h2>

    <ul>
        <li>
            <a href="/docs/math">Math</a> - {getPageData("/docs/math")
                ?.description}
        </li>
        <li>
            <a href="/docs/linguistics">Linguistics</a> - {getPageData(
                "/docs/linguistics",
            )?.description}
        </li>
        <li>
            <a href="/docs/tech">Tech</a> - {getPageData("/docs/tech")
                ?.description}
        </li>
    </ul>

    <h2>Other Documents</h2>

    <ul>
        <li>
            <a href="/blog/">Blog</a> - {getPageData("/blog")?.description}
        </li>
        <li>
            <a href="/docs/personal-dict">Personal Dictionary</a> - {getPageData(
                "/docs/personal-dict",
            )?.description}
        </li>
    </ul>
</section>
