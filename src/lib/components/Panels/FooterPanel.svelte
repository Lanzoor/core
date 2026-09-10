<script lang="ts">
    import { Ba, Ia } from "../Links";
</script>

<section id="footer-panel" class="disable-padding">
    <section id="navigation">
        <nav>
            <div class="group">
                <h2>General</h2>
                <a href="/">Frontpage</a>
                <a href="/profile">Profile</a>
                <a href="/map">Site map</a>
            </div>
            <div class="group">
                <h2>Projects</h2>
                <a href="/projects">Projects</a>
                <a href="/tools">Tools</a>
                <Ia href="/projects/videos" external>Videos</Ia>
                <a href="/projects/conlangs">Conlangs</a>
            </div>
            <div class="group">
                <h2>Documents</h2>
                <a href="/docs">Documents</a>
                <a href="/blog">Blog</a>
                <a href="/conventions">Conventions</a>
            </div>
            <div class="group">
                <h2>Meta</h2>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
                <a href="/changelog">Changelog</a>
                <a href="/credits">Credits</a>
            </div>
            <div class="group">
                <h2>Legal</h2>
                <a href="/legal">About</a>
                <a href="/legal/privacy">Privacy Policy</a>
                <a href="/legal/terms">Terms of Service</a>
            </div>
        </nav>
    </section>

    <section class="enable-spacing" id="bottom">
        <div class="enable-spacing">
            <h1 class="logo">
                <span class="head">lanzoor</span>.<span class="tail">dev</span>
            </h1>

            <p>
                A website by Lanzoor, including projects, showcases, documents,
                and more!
            </p>

            <p class="dim">
                v26.28.4 | last updated @ <code>September 10th, 2026</code> |
                <a href="/changelog/v26-28-4">view changelog</a>
            </p>
        </div>

        <hr />

        <div id="footer" class="enable-spacing">
            <div id="connections">
                <Ba href="https://www.discord.com" external>
                    <img
                        src="/assets/icons/socials/discord.svg"
                        alt="Discord"
                    />

                    <span class="handle">
                        @<span class="col bright purple">lanzoor</span>
                    </span>
                </Ba>

                <Ba href="https://www.reddit.com/user/Lanzoor/" external>
                    <img src="/assets/icons/socials/reddit.svg" alt="Reddit" />

                    <span class="handle">
                        u/<span class="col bright purple">Lanzoor</span>
                    </span>
                </Ba>

                <Ba href="https://github.com/Lanzoor" external>
                    <img src="/assets/icons/socials/github.svg" alt="GitHub" />

                    <span class="handle">
                        <span class="col bright purple">Lanzoor</span>
                    </span>
                </Ba>

                <Ba href="https://steamcommunity.com/id/lanzoor/" external>
                    <img src="/assets/icons/socials/steam.svg" alt="steam" />

                    <span class="handle">
                        <span class="col bright purple">Lanzoor</span>
                    </span>
                </Ba>

                <Ba href="https://www.youtube.com/@lanzoormakesvideos" external>
                    <img
                        src="/assets/icons/socials/youtube.svg"
                        alt="YouTube"
                    />

                    <span class="handle">
                        @<span class="col bright purple">lanzoor</span
                        >makesvideos
                    </span>
                </Ba>

                <Ba href="mailto:mail@lanzoor.dev" external>
                    <img src="/assets/icons/socials/email.svg" alt="Email" />

                    <span class="handle">
                        mail@<span class="col bright purple">lanzoor</span>.dev
                    </span>
                </Ba>
            </div>

            <footer>
                © 2026
                <Ia href="https://lanzaforge.org" external>Lanzaforge</Ia> ⬩ Do not
                redistribute.<br />
                Made with <Ia
                    href="https://svelte.dev/docs/kit/introduction"
                    external>SvelteKit</Ia
                > and ♡
            </footer>
        </div>
    </section>
</section>

<style lang="css">
    :root {
        --footer-panel-bg: radial-gradient(
            circle at 50% -25%,
            #22054d 0%,
            #000 100%
        );
    }

    #footer-panel {
        padding: auto 10%;
        background: var(--footer-panel-bg);
        border-top: 3px solid rgba(133, 91, 224, 0.5);

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 2%;

        font-family: "JetBrains Mono";
    }

    #footer-panel section {
        width: 100%;
    }

    #footer-panel #navigation {
        padding: 4em;
        border-bottom: 3px solid rgba(133, 91, 224, 0.5);
    }

    #footer-panel #navigation nav {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(10vw, 1fr));
        gap: 2em;
    }

    @media (max-width: 1200px) {
        #footer-panel #navigation nav {
            grid-template-columns: repeat(auto-fit, minmax(30vw, 1fr));
        }
    }

    #footer-panel #navigation nav .group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25em;
    }

    #footer-panel #navigation nav .group h2 {
        margin: 0.25em 0 0.5em 0;
        font-family: "JetBrains Mono";
        font-size: 1.1em;
        color: rgb(123, 61, 255);
    }

    #footer-panel #connections {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        column-gap: 1.5em;
        row-gap: 0.5em;

        margin: 0 2em;
    }

    :global(#footer-panel #connections .-block-anchor) {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        opacity: 0.75;
        gap: 0.5em;
        transition: opacity 500ms ease;
    }

    :global(#footer-panel #connections .-block-anchor img) {
        width: 1em;
        height: 1em;
    }

    :global(#footer-panel #connections .-block-anchor:hover) {
        opacity: 1;
        text-decoration: none;
    }

    #footer-panel #connections .handle {
        color: rgb(110, 55, 192);
    }

    #footer-panel footer {
        font-size: 0.75em;
        opacity: 0.5;
        text-align: center;
    }

    @media (max-width: 768px) {
        :global(#footer-panel #connections a > img) {
            width: 2em;
            height: 2em;
        }

        #footer-panel #connections {
            justify-content: flex-start;
            column-gap: 1em;
            row-gap: 0.25em;

            margin: 0;
        }

        #footer-panel #connections .handle {
            display: none;
        }
    }
</style>
