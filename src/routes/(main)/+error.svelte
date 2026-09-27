<script>
    import { page } from "$app/state";
    import { Ia } from "$lib/components/Links";

    let status = $state(page.status);
    let attemptedPath = $state(page.url?.pathname || "/");
</script>

<svelte:head>
    <title>{status} Error | lanzoor.dev</title>
</svelte:head>

{#if status === 404}
    <section id="error-404" class="stretched">
        <a href="/" onclick={() => history.back()}>
            {"<-"} Back
        </a>

        <header class="disable-layout">
            <h1>404</h1>

            <div class="separator"></div>

            <h2>Page not found</h2>
        </header>

        <p>
            <b>
                We couldn't find a resource located at
                <span class="col bright green">'{attemptedPath}'</span>.
            </b><br />
            The filename may have changed, or the file may have been moved or removed.
        </p>

        <p>
            Try using the navigation panels above and below. You may also <Ia
                href={attemptedPath}>try again</Ia
            >.
        </p>

        {#if attemptedPath === "/404"}
            <p class="dim">
                This is a test message. You can indeed access this page through <code
                    >/404</code
                >.
            </p>
        {/if}
    </section>
{:else}
    <section id="internal-error" class="stretched">
        <a href="/" onclick={() => history.back()}>
            {"<-"} Back
        </a>

        <header class="disable-layout">
            <h1>{status}</h1>

            <div class="separator"></div>

            <h2>Internal Error</h2>
        </header>

        <p>
            Something went wrong while processing your request. The server
            encountered an unexpected error and could not complete the request.
        </p>

        <p>
            This error is on our end. Please feel free to <a href="#connections"
                >get in touch</a
            >.
        </p>
    </section>
{/if}

<style lang="css">
    @layer page {
        #error-404 {
            background:
                radial-gradient(
                    circle,
                    rgba(100, 0, 255, 0.15),
                    transparent 60%
                ),
                radial-gradient(
                    circle,
                    rgba(220, 50, 255, 0.12),
                    transparent 55%
                );

            background-size:
                200% 200%,
                180% 180%;

            background-position:
                0% 0%,
                100% 100%;

            animation: Background404 20s ease-in-out infinite;
        }

        @keyframes Background404 {
            0% {
                background-position:
                    0% 0%,
                    100% 100%;
            }

            25% {
                background-position:
                    100% 25%,
                    25% 75%;
            }

            50% {
                background-position:
                    75% 100%,
                    0% 25%;
            }

            75% {
                background-position:
                    25% 75%,
                    75% 0%;
            }

            100% {
                background-position:
                    0% 0%,
                    100% 100%;
            }
        }

        #internal-error {
            background: radial-gradient(
                circle at 50% 50%,
                rgba(0, 4, 255, 0.25),
                transparent
            );
        }

        section header {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 1.5em;
        }

        section header .separator {
            width: 2px;
            height: 2em;

            background: rgba(255, 255, 255, 0.25);
        }

        section p {
            text-align: center;
        }
    }
</style>
