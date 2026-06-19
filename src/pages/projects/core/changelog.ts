document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main') as HTMLElement;
    const searchOverlay = document.querySelector('#search-overlay') as HTMLInputElement;
    const searchBar = document.querySelector('#search-bar') as HTMLInputElement;
    const searchButton = document.querySelector('#search-button') as HTMLButtonElement;
    const searchDescription = document.querySelector('#search-description') as HTMLParagraphElement;
    const searchToggle = document.querySelector('#search-toggle') as HTMLButtonElement;

    const versionIds = [...document.querySelectorAll('section[id]')].map((el) => el.id).filter((id) => /^v?\d+(\-\d+)*$/i.test(id));

    if (!searchOverlay || !searchBar || !searchButton || !searchDescription || !searchToggle) return;

    function toggleVisibility(force?: boolean) {
        searchOverlay.classList.toggle('visible', force);
        if (main) {
            main.classList.toggle('frozen', force);
        }
    }

    function handleSearch() {
        let searchValue = searchBar.value.trim().toLowerCase();
        if (!searchValue.startsWith('v')) searchValue = 'v' + searchValue;

        if (!/^v?\d+(\.\d+)*$/i.test(searchValue)) {
            searchDescription.textContent = 'Invalid version format! Please try again.';
            return;
        }

        const targetId = searchValue.replaceAll('.', '-');

        if (!versionIds.includes(targetId)) {
            searchDescription.textContent = "Sorry, we couldn't find that version!";
            return;
        }

        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });

            history.replaceState(null, '', `#${targetId}`);
            searchDescription.textContent = `Successfully found version ${searchValue}!`;

            setTimeout(() => {
                toggleVisibility(false);
            }, 750);
        } else {
            window.location.href = `/projects/core/changelog#${targetId}`;
        }
    }

    searchBar.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') handleSearch();
    });

    searchButton.addEventListener('click', handleSearch);

    searchToggle.addEventListener('click', () => {
        toggleVisibility();
    });
});
