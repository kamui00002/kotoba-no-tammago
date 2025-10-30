import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { CHARACTER_DATA } from '../constants';
import { Difficulty } from '../types';
import { useTextDisplay } from '../hooks/useTextDisplay';
import {
    getBgmVolume,
    updateBgmVolume,
    getIsBgmMuted,
    toggleBgmMute,
    getSfxVolume,
    updateSfxVolume,
    getIsSfxMuted,
    toggleSfxMute,
    playSound,
    SoundType,
    setBgmVolume
} from '../utils/soundPlayer';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
    const { userProgress, completeMbtiTest, addExperience, setGameState, resetGame, setLearningLevel, learningLevel, setUserProgress } = useGame();
    const { mbtiType, characterType, level, xp, xpToNextLevel } = userProgress;
    const [showLevelSelect, setShowLevelSelect] = useState(false);

    // 音量状態
    const [bgmVolume, setBgmVolumeState] = useState(getBgmVolume());
    const [isBgmMuted, setIsBgmMuted] = useState(getIsBgmMuted());
    const [sfxVolume, setSfxVolumeState] = useState(getSfxVolume());
    const [isSfxMuted, setIsSfxMuted] = useState(getIsSfxMuted());

    // テキスト表示用のフック
    const displayText = useTextDisplay();

    // モーダルが開いた時に最新の音量を取得
    useEffect(() => {
        if (isOpen) {
            setBgmVolumeState(getBgmVolume());
            setIsBgmMuted(getIsBgmMuted());
            setSfxVolumeState(getSfxVolume());
            setIsSfxMuted(getIsSfxMuted());
        }
    }, [isOpen]);

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

    // BGM音量変更
    const handleBgmVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const volume = parseFloat(e.target.value);
        console.log('🎵 BGM Volume changing to:', volume);
        setBgmVolumeState(volume);
        updateBgmVolume(volume);
    };

    // BGMミュート切り替え
    const handleBgmMuteToggle = () => {
        console.log('🔇 Toggling BGM mute, current state:', isBgmMuted);
        toggleBgmMute();
        const newState = getIsBgmMuted();
        console.log('🔇 New BGM mute state:', newState);
        setIsBgmMuted(newState);
    };

    // 効果音音量変更
    const handleSfxVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const volume = parseFloat(e.target.value);
        console.log('✨ SFX Volume changing to:', volume);
        setSfxVolumeState(volume);
        updateSfxVolume(volume);
    };

    // 効果音ミュート切り替え
    const handleSfxMuteToggle = () => {
        console.log('🔇 Toggling SFX mute, current state:', isSfxMuted);
        toggleSfxMute();
        const newState = getIsSfxMuted();
        console.log('🔇 New SFX mute state:', newState);
        setIsSfxMuted(newState);
        // テスト音を再生
        if (!newState) {
            console.log('🔊 Playing test sound');
            playSound(SoundType.BUTTON);
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

                    {/* Sound Settings Section */}
                    <div className="modal-section">
                        <div className="modal-section-title">🔊 {displayText('音量')}{displayText('設定')}</div>

                        {/* BGM Settings */}
                        <div className="modal-item">
                            <div className="modal-label">🎵 BGM</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
                                <button
                                    className="modal-button"
                                    onClick={handleBgmMuteToggle}
                                    style={{
                                        width: '70px',
                                        padding: '8px',
                                        fontSize: '14px',
                                        background: isBgmMuted ? '#ef4444' : '#10b981',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {isBgmMuted ? '🔇' : '🔊'}
                                </button>
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.05"
                                        value={bgmVolume}
                                        onChange={handleBgmVolumeChange}
                                        disabled={isBgmMuted}
                                        style={{
                                            flex: 1,
                                            height: '8px',
                                            borderRadius: '5px',
                                            outline: 'none',
                                            opacity: isBgmMuted ? 0.5 : 1,
                                            cursor: isBgmMuted ? 'not-allowed' : 'pointer'
                                        }}
                                    />
                                    <span style={{
                                        minWidth: '38px',
                                        fontSize: '14px',
                                        textAlign: 'right',
                                        fontWeight: 'bold',
                                        color: isBgmMuted ? '#999' : '#333'
                                    }}>
                                        {Math.round(bgmVolume * 100)}%
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* SFX Settings */}
                        <div className="modal-item">
                            <div className="modal-label">✨ {displayText('効果音')}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
                                <button
                                    className="modal-button"
                                    onClick={handleSfxMuteToggle}
                                    style={{
                                        width: '70px',
                                        padding: '8px',
                                        fontSize: '14px',
                                        background: isSfxMuted ? '#ef4444' : '#10b981',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {isSfxMuted ? '🔇' : '🔊'}
                                </button>
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.05"
                                        value={sfxVolume}
                                        onChange={handleSfxVolumeChange}
                                        disabled={isSfxMuted}
                                        style={{
                                            flex: 1,
                                            height: '8px',
                                            borderRadius: '5px',
                                            outline: 'none',
                                            opacity: isSfxMuted ? 0.5 : 1,
                                            cursor: isSfxMuted ? 'not-allowed' : 'pointer'
                                        }}
                                    />
                                    <span style={{
                                        minWidth: '38px',
                                        fontSize: '14px',
                                        textAlign: 'right',
                                        fontWeight: 'bold',
                                        color: isSfxMuted ? '#999' : '#333'
                                    }}>
                                        {Math.round(sfxVolume * 100)}%
                                    </span>
                                </div>
                            </div>
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

                    {/* Debug Mode Section - オフ */}
                    {/* <div className="modal-section">
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
                    </div> */}

                    {/* App Info Section */}
                    <div className="modal-section">
                        <div className="modal-section-title">ℹ️ アプリ{displayText('情報')}</div>
                        <div className="modal-item">
                            <div className="modal-row">
                                <div className="modal-label">バージョン</div>
                                <div className="modal-value">v1.0.4</div>
                            </div>
                        </div>
                        <div className="modal-item">
                            <div className="modal-row">
                                <div className="modal-label">{displayText('作成者')}</div>
                                <div className="modal-value">kamui00002</div>
                            </div>
                        </div>
                    </div>

                    {/* Reset Section - オフ */}
                    {/* <div className="modal-section">
                        <div className="modal-section-title">🔄 {displayText('リセット')}</div>
                        <div className="modal-item">
                            <button
                                className="modal-button"
                                onClick={() => {
                                    if (window.confirm('すべてのデータをリセットして、オープニング画面に戻りますか？\n\n⚠️ この操作は元に戻せません。')) {
                                        console.log('🔄 User confirmed reset');
                                        resetGame();
                                        onClose();
                                    }
                                }}
                                style={{
                                    background: '#ef4444',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    padding: '12px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    width: '100%'
                                }}
                            >
                                🗑️ {displayText('すべてのデータをリセット')}
                            </button>
                            <p style={{
                                fontSize: '12px',
                                color: '#666',
                                marginTop: '8px',
                                textAlign: 'center'
                            }}>
                                ⚠️ {displayText('キャラクター、レベル、学習データが削除されます')}
                            </p>
                        </div>
                    </div> */}
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