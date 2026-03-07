const current = document.querySelector('#current');
const left = document.querySelector('#left');

const newYear = new Date(`${new Date().getFullYear() + 1}-01-01T00:00:00`);

function format(ms) {
    if (ms < 0) ms = 0;

    const totalSeconds = ms / 1000;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = (totalSeconds % 60).toFixed(3);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${seconds.padStart(6, '0')}`;
}

function update() {
    const now = new Date();

    current.textContent = now.toLocaleTimeString('en-US', { hour12: false }) + '.' + String(now.getMilliseconds()).padStart(3, '0');

    left.textContent = format(newYear - now);

    requestAnimationFrame(update);
}

requestAnimationFrame(update);
