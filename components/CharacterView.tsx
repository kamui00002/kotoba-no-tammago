
import React from 'react';
import { useGame } from '../context/GameContext';
import { XP_PER_LEVEL, CHARACTER_DATA } from '../constants';

const CharacterView: React.FC = () => {
    const { userProgress } = useGame();
    const { characterType, level, xp, evolutionStage, mbtiType } = userProgress;

    if (!characterType || !mbtiType) {
        return null;
    }

    const characterInfo = CHARACTER_DATA[characterType];
    const xpForNextLevel = XP_PER_LEVEL(level);
    const xpPercentage = (xp / xpForNextLevel) * 100;

    const getImagePath = () => {
        const mbtiLower = characterInfo.mbti.toLowerCase();
        const typeName = characterType;
        switch (evolutionStage) {
            case 'egg':
                return `/assets/images/eggs/${mbtiLower}_${typeName}_egg.png`;
            case 'child':
                return `/assets/images/characters/${mbtiLower}_${typeName}_idle.png`;
            case 'adult':
                return `/assets/images/characters/${mbtiLower}_${typeName}_evolve.png`;
            default:
                return '';
        }
    };
    
    const getBackgroundImagePath = () => {
        const mbtiLower = characterInfo.mbti.toLowerCase();
        const typeName = characterType;
        return `/assets/images/backgrounds/bg_${mbtiLower}_${typeName}.png`;
    };

    return (
        <div className="w-full max-w-md bg-cover bg-center bg-no-repeat rounded-2xl shadow-2xl p-6 relative" style={{ backgroundImage: `url(${getBackgroundImagePath()})` }}>
            <div className="bg-black/50 backdrop-blur-sm rounded-xl p-4">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-3xl font-bold">{characterInfo.name}</h2>
                        <p className="text-lg text-gray-300">Lv. {level}</p>
                    </div>
                    <div className="bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full">{mbtiType}</div>
                </div>

                <div className="flex justify-center items-center my-8 h-48">
                    <img src={getImagePath()} alt={characterType} className="max-h-full object-contain drop-shadow-2xl" />
                </div>

                <div>
                    <div className="flex justify-between text-sm font-medium text-gray-200 mb-1">
                        <span>XP</span>
                        <span>{xp} / {xpForNextLevel}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-4">
                        <div
                            className="bg-gradient-to-r from-cyan-400 to-blue-500 h-4 rounded-full transition-all duration-500"
                            style={{ width: `${xpPercentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterView;
