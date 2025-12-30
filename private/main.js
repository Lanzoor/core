const privateBlock = document.getElementById('private');
const hidden = privateBlock.querySelector('.hidden');
const revealed = privateBlock.querySelector('.revealed');

let hoverTimer = null;
let activated = false;

privateBlock.addEventListener('mouseenter', () => {
    hidden.textContent = '( - Keep hovering... - )';
    hoverTimer = setTimeout(() => {
        hidden.hidden = true;
        revealed.hidden = false;
        activated = true;
    }, 2000);
});

privateBlock.addEventListener('mouseleave', () => {
    clearTimeout(hoverTimer);
    hoverTimer = null;

    if (!activated) {
        hidden.textContent = '( - Hover to reveal - )';
        hidden.hidden = false;
        revealed.hidden = true;
    }
});
