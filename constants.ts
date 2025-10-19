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

export const CHARACTER_DATA: Record<CharacterType, { name: string, mbti: string, title: string, description: string, gradient: string }> = {
    [CharacterType.WIZARD]: {
        name: '魔法使い',
        mbti: 'INFP',
        title: '夢見る魔法使い',
        description: 'あなたの内なる世界の探求者。深い共感力と創造力で、仲間を癒やし、新たな可能性を見出します。',
        gradient: 'from-purple-500 to-indigo-800'
    },
    [CharacterType.KNIGHT]: {
        name: '騎士',
        mbti: 'ENTJ',
        title: '大胆不敵な騎士',
        description: '生まれながらのリーダー。決断力と戦略的思考で、どんな困難も乗り越え、仲間を勝利へと導きます。',
        gradient: 'from-red-600 to-gray-800'
    },
    [CharacterType.FAIRY]: {
        name: '妖精',
        mbti: 'ISFJ',
        title: '心優しき妖精',
        description: '献身的な心を持つ守護者。思いやりと責任感で、仲間を支え、コミュニティに温かさをもたらします。',
        gradient: 'from-emerald-400 to-teal-700'
    },
    [CharacterType.INVENTOR]: {
        name: '発明家',
        mbti: 'ENTP',
        title: '好奇心旺盛な発明家',
        description: '知的な挑戦を愛する革新者。ユニークな視点と議論好きの一面で、世界に新しいアイデアを生み出します。',
        gradient: 'from-yellow-400 to-orange-600'
    },
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