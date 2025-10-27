// utils/textConverter.ts

import { TEXT_CONVERSION_MAP } from './textConversionMap';

/**
 * 学習レベルの型定義
 */
export type LearningLevel = 'beginner' | 'intermediate' | 'advanced';

/**
 * レベルに応じてテキストをひらがなに変換
 * @param text - 元のテキスト
 * @param level - 学習レベル ('beginner' | 'intermediate' | 'advanced')
 * @returns 変換後のテキスト
 */
export function convertToHiragana(
    text: string,
    level: LearningLevel
): string {
    // 初級のみひらがなに変換
    if (level !== 'beginner') {
        return text;
    }

    // マップに基づいて変換
    let result = text;

    // 長い単語から順に変換（部分一致を避けるため）
    const sortedEntries = Object.entries(TEXT_CONVERSION_MAP).sort(
        ([a], [b]) => b.length - a.length
    );

    for (const [kanji, hiragana] of sortedEntries) {
        result = result.replace(new RegExp(kanji, 'g'), hiragana);
    }

    return result;
}

/**
 * デバッグ用：変換可能な単語リストを取得
 */
export function getConvertibleWords(): string[] {
    return Object.keys(TEXT_CONVERSION_MAP);
}

/**
 * デバッグ用：テキストに含まれる変換可能な単語を検出
 */
export function detectConvertibleWords(text: string): string[] {
    const found: string[] = [];
    for (const kanji of Object.keys(TEXT_CONVERSION_MAP)) {
        if (text.includes(kanji)) {
            found.push(kanji);
        }
    }
    return found;
}




