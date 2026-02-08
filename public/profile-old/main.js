let rippleContainer = document.getElementById('ripple-container');

document.addEventListener('mousedown', (e) => {
    const ripple = document.createElement('div');
    const size = 30;
    Object.assign(ripple.style, {
        position: 'absolute',
        left: `${e.clientX - size / 2}px`,
        top: `${e.clientY - size / 2}px`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        boxShadow: '0 0 7.5px rgba(255, 255, 255, 0.7), inset 0 0 5px rgba(255, 255, 255, 0.8)',
        borderRadius: '50%',
        transform: 'scale(0.5)',
        opacity: '0.6',
        transition: 'transform 0.75s ease-out, opacity 0.75s ease-out',
    });
    rippleContainer.appendChild(ripple);

    requestAnimationFrame(() => {
        ripple.style.transform = 'scale(5)';
        ripple.style.opacity = '0';
    });
    setTimeout(() => ripple.remove(), 600);
});

function getUTC9Time() {
    const date = new Date();
    const utc9 = new Date(date.getTime() + 9 * 60 * 60 * 1000);

    const year = utc9.getUTCFullYear();
    const month = String(utc9.getUTCMonth() + 1).padStart(2, '0'); // screw you .getUTCMonth()
    const day = String(utc9.getUTCDate()).padStart(2, '0');

    let hour = utc9.getUTCHours();
    const minute = String(utc9.getUTCMinutes()).padStart(2, '0');
    const second = String(utc9.getUTCSeconds()).padStart(2, '0');
    const millisecond = String(utc9.getUTCMilliseconds()).padStart(3, '0');

    const determiner = hour < 12 ? 'AM' : 'PM';
    const displayHour = hour % 12 || 12;

    return `${year}-${month}-${day} ${String(displayHour).padStart(2, '0')}:${minute}:${second}.${millisecond} ${determiner}`;
}

const timeText = document.getElementById('time-text');

function updateTime() {
    timeText.textContent = getUTC9Time();

    requestAnimationFrame(updateTime);
}

updateTime();

const backToTop = document.getElementById('back-to-top');

backToTop.addEventListener('mouseenter', () => {
    backToTop.style.boxShadow = 'inset 0 0 40px #835dffff, 0 50px 50px #3e0edd';
    backToTop.style.cursor = 'pointer';
});

backToTop.addEventListener('mouseleave', () => {
    backToTop.style.boxShadow = 'inset 0 0 20px #3e0edd, 0 50px 50px #3e0edd';
    backToTop.style.transform = 'translateY(0)';
    backToTop.style.cursor = 'default';
});

backToTop.addEventListener('mousedown', () => {
    backToTop.style.transform = 'translateY(25px)';
    backToTop.style.boxShadow = 'inset 0 0 40px #3e0edd, 0 25px 50px #3e0edd';
});

backToTop.addEventListener('mouseup', () => {
    backToTop.style.transform = 'translateY(0)';
    backToTop.style.boxShadow = 'inset 0 0 20px #3e0edd, 0 50px 50px #3e0edd';
    setTimeout(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, 250);
});

function updateSecretDisplay() {
    const secretLink = document.getElementById('secret-link');
    if (localStorage.getItem('secret') === null) {
        localStorage.setItem('secret', 'false');
    }

    const secret = localStorage.getItem('secret');
    if (secret == 'false') {
        secretLink.style.display = 'none';
    } else {
        secretLink.style.display = 'flex';
    }
}

setInterval(updateSecretDisplay, 250);

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (event) {
        event.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
});
