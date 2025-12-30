function getUTC9Time() {
    const date = new Date();
    const utc9 = new Date(date.getTime() + 9 * 60 * 60 * 1000);

    let hour = utc9.getUTCHours();
    const minute = String(utc9.getUTCMinutes()).padStart(2, '0');
    const second = String(utc9.getUTCSeconds()).padStart(2, '0');
    const millisecond = String(utc9.getUTCMilliseconds()).padEnd(3, '0');

    const determiner = hour < 12 ? 'AM' : 'PM';
    const displayHour = hour % 12 || 12;
    return `${String(displayHour).padStart(2, '0')}:${minute}:${second}.${millisecond} ${determiner}`;
}

const timeText = document.getElementById('time_text');

function updateTime() {
    timeText.textContent = getUTC9Time();

    requestAnimationFrame(updateTime);
}

timeText.addEventListener('mouseenter', () => (time_hovered = true));
timeText.addEventListener('mouseleave', () => (time_hovered = false));

updateTime();
