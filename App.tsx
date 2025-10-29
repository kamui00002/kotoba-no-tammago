import React, { useState, useEffect } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import OpeningScreen from './components/OpeningScreen';
import LevelSelectScreen from './components/LevelSelectScreen';
import MbtiTest from './components/MbtiTest';
import HomeScreen from './components/HomeScreen';
import Quiz from './components/Quiz';
import ResultScreen from './components/ResultScreen';
import SplashScreen from './components/SplashScreen';
import MbtiResultScreen from './components/MbtiResultScreen';
import { GameState } from './types';
import { preloadSounds } from './utils/soundPlayer';

/**
 * @view SwiftUIのNavigationStackや分岐ロジックに相当する "ルーター" コンポーネント
 *
 * このコンポーネントは、アプリ全体の画面遷移（ナビゲーション）を管理します。
 * 現在のゲームの状態に応じて、表示すべき正しい画面コンポーネントを判断して描画します。
 */
const AppRouter: React.FC = () => {
    /**
     * @environmentObject SwiftUIの `@EnvironmentObject` に相当
     *
     * `useGame()`フックを通じて、アプリのグローバルな状態（gameStateやuserProgressなど）を
     * `GameContext`から受け取ります。これにより、どのコンポーネントからでも状態にアクセスできます。
     */
    const { gameState, userProgress, isLoading, learningLevel } = useGame();
    const [isSplashVisible, setSplashVisible] = useState(true);

    // スプラッシュスクリーンを最低3秒間表示するためのロジック
    useEffect(() => {
        const timer = setTimeout(() => {
            setSplashVisible(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    // アプリ起動時に音声ファイルを事前読み込み
    useEffect(() => {
        console.log('🎵 Preloading sounds...');
        preloadSounds();
    }, []);

    // データの読み込み中、またはスプラッシュ表示時間中はスプラッシュスクリーンを表示
    if (isSplashVisible || isLoading) {
        return <SplashScreen />;
    }

    const renderContent = () => {
        console.log('🎮 AppRouter - gameState:', gameState, 'mbtiType:', userProgress.mbtiType, 'learningLevel:', learningLevel);

        /**
         * @appstorage SwiftUIの `@AppStorage("firstLaunch")` による初回起動判定に相当
         *
         * `userProgress.mbtiType` が存在するかどうかをチェックすることで、ユーザーが
         * 最初のMBTI診断を完了したか（＝初回起動ではないか）を判断します。
         * このデータは `GameContext` 内でlocalStorageから読み込まれています。
         */
        if (!userProgress.mbtiType) {
            // 初回起動時（MBTI診断未完了）
            if (gameState === GameState.OPENING) {
                console.log('🎬 Showing OpeningScreen (1st launch)');
                return <OpeningScreen />;
            }
            // オープニング後: learningLevelが設定されていない場合はレベル選択画面へ
            if (!learningLevel) {
                console.log('📊 Showing LevelSelectScreen');
                return <LevelSelectScreen />;
            }
            // レベル選択後はMBTI診断画面へ
            console.log('🧪 Showing MbtiTest');
            return <MbtiTest />;
        }

        // 2回目以降（MBTI診断完了済み）
        // ゲームの状態に応じて表示する画面を切り替える (NavigationStackのルート分岐)
        switch (gameState) {
            case GameState.OPENING:
                console.log('🎬 Showing OpeningScreen (2nd+ launch)');
                return <OpeningScreen />;
            case GameState.HOME:
                console.log('🏠 Showing HomeScreen');
                return <HomeScreen />;
            case GameState.QUIZ:
                console.log('❓ Showing Quiz');
                return <Quiz />;
            case GameState.RESULT:
                console.log('🎯 Showing ResultScreen');
                return <ResultScreen />;
            case GameState.MBTI_RESULT:
                console.log('🎭 Showing MbtiResultScreen');
                return <MbtiResultScreen />;
            default:
                // 想定外の状態の場合は、安全なホーム画面に戻す
                console.log('⚠️ Unknown state, showing HomeScreen');
                return <HomeScreen />;
        }
    };

    return (
        <div key={gameState} className="animate-fadeIn">
            {renderContent()}
        </div>
    );
};

/**
 * @main SwiftUIの `@main` と App 構造体に相当
 *
 * アプリケーションのエントリーポイントです。
 * `GameProvider` (Context) を使って、アプリ全体で状態を共有できるように設定し、
 * 中に画面遷移を管理する `AppRouter` を配置します。
 */
const App: React.FC = () => {
    return (
        <GameProvider>
            <AppRouter />
        </GameProvider>
    );
};

export default App;