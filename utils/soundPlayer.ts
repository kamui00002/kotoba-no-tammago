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
const DEFAULT_BGM_VOLUME = 0.3;
const DEFAULT_SFX_VOLUME = 1.0;

// 音量とミュート状態の管理
let bgmVolume = DEFAULT_BGM_VOLUME;
let sfxVolume = DEFAULT_SFX_VOLUME;
let isBgmMuted = false;
let isSfxMuted = false;

// 現在再生中のBGM
let currentBgm: HTMLAudioElement | null = null;
let currentBgmType: BgmType | null = null;
let fadeInInterval: NodeJS.Timeout | null = null;

/**
 * 効果音を再生する
 * @param soundType - 再生する音声の種類
 */
export function playSound(soundType: SoundType): void {
    // ミュート時は再生しない
    if (isSfxMuted) return;

    try {
        const audio = new Audio(SOUND_PATHS[soundType]);
        audio.volume = SOUND_VOLUMES[soundType] * sfxVolume;
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
        console.log(`\n🎵 playBgm called with: ${bgmType}`);
        console.log(`   Current BGM type: ${currentBgmType}`);
        console.log(`   Current BGM exists: ${!!currentBgm}`);
        console.log(`   Current BGM paused: ${currentBgm ? currentBgm.paused : 'N/A'}`);

        // 同じBGMが再生中なら何もしない
        if (currentBgmType === bgmType && currentBgm && !currentBgm.paused) {
            console.log(`✅ BGM already playing: ${bgmType}`);
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

        // フェードインをキャンセル
        if (fadeInInterval) {
            clearInterval(fadeInInterval);
            fadeInInterval = null;
        }

        // ミュート時は再生しない
        if (isBgmMuted) {
            console.log(`🔇 BGM is muted, not playing`);
            currentBgmType = bgmType; // タイプは記憶しておく
            return;
        }

        // 新しいBGMを作成
        console.log(`📂 Loading BGM from: ${BGM_PATHS[bgmType]}`);
        const audio = new Audio(BGM_PATHS[bgmType]);
        audio.volume = 0; // フェードイン用に0から始める
        audio.loop = loop;

        console.log(`🎚️ Target BGM volume: ${bgmVolume.toFixed(2)}`);
        console.log(`🔁 Loop: ${loop}`);

        // 新しいBGMを再生開始
        audio.play().then(() => {
            console.log(`✅ BGM playback started successfully`);
            console.log(`🎚️ Starting fade-in to ${bgmVolume.toFixed(2)}`);
            fadeIn(audio, bgmVolume, 1000);
        }).catch(error => {
            console.error(`❌ Failed to play BGM: ${bgmType}`, error);
            console.error(`   Error name: ${error.name}`);
            console.error(`   Error message: ${error.message}`);
        });

        currentBgm = audio;
        currentBgmType = bgmType;
        console.log(`✅ BGM set as current: ${bgmType}\n`);
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

    // フェードインをキャンセル
    if (fadeInInterval) {
        clearInterval(fadeInInterval);
        fadeInInterval = null;
    }
}

/**
 * BGMの音量を変更する（互換性のため残す）
 * @deprecated updateBgmVolume を使用してください
 * @param volume - 音量（0.0 ~ 1.0）
 */
export function setBgmVolume(volume: number): void {
    updateBgmVolume(volume);
}

/**
 * フェードイン効果
 */
function fadeIn(audio: HTMLAudioElement, targetVolume: number, duration: number): void {
    // 既存のフェードインをキャンセル
    if (fadeInInterval) {
        clearInterval(fadeInInterval);
        fadeInInterval = null;
    }

    const steps = 20;
    const stepDuration = duration / steps;
    const volumeStep = targetVolume / steps;
    let currentStep = 0;

    console.log(`🎚️ fadeIn: Starting from 0 to ${targetVolume.toFixed(2)} over ${duration}ms`);

    fadeInInterval = setInterval(() => {
        currentStep++;
        const newVolume = Math.min(volumeStep * currentStep, targetVolume);

        // グローバルなbgmVolumeが変わっていたら、それに合わせる
        const actualTarget = bgmVolume;
        audio.volume = Math.min(volumeStep * currentStep, actualTarget);

        if (currentStep >= steps) {
            clearInterval(fadeInInterval!);
            fadeInInterval = null;
            // フェードイン完了後は現在のbgmVolumeに設定
            audio.volume = bgmVolume;
            console.log(`✅ fadeIn complete: final volume = ${audio.volume.toFixed(2)}`);
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

// ========== 音量制御機能 ==========

/**
 * BGMの音量を取得
 */
export function getBgmVolume(): number {
    return bgmVolume;
}

/**
 * BGMの音量を設定
 * @param volume - 音量（0.0 ~ 1.0）
 */
export function updateBgmVolume(volume: number): void {
    const oldVolume = bgmVolume;
    bgmVolume = Math.max(0, Math.min(1, volume));

    console.log(`🔊 BGM Volume update: ${oldVolume.toFixed(2)} → ${bgmVolume.toFixed(2)}`);
    console.log(`   currentBgm exists: ${!!currentBgm}`);
    console.log(`   currentBgmType: ${currentBgmType}`);
    console.log(`   isBgmMuted: ${isBgmMuted}`);

    if (currentBgm) {
        console.log(`   currentBgm.paused: ${currentBgm.paused}`);
        console.log(`   currentBgm.volume before: ${currentBgm.volume.toFixed(2)}`);
    }

    // フェードインをキャンセルして即座に音量変更
    if (fadeInInterval) {
        console.log('⏹️ Canceling fade-in interval');
        clearInterval(fadeInInterval);
        fadeInInterval = null;
    }

    if (currentBgm) {
        if (isBgmMuted) {
            console.log('🔇 BGM is muted, not changing volume');
        } else {
            console.log(`🎵 Setting currentBgm.volume to ${bgmVolume.toFixed(2)}`);
            currentBgm.volume = bgmVolume;
            console.log(`   currentBgm.volume after: ${currentBgm.volume.toFixed(2)}`);
        }
    } else {
        console.log('❌ No BGM is currently playing');
        console.warn('⚠️ PROBLEM: You are trying to change BGM volume but no BGM is playing!');
        console.warn('   Make sure playBgm() was called and succeeded before changing volume.');
    }
}

/**
 * BGMのミュート状態を取得
 */
export function getIsBgmMuted(): boolean {
    return isBgmMuted;
}

/**
 * BGMのミュートを切り替え
 */
export function toggleBgmMute(): void {
    isBgmMuted = !isBgmMuted;

    if (isBgmMuted) {
        // ミュート: BGMを停止
        if (currentBgm) {
            currentBgm.volume = 0;
        }
        console.log(`🔇 BGM Muted`);
    } else {
        // ミュート解除: BGMを再開
        if (currentBgm) {
            currentBgm.volume = bgmVolume;
        } else if (currentBgmType) {
            // BGMがない場合は再生
            playBgm(currentBgmType);
        }
        console.log(`🔊 BGM Unmuted`);
    }
}

/**
 * 効果音の音量を取得
 */
export function getSfxVolume(): number {
    return sfxVolume;
}

/**
 * 効果音の音量を設定
 * @param volume - 音量（0.0 ~ 1.0）
 */
export function updateSfxVolume(volume: number): void {
    sfxVolume = Math.max(0, Math.min(1, volume));
    console.log(`🔊 SFX Volume: ${sfxVolume}`);
}

/**
 * 効果音のミュート状態を取得
 */
export function getIsSfxMuted(): boolean {
    return isSfxMuted;
}

/**
 * 効果音のミュートを切り替え
 */
export function toggleSfxMute(): void {
    isSfxMuted = !isSfxMuted;
    console.log(isSfxMuted ? `🔇 SFX Muted` : `🔊 SFX Unmuted`);
}




