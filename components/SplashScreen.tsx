import React from 'react';

const SplashScreen: React.FC = () => {
    return (
        // 1. 背景: 紫色のグラデーション
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#1a0033] to-[#7b1fa2] text-white">
            <div className="flex flex-col items-center text-center">
                {/* 
                 * @animation 2. アプリアイコン: パルスアニメーション
                 * SwiftUIの .animation(Animation.easeInOut.repeatForever(), value: animating) に相当
                 * `animate-pulse-icon` クラスを通じて、`index.html` で定義された `@keyframes pulse-icon` を
                 * 無限に繰り返すことで、アイコンが脈打つような効果を生み出しています。
                 */}
                <div className="mb-6 animate-pulse-icon text-8xl drop-shadow-lg">
                    🥚
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                    ことばのたまご
                </h1>

                <p className="text-lg text-white/80 mb-12">
                    ～育てて学ぶ、あなただけの英単語～
                </p>

                {/* 
                 * @animation 5. ローディングアニメーション: 点滅するドット
                 * SwiftUIの LoadingDots サンプルに相当します。
                 * 3つの `div` (Circle) に、それぞれ `animation-delay` が設定された同じアニメーションを適用することで、
                 * 点滅がリレーのように見える効果を作り出しています。
                 * これも `repeatForever()` と同様に無限に繰り返されます。
                 */}
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