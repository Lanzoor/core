<script lang="ts" module>
    import BlogBreadcrumbs from "$lib/components/Navigation/BlogBreadcrumbs.svelte";

    export const metadata = {
        title: "Meta Update",
        description:
            "An update regarding changes to myself as well as my digital identity.",
        tags: ["personal", "announcement", "blog"],
        published: new Date("2026-10-07T00:00:00+09:00"),
    };
</script>

<svelte:head>
    <title>{metadata.title}</title>

    <meta name="tags" content={metadata.tags.join(", ")} />
</svelte:head>

<section>
    <BlogBreadcrumbs />

    <h1>Meta Update</h1>

    <p>Hi,</p>

    <h2 id="name">Name Update</h2>

    <p>
        <b
            >After some consideration, I've decided to change my name from
            Lanzoor to Lapis Lanzuli.</b
        > Although I had a few other candidates, this was the one I ultimately decided
        to go with.
    </p>

    <p>
        There were a couple of reasons for this. As I mentioned in <a
            href="/blog/2026/07/alias-updates">07/alias-updates</a
        >, I felt that Lanzoor no longer represented me, and people frequently
        mispronounced my name. I've also received some criticism regarding my
        Japanese name, which contributed to my decision to change it.
    </p>

    <p>
        <b
            >Lanzoor will probably still remain as my <i>internal</i> name, though.</b
        >
        My emails, the name of this website, and my internal usernames probably won't
        be changed. My
        <i>display</i> names are bound to change, though.
    </p>

    <p>Feel free to refer to me as Lanzoor even after the change, though.</p>

    <p>
        <b>
            Also, do note that I still have the option to change to another
            alias.
        </b>
        I may change my name again if this one doesn't really stick.
    </p>

    <h2 id="email">Email Update</h2>

    <p>
        As I updated my primary alias, I've created another Proton email
        address, which is <code>lapis-lanzuli@proton.me</code>.
    </p>

    <p>
        I've also created a backup Gmail address. <span class="dim"
            >(yes i now have at least 10 email addresses lmfao)</span
        ><br />
        Unfortunately
        <code>lapislanzuli@gmail.com</code>
        was taken, so i had to use <code>lapislanzuli319@gmail.com</code> instead.
    </p>

    <p>
        <b>
            I'm not going to change or delete any of email addresses starting
            with <code>lanzoor</code>!
        </b>

        I've just decided to use them for accounts, and the Lapis Lanzuli ones
        for general communication.
    </p>

    <h2 id="lanzaforge">Lanzaforge Update</h2>

    <p>
        <b>Lanzaforge is no longer going to be an organization.</b> For now.
    </p>

    <p>
        I'll admit it.
        <b>
            I literally have no experience making an organization. I don't
            really want to, either.
        </b>

        I've decided that I'm already happy enough with the current setup.
    </p>

    <p>Lanzaforge is going to stay more as a "group" for all of my projects.</p>
</section>
