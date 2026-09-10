<script lang="ts">
    export const metadata = {
        title: "The Legal Update",
        published: new Date("2026-07-24T00:00:00+09:00"),
    };
</script>

<section>
    <h2>v26.26.0: The Legal Update</h2>

    <p class="dim">
        Release date: <b>July 24th, 2026</b>
    </p>

    <p>
        <b
            >Here's a surprise update! You definitely weren't expecting this,
            right?</b
        >
    </p>

    <ul>
        <li>
            <span class="col bright green">+</span>
            <b>Added the <a href="/tos">Terms of Service</a> page.</b>
        </li>
        <li>
            <span class="col bright green">+</span>
            <b>
                Added a notice panel that notifies you whether the Legal
                Information changes, or you first visit the website.
            </b>
        </li>
        <li>
            <span class="col bright green">+</span>
            Added the ability to exit the search screen within the
            <a href="/projects/core/changelog/">changelogs</a> by pressing the
            <kbd>Escape</kbd> key.
        </li>
        <li>
            <span class="col bright green">+</span>
            Added <a href="/conlangs/">conlangs</a> as a collection within the
            <a href="/projects">projects page</a>.
        </li>
        <li>
            <span class="col bright green">+</span>
            Added the internal change marker (<span class="col bright orange"
                >i</span
            >) for changelog entries.
        </li>
        <li>
            <span class="col bright green">+</span>
            Added new navigation entries to the footer panel.
        </li>
        <li>
            <span class="col bright green">+</span><span
                class="col bright orange">i</span
            >
            <b>Added automatic cleanup of outdated localStorage data.</b><br />
            Previously stored keys that are no longer used may now be automatically
            removed.
        </li>
        <li>
            <span class="col bright yellow">~</span>
            Improved style definitions for <code>{"<kbd>"}</code>,
            <code>{"<ul>"}</code>,
            <code>{"<ol>"}</code>, as well as some block elements.
        </li>
        <li>
            <span class="col bright yellow">~</span>
            Improved color palette.
        </li>
        <li>
            <span class="col bright yellow">~</span>
            Updated <a href="/about">/about</a> to match the new changes.
        </li>
        <li>
            <span class="col bright yellow">~</span>
            Changed layout of the footer panel.
        </li>
        <li>
            <span class="col bright yellow">~</span><span
                class="col bright orange">i</span
            >
            Renamed long selector identifiers.
        </li>
        <li>
            <span class="col bright yellow">~</span><span
                class="col bright orange">i</span
            >
            Split <code>app.css</code> into even more stylesheets.
        </li>
        <li>
            <span class="col bright red">-</span>
            <b>Completely removed intentional data collection. Period.</b>
        </li>
        <li>
            <span class="col bright red">-</span>
            Completely removed the analytics notice panel, in favor of the new one.
        </li>
        <li>
            <span class="col bright red">-</span>
            Added clear visuals in the Privacy Policy page to indicate that data collection
            has been temporarily disabled.
        </li>
    </ul>
</section>
