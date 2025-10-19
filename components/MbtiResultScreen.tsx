import React from 'react';
import { useGame } from '../context/GameContext';
import { GameState } from '../types';
import { CHARACTER_DATA } from '../constants';

const MbtiResultScreen: React.FC = () => {
    const { userProgress, setGameState } = useGame();
    const { mbtiType, characterType } = userProgress;

    // データが存在しない場合のフォールバック
    if (!mbtiType || !characterType) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-slate-800">
                <p className="text-xl">キャラクター情報を読み込めませんでした。</p>
                <button
                    onClick={() => setGameState(GameState.HOME)}
                    className="mt-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                >
                    ホームに戻る
                </button>
            </div>
        );
    }

    const characterInfo = CHARACTER_DATA[characterType];
    const imagePath = `/assets/images/characters/${characterInfo.mbti.toLowerCase()}_${characterType}_idle.png`;

    return (
        // 1. 背景: キャラクターのテーマカラーのグラデーション
        <div className={`min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br ${characterInfo.gradient} text-white font-sans transition-all duration-500`}>
            <div className="w-full max-w-md bg-black/30 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-center flex flex-col items-center">
                <p className="text-lg text-white/80 mb-4">あなたの相棒は...</p>
                
                {/* 2. キャラクター表示: バウンスアニメーション付き */}
                <div className="my-4 h-48 w-48 flex items-center justify-center">
                    <img 
                        src={imagePath} 
                        alt={characterInfo.name}
                        className="max-h-full max-w-full object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)] animate-bounce-char"
                    />
                </div>

                {/* 3. 結果テキスト */}
                <div className="my-4">
                    <p className="text-4xl font-bold text-yellow-300">{mbtiType}</p>
                    <h1 className="text-3xl font-semibold mt-2">{characterInfo.title}</h1>
                    <p className="text-white/90 mt-4 leading-relaxed">
                        {characterInfo.description}
                    </p>
                </div>

                {/* 4. 次へボタン */}
                <button
                    onClick={() => setGameState(GameState.HOME)}
                    className="mt-6 w-full max-w-xs bg-white text-purple-700 font-bold py-3 px-6 rounded-lg text-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
                >
                    冒険をはじめる →
                </button>
            </div>
        </div>
    );
};

export default MbtiResultScreen;