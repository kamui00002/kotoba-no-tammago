1// Fix: Replaced placeholder content with a functional Quiz component.
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
        return <div className="flex justify-center items-center h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 text-purple-800">Loading quiz...</div>;
    }

    if (!currentQuestion) {
        return <div className="flex justify-center items-center h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 text-purple-800">Could not load quiz.</div>;
    }

    const getButtonClass = (option: string) => {
        if (!selectedAnswer) {
            return 'bg-gradient-to-r from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 text-purple-800 border-2 border-purple-300 shadow-lg';
        }
        const isCorrectAnswer = option === currentQuestion.meaning;
        const isSelected = option === selectedAnswer;

        if (isCorrectAnswer) {
            return 'bg-gradient-to-r from-emerald-400 to-green-400 text-white shadow-xl border-2 border-emerald-500'; // Correct answer is magical green
        }
        if (isSelected && !isCorrect) {
            return 'bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-xl border-2 border-rose-500'; // Selected wrong answer is magical pink
        }
        return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 opacity-50 border-2 border-gray-300'; // Other options
    };


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 via-indigo-200 to-cyan-200 p-4 font-sans text-purple-800 relative overflow-hidden">
            {/* 魔法のパーティクル効果のための装飾 */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-4 h-4 bg-pink-300 rounded-full animate-pulse"></div>
                <div className="absolute top-20 right-20 w-3 h-3 bg-purple-300 rounded-full animate-bounce"></div>
                <div className="absolute bottom-20 left-20 w-5 h-5 bg-indigo-300 rounded-full animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-2 h-2 bg-cyan-300 rounded-full animate-bounce"></div>
                <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-pink-200 rounded-full animate-pulse"></div>
                <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-purple-200 rounded-full animate-bounce"></div>
            </div>
            <div className="w-full max-w-lg bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 border-2 border-purple-200 relative z-10">
                <header className="flex justify-between items-center mb-4">
                    <p className="font-bold text-purple-600 text-lg">✨ Question {currentIndex + 1}/{questions.length} ✨</p>
                    <button
                        className="text-purple-600 text-2xl font-mono hover:text-purple-800 transition-colors bg-pink-100 hover:bg-pink-200 rounded-full w-8 h-8 flex items-center justify-center"
                        aria-label="Close"
                        onClick={() => setGameState(GameState.HOME)}
                    >
                        &times;
                    </button>
                </header>

                <div className="w-full bg-gradient-to-r from-pink-200 to-purple-200 rounded-full h-4 mb-6 border-2 border-purple-300 overflow-hidden" style={{ transform: 'translateY(-4px)' }}>
                    <div
                        className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 h-4 rounded-full transition-all duration-500 shadow-lg"
                        style={{ width: `${((currentIndex + 1) / questions.length) * 100}%`, transform: 'translateY(-1px)' }}
                    ></div>
                </div>

                <div className="text-center mb-8 p-6 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 rounded-2xl min-h-[120px] flex flex-col items-center justify-center border-2 border-purple-300 shadow-lg">
                    <p className="text-sm text-purple-600 mb-2 font-semibold">✨ What is the meaning of: ✨</p>
                    <h2 className="text-4xl font-bold tracking-wider text-purple-800 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">{currentQuestion.word}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(option)}
                            disabled={!!selectedAnswer}
                            className={`w-full font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform ${!selectedAnswer ? 'hover:scale-105 hover:shadow-xl' : ''} ${getButtonClass(option)}`}
                        >
                            <span className="text-lg">{option}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Quiz;
