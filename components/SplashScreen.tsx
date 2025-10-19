import React from 'react';

const SplashScreen: React.FC = () => {
    return (
        // 1. 背景: 紫色のグラデーション
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#1a0033] to-[#7b1fa2] text-white">
            <div className="flex flex-col items-center text-center">
                {/* 2. アプリアイコン: パルスアニメーション付き */}
                <div className="mb-6 animate-pulse-icon text-8xl drop-shadow-lg">
                    🥚
                </div>
                
                {/* 3. タイトル */}
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                    ことばのたまご
                </h1>

                {/* 4. サブタイトル */}
                <p className="text-lg text-white/80 mb-12">
                    ～育てて学ぶ、あなただけの英単語～
                </p>

                {/* 5. ローディングアニメーション: 点滅する3つのドット */}
                <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-white rounded-full animate-blink-dot-1"></div>
                    <div className="w-3 h-3 bg-white rounded-full animate-blink-dot-2"></div>
                    <div className="w-3 h-3 bg-white rounded-full animate-blink-dot-3"></div>
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;
