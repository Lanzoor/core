document.addEventListener('DOMContentLoaded', (mc) => {
    let a = document.querySelector('#block'),
        b = document.querySelector('#input input'),
        c = document.querySelector('#check'),
        ed = false;

    const d = () => {
        c.disabled = b.disabled = !0;
        alert('Access denied.');
        localStorage.setItem('permadeath', 'true');
    };

    if (localStorage.getItem('permadeath') === 'true') d();

    c.addEventListener('click', async () => {
        if (ed) return;

        let e = b.value;
        await fetch('https://www.lanzoor.dev/api/gateway_internal', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: e }) })
            .then(async (j) => {
                let f = await j.json();

                let m = document.createElement('div');
                a.style.display = 'none';
                m.id = 'normal';
                m.innerHTML = `${f.content}`;
                m.style.backgroundImage = `url('${f.message}')`;

                document.body.appendChild(m);
                ed = true;
            })
            .catch((e) => {
                console.error(e);
                d();
            });
    });
});
