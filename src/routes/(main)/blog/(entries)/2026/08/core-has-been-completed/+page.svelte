<script lang="ts" module>
    import blogOld from "./assets/blog-old.png";
    import blogPre from "./assets/blog-pre.png";
    import blogPost1 from "./assets/blog-post-1.png";
    import blogPost2 from "./assets/blog-post-2.png";
    import BlogBreadcrumbs from "$lib/components/Navigation/BlogBreadcrumbs.svelte";

    export const metadata = {
        title: "core Has Been Completed",
        description:
            "A recap of core, its completion, as well as what comes next.",
        tags: ["important", "announcement", "blog", "core", "monthly-recap"],
        published: new Date("2026-08-13T00:00:00+09:00"),
    };
</script>

<svelte:head>
    <title>{metadata.title}</title>

    <meta name="tags" content={metadata.tags.join(", ")} />
</svelte:head>

<section>
    <BlogBreadcrumbs />

    <h1>core Has Been Completed</h1>

    <p>Hi,</p>

    <p>
        <b>
            After six months of development, I'm proud to announce that <code
                >core</code
            > <span class="dim">(lanzoor.dev)</span> has finally been completed!
        </b>
        In this article, I would like to discuss about the journey that led to its
        completion, as well as what comes next for the website.
    </p>

    <h2>A Recap</h2>

    <h3>The Experimental Era (February 2026 ~ May 2026)</h3>

    <p>
        <b>
            The development of <code>core</code> started around February 2026,
            when I decided to register the domain
            <code>lanzoor.dev</code>.
        </b>

        <code>lanzoor.dev</code> originally started as a website dedicated to my profile
        and my documents.
    </p>

    <p>
        Since I was still fairly inexperienced with web development, I would
        usually experiment with different ideas and technologies rather than
        making much actual progress.
    </p>

    <div class="image-grid">
        <img src={blogOld} alt="Old Blog" />
        <img src={blogPre} alt="Pre-overhaul Blog" />
        <img
            src={blogPost1}
            alt="Post-overhaul Blog"
            style="border: 1px solid white;"
        />
        <img
            src={blogPost2}
            alt="Post-overhaul Blog"
            style="border: 1px solid white;"
        />
    </div>

    <div class="image-description">
        The design of the blog / announcement page, old (feb 2026) vs before
        overhaul (apr 2026) vs after overhaul (now, 2 attachments)
    </div>

    <h3>The Revolution (May 2026 ~ Now)</h3>

    <p>
        <b>
            Things started to take a turn around May 2026, when the development
            of <code>core</code> sped up significantly.
        </b>
        This was when I decided to take web development more seriously.
    </p>

    <p>
        As I developed my own development and design style, I decided to turn
        the website into something more polished and pleasant with features
        you'd expect from a real website.
    </p>

    <p>
        Although I was a bit stubborn at first, and genuinely had no idea what I
        was doing, I gradually started to realize the true beauty of web
        development over time.
    </p>

    <h2>What I Learned</h2>

    <p>
        As I actively developed and maintained <code>core</code>, I learned a
        few important things about web development, while also becoming more
        serious about programming.
    </p>

    <p>
        I became familiar with the broader frontend ecosystem, including the
        tools and frameworks commonly used in modern web development.
    </p>

    <p>
        But most importantly, <i>I learned how to think like a developer.</i> Instead
        of relying on AI to do everything for me, I constantly experimented, built
        my own things, and tried to solve problems myself. Whenever I encountered
        a challenge, I learned to approach it directly and see what I could figure
        out.
    </p>

    <p>
        <b>I also completely changed the way how I approach development.</b> In the
        earlier days, I would often force myself to finish a feature as quickly as
        possible. Not only was this tedious, but the results were usually worse as
        well.
    </p>

    <p>
        Over time, I realized that the best way to create something is to
        genuinely enjoy the process. When I enjoy what I am building, I am more
        willing to experiment, reconsider my decisions, and take the time to
        make things better.
    </p>

    <h2>What Comes Next?</h2>

    <p>
        <b
            >After a short break, I will be focusing on my other projects, such
            as the Lanzaforge projects, <code>core-api</code>, as well as some
            of my other personal projects.</b
        >
    </p>

    <p>
        <b>By the way, <code>core</code> won't be left unmaintained!</b> I'd still
        love to experiment with the website, and development, maintenance, and updates
        will continue. I'll also be creating new articles whenever I feel like it.
        it.
    </p>

    <p>
        The term "completion" simply means that <code>core</code> has moved beyond
        the "alpha" stage, and that I can stop treating it as an unfinished project
        and start treating it as something I can continue to build upon.
    </p>

    <h2>Outro</h2>

    <p>
        ...and that's pretty much it! <code>core</code> has gone from a small website
        I made while experimenting with web development to something I am genuinely
        proud of.
    </p>

    <p>
        <b>
            Thanks for spending time on this little website, and I'll see you in
            the next update.
        </b>
    </p>
</section>
