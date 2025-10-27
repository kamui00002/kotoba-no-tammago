import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { CHARACTER_DATA } from '../constants';
import { Difficulty } from '../types';
import { useTextDisplay } from '../hooks/useTextDisplay';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
    const { userProgress, completeMbtiTest, addExperience, setGameState, resetGame, setLearningLevel, learningLevel, setUserProgress } = useGame();
    const { mbtiType, characterType, level, xp, xpToNextLevel } = userProgress;
    const [showLevelSelect, setShowLevelSelect] = useState(false);

    // テキスト表示用のフック
    const displayText = useTextDisplay();

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
            [Difficulty.BEGINNER]: displayText('初級'),
            [Difficulty.INTERMEDIATE]: displayText('中級'),
            [Difficulty.ADVANCED]: displayText('上級')
        };
        alert(`${levelNames[difficulty]}${displayText('レベル')}に${displayText('変更')}しました！`);
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
                    <div className="modal-title">⚙️ {displayText('設定')}</div>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    {/* Account Section */}
                    <div className="modal-section">
                        <div className="modal-section-title">👤 アカウント</div>
                        <div className="modal-item">
                            <div className="modal-label">MBTI{displayText('タイプ')}</div>
                            <div className="modal-value">{mbtiType} - {characterInfo?.name ? displayText(characterInfo.name) : ''}</div>
                            <button className="modal-button" onClick={handleRetakeMbti}>MBTI{displayText('再診断')}</button>
                        </div>
                        <div className="modal-item">
                            <div className="modal-label">{displayText('学習レベル')}</div>
                            <div className="modal-value">
                                {learningLevel === Difficulty.BEGINNER ? displayText('初級') :
                                    learningLevel === Difficulty.INTERMEDIATE ? displayText('中級') : displayText('上級')}
                            </div>
                            <button className="modal-button" onClick={handleChangeLevel}>{displayText('レベル')}{displayText('変更')}</button>
                        </div>
                    </div>

                    {/* Data Section */}
                    <div className="modal-section">
                        <div className="modal-section-title">📊 データ</div>
                        <div className="modal-item">
                            <div className="modal-row">
                                <div>
                                    <div className="modal-label">{displayText('現在')}の{displayText('レベル')}</div>
                                    <div className="modal-value">Lv.{level}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div className="modal-label">{displayText('経験値')}</div>
                                    <div className="modal-value">{xp} / {xpToNextLevel}</div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-item">
                            <div className="modal-label">{displayText('累計学習単語')}</div>
                            <div className="modal-value">5{displayText('個')}</div>
                        </div>
                        <div className="modal-item">
                            <div className="modal-label">{displayText('連続学習日数')}</div>
                            <div className="modal-value">🔥 1{displayText('日')}</div>
                        </div>
                        <div className="modal-item">
                            <button className="modal-button danger" onClick={handleResetData}>データを{displayText('リセット')}</button>
                        </div>
                    </div>

                    {/* Debug Mode Section */}
                    <div className="modal-section">
                        <div className="modal-section-title">🛠️ {displayText('デバッグ')}モード</div>
                        <div className="modal-item">
                            <div className="modal-label">{displayText('テスト用機能')}</div>
                            <div className="debug-buttons">
                                <button
                                    className="modal-button"
                                    onClick={() => addExperience(100)}
                                >
                                    +100 EXP
                                </button>
                                <button
                                    className="modal-button"
                                    onClick={() => {
                                        const newProgress = {
                                            ...userProgress,
                                            level: userProgress.level + 1,
                                            xpToNextLevel: 100 + (userProgress.level) * 50
                                        };
                                        setUserProgress(newProgress);
                                    }}
                                >
                                    +1 {displayText('レベル')}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* App Info Section */}
                    <div className="modal-section">
                        <div className="modal-section-title">ℹ️ アプリ{displayText('情報')}</div>
                        <div className="modal-item">
                            <div className="modal-row">
                                <div className="modal-label">バージョン</div>
                                <div className="modal-value">v2.0.0</div>
                            </div>
                        </div>
                        <div className="modal-item">
                            <div className="modal-row">
                                <div className="modal-label">{displayText('作成者')}</div>
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
                            <div className="modal-title">📚 {displayText('学習レベル')}{displayText('選択')}</div>
                            <button className="modal-close" onClick={() => setShowLevelSelect(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="modal-section">
                                <div className="modal-section-title">どの{displayText('レベル')}で{displayText('学習')}しますか？</div>
                                <div className="modal-item">
                                    <button
                                        className="modal-button"
                                        onClick={() => handleLevelSelect(Difficulty.BEGINNER)}
                                        style={{ marginBottom: '10px' }}
                                    >
                                        🌱 {displayText('初級')} - {displayText('中学英語')}・{displayText('日常英単語')}
                                    </button>
                                    <button
                                        className="modal-button"
                                        onClick={() => handleLevelSelect(Difficulty.INTERMEDIATE)}
                                        style={{ marginBottom: '10px' }}
                                    >
                                        📚 {displayText('中級')} - TOEIC{displayText('頻出単語')}
                                    </button>
                                    <button
                                        className="modal-button"
                                        onClick={() => handleLevelSelect(Difficulty.ADVANCED)}
                                    >
                                        🎓 {displayText('上級')} - {displayText('難関英単語')}
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