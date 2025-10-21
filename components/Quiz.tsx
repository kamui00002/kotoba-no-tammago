// Fix: Replaced placeholder content with a functional Quiz component.
import React from 'react';
import { useQuiz } from '../hooks/useQuiz';
import { useGame } from '../context/GameContext';
import { GameState } from '../types';

const Quiz: React.FC = () => {
    const { setGameState } = useGame();
    const {
        isLoading,
        questions,
        currentIndex,
        currentQuestion,
        handleAnswer,
        selectedAnswer,
        isCorrect
    } = useQuiz();

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen bg-slate-800 text-white">Loading quiz...</div>;
    }

    if (!currentQuestion) {
        return <div className="flex justify-center items-center h-screen bg-slate-800 text-white">Could not load quiz.</div>;
    }

    const getButtonClass = (option: string) => {
        if (!selectedAnswer) {
            return 'bg-white hover:bg-gray-200 text-slate-800';
        }
        const isCorrectAnswer = option === currentQuestion.meaning;
        const isSelected = option === selectedAnswer;

        if (isCorrectAnswer) {
            return 'bg-green-500 text-white'; // Correct answer is always green
        }
        if (isSelected && !isCorrect) {
            return 'bg-red-500 text-white'; // Selected wrong answer is red
        }
        return 'bg-white text-slate-800 opacity-50'; // Other options
    };


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-gray-900 p-4 font-sans text-white">
            <div className="w-full max-w-lg bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6">
                <header className="flex justify-between items-center mb-4">
                    <p className="font-bold text-cyan-200">Question {currentIndex + 1}/{questions.length}</p>
                    <button
                        className="text-cyan-200 text-2xl font-mono hover:text-white transition-colors"
                        aria-label="Close"
                        onClick={() => setGameState(GameState.HOME)}
                    >
                        &times;
                    </button>
                </header>

                <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
                    <div
                        className="bg-cyan-400 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                    ></div>
                </div>

                <div className="text-center mb-8 p-6 bg-black/30 rounded-lg min-h-[120px] flex flex-col items-center justify-center">
                    <p className="text-sm text-gray-400 mb-2">What is the meaning of:</p>
                    <h2 className="text-4xl font-bold tracking-wider">{currentQuestion.word}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(option)}
                            disabled={!!selectedAnswer}
                            className={`w-full font-bold py-4 px-6 rounded-lg shadow-md transition-all duration-200 transform ${!selectedAnswer ? 'hover:scale-105' : ''} ${getButtonClass(option)}`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Quiz;
