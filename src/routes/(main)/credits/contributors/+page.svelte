<script>
    import Breadcrumbs from "$lib/components/Navigation/Breadcrumbs.svelte";
</script>

<section class="centered horizontally" id="intro">
    <Breadcrumbs />

    <header>
        <h1>Contributors</h1>

        <p>
            Here's an updating list of amazing contributors, who helped create
            and improve the website for everyone!
        </p>
    </header>
</section>

<section id="amethyst">
    <h1>Amethyst Team</h1>

    <p>
        <span class="col bright purple">The Amethyst Team</span> refers to a certain
        group of people that frequently work together in order to improve the website
        for everyone.
    </p>

    <div class="cards">
        <div class="card">
            <img
                src="/assets/contributors/iris-modern.png"
                alt="lanzoor"
                title="lanzoor"
            />

            <div class="description">
                <h1>Lanzoor</h1>

                <div class="roles">
                    Founder · Developer · <span
                        title="start playing New World Order by Masafumi Takada"
                        >Professional Procrastinator</span
                    >
                </div>

                <p>
                    Maintains the website infrastructure, frontend systems, and
                    backend services.
                </p>

                <div class="quote">
                    i like mangoes. mangoes are a way of life.
                </div>
            </div>
        </div>

        <div class="card">
            <img
                src="/assets/contributors/derukugi.png"
                alt="derukugi"
                title="derukugi"
            />

            <div class="description">
                <h1>derukugi</h1>

                <div class="roles">
                    Security · Quality Assurance · Supporter
                </div>

                <p>Gave inspirations and feedback for the website.</p>

                <div class="quote">I'm a big fan of Drastic</div>
            </div>
        </div>
    </div>
</section>

<section id="jade">
    <h1>Jade Team</h1>

    <p>
        <span class="col bright cyan">The Jade Team</span> refers to the amazing contributors
        that helped build this website.
    </p>

    <div class="cards">
        <div class="card">
            <img
                src="/assets/contributors/sweden_finlandia.hoi4.png"
                alt="sweden_finlandia.hoi4"
                title="sweden_finlandia.hoi4"
            />

            <div class="description">
                <h1>ASEANCoin</h1>

                <p>Drew my original character, Iris.</p>

                <div class="quote">
                    His drawing skills are so good they should honestly be
                    illegal. Also, a huge HOI4 fan.
                </div>
            </div>
        </div>

        <div class="card">
            <img
                src="/assets/contributors/tactical02_.png"
                alt="tactical02_"
                title="tactical02_"
            />

            <div class="description">
                <h1>Suw</h1>

                <p>
                    Frontend developer from Vietnam. Gave some great suggestions
                    and direct fixes for the website.
                </p>

                <div class="quote">:OkuuMindblown:</div>
            </div>
        </div>

        <div class="card">
            <img
                src="/assets/contributors/blackrose.png"
                alt="blackrose"
                title="blackrose"
            />

            <div class="description">
                <h1>blackrose</h1>

                <p>
                    Gave inspirations for the design aspect of the website, and
                    pointed out some several security-related issues.
                </p>
            </div>
        </div>
    </div>
</section>

<style lang="css">
    #amethyst {
        background:
            radial-gradient(
                circle at top left,
                rgba(40, 7, 112, 0.5),
                transparent 40%
            ),
            radial-gradient(
                circle at bottom right,
                rgba(40, 7, 112, 0.5),
                transparent 40%
            ),
            linear-gradient(
                to bottom,
                rgba(40, 7, 112, 0.25) 0%,
                black 40%,
                black 60%,
                rgba(40, 7, 112, 0.25) 100%
            ),
            black;
    }

    #jade {
        background:
            radial-gradient(
                circle at top left,
                rgba(9, 82, 95, 0.5),
                transparent 40%
            ),
            linear-gradient(
                to right,
                rgba(9, 82, 95, 0.25) 0%,
                black 40%,
                black 60%,
                rgba(9, 82, 95, 0.25) 100%
            ),
            black;
    }

    .cards {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
        flex-wrap: wrap;
        gap: 4em;

        padding: 2em;
        width: 100%;
    }

    .cards .card {
        display: flex;
        flex-direction: column;
        gap: 2em;

        width: 20em;

        align-items: center;
        text-align: center;

        backdrop-filter: blur(4px);

        transition: 0.2s ease;
    }

    .cards .description {
        display: flex;
        flex-direction: column;
        gap: 0.25em;
    }

    .cards .description h1 {
        font-size: 2em;
    }

    .cards .description p {
        font-size: 0.75em;
    }

    .roles {
        opacity: 0.65;

        font-size: 0.6em;
        letter-spacing: 0.05em;
    }

    .quote {
        margin-top: 1em;

        padding: 0.5em 1em;
        font-size: 0.75em;

        opacity: 0.75;
    }

    #amethyst .quote {
        border-left: 5px solid rgb(150, 100, 255);
        background: rgba(150, 100, 255, 0.25);
        box-shadow: 0 0 10px rgba(121, 61, 252, 0.25);
    }

    #jade .quote {
        border-left: 5px solid rgb(100, 232, 255);
        background: rgba(100, 232, 255, 0.25);
        box-shadow: 0 0 10px rgba(100, 232, 255, 0.25);
    }

    .quote:before {
        content: "“";
    }

    .quote:after {
        content: "”";
        margin-top: 1em;
    }

    .cards .card img {
        width: 7.5em;
        height: 7.5em;

        border-radius: 2147483647px;
        transition: transform 500ms ease;
        user-select: none;
    }

    .cards .card img:hover {
        transform: scale(1.1) translateY(-4px);
        cursor: pointer;
    }
</style>
