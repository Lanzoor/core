document.addEventListener('DOMContentLoaded', (mc) => {
    let a = document.querySelector('#block'),
        b = document.querySelector('#input input'),
        c = document.querySelector('#check');

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

                if (!f.ok || !j.ok) {
                    throw new Error();
                }

                let m = document.createElement('div');
                a.style.display = 'none';
                m.id = 'normal';
                m.innerHTML = `${f.content}`;
                m.style.backgroundImage = `url('${f.message}')`;

                document.body.appendChild(m);
            })
            .catch((e) => {
                console.error(e);
                d();
            });
    });
});
