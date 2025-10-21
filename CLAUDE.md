# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

**ことばのたまご (Kotoba no Tamago)** は、MBTI性格診断とキャラクター育成を組み合わせた英単語学習Webアプリです。ユーザーはMBTI診断を完了すると専用キャラクター（妖精、魔法使い、騎士、発明家）が決まり、英単語クイズに正解して経験値を獲得し、キャラクターをたまご → 子供 → 大人へと進化させます。

- **デモ**: https://kamui00002.github.io/kotoba-no-tamago/
- **技術スタック**: React 19.2.0 + TypeScript 5.8.2 + Vite 6.2.0 + Tailwind CSS
- **状態管理**: Context API + カスタムフック
- **データ永続化**: localStorage（ブラウザベース）

## 開発コマンド

```bash
# 依存関係のインストール
npm install

# 開発サーバーを起動（ポート3000で起動）
npm run dev

# プロダクションビルド
npm run build

# ビルドのプレビュー
npm run preview
```

アプリはデフォルトで `localhost:3000` で起動します。このプロジェクトにはテストは設定されていません。

## アーキテクチャ概要

### 状態管理アーキテクチャ

このアプリは **Context API + カスタムフックパターン** を使用しており、SwiftUIの `@EnvironmentObject` と `@ObservableObject` パターンに似ています：

1. **GameContext** (`context/GameContext.tsx`): 中央状態管理
   - グローバル状態を管理: `GameState`, `UserProgress`, クイズ状態
   - アクションを提供: `completeMbtiTest()`, `startQuiz()`, `finishQuiz()`, `addExperience()`, `resetGame()`
   - `storageManager` 経由で自動的に localStorage に状態を保存

2. **カスタムフック** (`hooks/`): MVVMパターンに従ったロジック分離
   - `useMbtiTest.ts`: MBTI質問の読み込み、回答処理、MBTIタイプの計算
   - `useQuiz.ts`: 単語の読み込み、クイズ問題の生成、スコアの追跡
   - コンポーネントは表示ロジックのみに専念

### データフロー

```
App.tsx (Provider)
  └─> GameContext (グローバル状態)
       ├─> コンポーネントが useGame() 経由で利用
       ├─> カスタムフック (useMbtiTest, useQuiz) が機能ロジックを管理
       └─> storageManager が localStorage に永続化
```

### ゲーム状態マシン

アプリは以下の状態を遷移します（`types.ts` で定義）：

1. **HOME**: キャラクターとレベル選択を表示するメイン画面
2. **QUIZ**: 英単語クイズ中（10問）
3. **RESULT**: クイズ結果と獲得XPを表示
4. **MBTI_RESULT**: MBTI診断後に決定されたキャラクターを表示

初期状態は localStorage に `userProgress.mbtiType` が存在するかどうかで決まります。null の場合、ユーザーはMBTI診断から始めます。

### 経験値とレベルアップシステム

`constants.ts` で定義：

- **正解時の獲得XP**: 初級: 10, 中級: 20, 上級: 30
- **レベル進行**: レベルごとに必要XPが1.5倍に増加（Lv2: 100 XP, Lv3: 150 XP など）
- **進化段階**:
  - たまご: レベル 1-4
  - 子供: レベル 5-14
  - 大人: レベル 15以上
- **レベルアップアニメーション**: `userProgress.justLeveledUp` フラグがパーティクルエフェクトをトリガー、1.5秒後に自動リセット

### キャラクターシステム

MBTIタイプは4つのキャラクター原型にマッピングされます（`constants.ts`）：

- **Fairy（妖精）**: NFタイプ (INFP, INFJ, ENFP, ENFJ)
- **Wizard（魔法使い）**: NTタイプ (INTP, INTJ, ENTP, ENTJ)
- **Knight（騎士）**: SJタイプ (ISFJ, ISTJ, ESFJ, ESTJ)
- **Inventor（発明家）**: SPタイプ (ISFP, ISTP, ESFP, ESTP)

各キャラクターには関連するメタデータがあります：名前、称号、説明文、グラデーションカラー。

## ファイル構造

```
kotoba-no-tamago/
├── index.tsx                    # エントリーポイント（React 19でAppをレンダリング）
├── App.tsx                      # ルーターコンポーネント（画面遷移を管理）
├── types.ts                     # TypeScript型定義
├── constants.ts                 # ゲーム定数（XP率、キャラクターマッピング）
├── vite.config.ts               # Vite設定（ポート3000、パスエイリアス）
│
├── context/
│   └── GameContext.tsx          # グローバル状態プロバイダー（Context API）
│
├── hooks/
│   ├── useMbtiTest.ts           # MBTI診断ロジック
│   └── useQuiz.ts               # クイズロジック
│
├── components/                  # Reactコンポーネント（表示層）
│   ├── SplashScreen.tsx         # スプラッシュ画面
│   ├── MbtiTest.tsx             # MBTI診断画面
│   ├── MbtiResultScreen.tsx     # MBTI結果画面
│   ├── HomeScreen.tsx           # ホーム画面
│   ├── Quiz.tsx                 # クイズ画面
│   ├── ResultScreen.tsx         # 結果画面
│   ├── ExpBarView.tsx           # 経験値バー
│   └── ParticleEffect.tsx       # パーティクルエフェクト
│
├── utils/
│   ├── storageManager.ts        # localStorage ラッパー（保存/読み込み/リセット）
│   ├── wordUtils.ts             # クイズ問題生成
│   └── imageUtils.ts            # 画像ユーティリティ
│
└── assets/
    ├── data/
    │   ├── mbti_questions.json  # 16問のMBTI質問
    │   └── words.json           # 90個の英単語（難易度ごとに30語）
    └── images/                  # 各進化段階のキャラクタースプライト
```

## 重要な実装の詳細

### localStorage での永続化

すべてのユーザー進捗は、GameContext で `setUserProgress()` が呼ばれると自動的に localStorage に保存されます。`storageManager` モジュール（`utils/storageManager.ts`）がシリアライゼーション/デシリアライゼーションを処理します。

**キー**: `userProgress`

**構造**: JSON文字列化された `UserProgress` オブジェクト

アプリ起動時に `GameContext` が保存された進捗を読み込んで状態を初期化します。

### クイズ生成

英単語クイズは動的に生成されます（`utils/wordUtils.ts`）：

1. 選択された難易度で単語をフィルタリング
2. シャッフルして10個のランダムな単語を選択
3. 各単語について、`word.meaning` + `word.wrongChoices` から選択肢を作成
4. 選択肢をシャッフルして位置をランダム化

### MBTI計算

`useMbtiTest` フックは4つの軸（E/I, N/S, F/T, P/J）で回答を集計し、各軸の多数決で4文字のMBTIタイプを生成します。

### レベルアップアニメーションのタイミング

`addExperience()` がレベルアップを引き起こすと、`justLeveledUp` フラグが true に設定されます。GameContext の `useEffect` が1500ms後（パーティクルアニメーションの時間）に自動的に false にリセットします。

### デュアル実装

このプロジェクトには2つのバージョンがあります：

- **React版**（メインコードベース）：完全な TypeScript + React 実装
- **HTML版**（`original-kotoba-full.html`）：同一機能を持つスタンドアロンのバニラJavaScript版

機能変更を行う際は、両方のバージョンの更新が必要かどうかを検討してください。

## 開発ノート

- このアプリは React 19.2.0 を使用しており、React 18 からの破壊的変更がある可能性があります
- Vite設定でパスエイリアス `@` がプロジェクトルートを指すように定義されています
- `GEMINI_API_KEY` の環境変数を定義できます（ただし現在コア機能では未使用）
- すべてのアセットは `/assets/` ディレクトリから提供されます（`/public/` ではありません）
- コンポーネントは Tailwind CSS でスタイリングされており、カスタムアニメーションが設定ファイルで定義されています
