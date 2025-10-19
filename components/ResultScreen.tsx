
import React from 'react';
import { useGame } from '../context/GameContext';
import { GameState } from '../types';

const ResultScreen: React.FC = () => {
    const { quizResult, setGameState } = useGame();

    if (!quizResult) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-slate-800">
                <p className="text-xl">結果を読み込めませんでした。</p>
                <button
                    onClick={() => setGameState(GameState.HOME)}
                    className="mt-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                >
                    ホームに戻る
                </button>
            </div>
        );
    }

    const { score, totalQuestions, xpGained } = quizResult;
    const accuracy = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-slate-900 p-4">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-center">
                <h1 className="text-4xl font-bold mb-4 text-yellow-300">クイズ結果</h1>
                
                <div className="my-8 space-y-4">
                    <div className="bg-black/20 p-4 rounded-lg">
                        <p className="text-lg text-gray-300">スコア</p>
                        <p className="text-5xl font-bold text-white">{score} / {totalQuestions}</p>
                    </div>
                    <div className="bg-black/20 p-4 rounded-lg">
                        <p className="text-lg text-gray-300">正解率</p>
                        <p className="text-3xl font-bold text-white">{accuracy.toFixed(0)}%</p>
                    </div>
                    <div className="bg-black/20 p-4 rounded-lg">
                        <p className="text-lg text-gray-300">獲得経験値</p>
                        <p className="text-3xl font-bold text-cyan-300">+{xpGained} XP</p>
                    </div>
                </div>

                <button
                    onClick={() => setGameState(GameState.HOME)}
                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105"
                >
                    ホームに戻る
                </button>
            </div>
        </div>
    );
};

export default ResultScreen;
