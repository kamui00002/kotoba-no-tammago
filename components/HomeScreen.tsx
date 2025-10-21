import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import CharacterView from './CharacterView';
import SettingsModal from './SettingsModal';
import InfoModal from './InfoModal';
import StatsModal from './StatsModal';
import { Difficulty } from '../types';
import { useHomeScreen } from '../hooks/useHomeScreen';

const HomeScreen: React.FC = () => {
    const { startQuiz, learningLevel } = useGame();
    const {
        userProgress,
        characterInfo,
        characterImage,
        isTapped,
        handleCharacterTap,
        addExperience,
    } = useHomeScreen();

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [isStatsOpen, setIsStatsOpen] = useState(false);

    if (!characterInfo) return null; // データがまだない場合は何も表示しない

    return (
        <div className="phone-container">
            <div className="home-screen">
                {/* ヘッダー */}
                <div className="home-header">
                    <div
                        className="icon"
                        onClick={() => setIsSettingsOpen(true)}
                        style={{ cursor: 'pointer', zIndex: 100 }}
                    >
                        ⚙️
                    </div>
                    <div className="icon" style={{ color: '#8B4513' }}>🏠</div>
                    <div
                        className="icon"
                        onClick={() => setIsStatsOpen(true)}
                        style={{ cursor: 'pointer', zIndex: 100 }}
                    >
                        📊
                    </div>
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
                        justLeveledUp={userProgress.justLeveledUp || false}
                    />
                    <button
                        className="quiz-start-button"
                        onClick={() => startQuiz(learningLevel)}
                    >
                        📝 英語クイズ開始
                        <div style={{ fontSize: '12px', marginTop: '5px', opacity: 0.9 }}>
                            今日 2/10回
                        </div>
                    </button>
                    <div className="stats">
                        <div>🔥 1日目</div>
                        <div>📚 単語5個</div>
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
            </div>
        </div>
    );
};

export default HomeScreen;