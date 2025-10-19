import React, { useState, useEffect, useCallback } from 'react';
import { useGame } from '../context/GameContext';
import { Word, QuizQuestion } from '../types';
import { QUIZ_LENGTH } from '../constants';
import { generateQuizQuestions } from '../utils/wordUtils';

const Quiz: React.FC = () => {
    const { currentDifficulty, finishQuiz } = useGame();
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!currentDifficulty) return;
        setIsLoading(true);
        fetch('/assets/data/words.json')
            .then(res => res.json())
            .then((allWords: Word[]) => {
                const newQuestions = generateQuizQuestions(allWords, currentDifficulty, QUIZ_LENGTH);
                setQuestions(newQuestions);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to load words:", err);
                setIsLoading(false);
            });
    }, [currentDifficulty]);

    const handleAnswer = (answer: string) => {
        if (selectedAnswer) return; // Prevent multiple answers

        setSelectedAnswer(answer);
        const correct = answer === questions[currentQuestionIndex].meaning;
        setIsCorrect(correct);
        if (correct) {
            setScore(prev => prev + 1);
        }

        setTimeout(() => {
            const nextQuestionIndex = currentQuestionIndex + 1;
            if (nextQuestionIndex < questions.length) {
                setCurrentQuestionIndex(nextQuestionIndex);
                setSelectedAnswer(null);
                setIsCorrect(null);
            } else {
                finishQuiz(score + (correct ? 1 : 0), questions.length);
            }
        }, 1500);
    };

    if (isLoading || questions.length === 0) {
        return <div className="flex justify-center items-center h-screen bg-slate-800 text-xl">Generating Quiz...</div>;
    }
    
    const currentQuestion = questions[currentQuestionIndex];
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-gray-800 p-4">
            <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-cyan-300">英単語クイズ</h2>
                    <div className="text-lg font-semibold">{score} / {questions.length}</div>
                </div>
                <div className="w-full bg-black/20 rounded-full h-2.5 mb-6">
                    <div className="bg-cyan-400 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                </div>

                <div className="bg-black/20 p-8 rounded-lg mb-6 text-center">
                    <h3 className="text-4xl font-bold tracking-widest">{currentQuestion.word}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.options.map(option => {
                        const isSelected = selectedAnswer === option;
                        let buttonClass = 'bg-gray-700 hover:bg-gray-600';
                        if (isSelected) {
                            buttonClass = isCorrect ? 'bg-green-600' : 'bg-red-600';
                        } else if (selectedAnswer && option === currentQuestion.meaning) {
                             buttonClass = 'bg-green-600';
                        }

                        return (
                            <button
                                key={option}
                                onClick={() => handleAnswer(option)}
                                disabled={!!selectedAnswer}
                                className={`w-full text-white font-medium py-4 px-6 rounded-lg transition-all duration-300 ${buttonClass} ${selectedAnswer ? '' : 'transform hover:scale-105'}`}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Quiz;