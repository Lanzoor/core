import { Core } from '@/main.js';

let enableAnimation = true;
let enableOptimization = false;

let animationIntervalMs = 1000;
let baseFontSizePx = 80;

const optimizationInfo = document.querySelector('#welcome--profile #name-display #optimization-indicator')!;

function updateOptimization() {
    enableOptimization = window.matchMedia('(max-width: 1080px)').matches || Core.isMobileDevice();

    animationIntervalMs = enableOptimization ? 2000 : 1000;
    baseFontSizePx = enableOptimization ? 40 : 80;

    optimizationInfo.classList.toggle('active', enableOptimization);
}

document.addEventListener('DOMContentLoaded', updateOptimization);
window.addEventListener('resize', updateOptimization);

// document.addEventListener('DOMContentLoaded', async () => {
//     const elements = [
//         //
//         '#welcome--intro #introduction',
//         '#welcome--intro #buttons',
//     ];

//     const htmlElements = elements
//         .map((element) => {
//             return document.querySelector(element);
//         })
//         .filter(Boolean) as HTMLElement[];

//     htmlElements.forEach((element) => {
//         element?.classList.remove('active');
//         element?.classList.add('inactive');
//     });

//     await Core.sleep(500);

//     for (const element of htmlElements) {
//         element.classList.remove('inactive');
//         element.classList.add('active');

//         await Core.sleep(1000);
//     }
// });

// TODO: probably move this to react logic, this is ugly as fuck
// document.addEventListener('DOMContentLoaded', async () => {
//     const avatarDisplay = document.querySelector('#discord-status #avatar')! as HTMLImageElement;
//     const displayNameDisplay = document.querySelector('#discord-status #display-name')!;
//     const usernameDisplay = document.querySelector('#discord-status #username')!;
//     const userIDDisplay = document.querySelector('#discord-status #user-id')!;
//     const statusDisplay = document.querySelector('#discord-status #status')!;

//     const discordStatusResult = await Core.pingServer('https://api.lanzoor.dev/status/discord');
//     if (discordStatusResult) {
//         const discordUserID = discordStatusResult.data.discord_user.id;

//         const discordAvatar = discordStatusResult.data.discord_user.avatar;
//         const discordAvatarURL = `https://cdn.discordapp.com/avatars/${discordUserID}/${discordAvatar}.png?size=512`;

//         const discordDisplayName = discordStatusResult.data.discord_user.global_name;
//         const discordUserName = discordStatusResult.data.discord_user.username;

//         const discordStatus = discordStatusResult.data.discord_status;

//         avatarDisplay.src = discordAvatarURL;
//         displayNameDisplay.textContent = discordDisplayName;
//         usernameDisplay.textContent = discordUserName;
//         userIDDisplay.textContent = discordUserID;
//         statusDisplay.className = '';
//         statusDisplay.textContent = discordStatus;
//         statusDisplay.classList.add(`status-${discordStatus}`);
//     }
// });

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

    animationToggle.addEventListener('click', () => {
        enableAnimation = !enableAnimation;
        animationToggle.textContent = enableAnimation ? '⏸ Pause animation' : '▶ Resume animation';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('#welcome--profile #name-display')!;
    const canvas = container.querySelector('canvas')!;
    const ctx = canvas.getContext('2d')!;

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

    function drawStars() {
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

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const star of stars) {
            ctx.globalAlpha = star.opacity;
            ctx.fillStyle = 'white';
            ctx.shadowBlur = 20;
            ctx.shadowColor = 'white';

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    window.addEventListener('resize', () => {
        drawStars();
    });

    drawStars();

    // function animateStars() {
    //     if (!enableAnimation) return;

    //     ctx.clearRect(0, 0, canvas.width, canvas.height);

    //     for (let i = 0; i < stars.length; i++) {
    //         const star = stars[i];

    //         star.y -= star.speed;

    //         if (star.y < -10) {
    //             stars[i] = createStar(false);
    //             continue;
    //         }

    //         ctx.globalAlpha = star.opacity;
    //         ctx.fillStyle = 'white';
    //         ctx.shadowBlur = 20;
    //         ctx.shadowColor = 'white';

    //         ctx.beginPath();
    //         ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    //         ctx.fill();
    //     }
    // }

    // setInterval(animateStars, animationIntervalMs);
});

let letters: HTMLSpanElement[] = [];
let word: HTMLElement;
let fonts: string[] = [];
let fontIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    word = document.getElementById('lanzoor-letters')!;

    letters = Array.from(document.querySelectorAll('#lanzoor-letters span')).map((element) => element as HTMLSpanElement);

    fonts = ['JetBrains Mono', 'Fira Code', 'Noto Sans', 'Noto Sans Mono', 'Geist'];

    fontIndex = 0;

    for (const letter of letters) {
        letter.style.fontSize = baseFontSizePx + 'px';
    }

    function animateFont() {
        if (!enableAnimation) return;

        const currentFont = fonts[fontIndex];
        const currentFontWeight = Core.pickRandom(['100', '200', '300']);
        const currentFontStyle = Core.pickRandom(['normal', 'normal', 'italic']);

        const scale = enableOptimization ? Core.randInt(75, 100) / baseFontSizePx : Core.randInt(100, 150) / baseFontSizePx;

        for (const letter of letters) {
            letter.style.fontFamily = currentFont;
            letter.style.fontWeight = currentFontWeight;
            letter.style.fontStyle = currentFontStyle;
        }

        word.style.transform = `scale(${scale})`;

        fontIndex = (fontIndex + 1) % fonts.length;
    }

    setInterval(animateFont, animationIntervalMs);
});

document.addEventListener('DOMContentLoaded', () => {
    let localtimeClock = document.getElementById('localtime-clock');

    if (!localtimeClock) return;

    let dateDisplay = document.querySelector('#localtime-clock #date');
    let timeDisplay = document.querySelector('#localtime-clock #time');

    function updateLocalTime(): void {
        const date = new Date();
        const utc9 = new Date(date.getTime() + 9 * 60 * 60 * 1000);
        let hour = utc9.getUTCHours();
        const minute = String(utc9.getUTCMinutes()).padStart(2, '0');
        const second = String(utc9.getUTCSeconds()).padStart(2, '0');

        if (!timeDisplay || !dateDisplay) return;

        dateDisplay.textContent = utc9.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'Asia/Seoul' });

        timeDisplay.innerHTML = `<b>${hour}</b>:<b>${minute}</b>:<b>${second}</b>`;
    }

    updateLocalTime();
    setInterval(updateLocalTime, 1000);
});
