<script lang="ts">
    export const metadata = {
        published: new Date("2026-06-12T00:00:00+09:00"),
    };
</script>

<section>
    <h2>Minor update v26.23.5</h2>

    <p class="dim">
        Release date: <b>June 12th, 2026</b>
    </p>

    <p>
        <b>This update is part of the navigation UI/UX overhaul.</b>
        We do not have an ETA for the actual overhaul yet, but it will take place
        sometime in June.
    </p>

    <ul>
        <li>
            <span class="col bright green">+</span>
            Added a <code>.frozen</code> attribute to the <code>main</code> element,
            so some panels can disable user interaction with the main content when
            necessary.
        </li>

        <li>
            <span class="col bright green">+</span>
            Added a link to the <code>core-api</code> project's changelog within
            <a href="/projects"> the projects page </a>.
        </li>

        <li>
            <span class="col bright green">+</span>
            Added a completely alternate layout for the warning panel for mobile devices.
        </li>

        <li>
            <span class="col bright green">+</span>
            Implemented a redirect from
            <code>/projects/core-api/changelog/:path*</code>
            to
            <code>https://api.lanzoor.dev/docs/changelog/:path*</code> to match the
            projects convention.
        </li>

        <li>
            <span class="col bright yellow">~</span>
            Improved the color pallete of the warning panel.
        </li>

        <li>
            <span class="col bright yellow">~</span>
            Updated <a href="/privacy-policy">the privacy policy</a>
            to <code>v2.3</code> in order to match so it matches the new changes.
        </li>

        <li>
            <span class="col bright yellow">~</span>
            Updated the logic of the script loaded by
            <a href="/privacy-policy">the privacy policy</a>
            to hide the panel when you make a choice via the button.
        </li>
    </ul>
</section>
