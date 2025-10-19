// hooks/useHomeScreen.ts
import { useState, useEffect, useCallback } from 'react';
import { useGame } from '../context/GameContext';
import { CHARACTER_DATA } from '../constants';

/**
 * @observableobject SwiftUIの `HomeViewModel` に相当するカスタムフック
 *
 * このフックはホーム画面に関連するすべてのロジックと状態を管理します。
 * これにより、UIコンポーネント（HomeScreen.tsx）は表示に専念でき、コードの見通しが良くなります。
 */
export const useHomeScreen = () => {
    // グローバルなゲーム状態とロジックを取得
    const { userProgress, addExperience } = useGame();
    const { characterType, evolutionStage } = userProgress;

    /**
     * @published SwiftUIの `@Published var characterImage: String` に相当
     *
     * `useState` はReactのフックで、コンポーネントの状態を管理します。
     * `characterImage` の値が `setCharacterImage` によって変更されると、
     * このフックを使用しているコンポーネントが自動的に再レンダリングされます。
     */
    const [characterImage, setCharacterImage] = useState('');

    const characterInfo = characterType ? CHARACTER_DATA[characterType] : null;

    /**
     * @function updateCharacterImage / init
     * SwiftUIの `updateCharacterImage()` や `init()` での初期設定に相当します。
     *
     * `useEffect` フックは、特定のデータ（この場合は `evolutionStage`）が変更されたときに
     * 副作用（この場合はキャラクター画像の更新）を実行します。
     */
    useEffect(() => {
        if (!characterInfo || !characterType) return;

        const mbtiLower = characterInfo.mbti.toLowerCase();
        const typeName = characterType;
        let imagePath = '';
        switch (evolutionStage) {
            case 'egg':
                imagePath = `/assets/images/eggs/${mbtiLower}_${typeName}_egg.png`;
                break;
            case 'child':
                imagePath = `/assets/images/characters/${mbtiLower}_${typeName}_idle.png`;
                break;
            case 'adult':
                imagePath = `/assets/images/characters/${mbtiLower}_${typeName}_evolve.png`;
                break;
        }
        setCharacterImage(imagePath);
    }, [evolutionStage, characterType, characterInfo]);

    /**
     * @function onCharacterTap
     * SwiftUIの `onCharacterTap()` に相当します。
     *
     * `useCallback` は関数の再生成を防ぎ、パフォーマンスを最適化します。
     *
     * @async_dispatch SwiftUIの `DispatchQueue.main.asyncAfter` に相当
     * `setTimeout` は、指定した時間（500ms）後に関数を実行するJavaScriptの標準的な非同期処理です。
     * これにより、「ハッピーな画像に一時的に変更し、元に戻す」というアニメーションを実現します。
     */
    const handleCharacterTap = useCallback(() => {
        if (!characterInfo || !characterType || evolutionStage === 'egg') return;
        
        const mbtiLower = characterInfo.mbti.toLowerCase();
        const typeName = characterType;

        const idleImage = `/assets/images/characters/${mbtiLower}_${typeName}_idle.png`;
        const happyImage = `/assets/images/characters/${mbtiLower}_${typeName}_happy.png`;

        // 1. "happy" 画像に切り替え
        setCharacterImage(happyImage);

        // 2. 0.5秒後に "idle" 画像に戻す
        setTimeout(() => {
            setCharacterImage(idleImage);
        }, 500);
        
    }, [characterType, characterInfo, evolutionStage]);

    // このフックを使用するコンポーネントに、必要な状態と関数を返す
    return {
        userProgress,
        characterInfo,
        characterImage,
        handleCharacterTap,
        addExperience, // GameContextから受け取った関数をそのまま渡す
    };
};
