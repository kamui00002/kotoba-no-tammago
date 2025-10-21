import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { CHARACTER_DATA } from '../constants';
import { Difficulty } from '../types';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
    const { userProgress, completeMbtiTest, addExperience, setGameState, resetGame, setLearningLevel, learningLevel } = useGame();
    const { mbtiType, characterType, level, xp, xpToNextLevel } = userProgress;
    const [showLevelSelect, setShowLevelSelect] = useState(false);

    const characterInfo = mbtiType && characterType ? CHARACTER_DATA[characterType] : null;

    const handleRetakeMbti = () => {
        if (window.confirm('MBTI診断をやり直しますか？現在のキャラクターとの思い出は残りますが、新しいキャラクターに変わります。')) {
            resetGame();
            onClose();
        }
    };

    const handleChangeLevel = () => {
        setShowLevelSelect(true);
    };

    const handleLevelSelect = (difficulty: Difficulty) => {
        setLearningLevel(difficulty);
        const levelNames = {
            [Difficulty.BEGINNER]: '初級',
            [Difficulty.INTERMEDIATE]: '中級',
            [Difficulty.ADVANCED]: '上級'
        };
        alert(`${levelNames[difficulty]}レベルに変更しました！`);
        setShowLevelSelect(false);
    };

    const handleResetData = () => {
        if (window.confirm('本当に全てのデータをリセットしますか？この操作は取り消せません。')) {
            resetGame();
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal" id="settingsModal" style={{ display: isOpen ? 'flex' : 'none' }}>
            <div className="modal-content">
                <div className="modal-header">
                    <div className="modal-title">⚙️ 設定</div>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    {/* Account Section */}
                    <div className="modal-section">
                        <div className="modal-section-title">👤 アカウント</div>
                        <div className="modal-item">
                            <div className="modal-label">MBTIタイプ</div>
                            <div className="modal-value">{mbtiType} - {characterInfo?.name}</div>
                            <button className="modal-button" onClick={handleRetakeMbti}>MBTI再診断</button>
                        </div>
                        <div className="modal-item">
                            <div className="modal-label">学習レベル</div>
                            <div className="modal-value">
                                {learningLevel === Difficulty.BEGINNER ? '初級' :
                                    learningLevel === Difficulty.INTERMEDIATE ? '中級' : '上級'}
                            </div>
                            <button className="modal-button" onClick={handleChangeLevel}>レベル変更</button>
                        </div>
                    </div>

                    {/* Data Section */}
                    <div className="modal-section">
                        <div className="modal-section-title">📊 データ</div>
                        <div className="modal-item">
                            <div className="modal-row">
                                <div>
                                    <div className="modal-label">現在のレベル</div>
                                    <div className="modal-value">Lv.{level}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div className="modal-label">経験値</div>
                                    <div className="modal-value">{xp} / {xpToNextLevel}</div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-item">
                            <div className="modal-label">累計学習単語</div>
                            <div className="modal-value">5個</div>
                        </div>
                        <div className="modal-item">
                            <div className="modal-label">連続学習日数</div>
                            <div className="modal-value">🔥 1日</div>
                        </div>
                        <div className="modal-item">
                            <button className="modal-button danger" onClick={handleResetData}>データをリセット</button>
                        </div>
                    </div>


                    {/* App Info Section */}
                    <div className="modal-section">
                        <div className="modal-section-title">ℹ️ アプリ情報</div>
                        <div className="modal-item">
                            <div className="modal-row">
                                <div className="modal-label">バージョン</div>
                                <div className="modal-value">v2.0.0</div>
                            </div>
                        </div>
                        <div className="modal-item">
                            <div className="modal-row">
                                <div className="modal-label">作成者</div>
                                <div className="modal-value">kamui00002</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* レベル選択モーダル */}
            {showLevelSelect && (
                <div className="modal" style={{ display: 'flex' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title">📚 学習レベル選択</div>
                            <button className="modal-close" onClick={() => setShowLevelSelect(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="modal-section">
                                <div className="modal-section-title">どのレベルで学習しますか？</div>
                                <div className="modal-item">
                                    <button
                                        className="modal-button"
                                        onClick={() => handleLevelSelect(Difficulty.BEGINNER)}
                                        style={{ marginBottom: '10px' }}
                                    >
                                        🌱 初級 - 中学英語・日常英単語
                                    </button>
                                    <button
                                        className="modal-button"
                                        onClick={() => handleLevelSelect(Difficulty.INTERMEDIATE)}
                                        style={{ marginBottom: '10px' }}
                                    >
                                        📚 中級 - TOEIC頻出単語
                                    </button>
                                    <button
                                        className="modal-button"
                                        onClick={() => handleLevelSelect(Difficulty.ADVANCED)}
                                    >
                                        🎓 上級 - 難関英単語
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SettingsModal;