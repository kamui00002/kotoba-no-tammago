import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import CharacterView from './CharacterView';
import SettingsModal from './SettingsModal';
import InfoModal from './InfoModal';
import StatsModal from './StatsModal';
import { Difficulty } from '../types';
import { useHomeScreen } from '../hooks/useHomeScreen';

const HomeScreen: React.FC = () => {
    const { startQuiz } = useGame();
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
                    <div className="icon">🏠</div>
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
                    <div className="character-name">{characterInfo.name}</div>
                    <div className="level">Lv.{userProgress.level}</div>
                    <div
                        className="character-display"
                        onClick={handleCharacterTap}
                    >
                        {userProgress.characterType === 'INFP' ? '🌙' :
                            userProgress.characterType === 'ENTJ' ? '⚔️' :
                                userProgress.characterType === 'ISFJ' ? '🌸' :
                                    userProgress.characterType === 'ENTP' ? '⚡' : '🌙'}
                    </div>
                    <div className="exp-container">
                        <div className="exp-bar">
                            <div
                                className="exp-progress"
                                style={{ width: `${(userProgress.xp / userProgress.xpToNextLevel) * 100}%` }}
                            ></div>
                        </div>
                        <div className="exp-text">
                            ⭐ {userProgress.xp} / {userProgress.xpToNextLevel} EXP
                        </div>
                    </div>
                    <button
                        className="quiz-start-button"
                        onClick={() => startQuiz(Difficulty.BEGINNER)}
                    >
                        📝 英語クイズ開始
                        <div style={{ fontSize: '12px', marginTop: '5px', opacity: 0.9 }}>
                            今日 0/10回
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