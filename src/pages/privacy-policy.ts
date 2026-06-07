import { getVisitorId } from '@/main';

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('analytics-toggle');

    if (!toggleButton) return;

    function updateButton() {
        const enabled = localStorage.getItem('isTrackingAllowed') !== 'false';

        toggleButton!.textContent = enabled ? 'Disable Analytics' : 'Enable Analytics';
        toggleButton!.className = enabled ? 'enabled' : 'disabled';
    }

    toggleButton.addEventListener('click', () => {
        const enabled = localStorage.getItem('isTrackingAllowed') !== 'false';

        localStorage.setItem('isTrackingAllowed', enabled ? 'false' : 'true');

        updateButton();
    });

    updateButton();
});

document.addEventListener('DOMContentLoaded', () => {
    const visitorId = document.getElementById('visitor-id');

    if (!visitorId) return;

    visitorId.textContent = getVisitorId();
});
