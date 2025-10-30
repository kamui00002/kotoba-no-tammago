// utils/soundPlayer.ts

/**
 * 音声ファイルを再生するユーティリティ
 * Web Audio APIを使用してiOSでも音量制御を可能にする
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
    OPENING = 'opening',
    HOME = 'home',
    MBTI_QUIZ = 'mbti_quiz',
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
    [BgmType.OPENING]: '/sounds/bgm/opening.mp3',
    [BgmType.HOME]: '/sounds/bgm/home.mp3',
    [BgmType.MBTI_QUIZ]: '/sounds/bgm/mbti-quiz.mp3',
    [BgmType.QUIZ]: '/sounds/bgm/quiz.mp3',
    [BgmType.RESULT]: '/sounds/bgm/result.mp3',
};

// BGMごとの音量調整（ファイルによって音量が異なるため）
const BGM_VOLUMES: Record<BgmType, number> = {
    [BgmType.OPENING]: 0.3,    // オープニング画面
    [BgmType.HOME]: 0.4,       // ホーム画面
    [BgmType.MBTI_QUIZ]: 0.25, // MBTI診断（少し小さめ）
    [BgmType.QUIZ]: 0.3,       // 英語クイズ
    [BgmType.RESULT]: 0.3,     // 結果画面
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
const DEFAULT_BGM_VOLUME = 0.5;
const DEFAULT_SFX_VOLUME = 1.0;

// 音量とミュート状態の管理
let bgmVolume = DEFAULT_BGM_VOLUME;
let sfxVolume = DEFAULT_SFX_VOLUME;
let isBgmMuted = false;
let isSfxMuted = false;

// Web Audio API関連
let audioContext: AudioContext | null = null;
let bgmGainNode: GainNode | null = null;
let bgmSource: MediaElementAudioSourceNode | null = null;

// 現在再生中のBGM
let currentBgm: HTMLAudioElement | null = null;
let currentBgmType: BgmType | null = null;

/**
 * AudioContextを初期化（ユーザーインタラクション後に呼ぶ必要がある）
 */
function initAudioContext(): void {
    if (audioContext) return;

    try {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        console.log('🎵 AudioContext initialized');
    } catch (error) {
        console.error('Failed to create AudioContext:', error);
    }
}

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
 * BGMを再生する（Web Audio API使用）
 * @param bgmType - 再生するBGMの種類
 * @param loop - ループ再生するか（デフォルト: true）
 */
export function playBgm(bgmType: BgmType, loop: boolean = true): void {
    try {
        console.log(`\n🎵 playBgm called with: ${bgmType}`);
        console.log(`   Current BGM type: ${currentBgmType}`);

        // AudioContextを初期化
        initAudioContext();

        if (!audioContext) {
            console.error('❌ AudioContext not available');
            return;
        }

        // 同じBGMが再生中なら何もしない
        if (currentBgmType === bgmType && currentBgm && !currentBgm.paused) {
            console.log(`✅ BGM already playing: ${bgmType}`);
            return;
        }

        console.log(`🎵 Switching BGM: ${currentBgmType} → ${bgmType}`);

        // 既存のBGMを停止
        if (currentBgm) {
            console.log(`🛑 Stopping current BGM`);
            currentBgm.pause();
            currentBgm.currentTime = 0;
            currentBgm = null;
        }

        // 既存のソースノードを切断
        if (bgmSource) {
            try {
                bgmSource.disconnect();
            } catch (e) {
                // すでに切断されている場合のエラーを無視
            }
            bgmSource = null;
        }

        currentBgmType = bgmType;

        // ミュート時は再生しない
        if (isBgmMuted) {
            console.log(`🔇 BGM is muted, not playing`);
            return;
        }

        // 新しいBGMを作成
        console.log(`📂 Loading BGM from: ${BGM_PATHS[bgmType]}`);
        const audio = new Audio(BGM_PATHS[bgmType]);
        audio.loop = loop;
        audio.crossOrigin = 'anonymous'; // CORSエラー回避

        // GainNodeを作成（なければ）
        if (!bgmGainNode) {
            bgmGainNode = audioContext.createGain();
            bgmGainNode.connect(audioContext.destination);
            console.log('🎚️ GainNode created and connected');
        }

        // MediaElementSourceNodeを作成
        bgmSource = audioContext.createMediaElementSource(audio);
        bgmSource.connect(bgmGainNode);

        // BGMごとの基本音量を取得
        const baseBgmVolume = BGM_VOLUMES[bgmType];
        // ユーザー設定の音量比率を適用
        const targetVolume = baseBgmVolume * bgmVolume;

        // GainNodeで音量を設定（これはiOSでも機能する）
        bgmGainNode.gain.value = targetVolume;

        console.log(`🎚️ Base BGM volume: ${baseBgmVolume.toFixed(2)}`);
        console.log(`🎚️ User volume: ${bgmVolume.toFixed(2)}`);
        console.log(`🎚️ GainNode volume: ${targetVolume.toFixed(2)}`);
        console.log(`🔁 Loop: ${loop}`);

        // BGMを再生
        audio.play().then(() => {
            console.log(`✅ BGM playback started successfully`);
        }).catch(error => {
            console.error(`❌ Failed to play BGM: ${bgmType}`, error);
        });

        currentBgm = audio;
        console.log(`✅ BGM set as current: ${bgmType}\n`);
    } catch (error) {
        console.error(`Error creating BGM: ${bgmType}`, error);
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
    }

    if (bgmSource) {
        try {
            bgmSource.disconnect();
        } catch (e) {
            // すでに切断されている場合のエラーを無視
        }
        bgmSource = null;
    }

    currentBgmType = null;
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

    if (bgmGainNode && currentBgmType) {
        if (isBgmMuted) {
            console.log('🔇 BGM is muted, not changing volume');
        } else {
            const baseBgmVolume = BGM_VOLUMES[currentBgmType];
            const targetVolume = baseBgmVolume * bgmVolume;
            
            console.log(`🎵 Setting GainNode volume to ${targetVolume.toFixed(2)}`);
            bgmGainNode.gain.value = targetVolume;
            console.log(`✅ Volume updated successfully`);
        }
    } else {
        console.log('⚠️ No GainNode or BGM is playing');
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
    console.log(`\n🔇 toggleBgmMute called`);
    console.log(`   Current state: ${isBgmMuted ? 'MUTED' : 'UNMUTED'}`);

    isBgmMuted = !isBgmMuted;

    if (bgmGainNode) {
        if (isBgmMuted) {
            // ミュート: Gainを0に
            console.log(`🔇 Setting to MUTED`);
            bgmGainNode.gain.value = 0;
            console.log(`   ✅ BGM should now be SILENT`);
        } else {
            // ミュート解除: 元の音量に戻す
            console.log(`🔊 Setting to UNMUTED`);
            if (currentBgmType) {
                const baseBgmVolume = BGM_VOLUMES[currentBgmType];
                const targetVolume = baseBgmVolume * bgmVolume;
                bgmGainNode.gain.value = targetVolume;
                console.log(`   ✅ BGM should now be AUDIBLE at ${targetVolume.toFixed(2)}`);
            }

            // BGMが再生されていない場合は再生
            if (!currentBgm || currentBgm.paused) {
                if (currentBgmType) {
                    console.log(`   Starting playback of ${currentBgmType}`);
                    playBgm(currentBgmType);
                }
            }
        }
    } else {
        console.log('⚠️ No GainNode available');
    }

    console.log(`✅ toggleBgmMute complete. New state: ${isBgmMuted ? 'MUTED' : 'UNMUTED'}\n`);
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
    console.log(`🔊 SFX Volume: ${sfxVolume.toFixed(2)}`);
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
