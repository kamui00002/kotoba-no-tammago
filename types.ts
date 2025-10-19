export enum GameState {
    HOME = 'HOME',
    QUIZ = 'QUIZ',
    RESULT = 'RESULT',
    MBTI_RESULT = 'MBTI_RESULT',
}

export interface MbtiChoice {
    id: 'A' | 'B';
    text: string;
    axis: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
}

export interface MbtiQuestion {
    id: number;
    character: string;
    characterName: string;
    characterIcon: string;
    bubble: string;
    question: string;
    choices: MbtiChoice[];
}

export type MbtiType =
    | 'INFP' | 'INFJ' | 'INTP' | 'INTJ'
    | 'ISFP' | 'ISFJ' | 'ISTP' | 'ISTJ'
    | 'ENFP' | 'ENFJ' | 'ENTP' | 'ENTJ'
    | 'ESFP' | 'ESFJ' | 'ESTP' | 'ESTJ';

export enum CharacterType {
    WIZARD = 'wizard',
    KNIGHT = 'knight',
    FAIRY = 'fairy',
    INVENTOR = 'inventor',
}

export enum Difficulty {
    BEGINNER = 'beginner',
    INTERMEDIATE = 'intermediate',
    ADVANCED = 'advanced',
}

export interface Word {
    id: number;
    word: string;
    meaning: string;
    difficulty: Difficulty;
    wrongChoices: string[];
}

export interface QuizQuestion extends Word {
    options: string[];
}

export enum EvolutionStage {
    EGG = 'egg',
    CHILD = 'child',
    ADULT = 'adult',
}

export interface UserProgress {
    mbtiType: MbtiType | null;
    characterType: CharacterType | null;
    level: number;
    xp: number;
    xpToNextLevel: number; // 次のレベルに必要なXP
    evolutionStage: EvolutionStage;
    justLeveledUp?: boolean; // レベルアップアニメーション用のフラグ
}

export interface QuizResult {
    score: number;
    totalQuestions: number;
    xpGained: number;
}