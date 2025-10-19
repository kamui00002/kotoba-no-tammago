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
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-900 relative">
            <header className="absolute top-6 left-6">
                <h1 className="text-2xl font-bold text-cyan-300 tracking-wider">ことばのたまご</h1>
            </header>
            
            <main className="flex flex-col items-center justify-center w-full">
                <CharacterView />

                <div className="mt-6 w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg">
                    <h2 className="text-xl font-semibold text-center mb-5 text-cyan-200">クイズに挑戦！</h2>
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
            </main>
        </div>
    );
};

export default HomeScreen;