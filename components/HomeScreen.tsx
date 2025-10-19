import React from 'react';
import { useGame } from '../context/GameContext';
import CharacterView from './CharacterView';
import { Difficulty } from '../types';
import { useHomeScreen } from '../hooks/useHomeScreen';

const HomeScreen: React.FC = () => {
    const { startQuiz } = useGame();
    const {
        userProgress,
        characterInfo,
        characterImage,
        handleCharacterTap,
        addExperience,
    } = useHomeScreen();

    const difficultyButtons = [
        { label: '初級', difficulty: Difficulty.BEGINNER, color: 'bg-green-500 hover:bg-green-600' },
        { label: '中級', difficulty: Difficulty.INTERMEDIATE, color: 'bg-yellow-500 hover:bg-yellow-600' },
        { label: '上級', difficulty: Difficulty.ADVANCED, color: 'bg-red-500 hover:bg-red-600' },
    ];

    if (!characterInfo) return null; // データがまだない場合は何も表示しない

    return (
        // 1. 背景 & スクロールコンテナ (ScrollView + ZStack)
        <div className="min-h-screen w-full bg-slate-900 font-sans overflow-y-auto">
            <div className="container mx-auto max-w-lg p-4">

                {/* 2. ヘッダー (HStack) */}
                <header className="flex justify-between items-center py-2 mb-4">
                    <button className="text-2xl p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Settings">⚙️</button>
                    <button className="text-2xl p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Home">🏠</button>
                    <button className="text-2xl p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Information">ⓘ</button>
                </header>

                {/* 3. メインコンテンツ (VStack) */}
                <main className="flex flex-col space-y-6">
                    {/* 3-1. キャラクター表示エリア */}
                    <CharacterView
                        name={characterInfo.name}
                        level={userProgress.level}
                        mbtiType={userProgress.mbtiType!}
                        currentExp={userProgress.xp}
                        maxExp={userProgress.xpToNextLevel}
                        imagePath={characterImage}
                        onCharacterTap={handleCharacterTap}
                        characterType={userProgress.characterType!}
                    />

                    {/* 3-2. クイズ開始ボタン */}
                    <section className="w-full bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-lg">
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
                    </section>

                     {/* ViewModelの動作テスト用ボタン */}
                    <button
                        onClick={() => addExperience(50)}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        +50 EXP (テスト用)
                    </button>

                    {/* 3-3. 統計情報 (HStack) */}
                    <section className="w-full bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-lg">
                         <h2 className="text-xl font-semibold text-center mb-5 text-cyan-200">学習の記録</h2>
                         <div className="flex justify-around text-center">
                            <div>
                                <p className="text-2xl font-bold">120</p>
                                <p className="text-sm text-gray-400">学習した単語</p>
                            </div>
                             <div>
                                <p className="text-2xl font-bold">12</p>
                                <p className="text-sm text-gray-400">クリアしたクイズ</p>
                            </div>
                             <div>
                                <p className="text-2xl font-bold">85%</p>
                                <p className="text-sm text-gray-400">平均正解率</p>
                            </div>
                         </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default HomeScreen;
