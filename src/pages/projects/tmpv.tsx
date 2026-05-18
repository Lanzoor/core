import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

// #region types
type PageID = 'failure' | 'lv-1' | 'lv-2' | 'lv-3' | 'lv-4' | 'lv-5' | 'lv-6' | 'complete';

type PageProps = {
    resolve: (nextPage: PageID) => void;
    reject: (message?: string) => void;
};

type PageDefinition = {
    id: PageID;
    component: (props: PageProps) => React.JSX.Element;
};
// #endregion

// #region pages
const pages: PageDefinition[] = [
    {
        id: 'lv-1',
        component: ({ resolve, reject }) => (
            <section id="lv-1">
                <h1>Level 1</h1>
                Are you ready?
                <div className="centered">
                    <button
                        className="green"
                        onClick={() => resolve('lv-2')}
                    >
                        Yes, I think I am.
                    </button>
                    <button
                        className="red"
                        onClick={() => reject('Take your time to prepare yourselves!')}
                    >
                        No, not really.
                    </button>
                </div>
            </section>
        ),
    },
    {
        id: 'lv-2',
        component: ({ resolve, reject }) => (
            <section id="lv-2">
                <h1>Level 2</h1>
                Press the button that is <span className="col bright red">not not not</span> <span className="col bright green">green</span>.
                <div className="centered">
                    <button
                        className="green"
                        onClick={() => reject('Nope!')}
                    >
                        Green
                    </button>
                    <button
                        className="red"
                        onClick={() => resolve('lv-3')}
                    >
                        Red
                    </button>
                </div>
            </section>
        ),
    },
    {
        id: 'lv-3',
        component: ({ resolve, reject }) => {
            const [message, setMessage] = useState('I told you to press the red one!!');
            const [clickCount, setClickCount] = useState(0);
            const [swapped, setSwapped] = useState(false);

            useEffect(() => {
                if (clickCount === 99) {
                    setSwapped(true);
                    setMessage('lmfao get trolled');
                }

                if (clickCount >= 100) resolve('lv-4');
            }, [clickCount]);

            const greenButton = (
                <button
                    className="green"
                    onClick={() => reject(message)}
                >
                    Green
                </button>
            );

            const redButton = (
                <button
                    className="red"
                    onClick={() => setClickCount((c) => c + 1)}
                >
                    Red
                </button>
            );

            return (
                <section id="lv-3">
                    <h1>Level 3</h1>
                    Press the <span className="col bright red">red</span> button 100 times.
                    <br />
                    You have pressed the <span className="col bright red">red</span> button <b>{clickCount}</b> times.
                    <div id="buttons">
                        {swapped ? (
                            <>
                                {redButton}
                                {greenButton}
                            </>
                        ) : (
                            <>
                                {greenButton}
                                {redButton}
                            </>
                        )}
                    </div>
                </section>
            );
        },
    },
    {
        id: 'lv-4',
        component: ({ resolve, reject }) => {
            const [message, setMessage] = useState('I told you to press the green one!!');
            const [clickCount, setClickCount] = useState(0);
            const [swapped, setSwapped] = useState(false);

            useEffect(() => {
                if (clickCount === 99) {
                    setSwapped((s) => !s);
                    setMessage('did bro really fall for it AGAIN');
                }
                if (clickCount >= 100) resolve('lv-5');
            }, [clickCount]);

            const greenButton = (
                <button
                    className="green"
                    onClick={() => {
                        setClickCount((c) => c + 1);
                        setSwapped((s) => !s);
                    }}
                >
                    Green
                </button>
            );

            const redButton = (
                <button
                    className="red"
                    onClick={() => reject(message)}
                >
                    Red
                </button>
            );

            return (
                <section id="lv-4">
                    <h1>Level 4</h1>
                    Press the <span className="col bright green">green</span> button 100 times.
                    <br />
                    You have pressed the <span className="col bright green">green</span> button <b>{clickCount}</b> times.
                    <div id="buttons">
                        {swapped ? (
                            <>
                                {redButton}
                                {greenButton}
                            </>
                        ) : (
                            <>
                                {greenButton}
                                {redButton}
                            </>
                        )}
                    </div>
                </section>
            );
        },
    },
    {
        id: 'lv-5',
        component: ({ resolve, reject }) => {
            const [message, setMessage] = useState('Are you colorblind or something?');

            return (
                <section id="lv-5">
                    <h1>Level 5</h1>
                    Click on the{' '}
                    <span
                        className="col bright red"
                        onClick={() => resolve('lv-6')}
                    >
                        red
                    </span>{' '}
                    text.
                    <div id="grid">
                        <div
                            className="col bright blue"
                            onClick={() => reject(message)}
                        >
                            red
                        </div>
                        <div
                            className="col bright red"
                            onClick={() => reject(message)}
                        >
                            magenta
                        </div>
                        <div
                            className="col bright yellow"
                            onClick={() => reject(message)}
                        >
                            green
                        </div>
                        <div
                            className="col bright green"
                            onClick={() => reject(message)}
                        >
                            purple
                        </div>
                    </div>
                </section>
            );
        },
    },
    {
        id: 'lv-6',
        component: ({ resolve, reject }) => {
            const [message, setMessage] = useState('Are you really colorblind or something?');

            return (
                <section id="lv-6">
                    <h1>Level 6</h1>
                    Click on the color that is <b>different</b> than others.
                    <div id="grid">
                        <div
                            className="first"
                            onClick={() => reject(message)}
                        ></div>
                        <div
                            className="first"
                            onClick={() => reject(message)}
                        ></div>
                        <div
                            className="second"
                            onClick={() => reject(message)}
                        ></div>
                        <div
                            className="first"
                            onClick={() => reject(message)}
                        ></div>
                    </div>
                    <div id="spanner"></div>
                    <a onClick={() => resolve('complete')}>I don't see a color that's off.</a>
                </section>
            );
        },
    },
    {
        id: 'complete',
        component: ({ resolve, reject }) => (
            <section id="complete">
                <h1>Good job!</h1>
                You have reached the end of the game! For now of course...
            </section>
        ),
    },
];
// #endregion

// #region root
function TMPVRoot({ initialPage }: { initialPage: string }) {
    const navigate = (page: PageID) => {
        window.location.href = `/projects/tmpv?page=${page}`;
    };

    const resolve = (nextPage: PageID) => navigate(nextPage);
    const reject = (message?: string) => {
        const params = new URLSearchParams();
        params.set('page', 'failure');
        params.set('from', initialPage);
        if (message) params.set('message', message);
        window.location.href = `/projects/tmpv?${params.toString()}`;
    };

    if (initialPage === 'failure') {
        const params = new URLSearchParams(window.location.search);
        const from = params.get('from') ?? 'lv-1';
        const message = params.get('message');

        return (
            <section>
                <h1>Incorrect! Try again.</h1>

                <p>{message}</p>

                <a href={`/projects/tmpv?page=${from}`}>
                    <button>try again</button>
                </a>
            </section>
        );
    }

    const pageDef = pages.find((p) => p.id === initialPage);

    if (!pageDef) {
        return (
            <section>
                <h1>Failed to find page! :C</h1>
                This is usually because the page was not found, or you haven't unlocked this page yet.
            </section>
        );
    }

    return (
        <pageDef.component
            resolve={resolve}
            reject={reject}
        />
    );
}
// #endregion

document.addEventListener('DOMContentLoaded', () => {
    const welcome = document.getElementById('welcome');
    const main = document.querySelector('main') as HTMLElement;
    const params = new URLSearchParams(window.location.search);
    const page = (params.get('page') ?? '').toLowerCase().replace(/[^a-z0-9-]/g, '');

    if (!main || page === '') return;
    if (welcome) welcome.style.display = 'none';

    createRoot(main).render(<TMPVRoot initialPage={page} />);
});
