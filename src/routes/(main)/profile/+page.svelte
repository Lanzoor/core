<script lang="ts">
    import { pickRandom, randInt } from "$lib";
    import Breadcrumbs from "$lib/components/Navigation/Breadcrumbs.svelte";

    const profileDesc = "very cool profile image of my original character Iris";
    const timeFormatter = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Seoul",
    });

    const dateFormatter = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "2-digit",
    });

    const formatTime = () => timeFormatter.format(new Date()).toUpperCase();
    const formatDate = () => dateFormatter.format(new Date());

    let time = $state(formatTime());
    let date = $state(formatDate());

    const interval = setInterval(() => {
        time = formatTime();
        date = formatDate();
    }, 1000);

    $effect(() => {
        return () => clearInterval(interval);
    });

    type WordStyle = {
        x: number;
        y: number;
        s: string;
        r?: number;
    };

    type Word = {
        text: string;
        color: string;
        style: WordStyle;
    };
    const words: Word[] = [
        {
            text: "한국어",
            color: "rgb(120, 180, 255)",
            style: { x: 65, y: 42, s: "2.1em", r: 12 },
        },
        {
            text: "English",
            color: "rgb(255, 215, 120)",
            style: { x: 12, y: 18, s: "1.9em", r: -8 },
        },
        {
            text: "日本語",
            color: "rgb(255, 140, 170)",
            style: { x: 35, y: 70, s: "1.6em" },
        },
        {
            text: "中文",
            color: "rgb(140, 255, 210)",
            style: { x: 80, y: 25, s: "1em", r: 5 },
        },
        {
            text: "Español",
            color: "rgb(220, 170, 255)",
            style: { x: 55, y: 85, s: "1.1em" },
        },
        {
            text: "Deutsch",
            color: "rgb(180, 255, 255)",
            style: { x: 94, y: 78, s: "1.1em", r: 10 },
        },
    ];

    // if ur seeing this uhh then can you please recommend me more trivia i honestly don't fkn know what to write anymore

    const triviaList = [
        // Programming & Tech
        "I have a very weird love-hate relationship with programming.",
        "SvelteKit is my favorite framework.",
        "This website is built with SvelteKit.",
        "I like giving my projects unnecessarily elaborate names.",
        "I HATE REACT. Screw React states.",
        'The first webpage I ever made was a page for my conlang, Lanzoorian.<br>Yes, I know that name sucks. Anyways, this conlang has been retired since then in favor of <a href="/conlangs/proto-lanzavel">Lanzavel</a>.',
        "This site actually started as a single-page profile website.",
        "I genuinely lose my mind when I try to understand recursive functions.",
        "I like command-line interfaces more than I probably should.",
        "I have a Python program that backs up my workspace folder.",
        "I once spent 2 hours debugging an issue while editing a project,<br>until I realized I was in the wrong directory.",
        "I make webpage games to study and memorize stuff for my tests.",

        // Languages
        "Contrary to popular belief, my favorite language is actually English.",
        "I like how Japanese letters look.",
        'My favorite sound is <span class="ipa">/x/</span>.',
        'I pronounce GIF as <span class="ipa">/gɪf/</span>.',
        "I really like words with unusual consonant clusters.",
        "I enjoy finding unnecessarily complicated ways to say simple things.",
        "I am better at English input than English output.",
        "I think Latin makes every word sound like a mythical artifact.",
        "I have a weird obsession with Greek letters.",

        // Common
        "I have a love-hate relationship with math;<br>love because math is actually a goated subject,<br>and hate because of how it's taught and forced.",
        "My favorite color is purple. It used to be blue, though.",
        "My favorite numbers are 11, 13, and 17.<br>I especially like 13 for some reason.",
        "I prefer cats over dogs.",
        "I have never drank coffee ever in my life.",
        "I believe water is the best drink.",
        "I enjoy going down extremely specific rabbit holes.",
        "I am obsessed with monospace fonts.",
        "I can spend an unreasonable amount of time choosing a font.",
        "I have a tendency to memorize random things perfectly.",
    ];

    const specialTriviaList = [
        // Programming
        "text-shadow: 0 0 10px currentColor™",
        "CSS is a programming language if you believe hard enough...",

        // Funni
        "I think this text is yellow. Feel free to prove me wrong.",
        "I ate a watermelon while writing this sentence.",
        "I'm allergic to peaches.",
        "Your Lanzaforge™ subscription expires in 10 minutes.<br>Please renew immediately to continue using lanzoor.dev.",
        "emu is meaning smile!! :walc",

        // Easter Eggs
        "I am legally required to put at least one easter egg in every website I make.",
        "Enter the Konami code.",
        "May the eggs duplicate in peace.",
        "It-all-begins.",
        "I like spending time on the frontpage without doing anything whatsoever.",
        "Lan lan man. The sixteenth developer, lying hidden somewhere in this website. The one they call the Ultimate Procrastinator. Watch out for him.",

        '<b class="col bright yellow">Hey, thank you for spending a little bit of your time here! ♡</b><br>I put a lot of myself into the things I make, so knowing that someone chose to look at them really means a lot to me.',
    ];

    type TriviaType = null | "normal" | "special";

    function pickTrivia() {
        let list;

        const roll = randInt(1, 1000);

        if (roll <= 50) {
            // special: 5%
            triviaType = "special";
            list = specialTriviaList;
        } else {
            triviaType = "normal";
            list = triviaList;
        }

        trivia = pickRandom(list);
    }

    let trivia = $state("");
    let triviaType = $state<TriviaType>(null);
</script>

<section id="intro-bg" class="disable-padding disable-initial-padding">
    <section id="intro" class="enable-initial-padding">
        <Breadcrumbs />

        <div class="header">
            <img
                class="profile"
                src="/assets/contributors/iris-modern.png"
                alt={profileDesc}
                title={profileDesc}
            />

            <div class="name-group">
                <div class="name">Lanzoor</div>

                <div class="handle">@lanzoor</div>
            </div>
        </div>

        <div class="tags">
            <span class="tag">he/him</span> ⬩ <span class="tag">korean</span> ⬩
            <span class="tag">programmer</span>
            ⬩ <span class="tag">languages</span>
            ⬩ <span class="tag">science</span>
        </div>

        <div class="description">
            <b
                >hii, my name is <span class="col bright purple">Lanzoor</span
                >!</b
            ><br />
            i'm just a random student from Korea who enjoys creating things, solving
            interesting problems, and learning something new every day.<br />
            i'm obsessed with programming, learning languages, science and anime!<br
            />
        </div>
    </section>
</section>

<section id="bio">
    <h1><span class="col bright yellow">[ 01 ]</span> names</h1>

    <p>
        <b>
            I go by the name of <span class="col bright purple">Lanzoor</span>,
            which is pronounced
            <span class="ipa">/lɑn.ˈzoʊɹ/</span>.
        </b>
        <br />
        I just randomly thought of it when I was young or something.
    </p>

    <p>
        If you're close to me, feel free to call me Lanzy (<span class="ipa"
            >/ˈlæn.ziː/</span
        >) or lan lan man.<br />
        I also have a lot of aliases, such as
        <span class="col bright blue">Lapis Lazuli</span>
        <span class="ipa"> /ˈlæpɪs læˈzʊliː/ </span> and
        <span class="col green">Praseodymium Crystal</span>.
    </p>

    <h1>
        <span class="col bright yellow">[ 02 ]</span> nationality & location
    </h1>

    <p>
        <b>I am from South Korea 🇰🇷!</b>
        I currently live in 📍 Gyeonggi-do.
    </p>

    <p>
        <b
            >We use the glorious GMT+9 <span class="dim"
                >(KST, Korean Standard Time)</span
            > timezone.</b
        ><br />
        It is currently <b>{time}</b>, <b>{date}</b> in my location.<br />
        Feel free to send me messages whether I'm online or not!
    </p>

    <h1><span class="col bright yellow">[ 03 ]</span> personality & meta</h1>

    <p>
        <b>My MBTI type is <span class="col bright cyan">INTP</span>.</b><br />
        I absolutely <i>HATE</i> memorizing stuff without second thought. I
        enjoy understanding why and how things work.<br />
    </p>

    <p>
        I am introverted unless I'm online.<br />
        I have social anxiety and chronic depression. I also show symptoms associated
        with autism, OCD, and OCD.
    </p>

    <p>
        <b
            >My rule is: <i>if you respect me, I respect you.</i> Simple as that.</b
        ><br />
        I enjoy talking with people who are open-minded and willing to have genuine
        conversations.
        <i
            >Please do not talk to me if all you do is ragebait or make fun of
            me.</i
        >
    </p>
</section>

<section id="tech-bg" class="disable-padding">
    <section id="tech">
        <h1>Tech</h1>

        <p>
            <b
                >Ever since I was around ten years old, I've been fascinated by
                computers.</b
            >
            I've always enjoyed
            <b
                >making short games and programs, taking computers apart,
                figuring out how they work, and learning what goes on behind the
                scenes.</b
            >
        </p>

        <p>
            <b
                >Today, I spend most of my time building software & websites and
                exploring topics like cybersecurity.</b
            >
        </p>

        <h1>🖥️ Programming</h1>

        <p>
            <b
                >Programming always has been my favorite hobby, and also the
                hobby that I'm the most passionate about.</b
            ><br />
        </p>

        <p>
            Although I loved programming ever since I was around ten years old,
            <b>
                it wasn't until <span class="col bright green">late 2024</span>
                that I actually started taking programming seriously.
            </b><br />
            <b
                >Since then, it's become one of the things I spend the most time
                doing.</b
            >
        </p>

        <h2>🌐 Web Development</h2>

        <p>
            <b
                >Most of my projects are web-based because of how accessible the
                web is.</b
            >
            If someone has a browser,
            <i>they can view what I build instantly</i> without having to wait for
            the code to compile or to download. That makes it the perfect platform
            for experimenting with ideas.
        </p>

        <h3>Frameworks</h3>

        <div class="stacks">
            <div class="stack svelte">SvelteKit</div>
            ⬩
            <div class="stack next">Next.js</div>
        </div>

        <h3>Languages</h3>

        <div class="stacks">
            <div class="stack svelte">Svelte</div>
            ⬩
            <div class="stack react">React</div>
            ⬩
            <div class="stack js">JavaScript</div>
            ⬩
            <div class="stack ts">TypeScript</div>
            ⬩
            <div class="stack css">CSS</div>
            ⬩
            <div class="stack html">HTML</div>
            ⬩
            <div class="stack php">PHP</div>
        </div>

        <p>
            <b>
                I primarily use
                <span class="col bright red">SvelteKit</span>
                for new web projects, since it aligns with my coding principles and
                doesn't have much boilerplate.
            </b>
            I also have experience with
            <b>Next.js</b> and <span class="col bright cyan">React</span>.
        </p>

        <p>
            I also have some experience with <span class="col bright orange"
                >backend</span
            >
            development as well! I've built
            <b
                >REST APIs, Discord bots, database integrations, and the API
                powering this website <span class="dim"
                    >(which probably has more uptime than github 💀)</span
                ></b
            >.
        </p>

        <h2>🖥️ General Programming</h2>

        <div class="stacks">
            <div class="stack python">Python</div>
            ⬩
            <div class="stack c">C</div>
            ⬩
            <div class="stack rust">Rust</div>
        </div>

        <h3>Scripting</h3>

        <div class="stacks">
            <div class="stack bash">Bash</div>
            ⬩
            <div class="stack zsh">Zsh</div>
        </div>

        <p>
            <b
                >I usually write scripts in <span class="col bright blue"
                    >Python</span
                >.</b
            >
            Although I also have experience with C and Rust, I'm expected to write
            code in Python since it suits me.
        </p>

        <p>
            I have made a few CLI, TUI and GUI programs using Python before, and
            I have experience with most of the common libraries.
        </p>

        <p>
            Nowadays, though,

            <b
                >I usually find myself using Python and some scripting languages
                in order to <span class="col bright green"
                    >automate repetitive tasks</span
                >.</b
            >
            <span class="dim"
                >(e.g. making backups, running long commands repeatedly)</span
            >
        </p>

        <h1>🔐 Cybersecurity</h1>

        <p>
            Over time, my curiosity about how computers work expanded into
            networking and cybersecurity.

            <b>
                I like understanding how systems

                <span class="col bright cyan">communicate</span>, where they can
                <span class="col bright red">fail</span>, and how they can be
                <span class="col bright green">improved</span>.
            </b>
        </p>

        <h2>Interests</h2>

        <div class="stacks">
            <div class="stack">Networking</div>
            ⬩
            <div class="stack">Cryptography</div>
            ⬩
            <div class="stack">OSINT</div>
            ⬩
            <div class="stack">OPSEC</div>
        </div>

        <p>
            I like learning networking as well as how the internet actually
            works. I'm also really interested in OSINT
            <span class="dim">(Open Source Intelligence)</span>
            and OPSEC.
            <span class="dim">(Operational Security)</span>
        </p>

        <h1>Uses</h1>

        <h2>Operating System</h2>

        <p>
            <b>
                I currently use

                <span class="col bright purple">EndeavourOS</span>
                as my primary operating system.
                <span class="dim">(or kernel, whatever lmao)</span>
            </b>
            <br />
            I switched to Linux at around
            <span class="col bright cyan">May 2025</span>, starting with
            <span class="col bright green">Linux Mint</span>.
        </p>

        <h2>Development Environments</h2>

        <p>
            <b>
                I use a heavily customized version of
                <span class="col bright blue">VSCodium</span>
            </b>
            for most tasks.
            <span class="dim">
                (this is exactly why i have literal leveling bars in the editor
                😭)
            </span>
        </p>

        <p>
            <b>
                I also use <span class="col bright black">Zed</span> as an alternative
                editor,
            </b> since I find it easier to work with in some cases.
        </p>
    </section>
</section>

<section id="languages">
    <div class="word-cloud">
        {#each words as word}
            <span
                class="word noto-sans"
                style={`
                left:${word.style.x}%;
                top:${word.style.y}%;
                font-size:${word.style.s};
                color:${word.color};
                transform:translate(-50%, -50%) rotate(${word.style.r ?? 0}deg);
            `}
            >
                {word.text}
            </span>
        {/each}
    </div>

    <h1>Languages</h1>

    <ul>
        <li>
            <h3>
                <img
                    src="/assets/icons/countries/south-korea.svg"
                    alt="Korea Icon"
                />
                <div>
                    Korean <span class="adaptive-text-shadow col green"
                        >(<i>native</i>, C1)</span
                    >
                </div>
            </h3>

            <p>I am a native Korean speaker.</p>
        </li>
        <li>
            <h3>
                <img
                    src="/assets/icons/countries/united-kingdom.svg"
                    alt="UK Icon"
                />
                <div>
                    English <span class="adaptive-text-shadow col bright green"
                        >(B2 ~ C1)</span
                    >
                </div>
            </h3>

            <p>
                <b>I learned English through the immersion method™.</b> Basically,
                I spent my free time consuming English content and communicating with
                friends online. This method was very effective for me because I was
                able to learn while actually enjoying it.
            </p>
        </li>
        <li>
            <h3>
                <img src="/assets/icons/countries/japan.svg" alt="Japan Icon" />
                <div>
                    Japanese <span
                        class="adaptive-text-shadow col bright yellow"
                        >(B1 ~ B2, N3)</span
                    >
                </div>
            </h3>

            <p>
                <b>
                    I started learning Japanese around <b>March 2025</b> after discovering
                    Japanese music and anime.
                </b>
            </p>

            <p>
                As a Korean speaker, I found Japanese relatively easy because
                the two languages share similar grammar and vocabulary roots. I
                enjoy studying Japanese by comparing it with Korean.
            </p>
        </li>
        <li>
            <h3>
                <img src="/assets/icons/countries/china.svg" alt="China Icon" />
                <div>
                    Chinese <span class="adaptive-text-shadow col orange"
                        >(A2, HSK 1 ~ 2)</span
                    >
                </div>
            </h3>

            <p>
                I started learning Chinese around <b>early 2026</b> as another way
                to explore languages and expand my understanding of East Asian languages.
            </p>
        </li>
        <li>
            <h3>
                <img src="/assets/icons/countries/spain.svg" alt="Spain Icon" />
                <div>
                    Spanish <span class="adaptive-text-shadow col red"
                        >(A1)</span
                    >
                </div>
            </h3>

            <p>
                <b
                    >Spanish was the first Romance language I ever started
                    learning.</b
                >
                Although I am still a beginner, I find it interesting to explore a
                language with a very different structure and history from the ones
                I already know.
            </p>
        </li>
    </ul>

    <p>
        <b>
            I'm willing to help anyone learn or practice any of the languages
            listed above,
        </b>
        especially Korean, English and Japanese.
        <i>Though, please do note that I'm not really the best at teaching.</i>
    </p>

    <p>
        I am also interested in learning languages such as

        <b> German, Dutch and Greek </b>.
    </p>

    <h1>Linguistics</h1>

    <p>
        I also enjoy taking them apart and figuring out how they actually work.
    </p>

    <p>
        <b
            >I love exploring grammar, pronunciation, writing systems, and other
            aspects of linguistics.</b
        >
        I want to explore how languages work, and furthermore help other people learn
        languages as well.
    </p>

    <p>
        I also occasionally make my own languages
        <span class="dim">(conlangs, constructed languages)</span>.
    </p>
</section>

<section id="other-interests">
    <h1>Other Interests</h1>

    <h2>Science</h2>

    <div class="stacks">
        <div class="stack col blue">Astronomy</div>
        ⬩
        <div class="stack col purple">Physics</div>
        ⬩
        <div class="stack col green">Chemistry</div>
        ⬩
        <div class="stack col orange">Thermodynamics</div>
    </div>

    <p>
        I enjoy studying most branches of science, but I especially like <b
            >🔭 astronomy, ⚛️ physics, and 🧪 chemistry.</b
        >
    </p>

    <p>
        <b>I have been interested in astronomy since I was very young.</b> That interest
        eventually led me towards physics. I enjoy learning about the principles that
        govern how the world works.
    </p>

    <h2>Gaming</h2>

    <h3>Idle/Clicker/Incremental Games</h3>

    <div class="stacks">
        <div
            class="stack col bright cyan"
            title="haha number go up simulator go brrr"
        >
            Antimatter Dimensions
        </div>
        ⬩
        <div
            class="stack col bright blue"
            title="This is one of the first idle games I've ever played. It's peak."
        >
            Cell to Singularity
        </div>
        ⬩
        <div
            class="stack col bright orange"
            title="I don't get why people hate this so much. It's such a peak game."
        >
            Idle Slayer
        </div>
    </div>

    <h3>Rhythm Games</h3>

    <div class="stacks">
        <div
            class="stack"
            title="no bro it's not tap tap tap TAP tap it's actually tap tap TAP tap tap"
        >
            A Dance of
            <span class="col bright red">Fire</span> and
            <span class="col bright blue">Ice</span>
        </div>
        ⬩
        <div class="stack" title="click the rhombicosidodecahedrons">
            <span class="col bright magenta">osu!</span>
        </div>
        ⬩
        <div class="stack" title="semiquaver when">
            <span class="col bright cyan">Quaver</span>
        </div>
    </div>

    <div hidden>
        vivid/stasis used to be here, but it's kinda broke on linux<br />
        sadge
    </div>

    <h3>Platformer Games</h3>

    <div class="stacks">
        <div
            class="stack col bright yellow"
            title="brings me a lot of nostalgia"
        >
            Geometry Dash
        </div>
        ⬩
        <div class="stack col bright red" title="omg it peak platformer gaem!!">
            Celeste
        </div>
    </div>

    <h3>Other Games</h3>

    <div class="stacks">
        <div class="stack col green" title="creeper aww mann">Minecraft</div>
        ⬩
        <div
            class="stack col bright black"
            title="Lan lan man. The sixteenth developer, lying hidden somewhere in this website. The one they call the Ultimate Procrastinator. Watch out for him."
        >
            Danganronpa
        </div>
    </div>

    <p>
        <b>
            I play games in my free time, mostly as a way to relax and just have
            fun.
        </b>
        I usually like playing chill games.
    </p>

    <h2>Other Interests</h2>

    <p>Some of my other interests include:</p>

    <ul>
        <li>Solving math problems.</li>
        <li>Solving Rubik's cubes.</li>
        <li>
            Listening to music, and playing instruments such as the drum and the
            piano.
        </li>
        <li>Watching anime.</li>
    </ul>
</section>

<section id="projects">
    <h1>What I Make</h1>

    <p>
        <b>
            I enjoy building things that let me turn my ideas into something
            tangible.
        </b><br />
        Most of what I make involves programming, including websites, tools, experiments
        and smaller projects.
    </p>

    <p>
        I also enjoy creating conlangs, videos and some music in my free time.
        For information about my projects, consider checking the dedicated
        <a href="/projects">projects</a> page out!
    </p>
</section>

<section id="trivia">
    <h1>Trivia</h1>

    <p>Want to learn something random about me?<br />Click the button below!</p>

    <button onclick={pickTrivia}>Generate Trivia</button>

    <p class="quote {triviaType}">
        {#if triviaType === "normal"}<b>Did you know?</b><br />{/if}
        {@html trivia}
    </p>
</section>

<style lang="css">
    #intro-bg {
        background-image: url("/assets/backgrounds/strawberry-jam.jpg");
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: fixed;
    }

    #intro {
        background: rgba(0, 0, 0, 0.6);
    }

    #intro .header {
        text-align: center;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 2em;
    }

    #intro .header .profile {
        max-width: 7.5em;
        max-height: 7.5em;
        border-radius: 2147483647em;
    }

    #intro .header .name-group {
        text-align: left;
    }

    #intro .header .name-group .name {
        position: relative;
        color: white;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        font-size: 2.5em;
        line-height: 1.25;
        cursor: pointer;
    }

    #intro .header .name-group .name::after {
        content: "";
        position: absolute;

        left: 0;
        bottom: 2px;
        height: 0.06em;
        background: white;

        width: 0%;
        opacity: 0;
        transition: 0.5s ease;
    }

    #intro .header .name-group .name:hover::after {
        width: 100%;
        opacity: 1;
    }

    #intro .header .name-group .handle {
        color: rgba(255, 255, 255, 0.75);
    }

    #intro .description {
        padding: 0 5%;
    }

    #intro .tags {
        text-align: center;
        font-size: 1.2em;
    }

    #intro .tags .tag {
        opacity: 0.5;
        transition: 2s ease;
    }

    #intro .tags .tag:hover {
        opacity: 1;
        letter-spacing: 0.1em;
        cursor: pointer;
        transform: scale(1.1);
        transition: 0.5s ease;
        text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    }

    #bio {
        background:
            radial-gradient(circle at 20% 40%, #333 8%, transparent 8.1%),
            radial-gradient(circle at 90% 60%, #333 7%, transparent 7.1%),
            radial-gradient(circle at 70% 30%, #222 10%, transparent 10.1%),
            radial-gradient(circle at 50% 80%, #222 10%, transparent 10.1%),
            #111;
    }

    #bio > h1 {
        font-size: 1.5em;
    }

    #bio > h1 .col {
        font-size: 1.25em;
    }

    #tech-bg {
        background-image: url("/assets/backgrounds/vscodium.png");
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: fixed;
    }

    #tech {
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(2px);
    }

    .stacks {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 1em;
        color: #444;

        padding: 0 2em;
        text-shadow: 0 0 20px
            oklch(from currentColor calc(l * 0.7) calc(c * 2) calc(h + 10));
    }

    .stacks .stack {
        font-family: "JetBrains Mono";
        font-size: 1em;
        letter-spacing: 0.15em;
        font-weight: 400;
        color: white;

        background: transparent;
        transition: 200ms ease;
    }

    .stacks .stack:hover {
        cursor: pointer;
        transform: scale(1.1);
    }

    .stacks .stack.svelte {
        color: #ff3e00;
    }
    .stacks .stack.react {
        color: #61dafb;
    }
    .stacks .stack.js {
        color: #f7df1e;
    }
    .stacks .stack.ts {
        color: #017acb;
    }
    .stacks .stack.css {
        color: #264de4;
    }
    .stacks .stack.html {
        color: #e44d26;
    }
    .stacks .stack.php {
        color: #6e81b6;
    }
    .stacks .stack.python {
        color: #387eb8;
    }
    .stacks .stack.c {
        color: #5c6bc0;
    }
    .stacks .stack.rust {
        color: #a04f12;
    }

    #languages {
        background: rgb(0, 0, 20);
        box-shadow: inset 0 0 50px rgba(9, 30, 71, 0.75);
    }

    #languages * {
        z-index: 2000;
    }

    .word-cloud {
        position: absolute;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
    }

    .word {
        font-family: "Noto Sans";
        position: absolute;
        opacity: 0.5;
        text-shadow: 0 0 20px
            oklch(from currentColor calc(l * 0.7) calc(c * 2) calc(h + 10));
        white-space: nowrap;
        user-select: none;
        z-index: 1999;
    }

    #languages ul li {
        margin: 1em 0;
    }
    #languages ul li h3 {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5em;
    }

    #languages ul li h3 img {
        width: 1.5em;
        height: 1.5em;
    }

    #other-interests {
        background: rgb(0, 0, 20);
        background:
            radial-gradient(
                circle at 40% 40%,
                rgba(115, 0, 255, 0.1),
                transparent
            ),
            radial-gradient(
                circle at 60% 60%,
                rgba(0, 238, 255, 0.1),
                transparent
            ),
            black;
    }

    #projects {
        background:
            radial-gradient(
                circle at top left,
                rgba(115, 0, 255, 0.2),
                transparent 50%
            ),
            radial-gradient(
                circle at bottom right,
                rgba(0, 238, 255, 0.2),
                transparent 50%
            ),
            black;
    }

    #trivia {
        background:
            radial-gradient(
                circle at 15% 20%,
                rgba(80, 140, 255, 0.12) 0,
                rgba(80, 140, 255, 0.12) 8%,
                transparent 8.1%
            ),
            radial-gradient(
                circle at 85% 75%,
                rgba(180, 100, 255, 0.1) 0,
                rgba(180, 100, 255, 0.1) 12%,
                transparent 12.1%
            ),
            radial-gradient(
                circle at 70% 15%,
                rgba(255, 255, 255, 0.05) 0,
                rgba(255, 255, 255, 0.05) 3%,
                transparent 3.1%
            ),
            #111;
    }

    #trivia button {
        background: white;
        color: #111;
        padding: 0.5em 1em;
        border: 2px solid white;
        border-radius: 2147483647px;

        align-self: center;
        transition: 200ms ease;
    }

    #trivia button:hover {
        background: rgba(255, 255, 255, 0.1);
        color: white;
    }

    #trivia .quote {
        text-align: center;
    }

    #trivia .quote.special {
        opacity: 0.95;
        color: var(--bright-yellow);
        text-shadow: 0 0 20px var(--yellow);
    }
</style>
