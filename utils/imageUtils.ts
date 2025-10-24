// utils/imageUtils.ts
import { CharacterType } from '../types';
import { CHARACTER_DATA } from '../constants';

/**
 * 画像ファイルが存在しない場合に表示する代替画像のパス
 */
const FALLBACK_EGG_IMAGE = '/images/eggs/fallback_egg.png.png';

/**
 * キャラクターの画像パスを生成します。
 * @param characterType - キャラクターの種類 (e.g., 'wizard', 'knight')
 * @param pose - キャラクターのポーズ (e.g., 'idle', 'happy', 'evolve')
 * @returns 画像ファイルへの完全なパス文字列
 */
export const getCharacterImage = (characterType: CharacterType, pose: 'idle' | 'happy' | 'evolve'): string => {
    const characterInfo = CHARACTER_DATA[characterType];
    if (!characterInfo) return FALLBACK_EGG_IMAGE;

    const mbtiLower = characterInfo.mbti.toLowerCase();
    return `/images/characters/${mbtiLower}_${characterType}_${pose}.PNG`;
};

/**
 * 背景画像のパスを生成します。
 * @param characterType - キャラクターの種類
 * @returns 背景画像ファイルへの完全なパス文字列
 */
export const getBackgroundImage = (characterType: CharacterType): string => {
    const characterInfo = CHARACTER_DATA[characterType];
    if (!characterInfo) return ''; // 背景は失敗した場合空にする

    const mbtiLower = characterInfo.mbti.toLowerCase();
    return `/images/backgrounds/bg_${mbtiLower}_${characterType}.PNG`;
};

/**
 * タマゴの画像パスを生成します。
 * @param characterType - キャラクターの種類
 * @returns タマゴの画像ファイルへの完全なパス文字列
 */
export const getEggImage = (characterType: CharacterType): string => {
    const characterInfo = CHARACTER_DATA[characterType];
    if (!characterInfo) return FALLBACK_EGG_IMAGE;

    const mbtiLower = characterInfo.mbti.toLowerCase();
    return `/images/eggs/${mbtiLower}_${characterType}_egg.PNG`;
};