import { pingServer } from '../ping-server.js';

function isMobileDevice() {
    return (navigator as any).userAgentData?.mobile || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || ('ontouchstart' in window && navigator.maxTouchPoints > 0);
}

async function sleep(timeMs: number): Promise<any> {
    return new Promise((p) => setTimeout(p, timeMs));
}

function pickRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let enableAnimation = true;
let enableOptimization = false;

let starLimit = 100;
let animationIntervalMs = 1000;
let baseFontSizePx = 80;

const optimizationInfo = document.querySelector('#profile #name-display #optimization-indicator')!;

function updateOptimization() {
    enableOptimization = window.matchMedia('(max-width: 1080px)').matches || isMobileDevice();

    starLimit = enableOptimization ? 50 : 150;
    animationIntervalMs = enableOptimization ? 2000 : 1000;
    baseFontSizePx = enableOptimization ? 40 : 80;

    optimizationInfo.classList.toggle('active', enableOptimization);
}

document.addEventListener('DOMContentLoaded', updateOptimization);
window.addEventListener('resize', updateOptimization);

document.addEventListener('DOMContentLoaded', async () => {
    const elements = [
        //
        '#welcome--intro #header',
        '#welcome--intro #message',
        '#welcome--intro #buttons',
        '#welcome--intro #down',
    ];

    const htmlElements = elements
        .map((element) => {
            return document.querySelector(element);
        })
        .filter(Boolean) as HTMLElement[];

    htmlElements.forEach((element) => {
        element?.classList.remove('active');
        element?.classList.add('inactive');
    });

    await sleep(500);

    for (const element of htmlElements) {
        element.classList.remove('inactive');
        element.classList.add('active');

        await sleep(1000);
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    const updateDisplay = document.getElementById('update-display')!;
    const avatarDisplay = document.querySelector('#discord-status #avatar')! as HTMLImageElement;
    const displayNameDisplay = document.querySelector('#discord-status #display-name')!;
    const usernameDisplay = document.querySelector('#discord-status #username')!;
    const userIDDisplay = document.querySelector('#discord-status #user-id')!;
    const statusDisplay = document.querySelector('#discord-status #status')!;

    let defaultLastUpdated = updateDisplay.textContent;

    try {
        const statusResult = await pingServer('https://lanzoor.dev/api/status/');
        if (statusResult) {
            updateDisplay.textContent = new Date(statusResult.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric' });
        } else {
            updateDisplay.textContent = defaultLastUpdated;
        }
    } catch (err) {
        console.error(err);
        updateDisplay.textContent = defaultLastUpdated;
    }

    const discordStatusResult = await pingServer('https://www.lanzoor.dev/api/discord-status');
    if (discordStatusResult) {
        const discordUserID = discordStatusResult.data.discord_user.id;

        const discordAvatar = discordStatusResult.data.discord_user.avatar;
        const discordAvatarURL = `https://cdn.discordapp.com/avatars/${discordUserID}/${discordAvatar}.png?size=512`;

        const discordDisplayName = discordStatusResult.data.discord_user.global_name;
        const discordUserName = discordStatusResult.data.discord_user.username;

        const discordStatus = discordStatusResult.data.discord_status;

        avatarDisplay.src = discordAvatarURL;
        displayNameDisplay.textContent = discordDisplayName;
        usernameDisplay.textContent = discordUserName;
        userIDDisplay.textContent = discordUserID;
        statusDisplay.className = '';
        statusDisplay.textContent = discordStatus;
        statusDisplay.classList.add(`status-${discordStatus}`);
    }
});

type Star = {
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
};

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('#welcome--profile #name-display')!;
    const animationToggle = container.querySelector('button')!;
    const canvas = container.querySelector('canvas')!;
    const ctx = canvas.getContext('2d')!;

    let enableAnimation = true;

    animationToggle.addEventListener('click', () => {
        enableAnimation = !enableAnimation;
        animationToggle.textContent = enableAnimation ? '⏸ Pause animation' : '▶ Resume animation';
    });

    function resizeCanvas() {
        const rect = container.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const density = 0.00005;

        const starCount = Math.min(200, Math.max(30, Math.floor(canvas.width * canvas.height * density)));

        stars.length = 0;

        for (let i = 0; i < starCount; i++) {
            stars.push(createStar(true));
        }
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
    });

    function createStar(initial = false): Star {
        let opacityPercent = Math.random() * 80 + 20;
        return {
            x: Math.random() * canvas.width,
            y: initial ? Math.random() * canvas.height : canvas.height + Math.random() * 50,
            size: (Math.random() + 0.5) * 3,
            opacity: opacityPercent / 100,
            speed: (opacityPercent / 50) ** 1.25,
        };
    }

    const stars: Star[] = [];

    resizeCanvas();

    function animateStars() {
        if (enableAnimation) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < stars.length; i++) {
                const star = stars[i];

                star.y -= star.speed;

                if (star.y < -10) {
                    stars[i] = createStar(false);
                    continue;
                }

                ctx.globalAlpha = star.opacity;
                ctx.fillStyle = 'white';
                ctx.shadowBlur = 20;
                ctx.shadowColor = 'white';

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        requestAnimationFrame(animateStars);
    }

    animateStars();
});

let letters: HTMLSpanElement[] = [];
let word: HTMLElement;
let fonts: string[] = [];
let fontIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    word = document.getElementById('lanzoor-letters')!;
    letters = Array.from(document.querySelectorAll('#lanzoor-letters span')).map((element) => element as HTMLSpanElement);

    fonts = ['JetBrains Mono', 'Space Grotesk', 'Fira Code', 'Fairfax HD', 'Brass Mono', 'Geist'];

    fontIndex = 0;

    for (const letter of letters) {
        letter.style.fontSize = baseFontSizePx + 'px';
    }

    setInterval(() => {
        if (!enableAnimation) return;

        const currentFont = fonts[fontIndex];
        const currentFontWeight = pickRandom(['100', '200', '300', '400']);
        const currentFontStyle = pickRandom(['normal', 'italic']);

        const scale = enableOptimization ? randInt(75, 100) / baseFontSizePx : randInt(100, 150) / baseFontSizePx;

        for (const letter of letters) {
            letter.style.fontFamily = currentFont;
            letter.style.fontWeight = currentFontWeight;
            letter.style.fontStyle = currentFontStyle;
        }

        word.style.transform = `scale(${scale})`;

        fontIndex = (fontIndex + 1) % fonts.length;
    }, animationIntervalMs);
});
