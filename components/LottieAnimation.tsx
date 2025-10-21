import React from 'react';
import Lottie from 'lottie-react';

interface LottieAnimationProps {
    animationData: string; // JSONファイルのパス
    loop?: boolean;
    autoplay?: boolean;
    onComplete?: () => void;
    className?: string;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
    animationData,
    loop = false,
    autoplay = true,
    onComplete,
    className = '',
}) => {
    const [animationJson, setAnimationJson] = React.useState<any>(null);

    React.useEffect(() => {
        // JSONファイルを読み込む
        fetch(animationData)
            .then((response) => response.json())
            .then((data) => setAnimationJson(data))
            .catch((error) => console.error('Failed to load Lottie animation:', error));
    }, [animationData]);

    if (!animationJson) {
        return null; // 読み込み中は何も表示しない
    }

    return (
        <Lottie
            animationData={animationJson}
            loop={loop}
            autoplay={autoplay}
            onComplete={onComplete}
            className={className}
        />
    );
};

export default LottieAnimation;
