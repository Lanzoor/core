document.addEventListener('DOMContentLoaded', () => {
    const urlButton = document.querySelector('#copy-url button');
    const url = 'https://discord.gg/zAWHm8VAZc';

    urlButton.addEventListener('click', async () => {
        urlButton.textContent = 'Copy';
        try {
            await navigator.clipboard.writeText(url);

            urlButton.textContent = 'Copied!';

            setTimeout(() => {
                urlButton.textContent = 'Copy';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy URL to clipboard\n\t', err);
        }
    });
});
