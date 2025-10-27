import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import CharacterView from './CharacterView';
import SettingsModal from './SettingsModal';
import InfoModal from './InfoModal';
import StatsModal from './StatsModal';
import LottieAnimation from './LottieAnimation';
import { Difficulty } from '../types';
import { useHomeScreen } from '../hooks/useHomeScreen';
import { useTextDisplay } from '../hooks/useTextDisplay';
import { playBgm, playSound, BgmType, SoundType } from '../utils/soundPlayer';

const HomeScreen: React.FC = () => {
    const { startQuiz, learningLevel } = useGame();
    const {
        userProgress,
        characterInfo,
        characterImage,
        isTapped,
        isHatching, // 追加
        justLeveledUp,
        handleCharacterTap,
        addExperience,
    } = useHomeScreen();

    // テキスト表示用のフック
    const displayText = useTextDisplay();

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [isStatsOpen, setIsStatsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('home');

    // ホーム画面のBGMを再生
    useEffect(() => {
        playBgm(BgmType.HOME);
    }, []);

    // クイズ開始ボタンのハンドラー
    const handleQuizStart = () => {
        playSound(SoundType.BUTTON);
        startQuiz(learningLevel);
    };

    if (!characterInfo) return null; // データがまだない場合は何も表示しない

    return (
        <div className="phone-container">
            <div className="home-screen">
                {/* ヘッダー */}
                <div className="flex justify-center items-center gap-4 mb-4">
                    {[
                        { id: 'settings', label: displayText('設定') },
                        { id: 'home', label: 'ホーム' },
                        { id: 'stats', label: displayText('統計') }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                if (tab.id === 'settings') setIsSettingsOpen(true);
                                if (tab.id === 'stats') setIsStatsOpen(true);
                            }}
                            className="fantasy-text tab-button relative rounded-xl transition-all duration-300 ease-in-out"
                            style={{
                                fontWeight: activeTab === tab.id ? '800' : '700',
                                textShadow: activeTab === tab.id
                                    ? '0 2px 4px rgba(255,255,255,0.9)'
                                    : '0 1px 3px rgba(236,72,153,0.4)',
                                fontSize: '18px',
                                padding: '10px 24px',
                                letterSpacing: '1px',
                                color: activeTab === tab.id ? 'white' : '#EC4899',
                                fontFamily: '"Comic Sans MS", "Hiragino Maru Gothic ProN", "ヒラギノ丸ゴ ProN W4", "Meiryo", "メイリオ", sans-serif',
                                lineHeight: '1',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {/* 可愛いピンクのグラデーション背景 */}
                            {activeTab === tab.id && (
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-300 rounded-xl shadow-lg"
                                    style={{ zIndex: -1 }}
                                />
                            )}

                            <span className="relative z-10">{tab.label}</span>

                            {/* アンダーライン */}
                            {activeTab === tab.id && (
                                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full"
                                    style={{ zIndex: 10 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* メインコンテンツ */}
                <div className="home-content">
                    {/* キャラクター表示を CharacterView に置き換え */}
                    <CharacterView
                        name={characterInfo.name}
                        level={userProgress.level}
                        mbtiType={userProgress.mbtiType!}
                        currentExp={userProgress.xp}
                        maxExp={userProgress.xpToNextLevel}
                        imagePath={characterImage}
                        onCharacterTap={handleCharacterTap}
                        characterType={userProgress.characterType!}
                        evolutionStage={userProgress.evolutionStage}
                        isTapped={isTapped}
                        justLeveledUp={justLeveledUp}
                    />
                    <button
                        className="quiz-start-button"
                        onClick={handleQuizStart}
                    >
                        📝 {displayText('英語クイズ開始')}
                        <div style={{ fontSize: '12px', marginTop: '5px', opacity: 0.9 }}>
                            {displayText('今日')} 2/10{displayText('回')}
                        </div>
                    </button>
                    <div className="stats">
                        <div>🔥 1{displayText('日目')}</div>
                        <div>📚 {displayText('単語')}5{displayText('個')}</div>
                    </div>
                </div>

                {/* モーダル */}
                <SettingsModal
                    isOpen={isSettingsOpen}
                    onClose={() => setIsSettingsOpen(false)}
                />
                <InfoModal
                    isOpen={isInfoOpen}
                    onClose={() => setIsInfoOpen(false)}
                />
                <StatsModal
                    isOpen={isStatsOpen}
                    onClose={() => setIsStatsOpen(false)}
                />

                {/* 卵孵化アニメーション - 画面全体 */}
                {isHatching && (
                    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 z-50 flex items-center justify-center">
                        <div className="text-center w-full h-full flex flex-col items-center justify-center">
                            <div className="w-96 h-96 mb-8 flex items-center justify-center">
                                <LottieAnimation
                                    animationData="/lottie/egg-hatch.json"
                                    loop={false}
                                    autoplay={true}
                                    className="w-full h-full"
                                />
                            </div>

                            <div className="text-white text-4xl font-bold mb-4 animate-pulse">
                                🎉 {displayText('進化')}しました！ 🎉
                            </div>
                            <div className="text-white text-2xl opacity-90 animate-bounce">
                                {displayText('卵')}から{displayText('子供')}に{displayText('成長')}しました！
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomeScreen;