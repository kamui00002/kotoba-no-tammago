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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900 p-4 font-sans">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 flex flex-col">
                
                {/* 1. ヘッダー: 現在の問題番号を表示 */}
                <header className="flex justify-between items-center mb-4">
                    <p className="font-bold text-purple-200">問題 {currentIndex + 1}/{questions.length}</p>
                    <button className="text-purple-200 text-2xl font-mono" aria-label="Close">
                        &times;
                    </button>
                </header>

                {/* 5. 進捗ドット: テストの進捗を視覚的に表示 */}
                <div className="flex justify-center items-center space-x-2 mb-6">
                    {Array.from({ length: questions.length }).map((_, index) => {
                        const isCompleted = index < currentIndex;
                        const isCurrent = index === currentIndex;
                        let dotClass = 'w-2 h-2 rounded-full transition-all duration-300';
                        if (isCurrent) {
                            dotClass += ' bg-purple-300 scale-150'; // 現在の問題
                        } else if (isCompleted) {
                            dotClass += ' bg-purple-300'; // 回答済み
                        } else {
                            dotClass += ' border border-gray-400'; // 未回答
                        }
                        return <div key={index} className={dotClass} />;
                    })}
                </div>

                {/* 2. キャラクターエリア */}
                <div className="flex items-center space-x-4 mb-6">
                    {/* アバター */}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 p-1 shadow-lg flex-shrink-0">
                        <img 
                            src={currentQuestion.characterIcon} 
                            alt={currentQuestion.characterName} 
                            className="w-full h-full object-cover rounded-full" 
                        />
                    </div>
                    {/* 吹き出し */}
                    <div className="bg-white/90 text-slate-800 p-3 rounded-lg relative shadow-md">
                        <p className="text-sm italic">{currentQuestion.bubble}</p>
                        {/* 吹き出しのしっぽ */}
                        <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white/90"></div>
                    </div>
                </div>

                {/* 3. 質問エリア */}
                <div className="text-center mb-6 p-4 bg-black/20 rounded-lg min-h-[80px] flex items-center justify-center">
                    <h2 className="text-lg font-bold text-white leading-relaxed">{currentQuestion.question}</h2>
                </div>

                {/* 4. 選択肢エリア: ユーザーが回答を選択するボタン */}
                <div className="flex flex-col space-y-4">
                    {currentQuestion.choices.map((choice) => (
                         <button 
                            key={choice.id}
                            // ViewModelから受け取った関数を呼び出す
                            onClick={() => handleAnswer(choice.axis)}
                            className="w-full bg-white hover:bg-gray-200 text-slate-800 font-bold py-4 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
                        >
                            <span className="text-purple-600 font-bold mr-2">{choice.id}.</span>{choice.text}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MbtiTest;
