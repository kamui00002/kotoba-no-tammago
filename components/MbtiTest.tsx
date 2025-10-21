import React from 'react';
import { useMbtiTest } from '../hooks/useMbtiTest';

/**
 * @view MBTI診断画面のUIコンポーネント
 *
 * このコンポーネントは、診断画面の見た目（View）に責任を持ちます。
 * 実際のデータやロジックは `useMbtiTest` カスタムフック（ViewModelの役割）から受け取ります。
 */
const MbtiTest: React.FC = () => {
    // ViewModelに相当するカスタムフックから状態とロジックを取得
    const { isLoading, questions, currentIndex, currentQuestion, handleAnswer } = useMbtiTest();

    // ローディング中の表示
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen bg-slate-800">Loading test...</div>;
    }

    // 質問データが読み込めなかった場合の表示
    if (!currentQuestion || questions.length === 0) {
        return <div className="flex justify-center items-center h-screen bg-slate-800">Could not load questions.</div>;
    }

    return (
        <div className="phone-container">
            <div className="screen" style={{
                background: 'linear-gradient(135deg, #1a0033 0%, #4a148c 50%, #7b1fa2 100%)',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* ヘッダー */}
                <div className="quiz-header">
                    <div className="icon">⚙️</div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#9B7ED9' }}>
                        問題 {currentIndex + 1}/16
                    </div>
                    <div className="icon">📊</div>
                </div>

                {/* キャラクターセクション */}
                <div className="character-section">
                    <div className="character-container">
                        <div className="character-avatar">
                            <img
                                src={currentQuestion.characterIcon}
                                alt={currentQuestion.characterName}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.parentElement!.innerHTML = '🧚‍♀️';
                                }}
                            />
                        </div>
                        <div className="speech-bubble">
                            {currentQuestion.bubble}
                        </div>
                    </div>
                </div>

                {/* 質問エリア */}
                <div className="question-area">
                    <div className="question-text">{currentQuestion.question}</div>
                    <div className="choices">
                        {currentQuestion.choices.map((choice) => (
                            <button
                                key={choice.id}
                                className="choice-button"
                                onClick={() => handleAnswer(choice.axis)}
                            >
                                <span style={{ fontWeight: 'bold', color: '#9B7ED9' }}>{choice.id}.</span> {choice.text}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MbtiTest;
