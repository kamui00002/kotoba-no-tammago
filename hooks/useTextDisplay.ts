// hooks/useTextDisplay.ts

import { useMemo } from 'react';
import { useGame } from '../context/GameContext';
import { convertToHiragana, LearningLevel } from '../utils/textConverter';
import { Difficulty } from '../types';

/**
 * Difficultyを LearningLevel に変換するヘルパー関数
 */
function difficultyToLearningLevel(difficulty: Difficulty | null): LearningLevel {
    if (!difficulty) {
        return 'beginner'; // デフォルトは初級表示
    }
    switch (difficulty) {
        case Difficulty.BEGINNER:
            return 'beginner';
        case Difficulty.INTERMEDIATE:
            return 'intermediate';
        case Difficulty.ADVANCED:
            return 'advanced';
        default:
            return 'beginner';
    }
}

/**
 * レベルに応じてテキスト表示を切り替えるカスタムフック
 * 
 * 使用例：
 * ```tsx
 * const displayText = useTextDisplay();
 * return <button>{displayText("英語クイズ開始")}</button>;
 * ```
 * 
 * @returns テキスト変換関数
 */
export function useTextDisplay() {
    const { learningLevel } = useGame();

    // Difficultyを LearningLevel に変換
    const currentLevel = useMemo(() => {
        return difficultyToLearningLevel(learningLevel);
    }, [learningLevel]);

    /**
     * テキストを現在の学習レベルに応じて変換する関数
     * @param originalText - 元のテキスト（漢字含む）
     * @returns 現在のレベルに応じて変換されたテキスト
     */
    const displayText = useMemo(() => {
        return (originalText: string): string => {
            return convertToHiragana(originalText, currentLevel);
        };
    }, [currentLevel]);

    return displayText;
}




