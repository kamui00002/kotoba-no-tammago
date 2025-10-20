import React from 'react';
import { useGame } from '../context/GameContext';

interface StatsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const StatsModal: React.FC<StatsModalProps> = ({ isOpen, onClose }) => {
    const { userProgress } = useGame();

    if (!isOpen) return null;

    // 統計データ（実際のデータは後で実装）
    const stats = {
        totalQuizzes: 0,
        totalCorrect: 0,
        totalQuestions: 0,
        learnedWords: 5,
        studyTime: 0,
        consecutiveDays: 1,
    };

    const accuracy = stats.totalQuestions > 0 ? Math.round((stats.totalCorrect / stats.totalQuestions) * 100) : 0;

    return (
        <div className="modal stats-modal" id="statsModal" style={{ display: isOpen ? 'flex' : 'none' }}>
            <div className="modal-content">
                <div className="modal-header">
                    <div className="modal-title">📊 学習統計</div>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    {/* Overall Stats */}
                    <div className="stats-card">
                        <div className="stats-card-title">🎯 総合成績</div>
                        <div className="stat-row">
                            <span className="stat-label">総クイズ数</span>
                            <span className="stat-value">{stats.totalQuizzes}回</span>
                        </div>
                        <div className="stat-row">
                            <span className="stat-label">総正解数</span>
                            <span className="stat-value">{stats.totalCorrect}問</span>
                        </div>
                        <div className="stat-row">
                            <span className="stat-label">平均正答率</span>
                            <span className="stat-value">{accuracy}%</span>
                        </div>
                        <div className="stat-row">
                            <span className="stat-label">学習した単語</span>
                            <span className="stat-value">{stats.learnedWords}個</span>
                        </div>
                    </div>

                    {/* Level Progress */}
                    <div className="stats-card">
                        <div className="stats-card-title">📚 レベル別進捗</div>
                        <div className="progress-bar-container">
                            <div className="progress-label">
                                <span>🌱 初級</span>
                                <span>0/30</span>
                            </div>
                            <div className="progress-bar-stats">
                                <div className="progress-fill-stats progress-beginner" style={{ width: '0%' }}></div>
                            </div>
                        </div>
                        <div className="progress-bar-container">
                            <div className="progress-label">
                                <span>📚 中級</span>
                                <span>0/30</span>
                            </div>
                            <div className="progress-bar-stats">
                                <div className="progress-fill-stats progress-intermediate" style={{ width: '0%' }}></div>
                            </div>
                        </div>
                        <div className="progress-bar-container">
                            <div className="progress-label">
                                <span>🎓 上級</span>
                                <span>0/30</span>
                            </div>
                            <div className="progress-bar-stats">
                                <div className="progress-fill-stats progress-advanced" style={{ width: '0%' }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Study Streak Calendar */}
                    <div className="stats-card">
                        <div className="stats-card-title">🔥 連続学習カレンダー</div>
                        <div className="big-stat">
                            <div className="big-stat-number">{stats.consecutiveDays}</div>
                            <div className="big-stat-label">日連続学習中！</div>
                        </div>
                    </div>

                    {/* Study Time */}
                    <div className="stats-card">
                        <div className="stats-card-title">⏰ 累計学習時間</div>
                        <div className="big-stat">
                            <div className="big-stat-number">{stats.studyTime}</div>
                            <div className="big-stat-label">分</div>
                        </div>
                    </div>

                    {/* Word Analysis */}
                    <div className="stats-card">
                        <div className="stats-card-title">📖 単語分析</div>
                        <div style={{ marginBottom: '15px' }}>
                            <div style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '8px' }}>得意な単語 TOP 3</div>
                            <div style={{ textAlign: 'center', color: '#94a3b8', padding: '20px' }}>まだデータがありません</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '8px' }}>苦手な単語 TOP 3</div>
                            <div style={{ textAlign: 'center', color: '#94a3b8', padding: '20px' }}>まだデータがありません</div>
                        </div>
                    </div>

                    {/* App Info */}
                    <div className="stats-card">
                        <div className="stats-card-title">ℹ️ アプリ情報</div>
                        <div className="stat-row">
                            <span className="stat-label">バージョン</span>
                            <span className="stat-value">v2.0.0</span>
                        </div>
                        <div className="stat-row">
                            <span className="stat-label">作成者</span>
                            <span className="stat-value">kamui00002</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsModal;