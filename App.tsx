import React, { useState, useEffect, useCallback } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import MbtiTest from './components/MbtiTest';
import HomeScreen from './components/HomeScreen';
import Quiz from './components/Quiz';
import ResultScreen from './components/ResultScreen';
import SplashScreen from './components/SplashScreen';
import { GameState } from './types';

const AppContent: React.FC = () => {
    const { gameState, userProgress, isLoading } = useGame();
    const [isSplashVisible, setSplashVisible] = useState(true);

    useEffect(() => {
        // Show splash for a minimum of 3 seconds
        const timer = setTimeout(() => {
            setSplashVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    // Show splash screen if the minimum time hasn't passed OR if data is still loading
    if (isSplashVisible || isLoading) {
        return <SplashScreen />;
    }

    const renderContent = () => {
        if (!userProgress.mbtiType) {
            return <MbtiTest />;
        }
        switch (gameState) {
            case GameState.HOME:
                return <HomeScreen />;
            case GameState.QUIZ:
                return <Quiz />;
            case GameState.RESULT:
                return <ResultScreen />;
            default:
                return <HomeScreen />;
        }
    };

    return (
        <main className="min-h-screen w-full font-sans">
            {renderContent()}
        </main>
    );
};

const App: React.FC = () => {
    return (
        <GameProvider>
            <AppContent />
        </GameProvider>
    );
};

export default App;