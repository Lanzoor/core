<script lang="ts">
    import { Ba } from "$lib/components/Links";
    import { onMount } from "svelte";

    const messages = [
        [30_000, "You sstill there?"],
        [60_000, "You can take your time."],
        [90_000, "You really like this page, huh."],
        [120_000, "Okay, seriously. I think you forgot to close this tab."],
        [
            180_000,
            "Let's just act like nothing ever happened and just move on.",
        ],
        [182_400, "Welcome! 👋"],
    ] as const;

    let message = $state("Welcome! 👋");

    onMount(() => {
        let timers: ReturnType<typeof setTimeout>[] = [];

        function reset() {
            for (const timer of timers) {
                clearTimeout(timer);
            }

            message = "Welcome! 👋";

            timers = messages.map(([delay, message]) =>
                setTimeout(() => {
                    message = message;
                }, delay),
            );
        }

        const events = [
            "mousemove",
            "scroll",
            "click",
            "keydown",
            "touchstart",
        ] as const;

        for (const event of events) {
            window.addEventListener(event, reset, { passive: true });
        }

        reset();

        return () => {
            for (const event of events) {
                window.removeEventListener(event, reset);
            }

            for (const timer of timers) {
                clearTimeout(timer);
            }
        };
    });
</script>

<section
    class="disable-initial-padding disable-padding disable-layout"
    id="iris-bg"
>
    <section class="enable-initial-padding fixed-bg centered" id="intro">
        <header>
            <h1 class="logo">
                <span class="head">lanzoor</span><span>.</span><span
                    class="tail">dev</span
                >
            </h1>

            <p class="adaptive-text-shadow">
                <span class="col black">//</span>
                <span class="col purple"> portfolio </span>
                <span class="col black">//</span>
                <span class="col blue"> archive </span>
                <span class="col black">//</span>
                <span class="col cyan"> projects </span>
                <span class="col black">//</span>
                <span class="col green"> showcases </span>
                <span class="col black">//</span>
            </p>

            <p>
                <b class="egg">{message}</b><br />
                My name is <span class="col bright purple">Lapis Lanzuli</span>,
                <span class="dim">
                    (also known as <span class="col bright purple">Lanzoor</span
                    >)
                </span>
                a student from South Korea who likes
                <span class="col green">programming</span>,
                <span class="col yellow">science</span>,
                <span class="col orange">languages</span> and more.<br />

                You'll find projects, showcases, tools, and whatever my brain
                decided to finish.
            </p>
        </header>

        <p>
            <b>
                Make yourself at home, explore things at your own pace and
                <span class="col bright purple">have fun!</span>
            </b>
        </p>
    </section>

    <section id="quick-links">
        <div class="enable-spacing quick-links">
            <h1>Quick Links</h1>

            <p>
                <i class="col bright purple">Not sure where to start?</i> Here are
                some places worth checking out.
            </p>

            <div class="links">
                <Ba href="/about">
                    <h2>🌐 About</h2>
                    <p>
                        <b>Learn more about this website,</b> including its goals,
                        and how it was built.
                    </p>
                </Ba>
                <Ba href="/profile">
                    <h2>👤 Profile</h2>
                    <p>
                        <b>Learn more about me</b>, my interests, and where to
                        find me online.
                    </p>
                </Ba>
                <Ba href="/projects">
                    <h2>💻 Projects</h2>
                    <p>
                        <b>Explore the projects I've been working on,</b> from experiments,
                        simple tools, to larger creations.
                    </p>
                </Ba>
                <Ba href="/docs">
                    <h2>📄 Documents</h2>
                    <p>
                        <b>Browse my documents and guides.</b> I really like talking
                        about random stuff there!
                    </p>
                </Ba>
                <Ba href="/blog">
                    <h2>📝 Blog</h2>
                    <p>
                        Read announcements, development updates and life
                        updates.
                    </p>
                </Ba>
                <Ba href="/projects/core/changelog">
                    <h2>🔄 Changelog</h2>
                    <p>
                        See what's changed, what's new, and what's been
                        improved.
                    </p>
                </Ba>
            </div>
        </div>
    </section>
</section>

<div style="display: none">Nice weather today, 'innit?</div>

<style lang="css">
    #iris-bg {
        background-image: url("/assets/backgrounds/iris.jpg");
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: fixed;
    }

    #intro,
    #quick-links {
        background: rgba(0, 0, 0, 0.8);
    }

    @keyframes cursorBlink {
        0% {
            opacity: 0%;
        }

        50% {
            opacity: 100%;
        }

        100% {
            opacity: 0%;
        }
    }

    #intro header .logo {
        font-size: clamp(1em, calc(3vw + 1em), 4em);
    }

    #intro header .logo::after {
        position: absolute;
        left: auto;
        content: "_";
        animation: cursorBlink 1s none infinite;
    }

    .quick-links {
        background: rgba(15, 15, 20, 0.55);

        border: 1px solid rgba(255, 255, 255, 0.1);

        backdrop-filter: blur(12px);

        border-radius: 2em;
        padding: 2em;
    }

    .quick-links .links {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(40vw, 1fr));
        gap: 1.5em;
    }

    :global(.quick-links .links .-block-anchor) {
        display: block;

        padding: 1.5em;
        border-radius: 1em;

        text-decoration: none;
        color: inherit;

        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.12);

        transition: 200ms ease;
    }

    :global(.quick-links .links .-block-anchor:hover) {
        transform: translateY(-4px);
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.25);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
    }

    :global(.quick-links .links .-block-anchor h2) {
        margin-bottom: 0.5em;
        font-size: 1.5em;
    }

    :global(.quick-links .links .-block-anchor p) {
        margin: 0;
        opacity: 0.9;
    }
</style>
