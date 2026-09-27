<section id="intro">
    <div class="gradient"></div>
</section>

<style>
    .gradient {
        width: 10em;
        height: 10em;

        background: linear-gradient(
            45deg in oklch,
            oklch(59.591% 0.26509 301.157),
            oklch(53.447% 0.28452 291.589)
        );
        border-radius: 0.25em;
        transition: 2s ease;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        color: black;

        box-shadow: 0 10px 20px rgb(0, 0, 0);
    }

    .gradient:hover {
        transform: scale(1.1);
        cursor: pointer;
        transition: 200ms ease;
    }
</style>
