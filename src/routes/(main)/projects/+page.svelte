<script>
    import { Ia } from "$lib/components/Links";
    import Breadcrumbs from "$lib/components/Navigation/Breadcrumbs.svelte";
    import { getPageData } from "$lib/map";
</script>

<section id="projects">
    <Breadcrumbs />

    <h1>Featured Projects</h1>

    <p>Here are some projects that I've been working on.</p>

    <div id="container">
        <div class="project">
            <div class="header">
                <div class="status complete">complete</div>

                <h1>core</h1>
            </div>

            <p class="description">
                The frontend source code for lanzoor.dev, which is the website
                you're looking at right now.
            </p>

            <div class="information">
                <div class="tags">
                    <div class="tag frontend">frontend</div>
                    <div class="tag webpage">webpage</div>
                </div>

                <div class="links">
                    links:

                    <a href="/"> project </a>
                    <a href="/projects/core/changelog"> changelog </a>
                    <Ia href="https://github.com/Lanzoor/core" external
                        >source</Ia
                    >
                </div>
            </div>
        </div>

        <div class="project">
            <div class="header">
                <div class="status wip">wip</div>

                <h1>core-api</h1>
            </div>

            <p class="description">
                The source code for api.lanzoor.dev, which powers the backend of
                this site.
            </p>

            <div class="information">
                <div class="tags">
                    <div class="tag backend">backend</div>
                    <div class="tag webpage">webpage</div>
                </div>

                <div class="links">
                    links:

                    <Ia href="https://api.lanzoor.dev" external>project</Ia>
                    <Ia href="/projects/core-api/changelog" external
                        >changelog</Ia
                    >
                    <Ia href="https://github.com/Lanzoor/core-api" external
                        >source</Ia
                    >
                </div>
            </div>
        </div>

        <div class="project">
            <div class="header">
                <div class="status complete">complete</div>

                <h1>core-archive</h1>
            </div>

            <p class="description">
                An archive containing previous documents related to me that are
                no longer actively maintained.
            </p>

            <div class="information">
                <div class="tags">
                    <div class="tag frontend">frontend</div>
                    <div class="tag webpage">webpage</div>
                </div>

                <div class="links">
                    links:

                    <Ia href="https://archive.lanzoor.dev" external>project</Ia>
                    <Ia href="https://github.com/Lanzoor/core-archive" external
                        >source</Ia
                    >
                </div>
            </div>
        </div>

        <div class="project">
            <div class="header">
                <div class="status wip">wip</div>

                <h1>kagipass</h1>
            </div>

            <p class="description">
                Generate deterministic, strong passwords using the kagipass
                algorithm.
            </p>

            <div class="information">
                <div class="tags">
                    <div class="tag program">program</div>
                    <div class="tag cli">cli</div>
                </div>

                <div class="links">
                    links:

                    <Ia href="https://github.com/Lanzaforge/kagipass" external
                        >source</Ia
                    >
                </div>
            </div>
        </div>

        <div class="project">
            <div class="header">
                <div class="status complete">complete</div>

                <h1>BHOJ <span class="dim">(Bro Had One Job)</span></h1>
            </div>

            <p class="description">
                An esoteric programming language compiler, written in Python.
            </p>

            <div class="information">
                <div class="tags">
                    <div class="tag program">program</div>
                    <div class="tag cli">cli</div>
                </div>

                <div class="links">
                    links:

                    <Ia href="https://github.com/Lanzoor/BHOJ" external
                        >source</Ia
                    >
                </div>
            </div>
        </div>
    </div>

    <p>
        For archived projects (such as <code>periodica</code> and
        <code>profile-old</code>), please refer to
        <Ia href="https://legacy.lanzoor.dev" external>legacy.lanzoor.dev</Ia>.
    </p>
</section>

<section id="portal">
    <h1>Projects Portal</h1>

    <p>
        There's also a plenty of projects hosted directly within this website.
    </p>

    <ul>
        <li>
            <a href="/tools">Tools</a> - {getPageData("/tools")?.description}
        </li>

        <li>
            <a href="/conlangs">Conlangs</a> - {getPageData("/conlangs")
                ?.description}
        </li>

        <li>
            <a href="/games">Games</a> - {getPageData("/games")?.description}
        </li>
    </ul>
</section>

<style lang="css">
    :root {
        --projects-bg:
            radial-gradient(
                circle at top left,
                rgba(0, 72, 255, 0.1) 0%,
                transparent 25%,
                transparent 100%
            ),
            radial-gradient(
                circle at 100% 50%,
                rgba(0, 255, 255, 0.1) 0%,
                transparent 25%,
                transparent 100%
            ),
            radial-gradient(
                circle at bottom left,
                rgba(0, 180, 255, 0.1) 0%,
                transparent 25%,
                transparent 100%
            ),
            rgb(4, 0, 8);
    }

    #projects {
        background: var(--projects-bg);
    }

    #portal {
        background: black;
    }

    #container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(750px, 1fr));
        gap: 3em;

        width: 100%;
        margin: 3em 0;
    }

    .project {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 2em;

        padding: 2em;

        background: rgb(6, 2, 11);
        border: 2px solid #222;
        border-radius: 1em;

        transition: 500ms ease;

        position: relative;
        overflow: hidden;
    }

    .project .header {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5em;
    }

    .project .header h1 {
        font-size: 1.75em;
        letter-spacing: 0.05em;
        text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);

        font-family: "JetBrains Mono";

        transition: 200ms ease;
    }

    .project .header h1:hover {
        letter-spacing: 0.1em;
    }

    .project .status {
        background: #111;
        padding: 0.3em 0.5em;
        font-size: 0.75em;
    }

    .project .status::before {
        content: "[ ";
    }

    .project .status::after {
        content: " ]";
    }

    .project .status.complete {
        color: var(--bright-green);
        background: color-mix(in oklch, black, var(--bright-green) 25%);
    }

    .project .status.wip {
        color: var(--bright-yellow);
        background: color-mix(in oklch, black, var(--bright-yellow) 25%);
    }

    .project .description {
        line-height: 1.6;
        font-size: 0.8em;
        max-width: 25em;

        color: rgba(255, 255, 255, 0.7);
    }

    .project .information {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5em;
    }
    .project .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
    }

    .project .tags .tag {
        font-size: 0.8em;
        font-weight: 600;

        color: #777;
        text-shadow: 0 0 20px
            oklch(from currentColor calc(l * 0.7) calc(c * 2) calc(h + 10));
    }

    .project .tags .tag::before {
        content: ">_ ";
        color: #333;
        text-shadow: none;
    }

    .project .tags .tag.backend {
        color: var(--bright-orange);
    }
    .project .tags .tag.frontend {
        color: var(--bright-green);
    }
    .project .tags .tag.webpage {
        color: var(--bright-cyan);
    }
    .project .tags .tag.program {
        color: var(--bright-purple);
    }
    .project .tags .tag.cli {
        color: var(--bright-magenta);
    }

    .project .links {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        column-gap: 1em;
        row-gap: 0.5em;
        max-width: 25em;
    }

    .project .links :global(a) {
        color: white;
        transition: 200ms ease;
    }

    .project .links :global(a):hover {
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }

    @media (max-width: 768px) {
        .project .description,
        .project .links {
            max-width: none;
        }
    }
</style>
