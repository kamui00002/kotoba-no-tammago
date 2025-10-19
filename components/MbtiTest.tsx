import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { MbtiQuestion, MbtiType } from '../types';

const MbtiTest: React.FC = () => {
    const { completeMbtiTest } = useGame();
    const [questions, setQuestions] = useState<MbtiQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/assets/data/mbti_questions.json')
            .then(res => res.json())
            .then(data => {
                setQuestions(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to load MBTI questions:", err);
                setIsLoading(false);
            });
    }, []);

    const handleAnswer = (choiceAxis: string) => {
        const newAnswers = [...answers, choiceAxis];
        setAnswers(newAnswers);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            calculateResult(newAnswers);
        }
    };

    const calculateResult = (finalAnswers: string[]) => {
        const counts: Record<string, number> = { I: 0, E: 0, N: 0, S: 0, F: 0, T: 0, P: 0, J: 0 };

        finalAnswers.forEach(answer => {
            if (answer in counts) {
                counts[answer]++;
            }
        });

        const ie = counts.I >= counts.E ? 'I' : 'E';
        const ns = counts.N >= counts.S ? 'N' : 'S';
        const ft = counts.F >= counts.T ? 'F' : 'T';
        const pj = counts.P >= counts.J ? 'P' : 'J';
        
        const resultType = `${ie}${ns}${ft}${pj}` as MbtiType;
        completeMbtiTest(resultType);
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen bg-slate-800">Loading test...</div>;
    }
    
    if (questions.length === 0) {
        return <div className="flex justify-center items-center h-screen bg-slate-800">Could not load questions.</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900 p-4">
            <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-center">
                <h1 className="text-3xl font-bold mb-2 text-purple-200">性格診断</h1>
                <p className="text-purple-300 mb-6">あなたにぴったりのパートナーを見つけよう</p>
                
                <div className="w-full bg-black/20 rounded-full h-2.5 mb-6">
                    <div className="bg-purple-400 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                
                <div className="flex items-center justify-center mb-6 space-x-4">
                    <img src={currentQuestion.characterIcon} alt={currentQuestion.characterName} className="w-20 h-20 md:w-24 md:h-24 object-cover drop-shadow-lg" />
                    <div className="bg-black/20 p-4 rounded-lg relative text-left">
                        <p className="text-sm md:text-base italic text-purple-200">{currentQuestion.bubble}</p>
                        <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[10px] border-r-black/20"></div>
                    </div>
                </div>

                <div className="bg-black/20 p-6 rounded-lg mb-6 min-h-[100px] flex items-center justify-center">
                    <h2 className="text-xl md:text-2xl font-semibold">{currentQuestion.question}</h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {currentQuestion.choices.map((choice) => (
                         <button 
                            key={choice.id}
                            onClick={() => handleAnswer(choice.axis)}
                            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 px-6 rounded-lg transition-transform transform hover:scale-105"
                        >
                            {choice.text}
                        </button>
                    ))}
                </div>
                 <p className="text-sm text-purple-300 mt-6">{currentQuestionIndex + 1} / {questions.length}</p>
            </div>
        </div>
    );
};

export default MbtiTest;