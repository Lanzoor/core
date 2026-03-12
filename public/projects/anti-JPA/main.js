const headers = document.querySelectorAll('.anti-jpa--header');

headers.forEach((header) => {
    header.addEventListener('click', () => {
        header.querySelector('img').classList.toggle('open');

        const content = header.parentElement.querySelector('.anti-jpa--content');
        content.classList.toggle('open');

        const hr = header.parentElement.querySelector('hr');
        hr.classList.toggle('open');
    });
});
