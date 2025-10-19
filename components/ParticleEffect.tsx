import React from 'react';

/**
 * @view SwiftUIの `ParticleView` に相当するコンポーネント
 *
 * レベルアップ時にキラキラしたパーティクルが飛び散るエフェクトを表現します。
 * CSSアニメーションを使って、複数の要素を一度に動かします。
 */
const ParticleEffect: React.FC = () => {
    // 10個のパーティクルを生成
    const particles = Array.from({ length: 10 });
    
    const particleStyles: React.CSSProperties[] = particles.map(() => {
        // 放射状に広がるための角度と距離をランダムに設定
        const angle = Math.random() * 360; // 0-360度
        const distance = 50 + Math.random() * 50; // 50-100%の距離

        // CSSのカスタムプロパティ（--angle, --distance）を使って値をCSSに渡す
        // これにより、@keyframes内で動的な値を使えない制約を回避できる
        const x = distance * Math.cos(angle * (Math.PI / 180));
        const y = distance * Math.sin(angle * (Math.PI / 180));

        return {
            // アニメーションの開始を少しずつ遅らせることで、パラパラと広がる効果を出す
            animationDelay: `${Math.random() * 0.3}s`,
            // 最終的な位置をtransformで指定
            transform: `translate(${x}px, ${y}px)`,
            // 色をランダムにする
            background: `hsl(${Math.random() * 360}, 90%, 70%)`,
        };
    });

    return (
        // position-absoluteでキャラクター画像の中央に配置
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {particleStyles.map((style, index) => (
                <div
                    key={index}
                    className="absolute w-3 h-3 rounded-full animate-sparkle"
                    style={style}
                />
            ))}
        </div>
    );
};

export default ParticleEffect;