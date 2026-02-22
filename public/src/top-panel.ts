document.addEventListener('DOMContentLoaded', () => {
    const topPanel = document.createElement('div');
    topPanel.id = 'top-panel';

    document.body.appendChild(topPanel);

    topPanel.innerHTML = `
<div id="panel-logo">
    <a href="/index.html">lanzoor.dev</a>
</div>

<div id="open-navigation" class="navigation-toggle">
    <p>Navigation</p>

    <button>
        <img src="/assets/icons/hamburger.svg" alt="☰">
    </button>
</div>
`;

    const navigationOverlay = document.createElement('div');
    navigationOverlay.id = 'navigation-overlay';

    document.body.appendChild(navigationOverlay);

    navigationOverlay.innerHTML = `
<div id="navigation-panel">
    <div id="close-navigation" class="navigation-toggle">
        <p>Close</p>

        <button>
            <img src="/assets/icons/close.svg" alt="x">
        </button>
    </div>
    <nav>
        <ul>
            <li><a href="/">Welcome!</a></li>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/credits">Credits</a></li>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/docs">Documents</a></li>
            <li><a href="/troubleshooting">Troubleshooting</a></li>
        </ul>
    </nav>

</div>
`;
    const navigationToggles = document.getElementsByClassName('navigation-toggle');
    Array.from(navigationToggles).forEach((button) => {
        button.addEventListener('click', () => {
            navigationOverlay.classList.toggle('active');
        });
    });
});
