document.addEventListener('DOMContentLoaded', () => {
    console.log('content loaded idk 🐎');

    const urlButton = document.querySelector('#copy-url button');
    const url = 'https://www.lanzoor.dev/projects/anti-JPA';

    urlButton.addEventListener('click', async () => {
        urlButton.textContent = 'Copy';
        try {
            await navigator.clipboard.writeText(url);

            urlButton.textContent = 'Copied!';

            setTimeout(() => {
                urlButton.textContent = 'Copy';
            }, 2000);
        } catch (err) {
            console.error('oh fawk', err);
        }
    });
});
