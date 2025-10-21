// hooks/useHomeScreen.ts
import { useState, useEffect, useCallback } from 'react';
import { useGame } from '../context/GameContext';
import { CHARACTER_DATA } from '../constants';
import { getEggImage, getCharacterImage } from '../utils/imageUtils';
import { EvolutionStage } from '../types';

/**
 * @observableobject SwiftUIの `HomeViewModel` に相当するカスタムフック
 *
 * このフックはホーム画面に関連するすべてのロジックと状態を管理します。
 * これにより、UIコンポーネント（HomeScreen.tsx）は表示に専念でき、コードの見通しが良くなります。
 */
export const useHomeScreen = () => {
    const { userProgress, addExperience } = useGame();
    const { characterType, evolutionStage, level } = userProgress;

    const [characterImage, setCharacterImage] = useState('');

    /**
     * @published @state タップアニメーション用の状態
     * SwiftUIの `@State private var isHappy = false` に相当します。
     * この値が変更されると、コンポーネントが再レンダリングされ、
     * アニメーション用のCSSクラスが適用/削除されます。
     */
    const [isTapped, setIsTapped] = useState(false);
    const [isHatching, setIsHatching] = useState(false); // 孵化アニメーション用
    const [justLeveledUp, setJustLeveledUp] = useState(false); // レベルアップアニメーション用

    const characterInfo = characterType ? CHARACTER_DATA[characterType] : null;

    // レベルアップ時のアニメーション検知
    useEffect(() => {
        // レベルアップ時のアニメーション
        if (level > 1) {
            setJustLeveledUp(true);
            setTimeout(() => setJustLeveledUp(false), 3000);
        }

        // レベルが5（子供への進化）になったときを検知
        if (level === 5 && evolutionStage === EvolutionStage.CHILD) {
            setIsHatching(true);
            // 5秒後にアニメーションを終了
            setTimeout(() => setIsHatching(false), 5000);
        }
    }, [level, evolutionStage]);

    useEffect(() => {
        if (!characterType) {
            setCharacterImage('');
            return;
        }

        let imagePath = '';
        switch (evolutionStage) {
            case EvolutionStage.EGG:
                imagePath = getEggImage(characterType);
                break;
            case EvolutionStage.CHILD:
                imagePath = getCharacterImage(characterType, 'idle');
                break;
            case EvolutionStage.ADULT:
                imagePath = getCharacterImage(characterType, 'evolve');
                break;
            default:
                imagePath = getEggImage(characterType);
                break;
        }
        setCharacterImage(imagePath);
    }, [evolutionStage, characterType]);

    /**
     * @function onCharacterTap
     * SwiftUIの `onTapGesture` 内のロジックに相当します。
     */
    const handleCharacterTap = useCallback(() => {
        setIsTapped(true);

        // アニメーション用のクラスを適用した後、少ししてから解除する
        setTimeout(() => setIsTapped(false), 300);

        // タップ時の画像切り替えロジック
        if (!characterType || evolutionStage === EvolutionStage.EGG || evolutionStage === EvolutionStage.ADULT) {
            return;
        }

        const idleImage = getCharacterImage(characterType, 'idle');
        const happyImage = getCharacterImage(characterType, 'happy');

        setCharacterImage(happyImage);

        /**
         * @async_dispatch SwiftUIの `DispatchQueue.main.asyncAfter` に相当
         * 指定した時間（500ms）後に関数を実行し、画像を元に戻します。
         */
        setTimeout(() => {
            setCharacterImage(idleImage);
        }, 500);

    }, [characterType, evolutionStage]);

    return {
        userProgress,
        characterInfo,
        characterImage,
        isTapped, // Viewに渡すための状態
        isHatching, // 追加
        justLeveledUp, // レベルアップアニメーション用
        handleCharacterTap,
        addExperience,
    };
};