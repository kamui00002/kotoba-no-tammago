// Fix: Replaced placeholder content with actual constant definitions.
import { MbtiType, CharacterType, Difficulty } from './types';

// MBTIタイプとキャラクタータイプのマッピング
export const MBTI_CHARACTER_MAP: Record<MbtiType, CharacterType> = {
    // 直感(N) + 感情(F)
    'INFP': CharacterType.FAIRY,
    'INFJ': CharacterType.FAIRY,
    'ENFP': CharacterType.FAIRY,
    'ENFJ': CharacterType.FAIRY,
    // 直感(N) + 思考(T)
    'INTP': CharacterType.WIZARD,
    'INTJ': CharacterType.WIZARD,
    'ENTP': CharacterType.WIZARD,
    'ENTJ': CharacterType.WIZARD,
    // 感覚(S) + 判断(J)
    'ISFJ': CharacterType.KNIGHT,
    'ISTJ': CharacterType.KNIGHT,
    'ESFJ': CharacterType.KNIGHT,
    'ESTJ': CharacterType.KNIGHT,
    // 感覚(S) + 知覚(P)
    'ISFP': CharacterType.INVENTOR,
    'ISTP': CharacterType.INVENTOR,
    'ESFP': CharacterType.INVENTOR,
    'ESTP': CharacterType.INVENTOR,
};


// キャラクターごとの詳細データ
export const CHARACTER_DATA = {
    [CharacterType.WIZARD]: {
        name: '賢者見習い',
        mbti: 'INTP', // 代表MBTI
        title: '論理の魔術師',
        description: '知的好奇心が強く、複雑な問題を分析するのが得意なあなたには、魔法の真理を探究する賢者がぴったりです。',
        gradient: 'from-blue-800 to-purple-900',
    },
    [CharacterType.KNIGHT]: {
        name: '騎士見習い',
        mbti: 'ISTJ',
        title: '忠誠の守護者',
        description: '責任感が強く、秩序と伝統を重んじるあなたには、王国を守る誇り高き騎士がぴったりです。',
        gradient: 'from-gray-700 to-blue-800',
    },
    [CharacterType.FAIRY]: {
        name: '妖精見習い',
        mbti: 'INFP',
        title: '夢見る理想家',
        description: '感受性豊かで、人々を癒し、調和を愛するあなたには、森の精霊と心を通わせる妖精がぴったりです。',
        gradient: 'from-green-700 to-teal-800',
    },
    [CharacterType.INVENTOR]: {
        name: '発明家見習い',
        mbti: 'ESTP',
        title: '好奇心の冒険家',
        description: 'エネルギッシュで、新しいことに挑戦するのが大好きなあなたには、奇想天外な機械を作り出す発明家がぴったりです。',
        gradient: 'from-orange-700 to-yellow-800',
    },
};

// 進化に必要なレベル
export const EVOLUTION_LEVELS = {
    child: 5,
    adult: 15,
};

// 難易度ごとの正解時の獲得XP
export const XP_PER_CORRECT_ANSWER: Record<Difficulty, number> = {
    [Difficulty.BEGINNER]: 10,
    [Difficulty.INTERMEDIATE]: 20,
    [Difficulty.ADVANCED]: 30,
};

export const QUIZ_LENGTH = 10;
