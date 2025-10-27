import React from 'react';
import { Difficulty } from '../types';
import { useGame } from '../context/GameContext';

const LevelSelectScreen: React.FC = () => {
    const { setLearningLevel, setGameState } = useGame();

    const handleLevelSelect = (level: Difficulty) => {
        setLearningLevel(level);
        // レベル選択後、MBTI診断へ
        // ここでは何もしない（App.tsxで自動的にMbtiTestに遷移する）
    };

    const levels = [
        {
            level: Difficulty.BEGINNER,
            icon: '🌱',
            title: 'しょきゅう',
            subtitle: 'ちゅうがくえいご・にちじょうえいたんご',
            description: 'やさしいもんだいからはじめよう！',
            color: 'from-green-400 to-emerald-500'
        },
        {
            level: Difficulty.INTERMEDIATE,
            icon: '📚',
            title: '中級',
            subtitle: '高校英語・頻出単語',
            description: '実力を試してみよう！',
            color: 'from-blue-400 to-indigo-500'
        },
        {
            level: Difficulty.ADVANCED,
            icon: '🎓',
            title: '上級',
            subtitle: '大学入試・難関英単語',
            description: 'チャレンジャー歓迎！',
            color: 'from-purple-400 to-pink-500'
        }
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 via-indigo-200 to-cyan-200 p-4 relative overflow-hidden">
            {/* 背景装飾 */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-4 h-4 bg-pink-300 rounded-full animate-pulse"></div>
                <div className="absolute top-20 right-20 w-3 h-3 bg-purple-300 rounded-full animate-bounce"></div>
                <div className="absolute bottom-20 left-20 w-5 h-5 bg-indigo-300 rounded-full animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-2 h-2 bg-cyan-300 rounded-full animate-bounce"></div>
            </div>

            <div className="w-full max-w-2xl relative z-10">
                {/* タイトル */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-black mb-4 animate-pulse"
                        style={{
                            textShadow: '3px 3px 6px rgba(0,0,0,0.2), 0 0 20px rgba(168,85,247,0.4)',
                            background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                        ✨ 学習レベルを選んでね ✨
                    </h1>
                    <p className="text-xl text-purple-700 font-bold">
                        あなたにぴったりのレベルを選びましょう
                    </p>
                </div>

                {/* レベル選択カード */}
                <div className="space-y-6">
                    {levels.map((item) => (
                        <button
                            key={item.level}
                            onClick={() => handleLevelSelect(item.level)}
                            className="w-full bg-white/90 backdrop-blur-md rounded-3xl p-8 border-4 border-purple-300 shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-3xl hover:border-purple-400"
                            style={{ textAlign: 'left' }}
                        >
                            <div className="flex items-center gap-6">
                                {/* アイコン */}
                                <div className={`text-6xl bg-gradient-to-br ${item.color} rounded-full w-24 h-24 flex items-center justify-center shadow-lg`}>
                                    {item.icon}
                                </div>

                                {/* テキスト */}
                                <div className="flex-1">
                                    <h2 className="text-3xl font-black text-purple-800 mb-2">
                                        {item.title}
                                    </h2>
                                    <p className="text-lg text-purple-600 font-bold mb-1">
                                        {item.subtitle}
                                    </p>
                                    <p className="text-base text-gray-600">
                                        {item.description}
                                    </p>
                                </div>

                                {/* 矢印 */}
                                <div className="text-4xl text-purple-400">
                                    ➤
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* 説明文 */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-purple-600 bg-white/70 rounded-full px-6 py-3 inline-block shadow-md">
                        💡 あとから「設定」で変更できます
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LevelSelectScreen;

