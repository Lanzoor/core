const secretContainer = document.getElementById('secret-container')!;
const secretInput = document.getElementById('secret-input') as HTMLInputElement;
const secretButton = document.getElementById('secret-button') as HTMLButtonElement;

let penaltyTime = 10000;
let wrongAttempts = 0;

async function checkSecret() {
    const secretInputQuery = secretInput.value;

    const res = await fetch('/api/sha256/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: secretInputQuery }),
    });

    const data = await res.json();

    const requiredHashes: string[] = ['yourStoredHashHere'];

    if (requiredHashes.includes(data.result)) {
        secretContainer.innerHTML = '<p><b>Secret HTML</b> with <code>tags</code></p>';
        wrongAttempts = 0;
        penaltyTime = 30000;
    } else {
        wrongAttempts++;
        secretContainer.innerHTML = `<p>Invalid code, try again later. <b>Input locked for ${penaltyTime / 1000} seconds.</b></p>`;

        secretInput.disabled = true;
        secretButton.disabled = true;

        setTimeout(() => {
            secretInput.disabled = false;
            secretButton.disabled = false;
            secretContainer.innerHTML = '<p>You can try again now.</p>';
        }, penaltyTime);

        penaltyTime += 10000;
    }
}

secretButton.addEventListener('click', () => {
    checkSecret();
});
