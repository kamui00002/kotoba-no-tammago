// utils/soundPlayer.ts

/**
 * 音声ファイルを再生するユーティリティ
 */

// 効果音の種類
export enum SoundType {
    BUTTON = 'button',
    CORRECT = 'correct',
    WRONG = 'wrang',
    LEVEL_UP = 'levelup',
    EVOLVE = 'evolve',
}

// BGMの種類
export enum BgmType {
    HOME = 'home',
    QUIZ = 'quiz',
    RESULT = 'result',
}

// 効果音ファイルのパスマップ
const SOUND_PATHS: Record<SoundType, string> = {
    [SoundType.BUTTON]: '/sounds/button.wav',
    [SoundType.CORRECT]: '/sounds/correct.wav',
    [SoundType.WRONG]: '/sounds/wrang.wav',
    [SoundType.LEVEL_UP]: '/sounds/levelup.wav',
    [SoundType.EVOLVE]: '/sounds/evolve.wav',
};

// BGMファイルのパスマップ
const BGM_PATHS: Record<BgmType, string> = {
    [BgmType.HOME]: '/sounds/bgm/home.mp3',
    [BgmType.QUIZ]: '/sounds/bgm/quiz.mp3',
    [BgmType.RESULT]: '/sounds/bgm/result.mp3',
};

// 効果音のボリューム設定
const SOUND_VOLUMES: Record<SoundType, number> = {
    [SoundType.BUTTON]: 0.3,
    [SoundType.CORRECT]: 0.5,
    [SoundType.WRONG]: 0.5,
    [SoundType.LEVEL_UP]: 0.6,
    [SoundType.EVOLVE]: 0.7,
};

// BGMのボリューム設定
const BGM_VOLUME = 0.3;

// 現在再生中のBGM
let currentBgm: HTMLAudioElement | null = null;
let currentBgmType: BgmType | null = null;

/**
 * 効果音を再生する
 * @param soundType - 再生する音声の種類
 */
export function playSound(soundType: SoundType): void {
    try {
        const audio = new Audio(SOUND_PATHS[soundType]);
        audio.volume = SOUND_VOLUMES[soundType];
        audio.play().catch(error => {
            console.warn(`Failed to play sound: ${soundType}`, error);
        });
    } catch (error) {
        console.warn(`Error creating audio: ${soundType}`, error);
    }
}

/**
 * BGMを再生する
 * @param bgmType - 再生するBGMの種類
 * @param loop - ループ再生するか（デフォルト: true）
 */
export function playBgm(bgmType: BgmType, loop: boolean = true): void {
    try {
        // 同じBGMが再生中なら何もしない
        if (currentBgmType === bgmType && currentBgm && !currentBgm.paused) {
            console.log(`BGM already playing: ${bgmType}`);
            return;
        }

        console.log(`🎵 Switching BGM: ${currentBgmType} → ${bgmType}`);

        // 既存のBGMを即座に停止（フェードアウトなし）
        if (currentBgm) {
            currentBgm.pause();
            currentBgm.currentTime = 0;
            currentBgm = null;
            currentBgmType = null;
        }

        // 新しいBGMを作成
        const audio = new Audio(BGM_PATHS[bgmType]);
        audio.volume = 0; // フェードイン用に0から始める
        audio.loop = loop;

        // 新しいBGMを再生開始
        audio.play().then(() => {
            fadeIn(audio, BGM_VOLUME, 1000);
        }).catch(error => {
            console.warn(`Failed to play BGM: ${bgmType}`, error);
        });

        currentBgm = audio;
        currentBgmType = bgmType;
    } catch (error) {
        console.warn(`Error creating BGM: ${bgmType}`, error);
    }
}

/**
 * BGMを停止する
 */
export function stopBgm(): void {
    if (currentBgm) {
        console.log(`🔇 Stopping BGM: ${currentBgmType}`);
        currentBgm.pause();
        currentBgm.currentTime = 0;
        currentBgm = null;
        currentBgmType = null;
    }
}

/**
 * BGMの音量を変更する
 * @param volume - 音量（0.0 ~ 1.0）
 */
export function setBgmVolume(volume: number): void {
    if (currentBgm) {
        currentBgm.volume = Math.max(0, Math.min(1, volume));
    }
}

/**
 * フェードイン効果
 */
function fadeIn(audio: HTMLAudioElement, targetVolume: number, duration: number): void {
    const steps = 20;
    const stepDuration = duration / steps;
    const volumeStep = targetVolume / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
        currentStep++;
        audio.volume = Math.min(volumeStep * currentStep, targetVolume);

        if (currentStep >= steps) {
            clearInterval(interval);
        }
    }, stepDuration);
}

/**
 * フェードアウト効果
 */
function fadeOut(audio: HTMLAudioElement, duration: number): Promise<void> {
    return new Promise((resolve) => {
        const steps = 20;
        const stepDuration = duration / steps;
        const startVolume = audio.volume;
        const volumeStep = startVolume / steps;
        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            audio.volume = Math.max(startVolume - (volumeStep * currentStep), 0);

            if (currentStep >= steps) {
                clearInterval(interval);
                resolve();
            }
        }, stepDuration);
    });
}

/**
 * 複数の音声を順番に再生する
 * @param soundTypes - 再生する音声の配列
 * @param delay - 各音声の間隔（ミリ秒）
 */
export async function playSoundSequence(
    soundTypes: SoundType[],
    delay: number = 500
): Promise<void> {
    for (const soundType of soundTypes) {
        playSound(soundType);
        await new Promise(resolve => setTimeout(resolve, delay));
    }
}

/**
 * 音声を事前読み込みする（パフォーマンス向上のため）
 */
export function preloadSounds(): void {
    // 効果音を事前読み込み
    Object.values(SoundType).forEach(soundType => {
        const audio = new Audio(SOUND_PATHS[soundType]);
        audio.preload = 'auto';
    });

    // BGMを事前読み込み
    Object.values(BgmType).forEach(bgmType => {
        const audio = new Audio(BGM_PATHS[bgmType]);
        audio.preload = 'auto';
    });
}




