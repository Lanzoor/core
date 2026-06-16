document.addEventListener('DOMContentLoaded', () => {
    const searchOverlay = document.querySelector('#search-overlay') as HTMLInputElement;
    const searchBar = document.querySelector('#search-bar') as HTMLInputElement;
    const searchButton = document.querySelector('#search-button') as HTMLButtonElement;
    const searchDescription = document.querySelector('#search-description') as HTMLParagraphElement;
    const searchToggle = document.querySelector('#search-toggle') as HTMLButtonElement;

    const versionIds = [...document.querySelectorAll('section[id]')].map((element) => element.id).filter((element) => /^v?\d+(\-\d+)*$/i.test(element));

    if (!searchOverlay || !searchBar || !searchButton || !searchDescription || !searchToggle) return;

    function handleSearch() {
        let searchValue = searchBar.value.trim().toLowerCase();
        if (!searchValue.startsWith('v')) searchValue = 'v' + searchValue;

        // I suck at regex.
        if (!/^v?\d+(\.\d+)*$/i.test(searchValue)) {
            searchDescription.textContent = 'Invalid version format!';
            return;
        }

        searchValue = searchValue.replaceAll('.', '-');

        if (!versionIds.includes(searchValue)) {
            searchDescription.textContent = "Sorry, we couldn't find that version.";
            return;
        }

        window.location.replace(`/projects/core/changelog#${searchValue}`);
        searchDescription.textContent = `Successfully found version ${searchValue}!`;
    }

    searchBar.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') handleSearch();
    });

    searchButton.addEventListener('click', handleSearch);

    searchToggle.addEventListener('click', () => {
        searchOverlay.classList.toggle('visible');
    });
});
