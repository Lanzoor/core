const fonts: string[] = ['geist', 'space-grotesk', 'jetbrains-mono', 'fira-code', 'fairfax-hd', 'noto-sans', 'noto-sans-mono', 'brass-mono'];
const currentFont: string = 'geist';

document.addEventListener('DOMContentLoaded', () => {
    const fontButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('.font-button'));
    const fontWeightInput = document.querySelector('#font-weight-input')! as HTMLInputElement;
    const fontStyleInput = document.querySelector('#font-style-input')! as HTMLInputElement;
    const fontDemo = document.querySelector('#demo')! as HTMLDivElement;

    fontButtons.forEach((button) => {
        button.addEventListener('click', () => {
            fontButtons.forEach((fontButton) => {
                fontButton.classList.remove('selected');
            });

            button.classList.add('selected');

            const targetFont = Array.from(button.classList).find((c) => !['selected', 'font-button'].includes(c));

            if (targetFont) {
                fontDemo.className = '';
                fontDemo.classList.add('active');
                fontDemo.classList.add(targetFont);
            }
        });
    });

    fontWeightInput.addEventListener('input', (event) => {
        const value = (event.target as HTMLInputElement).value;

        fontDemo.style.fontWeight = value;
    });

    fontStyleInput.addEventListener('input', (event) => {
        const checked = (event.target as HTMLInputElement).checked;

        fontDemo.style.fontStyle = checked ? 'italic' : 'normal';
    });
});
