// utils/storageManager.ts

import { UserProgress, Difficulty } from '../types';

/**
 * @class SwiftUIの `StorageManager` シングルトンクラスに相当するモジュール
 * 
 * このモジュールは、ブラウザの `localStorage` を使ったデータ永続化のロジックを
 * 一箇所に集約（カプセル化）します。これにより、アプリの他の部分から
 * データの保存方法を意識することなく、簡単にデータの保存・読み込みができます。
 * JavaScript/TypeScriptでは、モジュールは本質的にシングルトンです。
 */

/**
 * @enum SwiftUIの `private enum Keys` に相当
 * 
 * localStorageにデータを保存する際のキーを定数として定義します。
 * これにより、キーの文字列をハードコーディングすることなく、タイプミスを防ぎ、
 * コードの保守性を向上させます。
 */
const STORAGE_KEYS = {
    USER_PROGRESS: 'userProgress',
    LEARNING_LEVEL: 'learningLevel',
};

/**
 * @function saveUserData
 * ユーザーの進捗データをlocalStorageに保存します。
 * SwiftUIの `saveUserData(_ userData: UserData)` メソッドに相当します。
 * 
 * @param progress - 保存するユーザー進捗オブジェクト
 */
export const saveUserProgress = (progress: UserProgress): void => {
    try {
        /**
         * @encoder SwiftUIの `JSONEncoder().encode(userData)` に相当
         * 
         * `JSON.stringify` は、JavaScriptのオブジェクトをJSON形式の文字列に変換します。
         * これにより、オブジェクトをそのままlocalStorageに保存できるようになります。
         */
        const serializedProgress = JSON.stringify(progress);

        /**
         * @userdefaults SwiftUIの `defaults.set(encoded, forKey: Keys.userData)` に相当
         * 
         * `localStorage.setItem` は、指定されたキーでデータをブラウザに保存します。
         */
        localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, serializedProgress);
    } catch (error) {
        // エラーハンドリング: 保存に失敗した場合（例: ストレージ容量超過）
        console.error("Failed to save user progress to localStorage:", error);
    }
};

/**
 * @function loadUserData
 * localStorageからユーザーの進捗データを読み込みます。
 * SwiftUIの `loadUserData() -> UserData?` メソッドに相当します。
 * 
 * @returns 読み込まれたユーザー進捗オブジェクト。データがない場合やエラー時は `null` を返します。
 */
export const loadUserProgress = (): UserProgress | null => {
    try {
        /**
         * @userdefaults SwiftUIの `defaults.data(forKey: Keys.userData)` に相当
         * 
         * `localStorage.getItem` は、指定されたキーのデータをブラウザから取得します。
         * データが存在しない場合は `null` を返します。
         */
        const serializedProgress = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);

        if (serializedProgress === null) {
            return null; // 保存されているデータがない
        }

        /**
         * @decoder SwiftUIの `JSONDecoder().decode(UserData.self, from: data)` に相当
         * 
         * `JSON.parse` は、JSON形式の文字列をJavaScriptのオブジェクトに変換（デコード）します。
         */
        const progress: UserProgress = JSON.parse(serializedProgress);
        return progress;

    } catch (error) {
        // エラーハンドリング: JSONのパースに失敗した場合など
        console.error("Failed to load user progress from localStorage:", error);
        return null;
    }
};

/**
 * @function resetAll
 * localStorageからユーザーの進捗データを削除します。
 * SwiftUIの `resetAll()` メソッドに相当します。
 */
export const resetUserProgress = (): void => {
    try {
        /**
         * @userdefaults SwiftUIの `defaults.removeObject(forKey: Keys.userData)` に相当
         * 
         * `localStorage.removeItem` は、指定されたキーのデータをブラウザから削除します。
         */
        localStorage.removeItem(STORAGE_KEYS.USER_PROGRESS);
    } catch (error) {
        console.error("Failed to reset user progress in localStorage:", error);
    }
};

/**
 * @function saveLearningLevel
 * 学習レベルをlocalStorageに保存します。
 */
export const saveLearningLevel = (level: Difficulty): void => {
    try {
        localStorage.setItem(STORAGE_KEYS.LEARNING_LEVEL, level);
    } catch (error) {
        console.error("Failed to save learning level to localStorage:", error);
    }
};

/**
 * @function loadLearningLevel
 * localStorageから学習レベルを読み込みます。
 */
export const loadLearningLevel = (): Difficulty | null => {
    try {
        const level = localStorage.getItem(STORAGE_KEYS.LEARNING_LEVEL);
        return level as Difficulty | null;
    } catch (error) {
        console.error("Failed to load learning level from localStorage:", error);
        return null;
    }
};

/**
 * @function clearLearningLevel
 * localStorageから学習レベルを削除します。
 */
export const clearLearningLevel = (): void => {
    try {
        localStorage.removeItem(STORAGE_KEYS.LEARNING_LEVEL);
    } catch (error) {
        console.error("Failed to clear learning level from localStorage:", error);
    }
};

/**
 * @function resetAllData
 * すべてのローカルストレージデータを削除します。
 * オープニング画面をテストする際に使用します。
 */
export const resetAllData = (): void => {
    try {
        console.log('🗑️ Resetting all localStorage data...');
        localStorage.clear();
        console.log('✅ All data cleared!');
    } catch (error) {
        console.error("Failed to clear all data from localStorage:", error);
    }
};
