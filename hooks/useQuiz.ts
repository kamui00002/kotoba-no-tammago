// Fix: Replaced placeholder content with a functional useQuiz hook.
import { useState, useEffect, useCallback } from 'react';
import { useGame } from '../context/GameContext';
import { QuizQuestion, Word } from '../types';
import { generateQuizQuestions } from '../utils/wordUtils';
import { QUIZ_LENGTH } from '../constants';

export const useQuiz = () => {
    const { currentDifficulty, finishQuiz } = useGame();
    
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isFinished, setIsFinished] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    useEffect(() => {
        if (!currentDifficulty) return;

        setIsLoading(true);
        fetch('/assets/data/words.json')
            .then(res => res.json())
            .then((allWords: Word[]) => {
                const quizQuestions = generateQuizQuestions(allWords, currentDifficulty, QUIZ_LENGTH);
                setQuestions(quizQuestions);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to load words:", err);
                setIsLoading(false);
            });
    }, [currentDifficulty]);

    const handleAnswer = useCallback((answer: string) => {
        if (selectedAnswer) return; // Prevent multiple answers

        const currentQuestion = questions[currentIndex];
        const correct = answer === currentQuestion.meaning;

        setSelectedAnswer(answer);
        setIsCorrect(correct);

        if (correct) {
            setScore(prev => prev + 1);
        }

        setTimeout(() => {
            setSelectedAnswer(null);
            setIsCorrect(null);
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                setIsFinished(true);
            }
        }, 1000); // Wait 1 second before next question
    }, [currentIndex, questions, selectedAnswer]);
    
    useEffect(() => {
        if (isFinished) {
            finishQuiz(score, questions.length);
        }
    }, [isFinished, finishQuiz, score, questions.length]);

    const currentQuestion = questions.length > 0 ? questions[currentIndex] : null;

    return {
        isLoading,
        questions,
        currentIndex,
        currentQuestion,
        score,
        handleAnswer,
        selectedAnswer,
        isCorrect,
    };
};
