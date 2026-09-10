<script lang="ts">
    import { Ia } from "$lib/components/Links";

    export const metadata = {
        title: "Overly Overhauled Overlays",
        published: new Date("2026-07-29T00:00:00+09:00"),
    };
</script>

<section>
    <h1>v26.27.0: Overly Overhauled Overlays</h1>

    <p class="dim">
        Release date: <b>July 29th, 2026</b>
    </p>

    <ul>
        <li>
            <span class="col bright green">+</span><span
                class="col bright yellow">~</span
            >
            <b>
                Added a proper overlays system and migrated all existing
                overlays to the new system.
            </b><br />
            The new overlays system supports toggle keybindings, interaction and rendering
            priorities, and escape handlers for all components.<br />
            This makes managing existing overlays and creating new ones much easier.
        </li>
        <li>
            <span class="col bright green">+</span>
            <b>Implemented the navigation panel.</b>
            Only the true OGs remember its first design.
        </li>
        <li>
            <span class="col bright green">+</span>
            Added a link to
            <Ia href="https://www.lanzoor.xyz" external>core-xyz</Ia>
            within the <a href="/projects">projects</a> page.
        </li>
        <li>
            <span class="col bright green">+</span>
            Added section numbering for legal documents.
        </li>
        <li>
            <span class="col bright green">+</span>
            Added back several legacy pages, including
            <a href="/legacy/profile-old">the old profile</a>.
        </li>
        <li>
            <span class="col bright green">+</span><span
                class="col bright orange">i</span
            >
            <b
                >Added the <code>External</code> component, and its appropriate styles.</b
            ><br />
            This component is used when referencing external links.
        </li>
        <li>
            <span class="col bright yellow">~</span>
            <b>
                Changed the Terms Of Service URL from <code>/tos</code> to
                <code>/terms-of-service</code>, and added a redirect from
                <code>/tos</code>
                to
                <code>/terms-of-service</code>.
            </b><br />
            The shorthand URL <code>/tos</code> can still be used when referring to
            the Terms Of Service. In fact, all in-site links already use it.
        </li>
        <li>
            <span class="col bright yellow">~</span>
            Completely overhauled the <a href="/projects">projects page</a>.
        </li>
        <li>
            <span class="col bright yellow">~</span>
            Improved compatibility with devices with smaller screen widths.
        </li>
        <li>
            <span class="col bright yellow">~</span>
            Improved accessibility by adding ARIA roles and reworking interactive
            elements where possible.
        </li>
        <li>
            <span class="col bright yellow">~</span>
            Improved and expanded the color palette.
        </li>
        <li>
            <span class="col bright red">-</span>
            Removed irrelevant styles from the <a href="/">front page</a>.
        </li>
    </ul>
</section>
