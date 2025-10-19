import { CharacterType, MbtiType, EvolutionStage } from './types';

export const MBTI_CHARACTER_MAP: Record<MbtiType, CharacterType> = {
    // Wizard Group
    'INFP': CharacterType.WIZARD, 'ENFP': CharacterType.WIZARD, 'INFJ': CharacterType.WIZARD, 'ISFP': CharacterType.WIZARD,
    // Knight Group
    'ENTJ': CharacterType.KNIGHT, 'ESTJ': CharacterType.KNIGHT, 'INTJ': CharacterType.KNIGHT, 'ENFJ': CharacterType.KNIGHT,
    // Fairy Group
    'ISFJ': CharacterType.FAIRY, 'ESFJ': CharacterType.FAIRY, 'ISTJ': CharacterType.FAIRY,
    // Inventor Group
    'ENTP': CharacterType.INVENTOR, 'ESTP': CharacterType.INVENTOR, 'INTP': CharacterType.INVENTOR, 'ESFP': CharacterType.INVENTOR, 'ISTP': CharacterType.INVENTOR,
};

// Simplified mapping for the 4 characters in the prompt
export const SIMPLIFIED_MBTI_MAP: Record<string, CharacterType> = {
    'INFP': CharacterType.WIZARD,
    'ENTJ': CharacterType.KNIGHT,
    'ISFJ': CharacterType.FAIRY,
    'ENTP': CharacterType.INVENTOR,
};

export const CHARACTER_DATA: Record<CharacterType, { name: string, mbti: string }> = {
    [CharacterType.WIZARD]: { name: '魔法使い', mbti: 'INFP' },
    [CharacterType.KNIGHT]: { name: '騎士', mbti: 'ENTJ' },
    [CharacterType.FAIRY]: { name: '妖精', mbti: 'ISFJ' },
    [CharacterType.INVENTOR]: { name: '発明家', mbti: 'ENTP' },
};

export const EVOLUTION_LEVELS: Record<EvolutionStage, number> = {
    [EvolutionStage.EGG]: 1,
    [EvolutionStage.CHILD]: 5,
    [EvolutionStage.ADULT]: 15,
};

export const XP_PER_LEVEL = (level: number): number => {
    return 100 + (level - 1) * 50;
};

export const XP_PER_CORRECT_ANSWER = {
    beginner: 10,
    intermediate: 15,
    advanced: 20,
};

export const QUIZ_LENGTH = 10;