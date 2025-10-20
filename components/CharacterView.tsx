import React from 'react';
import ExpBarView from './ExpBarView';
import ParticleEffect from './ParticleEffect'; // パーティクルコンポーネントをインポート
import { MbtiType, CharacterType, EvolutionStage } from '../types';
import { getBackgroundImage } from '../utils/imageUtils';

interface CharacterViewProps {
    name: string;
    level: number;
    mbtiType: MbtiType;
    currentExp: number;
    maxExp: number;
    imagePath: string;
    onCharacterTap: () => void;
    characterType: CharacterType;
    evolutionStage: EvolutionStage;
    isTapped: boolean; // タップアニメーション用の状態
    justLeveledUp: boolean; // レベルアップエフェクト用の状態
}

const CharacterView: React.FC<CharacterViewProps> = ({
    name,
    level,
    mbtiType,
    currentExp,
    maxExp,
    imagePath,
    onCharacterTap,
    characterType,
    evolutionStage,
    isTapped,
    justLeveledUp,
}) => {

    const backgroundImage = getBackgroundImage(characterType);

    // @animation タップ時のアニメーション用CSSクラスを決定するロジック
    // SwiftUIの .scaleEffect(isHappy ? 1.1 : 1.0) に相当
    const getTapAnimationClass = () => {
        if (!isTapped) return '';
        return evolutionStage === EvolutionStage.EGG ? 'animate-wiggle' : 'scale-110';
    };

    return (
        <div className="w-full bg-cover bg-center bg-no-repeat rounded-2xl shadow-2xl p-6 relative" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="bg-black/50 backdrop-blur-sm rounded-xl p-4">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-3xl font-bold">{name}</h2>
                        <p className="text-lg text-gray-300">Lv. {level}</p>
                    </div>
                    <div className="bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full">{mbtiType}</div>
                </div>

                <div
                    className="relative flex justify-center items-center my-6 h-80 cursor-pointer group"
                    onClick={onCharacterTap}
                    aria-label="Tap character"
                >
                    {imagePath ? (
                        <img
                            src={imagePath}
                            alt={name}
                            className={`max-h-full object-contain drop-shadow-2xl transition-transform duration-300 ${getTapAnimationClass()}`}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = '/assets/images/eggs/fallback_egg.png';
                            }}
                        />
                    ) : (
                        <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center text-4xl">
                            🥚
                        </div>
                    )}
                    {/* @animation レベルアップ時にパーティクルエフェクトを表示 */}
                    {justLeveledUp && <ParticleEffect />}
                </div>

                <ExpBarView currentExp={currentExp} maxExp={maxExp} />

            </div>
        </div>
    );
};

export default CharacterView;