document.addEventListener('DOMContentLoaded', () => {
    const attemptedPathDisplay = document.getElementById('attempted-path');
    const attemptedPath = window.location.pathname;

    if (attemptedPathDisplay) {
        attemptedPathDisplay.textContent = attemptedPath;
    }

    const attemptedPathFullDisplay = document.getElementById('attempted-path-full');

    if (attemptedPathFullDisplay) {
        attemptedPathFullDisplay.textContent = 'https://www.lanzoor.dev' + attemptedPath;
    }
});
