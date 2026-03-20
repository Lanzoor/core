async function sleep(ms: number): Promise<any> {
    return new Promise((r) => setTimeout(r, ms));
}

document.addEventListener('DOMContentLoaded', async () => {
    const elements = ['#welcome--header', '#welcome--message', '#welcome--buttons', '#welcome--down'];
    const htmlElements = elements.map((el) => document.querySelector(el)).filter(Boolean) as HTMLElement[];

    htmlElements.forEach((element) => {
        element?.classList.remove('active');
        element?.classList.add('inactive');
    });

    await sleep(500);

    for (const element of htmlElements) {
        element.classList.remove('inactive');
        element.classList.add('active');

        await sleep(1000);
    }
});
