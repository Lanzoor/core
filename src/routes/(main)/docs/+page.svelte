<script>
    import Breadcrumbs from "$lib/components/Navigation/Breadcrumbs.svelte";
    import { getPageData } from "$lib/map";
</script>

<section>
    <Breadcrumbs />

    <header>
        <h1>Document Portal</h1>

        <p>
            Hello there! This is a page where you can find all of my documents.<br
            />
            <i>Click one of the links below to warp into that page!</i>
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
    </ul>

    <h2>Other Documents</h2>

    <ul>
        <li>
            <a href="/api/docs/">API Documentation</a> - Official documentation for
            the API of this website.
        </li>
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
