import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';

function GameRoot() {
    type GamePage = 'welcome' | 'difficulty' | 'before' | 'record' | 'finish';

    const game = document.getElementById('game');

    if (!game) return;

    const [page, setPage] = useState<GamePage>('welcome');
    const [interval, setInterval] = useState(5000); // in milliseconds
    const [startTime, setStartTime] = useState(0);
    const [finishTime, setFinishTime] = useState(0);

    const targetTime = startTime + interval;
    const elapsedTime = finishTime === 0 ? 0 : Math.abs(targetTime - finishTime);
    const recordingTime = finishTime - startTime;

    const SECOND = 1000;
    const MINUTE = 60000;

    function formatTime(milliseconds: number): string {
        if (milliseconds < SECOND) {
            return `${Math.round(milliseconds)} millisecond${Math.round(milliseconds) === 1 ? '' : 's'}`;
        }

        if (milliseconds < MINUTE) {
            return `${(milliseconds / SECOND).toFixed(2)} seconds`;
        }

        return `${(milliseconds / MINUTE).toFixed(2)} minutes`;
    }

    function formatClock(milliseconds: number): string {
        const minutes = Math.floor(milliseconds / MINUTE);
        const seconds = Math.floor((milliseconds % MINUTE) / SECOND);
        const ms = Math.floor(milliseconds % SECOND);

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
    }

    function startRecording() {
        setStartTime(performance.now());
        setFinishTime(0);
        setPage('record');
    }

    function stopRecording() {
        setFinishTime(performance.now());
        setPage('finish');
    }

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.code !== 'Space') return;

            if (page === 'before') {
                event.preventDefault(); // fuck you default actions
                startRecording();
            }

            if (page === 'record') {
                event.preventDefault();
                stopRecording();
            }

            if (page === 'difficulty') {
                event.preventDefault();
                setPage('before');
            }

            if (page === 'finish') {
                event.preventDefault();
                setPage('difficulty');
            }
        }

        function onMousedown(event: Event) {
            if (page === 'before') {
                startRecording();
            }

            if (page === 'record') {
                stopRecording();
            }
        }

        window.addEventListener('keydown', onKeyDown);
        game.addEventListener('mousedown', onMousedown);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
            game.removeEventListener('mousedown', onMousedown);
        };
    }, [page]);

    switch (page) {
        case 'welcome':
            return (
                <>
                    <h1>Test Your Sense of Time!</h1>

                    <p>This very simple game tests your sense of time. Good luck!</p>

                    <button onClick={() => setPage('difficulty')}>Start game!</button>
                </>
            );

        case 'difficulty':
            return (
                <>
                    <h1>Set your difficulty</h1>
                    <input
                        type="number"
                        value={interval}
                        onChange={(event) => setInterval(Number(event.target.value))}
                    />{' '}
                    ms
                    <button onClick={() => setPage('before')}>Continue</button>
                </>
            );

        case 'before':
            return (
                <>
                    <h1>Click anywhere or press Space to start.</h1>

                    <p>
                        Remember! You'll have to try to stop after <b>{formatTime(interval)}</b>.
                    </p>
                </>
            );

        case 'record':
            return (
                <>
                    <h1>??:??.???</h1>

                    <p>Click again or press Space to stop recording.</p>
                </>
            );

        case 'finish':
            return (
                <>
                    <h1>{formatClock(recordingTime)}</h1>

                    <p>
                        You were off by <b>{formatTime(elapsedTime)}</b>!
                    </p>

                    <button onClick={() => setPage('difficulty')}>Try again</button>
                </>
            );
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const gameRoot = document.getElementById('game');
    if (!gameRoot) return;

    createRoot(gameRoot).render(<GameRoot />);
});
