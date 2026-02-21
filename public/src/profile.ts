function getUTC9Time() {
    const date = new Date();
    const utc9 = new Date(date.getTime() + 9 * 60 * 60 * 1000);

    const year = utc9.getUTCFullYear();
    const month = String(utc9.getUTCMonth() + 1).padStart(2, '0');
    const day = String(utc9.getUTCDate()).padStart(2, '0');

    let hour = utc9.getUTCHours();
    const minute = String(utc9.getUTCMinutes()).padStart(2, '0');
    const second = String(utc9.getUTCSeconds()).padStart(2, '0');
    const millisecond = String(utc9.getUTCMilliseconds()).padStart(3, '0');

    const determiner = hour < 12 ? 'AM' : 'PM';
    const displayHour = hour % 12 || 12;

    return `${year}-${month}-${day} ${String(displayHour).padStart(2, '0')}:${minute}:${second}.${millisecond} ${determiner}`;
}

const localTimeText = document.getElementById('local-time')!;

function updateTime() {
    localTimeText.textContent = getUTC9Time();

    requestAnimationFrame(updateTime);
}

updateTime();

document.querySelectorAll('img').forEach((img) => {
    img.addEventListener('click', () => {
        window.open(img.src, '_blank');
    });
});
