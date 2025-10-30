import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { GameState } from '../types';
import { playSound, playBgm, stopBgm, SoundType, BgmType } from '../utils/soundPlayer';

/**
 * オープニング画面コンポーネント
 * 4つの卵が順番に割れてキャラクターが現れるアニメーション
 */
const OpeningScreen: React.FC = () => {
    const { setGameState } = useGame();
    const [stage, setStage] = useState(1); // 1: ロゴ, 2: 卵登場, 3: 揺れる, 4: 割れる, 5: タイトル
    const [crackedEggs, setCrackedEggs] = useState([false, false, false, false]);

    // デバッグ: ステージ変更を監視
    useEffect(() => {
        console.log('🎬 Opening stage changed:', stage);
    }, [stage]);

    useEffect(() => {
        // オープニングBGMを再生
        console.log('🎵 Opening: Playing OPENING BGM');
        playBgm(BgmType.OPENING);

        const timers: NodeJS.Timeout[] = [];

        // ステージ1: ロゴ表示（1.5秒）
        timers.push(setTimeout(() => setStage(2), 1500));

        // ステージ2: 卵が登場して揺れる（4秒）
        timers.push(setTimeout(() => setStage(3), 4000));

        // ステージ3: 卵が順番に割れる（5秒、5.8秒、6.6秒、7.4秒）
        [0, 1, 2, 3].forEach((index, i) => {
            timers.push(setTimeout(() => {
                setCrackedEggs(prev => {
                    const newState = [...prev];
                    newState[index] = true;
                    return newState;
                });
                // 卵が割れる音は削除（効果音なし）
            }, 5000 + i * 800));
        });

        // ステージ5: タイトル表示（9.5秒）
        timers.push(setTimeout(() => setStage(5), 9500));

        // タイマーをグローバルに保存（スキップ時にクリアするため）
        (window as any).openingTimers = timers;

        // クリーンアップ
        return () => {
            timers.forEach(timer => clearTimeout(timer));
            (window as any).openingTimers = [];
            // オープニング画面を離れる時にBGMを停止
            console.log('🔇 Opening: Stopping OPENING BGM');
            stopBgm();
        };
    }, []);

    const handleStart = () => {
        playSound(SoundType.BUTTON);
        // オープニングの次はレベル選択画面へ
        // GameContextが自動的にレベル選択画面を表示するため、
        // OPENINGではない状態にする
        setGameState(GameState.HOME);
    };

    const handleSkip = () => {
        // すべてのタイマーをクリア
        const timers = (window as any).openingTimers || [];
        timers.forEach((timer: NodeJS.Timeout) => clearTimeout(timer));

        // スキップ時はステージ5（PUSHボタンがある画面）に即座に移行
        setStage(5);

        // 卵を全て割った状態にする
        setCrackedEggs([true, true, true, true]);
    };

    // 卵とキャラクターの情報
    const eggData = [
        {
            egg: '/images/eggs/infp_fairy_egg.PNG',
            character: '/images/characters/infp_fairy_happy.PNG',
            name: '妖精',
            color: 'from-pink-300 to-purple-300'
        },
        {
            egg: '/images/eggs/intp_wizard_egg.PNG',
            character: '/images/characters/intp_wizard_happy.PNG',
            name: '魔法使い',
            color: 'from-blue-300 to-indigo-300'
        },
        {
            egg: '/images/eggs/istj_knight_egg.PNG',
            character: '/images/characters/istj_knight_happy.PNG',
            name: '騎士',
            color: 'from-gray-300 to-blue-300'
        },
        {
            egg: '/images/eggs/estp_inventor_egg.PNG',
            character: '/images/characters/estp_inventor_happy.PNG',
            name: '発明家',
            color: 'from-yellow-300 to-orange-300'
        }
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 via-indigo-200 to-cyan-200 relative overflow-hidden">
            {/* 画面全体スキップエリア（ステージ5では非表示） */}
            {stage < 5 && (
                <div
                    onClick={(e) => {
                        console.log('🖱️ Skip area clicked!', e);
                        handleSkip();
                    }}
                    className="absolute inset-0 cursor-pointer"
                    style={{ zIndex: 40, pointerEvents: 'auto' }}
                />
            )}

            {/* SKIPボタン（ステージ5では非表示） */}
            {stage < 5 && (
                <motion.button
                    onClick={handleSkip}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute top-4 right-4 z-50 px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition-opacity"
                    style={{
                        fontSize: '0.875rem',
                        letterSpacing: '0.05em',
                    }}
                >
                    SKIP
                </motion.button>
            )}

            {/* 背景の装飾（ステージ5では非表示） */}
            {stage < 5 && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-white/20"
                            style={{
                                width: Math.random() * 100 + 50,
                                height: Math.random() * 100 + 50,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* ステージ1: ロゴ */}
            <AnimatePresence>
                {stage === 1 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        transition={{ duration: 0.8 }}
                        className="text-center z-10 flex flex-col items-center"
                    >
                        <motion.img
                            src="/images/app_icon.png"
                            alt="ことばのたまご"
                            className="w-48 h-48 rounded-3xl shadow-2xl mb-4"
                            animate={{
                                rotate: [0, 5, -5, 0],
                                scale: [1, 1.05, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: 'reverse',
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ステージ2-4: 卵のグリッド */}
            <AnimatePresence>
                {stage >= 2 && stage < 5 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-2 gap-8 z-10"
                    >
                        {eggData.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{
                                    scale: 1,
                                    rotate: 0,
                                    y: stage === 3 ? [0, -10, 0] : 0,
                                }}
                                transition={{
                                    scale: { duration: 0.6, delay: index * 0.15 },
                                    y: stage === 3 ? {
                                        duration: 0.5,
                                        repeat: Infinity,
                                        repeatType: 'reverse',
                                        delay: index * 0.1,
                                    } : {},
                                }}
                                className="relative w-32 h-32 flex items-center justify-center"
                            >
                                {/* 卵 */}
                                <AnimatePresence>
                                    {!crackedEggs[index] && (
                                        <motion.img
                                            src={item.egg}
                                            alt={`${item.name}の卵`}
                                            className="w-full h-full object-contain drop-shadow-lg"
                                            exit={{
                                                scale: 0,
                                                rotate: 360,
                                                opacity: 0,
                                            }}
                                            transition={{ duration: 0.6 }}
                                        />
                                    )}
                                </AnimatePresence>

                                {/* キャラクター */}
                                <AnimatePresence>
                                    {crackedEggs[index] && (
                                        <motion.div
                                            initial={{ scale: 0, rotate: -180, opacity: 0 }}
                                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                            transition={{ duration: 0.6 }}
                                            className="absolute"
                                        >
                                            <img
                                                src={item.character}
                                                alt={item.name}
                                                className="w-32 h-32 object-contain drop-shadow-2xl"
                                            />
                                            {/* キラキラエフェクト */}
                                            {[...Array(8)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-300 rounded-full"
                                                    initial={{ scale: 0, x: 0, y: 0 }}
                                                    animate={{
                                                        scale: [0, 1, 0],
                                                        x: Math.cos((i * Math.PI) / 4) * 60,
                                                        y: Math.sin((i * Math.PI) / 4) * 60,
                                                        opacity: [1, 0],
                                                    }}
                                                    transition={{ duration: 0.8, delay: 0.2 }}
                                                />
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ステージ5: 背景画像 */}
            <AnimatePresence>
                {stage === 5 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 z-0"
                        style={{
                            background: 'linear-gradient(135deg, #fce7f3 0%, #e9d5ff 50%, #dbeafe 100%)'
                        }}
                    >
                        <img
                            src="/images/backgrounds/opening_background.png"
                            alt="背景"
                            className="w-full h-full"
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center'
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ステージ5: タイトルとTAP TO START */}
            <AnimatePresence>
                {stage === 5 && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center z-10 flex flex-col items-center relative"
                    >
                        {/* アプリアイコン */}
                        <motion.img
                            src="/images/app_icon.png"
                            alt="ことばのたまご"
                            className="w-48 h-48 rounded-3xl shadow-2xl mb-6"
                            initial={{ scale: 0, rotate: -360 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 2.0, type: 'spring', stiffness: 50, damping: 15 }}
                            style={{
                                clipPath: 'inset(0 round 24px)',
                            }}
                        />

                        {/* タイトルテキスト - キラキラ */}
                        <motion.h1
                            className="font-black mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            style={{
                                fontSize: 'clamp(2rem, 8vw, 3rem)',
                                textShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6), 0 0 30px rgba(147,51,234,0.4), 4px 4px 8px rgba(0,0,0,0.3)',
                                background: 'linear-gradient(90deg, #ec4899 0%, #f97316 25%, #eab308 50%, #22c55e 75%, #3b82f6 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                whiteSpace: 'nowrap',
                                padding: '0 20px',
                                maxWidth: '100%',
                                filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.6))',
                            }}
                        >
                            🥚 ことばのたまご 🥚
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="font-extrabold mb-8"
                            style={{
                                fontSize: 'clamp(0.85rem, 3.5vw, 1.3rem)',
                                lineHeight: '1.2',
                                whiteSpace: 'nowrap',
                                background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 33%, #3b82f6 66%, #06b6d4 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                textShadow: '0 0 20px rgba(168,85,247,0.5)',
                                filter: 'drop-shadow(0 2px 8px rgba(168,85,247,0.3)) drop-shadow(0 0 15px rgba(236,72,153,0.2))',
                                letterSpacing: '0.02em',
                                padding: '0 10px',
                            }}
                        >
                            ✨ 英語学習で、あなただけの相棒を育てよう！✨
                        </motion.p>

                        {/* TAP TO START ボタン */}
                        <motion.button
                            onClick={handleStart}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-16 py-6 transition-all duration-300 relative"
                            style={{
                                background: 'transparent',
                                border: 'none',
                                fontSize: 'clamp(1.25rem, 5vw, 1.75rem)',
                                fontWeight: '900',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                whiteSpace: 'nowrap',
                                cursor: 'pointer',
                            }}
                        >
                            <span
                                className="relative z-10 text-white"
                                style={{
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.4), 0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3)',
                                    filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.6))',
                                }}
                            >
                                TAP TO START ✨
                            </span>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default OpeningScreen;

