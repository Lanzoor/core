const left = document.querySelector('#left');
const newYear = new Date('2026-03-27T20:06:25+09:00');
let triggered = false;
let audioUnlocked = false;

const audio = new Audio('/projects/anti-JPA/assets/cona-crete.mp3');
audio.preload = 'auto';

function unlockAudio() {
    if (audioUnlocked) return;

    audio
        .play()
        .then(() => {
            audio.pause();
            audio.currentTime = 0;
            audioUnlocked = true;
            document.querySelector('#audio').innerHTML = "<b>- Audio enabled. -</b><br>There's no going back. (you can refresh btw)";
            console.log('YIPPPPEEEEEE');
        })
        .catch((err) => {
            console.log('fahhh', err);
        });
}

['click', 'touchstart', 'keydown'].forEach((event) => {
    document.addEventListener(event, unlockAudio, { once: true });
});

function format(ms) {
    if (ms < 0) ms = 0;
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const parts = [];
    if (days > 0) parts.push(`<b>${days}</b>day${days !== 1 ? 's' : ''}`);
    if (hours > 0) parts.push(`<b>${hours}</b>hr${hours !== 1 ? 's' : ''}`);
    if (minutes > 0) parts.push(`<b>${minutes}</b>min`);
    if (seconds > 0 || parts.length === 0) parts.push(`<b>${seconds}</b>sec`);

    return parts.join(' ');
}

function update() {
    const now = new Date();
    const diff = newYear - now;

    if (diff <= 0 && !triggered) {
        triggered = true;

        if (audioUnlocked) {
            audio.currentTime = 0;
            audio.play().catch((err) => console.log('play failed nooooooooooooooooooooooooooooooo', err));
        } else {
            console.log('audio not unlocked womp womp');
        }

        document.body.classList.add('active');
        document.getElementById('hidden').classList.add('active');
        document.getElementById('ominous-countdown').classList.add('active');
        document.getElementById('mock').innerHTML = 'henlo :)';
    }

    left.innerHTML = format(diff);
    requestAnimationFrame(update);
}

requestAnimationFrame(update);
