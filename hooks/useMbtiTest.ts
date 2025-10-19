// hooks/useMbtiTest.ts
import { useState, useEffect, useCallback } from 'react';
import { useGame } from '../context/GameContext';
import { MbtiQuestion, MbtiType } from '../types';

/**
 * @observableobject MBTIQuizViewModelに相当するカスタムフック
 *
 * このフックはMBTI診断テストに関連するすべてのロジックと状態を管理します。
 * これにより、UIコンポーネント（MbtiTest.tsx）は表示に専念でき、コードの見通しが良くなります。
 * このようなロジックの分離は、MVVMアーキテクチャにおけるViewModelの役割に似ています。
 */
export const useMbtiTest = () => {
    const { completeMbtiTest } = useGame();

    // @published に相当する状態変数たち
    // useStateは、コンポーネントの状態を管理するためのReactフックです。
    // この値が変更されると、UIが自動的に再レンダリングされます。
    const [questions, setQuestions] = useState<MbtiQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    /**
     * @function loadQuestions
     * コンポーネントがマウントされた時に一度だけ実行され、mbti_questions.jsonから質問データを非同期で読み込みます。
     * useEffectフックに空の依存配列 `[]` を渡すことで、初期化処理（init）のように振る舞います。
     */
    useEffect(() => {
        fetch('/assets/data/mbti_questions.json')
            .then(res => res.json())
            .then((data: MbtiQuestion[]) => {
                setQuestions(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to load MBTI questions:", err);
                setIsLoading(false);
            });
    }, []); // 空の配列は、このeffectが初回レンダリング時に一度だけ実行されることを意味します。

    /**
     * @function calculateResult
     * 収集された回答に基づいてMBTIタイプを計算し、テストを完了させます。
     * @param finalAnswers - ユーザーのすべての回答の配列
     */
    const calculateResult = useCallback((finalAnswers: string[]) => {
        const counts: Record<string, number> = { I: 0, E: 0, N: 0, S: 0, F: 0, T: 0, P: 0, J: 0 };
        finalAnswers.forEach(answer => {
            if (answer in counts) {
                counts[answer]++;
            }
        });

        const ie = counts.I >= counts.E ? 'I' : 'E';
        const ns = counts.N >= counts.S ? 'N' : 'S';
        const ft = counts.F >= counts.T ? 'F' : 'T';
        const pj = counts.P >= counts.J ? 'P' : 'J';
        
        const resultType = `${ie}${ns}${ft}${pj}` as MbtiType;

        // グローバルなゲーム状態を更新
        completeMbtiTest(resultType);
    }, [completeMbtiTest]);


    /**
     * @function selectAnswer
     * ユーザーが選択肢をクリックしたときに呼び出されます。
     * 回答を記録し、次の質問に進むか、結果を計算します。
     * useCallbackは、関数の再生成を防ぎパフォーマンスを最適化するために使用します。
     * @param choiceAxis - 選択された回答の軸 ('I', 'E', 'N',など)
     */
    const handleAnswer = useCallback((choiceAxis: string) => {
        // 1. 回答を記録
        const newAnswers = [...answers, choiceAxis];
        setAnswers(newAnswers);

        // 2. 次の質問へ、または結果計算
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            calculateResult(newAnswers);
        }
    }, [answers, currentIndex, questions.length, calculateResult]);


    // このフックを使用するコンポーネントに、必要な状態と関数を返す
    return {
        isLoading,
        questions,
        currentIndex,
        currentQuestion: questions.length > 0 ? questions[currentIndex] : null,
        handleAnswer,
    };
};
