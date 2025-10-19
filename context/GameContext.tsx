
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { UserProgress, GameState, MbtiType, CharacterType, EvolutionStage, Difficulty, QuizResult } from '../types';
import { MBTI_CHARACTER_MAP, XP_PER_LEVEL, EVOLUTION_LEVELS, XP_PER_CORRECT_ANSWER } from '../constants';

interface GameContextType {
    gameState: GameState;
    setGameState: (state: GameState) => void;
    userProgress: UserProgress;
    setUserProgress: (progress: UserProgress) => void;
    isLoading: boolean;
    completeMbtiTest: (mbtiType: MbtiType) => void;
    currentDifficulty: Difficulty | null;
    startQuiz: (difficulty: Difficulty) => void;
    quizResult: QuizResult | null;
    finishQuiz: (score: number, totalQuestions: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const initialProgress: UserProgress = {
    mbtiType: null,
    characterType: null,
    level: 1,
    xp: 0,
    evolutionStage: EvolutionStage.EGG,
};

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [gameState, setGameState] = useState<GameState>(GameState.HOME);
    const [userProgress, setUserProgressState] = useState<UserProgress>(initialProgress);
    const [isLoading, setIsLoading] = useState(true);
    const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty | null>(null);
    const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

    useEffect(() => {
        try {
            const savedProgress = localStorage.getItem('userProgress');
            if (savedProgress) {
                setUserProgressState(JSON.parse(savedProgress));
            }
        } catch (error) {
            console.error("Failed to load user progress:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const setUserProgress = useCallback((progress: UserProgress) => {
        try {
            localStorage.setItem('userProgress', JSON.stringify(progress));
            setUserProgressState(progress);
        } catch (error) {
            console.error("Failed to save user progress:", error);
        }
    }, []);

    const completeMbtiTest = useCallback((mbtiType: MbtiType) => {
        const characterType = MBTI_CHARACTER_MAP[mbtiType] || CharacterType.FAIRY;
        const newProgress: UserProgress = {
            mbtiType,
            characterType,
            level: 1,
            xp: 0,
            evolutionStage: EvolutionStage.EGG,
        };
        setUserProgress(newProgress);
        setGameState(GameState.HOME);
    }, [setUserProgress]);
    
    const startQuiz = useCallback((difficulty: Difficulty) => {
        setCurrentDifficulty(difficulty);
        setGameState(GameState.QUIZ);
    }, []);

    const finishQuiz = useCallback((score: number, totalQuestions: number) => {
        if (!currentDifficulty) return;

        const xpGained = score * XP_PER_CORRECT_ANSWER[currentDifficulty];
        setQuizResult({ score, totalQuestions, xpGained });

        let newXp = userProgress.xp + xpGained;
        let newLevel = userProgress.level;
        let xpForNextLevel = XP_PER_LEVEL(newLevel);

        while (newXp >= xpForNextLevel) {
            newXp -= xpForNextLevel;
            newLevel++;
            xpForNextLevel = XP_PER_LEVEL(newLevel);
        }

        let newEvolutionStage = userProgress.evolutionStage;
        if (newLevel >= EVOLUTION_LEVELS.adult) {
            newEvolutionStage = EvolutionStage.ADULT;
        } else if (newLevel >= EVOLUTION_LEVELS.child) {
            newEvolutionStage = EvolutionStage.CHILD;
        }

        setUserProgress({
            ...userProgress,
            xp: newXp,
            level: newLevel,
            evolutionStage: newEvolutionStage,
        });

        setGameState(GameState.RESULT);
    }, [currentDifficulty, userProgress, setUserProgress]);

    const value = {
        gameState,
        setGameState,
        userProgress,
        setUserProgress,
        isLoading,
        completeMbtiTest,
        currentDifficulty,
        startQuiz,
        quizResult,
        finishQuiz,
    };

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = (): GameContextType => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};
