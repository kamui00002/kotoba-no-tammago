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
        return <div className="flex justify-center items-center h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 text-purple-800">Loading test...</div>;
    }

    // 質問データが読み込めなかった場合の表示
    if (!currentQuestion || questions.length === 0) {
        return <div className="flex justify-center items-center h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 text-purple-800">Could not load questions.</div>;
    }

    return (
        <div className="phone-container">
            <div className="screen" style={{
                background: 'linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 25%, #e0e7ff 50%, #dbeafe 75%, #e0f2fe 100%)',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* 魔法のパーティクル効果 */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    pointerEvents: 'none',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '10%',
                        left: '10%',
                        width: '20px',
                        height: '20px',
                        background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
                        borderRadius: '50%',
                        animation: 'float 3s ease-in-out infinite'
                    }}></div>
                    <div style={{
                        position: 'absolute',
                        top: '20%',
                        right: '15%',
                        width: '15px',
                        height: '15px',
                        background: 'linear-gradient(45deg, #a855f7, #9333ea)',
                        borderRadius: '50%',
                        animation: 'float 2.5s ease-in-out infinite reverse'
                    }}></div>
                    <div style={{
                        position: 'absolute',
                        bottom: '20%',
                        left: '20%',
                        width: '25px',
                        height: '25px',
                        background: 'linear-gradient(45deg, #06b6d4, #0891b2)',
                        borderRadius: '50%',
                        animation: 'float 4s ease-in-out infinite'
                    }}></div>
                    <div style={{
                        position: 'absolute',
                        bottom: '10%',
                        right: '10%',
                        width: '18px',
                        height: '18px',
                        background: 'linear-gradient(45deg, #ec4899, #db2777)',
                        borderRadius: '50%',
                        animation: 'float 3.5s ease-in-out infinite reverse'
                    }}></div>
                </div>
                {/* ヘッダー */}
                <div className="quiz-header" style={{
                    position: 'relative',
                    zIndex: 10,
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    margin: '20px',
                    padding: '15px',
                    border: '2px solid rgba(168, 85, 247, 0.3)',
                    boxShadow: '0 8px 32px rgba(168, 85, 247, 0.2)'
                }}>
                    <div className="icon" style={{ fontSize: '24px' }}>✨</div>
                    <div style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#7c3aed',
                        textShadow: '0 2px 4px rgba(124, 58, 237, 0.3)'
                    }}>
                        ✨ 問題 {currentIndex + 1}/16 ✨
                    </div>
                    <div className="icon" style={{ fontSize: '24px' }}>✨</div>
                </div>

                {/* プログレスバー */}
                <div style={{
                    position: 'relative',
                    zIndex: 10,
                    margin: '0 20px 20px 20px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    padding: '15px',
                    border: '2px solid rgba(168, 85, 247, 0.3)',
                    boxShadow: '0 8px 32px rgba(168, 85, 247, 0.2)'
                }}>
                    <div style={{
                        width: '100%',
                        height: '12px',
                        background: 'linear-gradient(90deg, #fdf2f8, #f3e8ff)',
                        borderRadius: '10px',
                        border: '2px solid rgba(168, 85, 247, 0.4)',
                        overflow: 'hidden',
                        boxShadow: 'inset 0 2px 4px rgba(168, 85, 247, 0.2)'
                    }}>
                        <div style={{
                            height: '100%',
                            background: 'linear-gradient(90deg, #ec4899, #a855f7, #06b6d4)',
                            borderRadius: '8px',
                            transition: 'width 0.5s ease-in-out',
                            width: `${((currentIndex + 1) / questions.length) * 100}%`,
                            boxShadow: '0 2px 8px rgba(168, 85, 247, 0.4)'
                        }}></div>
                    </div>
                </div>

                {/* キャラクターセクション */}
                <div className="character-section" style={{ position: 'relative', zIndex: 10 }}>
                    <div className="character-container">
                        <div className="character-avatar" style={{
                            background: 'linear-gradient(135deg, #fdf2f8, #f3e8ff)',
                            border: '3px solid rgba(168, 85, 247, 0.4)',
                            boxShadow: '0 8px 32px rgba(168, 85, 247, 0.3)'
                        }}>
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
                        <div className="speech-bubble" style={{
                            background: 'linear-gradient(135deg, #fdf2f8, #f3e8ff)',
                            border: '2px solid rgba(168, 85, 247, 0.4)',
                            boxShadow: '0 8px 32px rgba(168, 85, 247, 0.2)',
                            color: '#7c3aed'
                        }}>
                            ✨ {currentQuestion.bubble} ✨
                        </div>
                    </div>
                </div>

                {/* 質問エリア */}
                <div className="question-area" style={{ position: 'relative', zIndex: 10 }}>
                    <div className="question-text" style={{
                        background: 'linear-gradient(135deg, #fdf2f8, #f3e8ff)',
                        border: '2px solid rgba(168, 85, 247, 0.4)',
                        borderRadius: '20px',
                        padding: '20px',
                        margin: '20px',
                        boxShadow: '0 8px 32px rgba(168, 85, 247, 0.2)',
                        color: '#7c3aed',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}>
                        ✨ {currentQuestion.question} ✨
                    </div>
                    <div className="choices">
                        {currentQuestion.choices.map((choice) => (
                            <button
                                key={choice.id}
                                className="choice-button"
                                onClick={() => handleAnswer(choice.axis)}
                                style={{
                                    background: 'linear-gradient(135deg, #fdf2f8, #f3e8ff)',
                                    border: '2px solid rgba(168, 85, 247, 0.4)',
                                    borderRadius: '15px',
                                    padding: '15px',
                                    margin: '10px 20px',
                                    boxShadow: '0 4px 16px rgba(168, 85, 247, 0.2)',
                                    color: '#7c3aed',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(168, 85, 247, 0.4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(168, 85, 247, 0.2)';
                                }}
                            >
                                <span style={{ fontWeight: 'bold', color: '#a855f7' }}>✨ {choice.id}. ✨</span> {choice.text}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MbtiTest;
