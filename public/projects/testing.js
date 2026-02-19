function getValue(id) {
    return document.getElementById(id).value;
}

setInterval(() => {
    document.getElementById('color-result').textContent = getValue('color-select');

    let test = document.getElementById('test');

    Object.assign(test.style, {
        width: getValue('width'),
        height: getValue('height'),
        background: getValue('background'),
        padding: getValue('padding'),
        margin: getValue('margin'),
        border: getValue('border'),
        borderRadius: getValue('border-radius'),
        boxShadow: getValue('box-shadow'),
        color: getValue('color'),
        textShadow: getValue('text-shadow'),
        textAlign: 'center',
    });

    test.textContent = getValue('text-content');
}, 100);
