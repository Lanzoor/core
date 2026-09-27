<script>
    import { Ia } from "$lib/components/Links";
    import Breadcrumbs from "$lib/components/Navigation/Breadcrumbs.svelte";
    import { LegalInfo } from "$lib/legal";

    const privacyPolicy = LegalInfo.privacyPolicy;
</script>

<section>
    <Breadcrumbs />

    <header>
        <h1>Privacy Policy</h1>
    </header>

    <p class="dim">
        Last updated @ <b>{privacyPolicy.formatTime()}</b> | Current version:
        <b>{privacyPolicy.formatVersion()}</b><br />
    </p>

    <h2 id="data-collection">α. Data Collection</h2>

    <p>
        <b>
            This website does not intentionally collect or use personal data or
            use analytics services. Period.
        </b>
    </p>

    <h2 id="third-party">β. Third-Party Services</h2>

    <blockquote>
        Although we strive to minimize the use of third-party services, <b
            >some services are required for the operation, security, and
            delivery of this website.</b
        > Thanks for your understanding!
    </blockquote>

    <h3>Information</h3>

    <p>
        These third-party services may process limited information necessary to
        provide their services. <b
            >The website itself, however, does not intentionally share personal
            information with third parties for advertising, analytics, or
            tracking purposes.</b
        >
    </p>

    <p>
        <b>
            Lapis Lanzuli, as well as Lanzaforge, is not affiliated with the
            services listed below. We do not control how these services process
            information, and do not access or use information collected by these
            services for its own purposes.
        </b>
    </p>

    <h3>Cloudflare</h3>

    <p>
        <b
            >Cloudflare provides DNS, content delivery, and email routing
            services for this website.</b
        ><br />
        As part of providing these services, Cloudflare may process technical information
        such as IP addresses.
    </p>

    <p>
        For more information, please refer to <Ia
            href="https://www.cloudflare.com/privacypolicy/"
            external
        >
            Cloudflare's privacy policy
        </Ia>.
    </p>

    <p>
        <b>This website is hosted via Vercel.</b><br />
        As part of normal operation, Vercel may collect technical information such
        as IP addresses, request logs, and performance metrics.
    </p>

    <p>
        For more information, please refer to
        <Ia
            href="https://vercel.com/legal/privacy-notice#how-we-use-info"
            external
        >
            Vercel's privacy policy
        </Ia>.
    </p>

    <h3>Google Fonts</h3>

    <p>
        <b>This website loads fonts via Google Fonts.</b>
    </p>

    <p>
        For more information, please refer to
        <Ia href="https://developers.google.com/fonts/faq/privacy" external>
            Google Fonts' privacy policy
        </Ia>.
    </p>
</section>
