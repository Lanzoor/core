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

    const requiredHashes: string[] = ['b8d68e5a18b0672595b5b7e5e7176aca4381f3e3ac3ec3ed44d629994c740a96'];

    if (requiredHashes.includes(data.result)) {
        secretContainer.innerHTML = '<p>Correct code. No content for now. Sorry.</p>';
        wrongAttempts = 0;
        penaltyTime = 10000;
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
