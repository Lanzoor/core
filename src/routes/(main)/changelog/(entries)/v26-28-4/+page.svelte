<script lang="ts">
    export const metadata = {
        published: new Date("2026-09-10T00:00:00+09:00"),
    };
</script>

<section>
    <h2>Minor update v26.28.4</h2>

    <p class="dim">
        Release date: <b>September 10th, 2026</b>
    </p>

    <ul>
        <li>
            <span class="col bright purple">ƒ</span>
            Fixed an issue where some redirects didn't preserve the inner paths.
        </li>
        <li>
            <span class="col bright green">+</span>
            Added the <a href="/docs/personal-dict">Personal Dictionary</a> page.
        </li>
        <li>
            <span class="col bright yellow">~</span>
            Updated the <a href="/profile">profile</a> page.
        </li>
        <li>
            <span class="col bright yellow">~</span>
            <b>
                Changed the pathname for the changelog from <code
                    >/projects/core/changelog</code
                >
                to <code>/changelog</code>
            </b>. A redirect has already been implemented for compatibility
            purposes.
        </li>
        <li>
            <span class="col bright yellow">~</span>
            Switched the version display within the footer panel to a more manual
            format in order to prevent having to update versions within the API system
            as well.
        </li>
    </ul>
</section>
