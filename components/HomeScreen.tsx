
import React from 'react';
import { useGame } from '../context/GameContext';
import CharacterView from './CharacterView';
import { Difficulty } from '../types';

const HomeScreen: React.FC = () => {
    const { startQuiz } = useGame();

    const difficultyButtons = [
        { label: '初級', difficulty: Difficulty.BEGINNER, color: 'bg-green-500 hover:bg-green-400' },
        { label: '中級', difficulty: Difficulty.INTERMEDIATE, color: 'bg-yellow-500 hover:bg-yellow-400' },
        { label: '上級', difficulty: Difficulty.ADVANCED, color: 'bg-red-500 hover:bg-red-400' },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-900">
            <header className="w-full max-w-4xl text-center mb-4">
                <h1 className="text-4xl font-bold text-cyan-300 tracking-wider">ことばのたまご</h1>
            </header>
            
            <CharacterView />

            <div className="mt-8 w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6 text-cyan-200">クイズに挑戦！</h2>
                <div className="flex flex-col space-y-4">
                    {difficultyButtons.map(({ label, difficulty, color }) => (
                         <button
                            key={difficulty}
                            onClick={() => startQuiz(difficulty)}
                            className={`${color} text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md transition-transform transform hover:scale-105`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
