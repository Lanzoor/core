<script lang="ts">
    export const metadata = {
        title: "The Svelte Migration",
        published: new Date("2026-07-15T00:00:00+09:00"),
    };
</script>

<section>
    <h1>v26.25.0: The Svelte Migration</h1>

    <p class="dim">
        Release date: <b>July 15th, 2026</b>
    </p>

    <p>
        <b>The Svelte migration process has been fully completed!</b><br />
        We have migrated every page
        <span class="dim">(excluding deletions)</span> and feature to the new version.
        Although the process was tedious, the migration was definitely worth it.
    </p>

    <p>
        <b>
            Anyways, we've decided to make a few changes here and there. We hope
            you like it! Thanks as always.
        </b>
    </p>

    <ul>
        <li>
            <span class="col bright green">+</span>
            Added selection styles by the <code>::selection</code> pseudo-element.
        </li>
        <li>
            <span class="col bright green">+</span>
            Added the <a href="/tools/">tools</a> project collection.
        </li>
        <li>
            <span class="col bright green">+</span>
            Added the <a href="/tools/">tools</a> as a collection within the
            <a href="/projects">projects page</a>.
        </li>
        <li>
            <span class="col bright green">+</span>
            Migrated the <a href="/credits/assets">asset credits</a> page.
        </li>
        <li>
            <span class="col bright yellow">+</span><span
                class="col bright orange">i</span
            >
            Added proper <code>robots.txt</code> definitions and restrictions.
        </li>
        <li>
            <span class="col bright yellow">~</span>
            Reworked the design of the <a href="/projects">projects page</a>.
        </li>
        <li>
            <span class="col bright yellow">~</span><span
                class="col bright orange">i</span
            >
            Added <code>rel="noopener noreferrer"</code> attributes to external links.
        </li>
        <li>
            <span class="col bright yellow">~</span><span
                class="col bright orange">i</span
            >
            Split global styles into multiple stylesheet documents.
        </li>
        <li>
            <span class="col bright red">-</span>
            Removed some unnecessary and now irrelevant information.
        </li>
    </ul>
</section>
