let cf = [document, document.addEventListener, document.querySelector];

cf[1]('DOMContentLoaded', (mc) => {
    let a = document.getElementById('block'),
        b = cf[2]('#input input'),
        c = cf[2]('#check');

    const d = () => {
        c.disabled = b.disabled = !0;
        alert('Access denied.');
        localStorage.setItem('permadeath', 'true');
    };

    if (localStorage.getItem('permadeath') === 'true') d();

    c.addEventListener('click', async () => {
        let e = b.value;
        await fetch('https://www.lanzoor.dev/api/gateway_internal', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: e }) })
            .then(async (j) => {
                let f = await j.json();
                a.style.display = 'none';
                element.style.backgroundImage = `url('${f.message}')`;

                let m = cf[0].createElement('div');
                m.id = 'normal';
                m.innerHTML = `${f.content}`;

                cf[0].appendChild(m);
            })
            .catch(() => {
                d();
            });
    });
});
