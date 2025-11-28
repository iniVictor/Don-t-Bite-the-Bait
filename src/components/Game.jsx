import React, { useState, useEffect } from 'react';
import Card from './Card';
import { scenarios } from '../data/scenarios';
import '../styles/Game.css';

const Game = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [feedback, setFeedback] = useState(null); // { type: 'correct' | 'wrong', message: string }
    const [shuffledScenarios, setShuffledScenarios] = useState([]);
    const [timeLeft, setTimeLeft] = useState(10);
    const [timerActive, setTimerActive] = useState(false);

    useEffect(() => {
        // Shuffle scenarios on mount
        setShuffledScenarios([...scenarios].sort(() => Math.random() - 0.5));
    }, []);

    useEffect(() => {
        // Start timer when new question loads
        if (!feedback && !gameOver && shuffledScenarios.length > 0) {
            setTimeLeft(10);
            setTimerActive(true);
        }
    }, [currentIndex, shuffledScenarios, feedback, gameOver]);

    useEffect(() => {
        // Countdown timer
        if (timerActive && timeLeft > 0 && !feedback) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && !feedback) {
            // Time's up - mark as wrong
            setTimerActive(false);
            const currentScenario = shuffledScenarios[currentIndex];
            setFeedback({ type: 'wrong', message: 'Time\'s up! ' + currentScenario.reason });
        }
    }, [timerActive, timeLeft, feedback, currentIndex, shuffledScenarios]);

    const handleDecision = (decision) => {
        if (gameOver || feedback) return;

        setTimerActive(false);
        const currentScenario = shuffledScenarios[currentIndex];
        const isCorrect = (decision === 'safe' && !currentScenario.isThreat) ||
            (decision === 'threat' && currentScenario.isThreat);

        if (isCorrect) {
            setScore(score + 100);
            setFeedback({ type: 'correct', message: 'Correct! ' + currentScenario.reason });
        } else {
            setFeedback({ type: 'wrong', message: 'Wrong! ' + currentScenario.reason });
        }
    };

    const handleNext = () => {
        setFeedback(null);
        if (currentIndex < shuffledScenarios.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setGameOver(true);
        }
    };

    const restartGame = () => {
        setShuffledScenarios([...scenarios].sort(() => Math.random() - 0.5));
        setCurrentIndex(0);
        setScore(0);
        setGameOver(false);
        setFeedback(null);
        setTimeLeft(10);
        setTimerActive(false);
    };

    if (shuffledScenarios.length === 0) return <div>Loading...</div>;

    if (gameOver) {
        return (
            <div className="game-container game-over">
                <h2>Mission Complete</h2>
                <p>Final Score: {score}</p>
                <button className="btn-restart" onClick={restartGame}>Play Again</button>
            </div>
        );
    }

    const currentScenario = shuffledScenarios[currentIndex];

    return (
        <div className="game-container">
            <div className="header">
                <div className="score">Score: {score}</div>
                <div className="timer">Time: {timeLeft}s</div>
                <div className="progress">Level: {currentIndex + 1} / {shuffledScenarios.length}</div>
            </div>

            <div className="game-area">
                <Card scenario={currentScenario} />

                {feedback && (
                    <div className={`feedback-overlay ${feedback.type}`}>
                        <div className="feedback-content">
                            <h3>{feedback.type === 'correct' ? 'ACCESS GRANTED' : 'SECURITY BREACH'}</h3>
                            <p>{feedback.message}</p>
                            <button className="btn-next" onClick={handleNext}>Next</button>
                        </div>
                    </div>
                )}
            </div>

            <div className="controls">
                <button
                    className="btn btn-safe"
                    onClick={() => handleDecision('safe')}
                    disabled={!!feedback}
                >
                    SAFE
                </button>
                <button
                    className="btn btn-threat"
                    onClick={() => handleDecision('threat')}
                    disabled={!!feedback}
                >
                    THREAT
                </button>
            </div>
        </div>
    );
};

export default Game;
