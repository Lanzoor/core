<script lang="ts">
    let canvas: HTMLCanvasElement;

    let mouse = $state({
        x: 400,
        y: 300,
    });

    const spacing = 30;
    const radius = 200;
    const radiusSquared = radius * radius;

    const dots = Array.from(
        { length: Math.ceil(800 / spacing + 1) * Math.ceil(600 / spacing + 1) },
        (_, i) => {
            const columns = Math.ceil(800 / spacing + 1);

            return {
                x: (i % columns) * spacing,
                y: Math.floor(i / columns) * spacing,
            };
        },
    );

    let framePending = false;

    function handleMouseMove(event: MouseEvent) {
        const rect = canvas.getBoundingClientRect();

        mouse.x = (event.clientX - rect.left) * (canvas.width / rect.width);
        mouse.y = (event.clientY - rect.top) * (canvas.height / rect.height);

        if (!framePending) {
            framePending = true;

            requestAnimationFrame(() => {
                draw();
                framePending = false;
            });
        }
    }

    function draw() {
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const dot of dots) {
            const dx = dot.x - mouse.x;
            const dy = dot.y - mouse.y;

            const distanceSquared = dx * dx + dy * dy;

            let value = 0;

            if (distanceSquared < radiusSquared) {
                const distance = Math.sqrt(distanceSquared);
                value = 1 - distance / radius;
            }

            const size = 2 + value * 8;

            ctx.beginPath();
            ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);

            ctx.globalAlpha = 0.2 + value * 0.8;
            ctx.fillStyle = "white";
            ctx.fill();
        }

        ctx.globalAlpha = 1;
    }

    $effect(() => {
        canvas.width = 1920;
        canvas.height = 1080;

        draw();
    });
</script>

<section>
    <h1>weird mouse effect</h1>
    <canvas bind:this={canvas} onmousemove={handleMouseMove}></canvas>

    <p>pretty cool right</p>
</section>
