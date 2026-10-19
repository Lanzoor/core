<script lang="ts">
    import { Ia } from "$lib/components/Links";

    export const metadata = {
        published: new Date("2026-10-19T00:00:00+09:00"),
        // commit: "https://github.com/Lanzoor/core/commit/33f8959d280eab8b3190885965bcd905fcb5f139",
    };
</script>

<section>
    <h2>Minor update v26.28.9</h2>

    <p class="dim">
        Release date: <b>October 19th, 2026</b><br />
        <!-- Source: <Ia
            href="https://github.com/Lanzoor/core/commit/33f8959d280eab8b3190885965bcd905fcb5f139"
            external>github</Ia
        > -->
    </p>

    <ul>
        <li>
            <span class="col bright purple">ƒ</span>
            Fixed a very annoying issue where metadata of nonexistent pages would
            default to <code>/</code>.
        </li>

        <li>
            <span class="col bright yellow">~</span>
            Improved the design of list and table elements.
        </li>

        <li>
            <span class="col bright yellow">~</span>
            Updated the <a href="/docs/shitter">Shitter docs</a>.
        </li>
    </ul>
</section>
