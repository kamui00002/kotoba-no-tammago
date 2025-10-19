import React from 'react';
import { CHARACTER_DATA } from '../constants';
import ExpBarView from './ExpBarView';
import { MbtiType, CharacterType } from '../types';

interface CharacterViewProps {
    name: string;
    level: number;
    mbtiType: MbtiType;
    currentExp: number;
    maxExp: number;
    imagePath: string;
    onCharacterTap: () => void;
    characterType: CharacterType;
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
}) => {
    const characterInfo = CHARACTER_DATA[characterType];
    
    const getBackgroundImagePath = () => {
        const mbtiLower = characterInfo.mbti.toLowerCase();
        const typeName = characterType;
        return `/assets/images/backgrounds/bg_${mbtiLower}_${typeName}.png`;
    };

    return (
        <div className="w-full bg-cover bg-center bg-no-repeat rounded-2xl shadow-2xl p-6 relative" style={{ backgroundImage: `url(${getBackgroundImagePath()})` }}>
            <div className="bg-black/50 backdrop-blur-sm rounded-xl p-4">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-3xl font-bold">{name}</h2>
                        <p className="text-lg text-gray-300">Lv. {level}</p>
                    </div>
                    <div className="bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full">{mbtiType}</div>
                </div>

                <div 
                    className="flex justify-center items-center my-6 h-80 cursor-pointer"
                    onClick={onCharacterTap} // 親から渡された関数をonClickに設定
                    aria-label="Tap character"
                >
                    <img src={imagePath} alt={name} className="max-h-full object-contain drop-shadow-2xl" />
                </div>

                <ExpBarView currentExp={currentExp} maxExp={maxExp} />

            </div>
        </div>
    );
};

export default CharacterView;
