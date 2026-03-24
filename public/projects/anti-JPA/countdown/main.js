const left = document.querySelector('#left');

const newYear = new Date('2026-03-27T21:00:00+09:00');
let triggered = false;

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

        document.body.classList.add('active');
        document.getElementById('hidden').classList.add('active');
        document.getElementById('ominous-countdown').classList.add('active');
        document.getElementById('mock').innerHTML = '<i>The apocalypse is starting...</i><br>THE END IS HERE THE END IS NOW THE END IS INEVITABLE THE END IS HERE THE END IS NOW THE END IS INEVITABLE THE END IS HERE THE END IS NOW THE END IS INEVITABLE THE END IS HERE THE END IS NOW THE END IS INEVITABLE THE END IS HERE THE END IS NOW THE END IS INEVITABLE THE END IS HERE THE END IS NOW THE END IS INEVITABLE THE END IS HERE THE END IS NOW THE END IS INEVITABLE THE END IS HERE THE END IS NOW THE END IS INEVITABLE THE END IS HERE THE END IS NOW THE END IS INEVITABLE THE END IS HERE THE END IS NOW THE END IS INEVITABLE';
    }

    left.innerHTML = format(diff);

    requestAnimationFrame(update);
}

requestAnimationFrame(update);
