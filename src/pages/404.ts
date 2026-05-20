document.addEventListener('DOMContentLoaded', () => {
    const attemptedPath = window.location.pathname;

    const attemptedPathFullDisplay = document.getElementById('attempted-path-full');

    if (attemptedPathFullDisplay) {
        attemptedPathFullDisplay.textContent = 'https://www.lanzoor.dev' + attemptedPath;
    }

    const tryAgain = document.getElementById('try-again') as HTMLAnchorElement;

    if (tryAgain) {
        tryAgain.href = attemptedPath;
    }
});
