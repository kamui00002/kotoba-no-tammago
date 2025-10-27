

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { UserProgress, GameState, MbtiType, CharacterType, EvolutionStage, Difficulty, QuizResult } from '../types';
import { MBTI_CHARACTER_MAP, EVOLUTION_LEVELS, XP_PER_CORRECT_ANSWER } from '../constants';
import * as storageManager from '../utils/storageManager';

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
    addExperience: (amount: number) => void;
    resetGame: () => void;
    setLearningLevel: (level: Difficulty) => void;
    learningLevel: Difficulty;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const initialProgress: UserProgress = {
    mbtiType: null,
    characterType: null,
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    evolutionStage: EvolutionStage.EGG,
    justLeveledUp: false,
    justEvolved: false,
};

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [gameState, setGameState] = useState<GameState>(GameState.HOME);
    const [userProgress, setUserProgressState] = useState<UserProgress>(initialProgress);
    const [isLoading, setIsLoading] = useState(true);
    const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty | null>(null);
    const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
    const [learningLevel, setLearningLevelState] = useState<Difficulty>(Difficulty.BEGINNER);

    useEffect(() => {
        const savedProgress = storageManager.loadUserProgress();
        if (savedProgress) {
            if (!savedProgress.xpToNextLevel) {
                savedProgress.xpToNextLevel = 100 + (savedProgress.level - 1) * 50;
            }
            // 起動時はアニメーションフラグをオフにする
            savedProgress.justLeveledUp = false;
            savedProgress.justEvolved = false;
            setUserProgressState(savedProgress);
        }

        // 学習レベルを読み込み
        const savedLearningLevel = storageManager.loadLearningLevel();
        if (savedLearningLevel) {
            setLearningLevelState(savedLearningLevel);
        }

        setIsLoading(false);
    }, []);

    const setUserProgress = useCallback((progress: UserProgress) => {
        // アニメーションフラグは保存しない（一時的な状態のため）
        const progressToSave = {
            ...progress,
            justLeveledUp: false,
            justEvolved: false
        };
        storageManager.saveUserProgress(progressToSave);
        setUserProgressState(progress);
    }, []);

    // @animation レベルアップと進化のアニメーション用のフラグをリセットするロジック
    useEffect(() => {
        if (userProgress.justLeveledUp) {
            console.log('⏰ Setting timer to reset justLeveledUp flag in 3s');
            const timer = setTimeout(() => {
                console.log('⏰ Resetting justLeveledUp flag');
                setUserProgressState((prev) => ({ ...prev, justLeveledUp: false }));
            }, 3000); // レベルアップアニメーションの時間
            return () => clearTimeout(timer);
        }
    }, [userProgress.justLeveledUp]);

    useEffect(() => {
        if (userProgress.justEvolved) {
            console.log('⏰ Setting timer to reset justEvolved flag in 5s');
            const timer = setTimeout(() => {
                console.log('⏰ Resetting justEvolved flag');
                setUserProgressState((prev) => ({ ...prev, justEvolved: false }));
            }, 5000); // 進化アニメーションの時間
            return () => clearTimeout(timer);
        }
    }, [userProgress.justEvolved]);

    const addExperience = useCallback((amount: number) => {
        let newXp = userProgress.xp + amount;
        let newLevel = userProgress.level;
        let newXpToNextLevel = userProgress.xpToNextLevel;
        let didLevelUp = false;

        while (newXp >= newXpToNextLevel) {
            newXp -= newXpToNextLevel;
            newLevel++;
            newXpToNextLevel = Math.floor(newXpToNextLevel * 1.5);
            didLevelUp = true; // レベルアップしたことを記録
        }

        let newEvolutionStage = userProgress.evolutionStage;
        const oldEvolutionStage = userProgress.evolutionStage;
        let didEvolve = false;

        if (newLevel >= EVOLUTION_LEVELS.adult) {
            newEvolutionStage = EvolutionStage.ADULT;
        } else if (newLevel >= EVOLUTION_LEVELS.child) {
            newEvolutionStage = EvolutionStage.CHILD;
        }

        // 進化が起きたかどうかをチェック
        if (newEvolutionStage !== oldEvolutionStage) {
            console.log(`🌟 EVOLUTION TRIGGERED: ${oldEvolutionStage} → ${newEvolutionStage} at level ${newLevel}`);
            didEvolve = true;
        }

        setUserProgress({
            ...userProgress,
            xp: newXp,
            level: newLevel,
            xpToNextLevel: newXpToNextLevel,
            evolutionStage: newEvolutionStage,
            justLeveledUp: didLevelUp, // レベルアップした場合はフラグを立てる
            justEvolved: didEvolve, // 進化した場合はフラグを立てる
        });

    }, [userProgress, setUserProgress]);

    const completeMbtiTest = useCallback((mbtiType: MbtiType) => {
        const characterType = MBTI_CHARACTER_MAP[mbtiType] || CharacterType.FAIRY;
        const newProgress: UserProgress = {
            mbtiType,
            characterType,
            level: 1,
            xp: 0,
            xpToNextLevel: 100,
            evolutionStage: EvolutionStage.EGG,
        };
        setUserProgress(newProgress);
        setGameState(GameState.MBTI_RESULT);
    }, [setUserProgress]);

    const startQuiz = useCallback((difficulty: Difficulty) => {
        setCurrentDifficulty(difficulty);
        setGameState(GameState.QUIZ);
    }, []);

    const finishQuiz = useCallback((score: number, totalQuestions: number) => {
        if (!currentDifficulty) return;

        const xpGained = score * XP_PER_CORRECT_ANSWER[currentDifficulty];
        setQuizResult({ score, totalQuestions, xpGained });

        addExperience(xpGained);

        setGameState(GameState.RESULT);
    }, [currentDifficulty, addExperience]);

    const setLearningLevel = useCallback((level: Difficulty) => {
        setLearningLevelState(level);
        storageManager.saveLearningLevel(level);
    }, []);

    const resetGame = useCallback(() => {
        storageManager.resetUserProgress();
        setUserProgressState(initialProgress);
        setGameState(GameState.HOME);
        setLearningLevelState(Difficulty.BEGINNER);
        storageManager.clearLearningLevel();
    }, []);

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
        addExperience,
        resetGame,
        setLearningLevel,
        learningLevel,
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