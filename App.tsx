import React, { useState, useEffect } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import MbtiTest from './components/MbtiTest';
import HomeScreen from './components/HomeScreen';
import Quiz from './components/Quiz';
import ResultScreen from './components/ResultScreen';
import SplashScreen from './components/SplashScreen';
import MbtiResultScreen from './components/MbtiResultScreen';
import { GameState } from './types';

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
    const { gameState, userProgress, isLoading } = useGame();
    const [isSplashVisible, setSplashVisible] = useState(true);

    // スプラッシュスクリーンを最低3秒間表示するためのロジック
    useEffect(() => {
        const timer = setTimeout(() => {
            setSplashVisible(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    // データの読み込み中、またはスプラッシュ表示時間中はスプラッシュスクリーンを表示
    if (isSplashVisible || isLoading) {
        return <SplashScreen />;
    }

    const renderContent = () => {
        /**
         * @appstorage SwiftUIの `@AppStorage("firstLaunch")` による初回起動判定に相当
         *
         * `userProgress.mbtiType` が存在するかどうかをチェックすることで、ユーザーが
         * 最初のMBTI診断を完了したか（＝初回起動ではないか）を判断します。
         * このデータは `GameContext` 内でlocalStorageから読み込まれています。
         */
        if (!userProgress.mbtiType) {
            // 初回起動時はMBTI診断画面へ
            return <MbtiTest />;
        }

        // ゲームの状態に応じて表示する画面を切り替える (NavigationStackのルート分岐)
        switch (gameState) {
            case GameState.HOME:
                return <HomeScreen />;
            case GameState.QUIZ:
                return <Quiz />;
            case GameState.RESULT:
                return <ResultScreen />;
            case GameState.MBTI_RESULT:
                return <MbtiResultScreen />;
            default:
                // 想定外の状態の場合は、安全なホーム画面に戻す
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