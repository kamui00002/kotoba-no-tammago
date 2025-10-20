import React from 'react';

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal" id="infoModal" style={{ display: isOpen ? 'flex' : 'none' }}>
            <div className="modal-content">
                <div className="modal-header">
                    <div className="modal-title">ⓘ アプリについて</div>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    <div className="modal-section">
                        <div className="modal-section-title">⏰ 累計学習時間</div>
                        <div className="big-stat">
                            <div className="big-stat-number">0</div>
                            <div className="big-stat-label">分</div>
                        </div>
                    </div>

                    <div className="modal-section">
                        <div className="modal-section-title">📖 単語分析</div>
                        <div style={{ marginBottom: '15px' }}>
                            <div style={{ fontSize: '14px', color: '#B8A4E8', marginBottom: '8px' }}>得意な単語 TOP 3</div>
                            <div style={{ textAlign: 'center', color: '#94a3b8', padding: '20px' }}>まだデータがありません</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', color: '#B8A4E8', marginBottom: '8px' }}>苦手な単語 TOP 3</div>
                            <div style={{ textAlign: 'center', color: '#94a3b8', padding: '20px' }}>まだデータがありません</div>
                        </div>
                    </div>

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
        </div>
    );
};

export default InfoModal;