
import React, { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { GameState } from '../types';
import { useTextDisplay } from '../hooks/useTextDisplay';
import { playBgm, BgmType } from '../utils/soundPlayer';

const ResultScreen: React.FC = () => {
    const { quizResult, setGameState, learningLevel } = useGame();

    // テキスト表示用のフック
    const displayText = useTextDisplay();

    // 結果画面のBGMを再生
    useEffect(() => {
        playBgm(BgmType.RESULT);
    }, []);

    // 初級モードの場合は文字を小さくする
    const titleSize = learningLevel === 'beginner' ? 'text-3xl' : 'text-5xl';

    if (!quizResult) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-slate-800">
                <p className="text-xl">{displayText('結果')}を{displayText('読み込めませんでした')}。</p>
                <button
                    onClick={() => setGameState(GameState.HOME)}
                    className="mt-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                >
                    ホームに{displayText('戻る')}
                </button>
            </div>
        );
    }

    const { score, totalQuestions, xpGained } = quizResult;
    const accuracy = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 via-indigo-200 to-cyan-200 p-4 font-sans relative overflow-hidden">
            {/* 魔法のパーティクル効果のための装飾 */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-4 h-4 bg-pink-300 rounded-full animate-pulse"></div>
                <div className="absolute top-20 right-20 w-3 h-3 bg-purple-300 rounded-full animate-bounce"></div>
                <div className="absolute bottom-20 left-20 w-5 h-5 bg-indigo-300 rounded-full animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-2 h-2 bg-cyan-300 rounded-full animate-bounce"></div>
                <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-pink-200 rounded-full animate-pulse"></div>
                <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-purple-200 rounded-full animate-bounce"></div>
            </div>

            <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center relative z-10 border-2 border-purple-200">
                <h1 className={`${titleSize} font-black mb-6 animate-pulse whitespace-nowrap`}
                    style={{
                        textShadow: '2px 2px 4px rgba(0,0,0,0.2), 0 0 15px rgba(234,179,8,0.3)',
                        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                    🎉 {displayText('クイズ')}{displayText('結果')} 🎉
                </h1>

                <div className="my-8 space-y-4">
                    <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 p-6 rounded-2xl border-2 border-purple-300 shadow-lg">
                        <p className="text-lg text-purple-700 font-bold mb-2">📊 {displayText('スコア')}</p>
                        <p className="text-6xl font-black text-purple-800" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>{score} / {totalQuestions}</p>
                    </div>
                    <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 p-6 rounded-2xl border-2 border-purple-300 shadow-lg">
                        <p className="text-lg text-purple-700 font-bold mb-2">✨ {displayText('正解率')}</p>
                        <p className="text-5xl font-black text-purple-800" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>{accuracy.toFixed(0)}%</p>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 p-6 rounded-2xl border-2 border-yellow-400 shadow-lg animate-pulse">
                        <p className="text-lg text-orange-700 font-bold mb-2">⭐ {displayText('獲得経験値')}</p>
                        <p className="text-5xl font-black text-orange-600" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>+{xpGained} XP</p>
                    </div>
                </div>

                <button
                    onClick={() => setGameState(GameState.HOME)}
                    className="w-full bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-white font-black py-4 px-6 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 shadow-xl border-2 border-purple-300"
                >
                    🏠 ホームに{displayText('戻る')}
                </button>
            </div>
        </div>
    );
};

export default ResultScreen;
