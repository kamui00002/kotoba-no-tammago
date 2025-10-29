# ことばのたまご - プロジェクトサマリー

## 📱 プロジェクト概要

**プロジェクト名**: ことばのたまご (Kotoba no Tamago)  
**プラットフォーム**: iOS (Capacitor 7 + React 19)  
**目的**: MBTI診断とクイズゲームを組み合わせた、キャラクター育成型の英語学習アプリ  
**対象ユーザー**: 日本語話者（英語学習者）  
**現在のステータス**: TestFlight内部テスト中

---

## 🎯 主要機能

### 1. オープニング画面 ✨
- 4つの卵が孵化するアニメーション演出
- アプリアイコンがゆっくり回転しながら登場
- カラフルなタイトルグラデーション
- レスポンシブデザイン対応
- 画面全体タップでスキップ可能
- オープニングBGM再生

### 2. 学習レベル選択 📊
- **初級**: ひらがな表示（中学英語・日常英単語）
- **中級**: 漢字表示（高校英語・ビジネス英単語）
- **上級**: 漢字表示（大学英語・専門英単語）

### 3. MBTI診断 🧪
- 16問の性格診断テスト
- 4つの軸を判定（I/E, N/S, F/T, P/J）
- 16種類のMBTIタイプに対応
- 4キャラクターへの自動マッピング
  - **妖精** (Fairy): INFP, INFJ, ENFP, ENFJ
  - **魔法使い** (Wizard): INTP, INTJ, ENTP, ENTJ
  - **騎士** (Knight): ISFJ, ISTJ, ESFJ, ESTJ
  - **発明家** (Inventor): ISFP, ISTP, ESFP, ESTP

### 4. MBTI結果画面 🎊
- 選択されたキャラクターの紹介
- キャラクタータイプと説明表示
- 初級レベル選択時はひらがな表示
- BGM演出

### 5. ホーム画面 🏠
- キャラクター表示（卵 → 基本形 → 進化形）
- レベルとXP進捗バー
- 設定、情報、統計モーダル
- ホームBGM再生

### 6. クイズゲーム 📝
- 英単語4択クイズ（10問）
- 難易度別XP獲得
  - 初級: 10XP
  - 中級: 20XP
  - 上級: 30XP
- 正解時のサウンドエフェクト
- リアルタイムXP更新

### 7. 結果画面 🎉
- スコア表示
- レベルアップアニメーション
- 進化エフェクト（Lottie）
- リザルトBGM

### 8. サウンドシステム 🔊
- BGM（オープニング、ホーム、MBTI診断、クイズ、リザルト）
- SFX（ボタン、正解、不正解、レベルアップ）
- 音量調整（BGM・SFX個別）
- ミュート機能

### 9. 設定機能 ⚙️
- BGM/SFX音量スライダー
- ミュートボタン
- データリセット機能

---

## 🏗️ 技術スタック

### フロントエンド
- **React 19**: UIライブラリ
- **TypeScript**: 型安全性
- **Tailwind CSS**: スタイリング
- **Framer Motion**: アニメーション
- **Vite**: ビルドツール

### モバイル
- **Capacitor 7**: ネイティブラッパー
- **iOS**: ターゲットプラットフォーム
- **Xcode**: iOS開発環境

### 状態管理
- **React Context API**: グローバル状態管理
- **Custom Hooks**: ロジック分離（MVVM）
- **Local Storage**: データ永続化

### アニメーション
- **Lottie**: JSON ベースのアニメーション
- **Framer Motion**: React コンポーネントアニメーション

---

## 📂 プロジェクト構造

```
/
├── components/          # Reactコンポーネント
│   ├── OpeningScreen.tsx        # オープニング画面 ✨
│   ├── LevelSelectScreen.tsx    # レベル選択画面
│   ├── MbtiTest.tsx             # MBTI診断画面
│   ├── MbtiResultScreen.tsx     # MBTI結果画面
│   ├── HomeScreen.tsx           # ホーム画面
│   ├── Quiz.tsx                 # クイズ画面
│   ├── ResultScreen.tsx         # 結果画面
│   ├── CharacterView.tsx        # キャラクター表示
│   ├── ExpBarView.tsx           # 経験値バー
│   ├── SettingsModal.tsx        # 設定モーダル
│   ├── InfoModal.tsx            # 情報モーダル
│   ├── StatsModal.tsx           # 統計モーダル
│   └── LottieAnimation.tsx      # Lottieアニメーション
├── hooks/               # カスタムフック
│   ├── useMbtiTest.ts           # MBTI診断ロジック
│   ├── useQuiz.ts               # クイズロジック
│   ├── useHomeScreen.ts         # ホーム画面ロジック
│   └── useTextDisplay.ts        # テキスト変換ロジック
├── context/             # React Context
│   └── GameContext.tsx          # グローバル状態管理
├── utils/               # ユーティリティ
│   ├── soundPlayer.ts           # サウンド再生管理
│   ├── textConverter.ts         # ひらがな変換
│   ├── imageUtils.ts            # 画像パス管理
│   ├── storageManager.ts        # ローカルストレージ
│   └── wordUtils.ts             # 単語ユーティリティ
├── assets/              # 静的アセット
│   ├── data/
│   │   ├── mbti_questions.json  # MBTI診断質問
│   │   └── words.json           # 英単語データ
│   ├── images/
│   │   ├── backgrounds/         # 背景画像
│   │   ├── characters/          # キャラクター画像
│   │   ├── eggs/                # 卵画像
│   │   └── icon/                # アプリアイコン
│   ├── sounds/
│   │   ├── bgm/                 # BGMファイル
│   │   └── sfx/                 # SFXファイル
│   └── lottie/                  # Lottieアニメーション
├── types.ts             # TypeScript型定義
├── constants.ts         # 定数定義
└── App.tsx              # メインアプリ
```

---

## 🎨 デザインシステム

### カラーパレット

#### キャラクター別グラデーション
- **妖精**: `from-green-700 to-teal-800`
- **魔法使い**: `from-blue-800 to-purple-900`
- **騎士**: `from-gray-700 to-blue-800`
- **発明家**: `from-orange-700 to-yellow-800`

#### UI カラー
- **プライマリ**: 紫 (`purple-500`, `purple-600`)
- **成功**: 緑 (`green-500`)
- **エラー**: 赤 (`red-500`)
- **警告**: 黄色 (`yellow-500`)
- **背景**: グラデーション (`from-pink-200 to-purple-300`)

### タイポグラフィ
- **メインフォント**: システムデフォルト（日本語対応）
- **レスポンシブサイズ**: `clamp()` 関数を活用
  - タイトル: `clamp(2rem, 8vw, 3rem)`
  - サブタイトル: `clamp(1rem, 4vw, 1.5rem)`
  - ボタン: `clamp(1.25rem, 5vw, 1.75rem)`

### アニメーション
- **フェードイン**: `opacity: 0 → 1`
- **スライドイン**: `y: 20 → 0`
- **回転**: `rotate: -360deg → 0deg`
- **スケール**: `scale: 0.9 → 1`
- **バネエフェクト**: `type: 'spring'`

---

## 🔧 開発ワークフロー

### ビルドコマンド
```bash
# Web版ビルド
npm run build

# iOSと同期
npx cap sync ios

# Xcodeを開く
npx cap open ios

# 一括実行
npm run ios:build
```

### Git ワークフロー
```bash
# ステージング
git add -A

# コミット（日本語）
git commit -m "機能: オープニング画面を実装"

# プッシュ
git push origin main
```

### TestFlight デプロイ
1. Xcodeでビルド番号をインクリメント
2. アーカイブ作成
3. App Store Connectにアップロード
4. TestFlightで内部テスト配信

---

## 📊 データモデル

### UserProgress
```typescript
interface UserProgress {
    mbtiType: MbtiType | null;           // MBTI診断結果
    characterType: CharacterType | null; // キャラクタータイプ
    level: number;                        // レベル（1〜∞）
    xp: number;                           // 現在のXP
    xpToNextLevel: number;                // 次のレベルまでのXP
    evolutionStage: EvolutionStage;       // 進化段階（EGG, BASIC, EVOLVED）
}
```

### GameState
```typescript
enum GameState {
    OPENING = 'OPENING',           // オープニング画面
    HOME = 'HOME',                 // ホーム画面
    QUIZ = 'QUIZ',                 // クイズ画面
    RESULT = 'RESULT',             // 結果画面
    MBTI_RESULT = 'MBTI_RESULT',   // MBTI結果画面
}
```

### Difficulty
```typescript
enum Difficulty {
    BEGINNER = 'BEGINNER',         // 初級（ひらがな）
    INTERMEDIATE = 'INTERMEDIATE', // 中級（漢字）
    ADVANCED = 'ADVANCED',         // 上級（漢字）
}
```

---

## 🎵 サウンドシステム

### BGM
- **opening.mp3**: オープニング画面（音量: 0.3）
- **home.mp3**: ホーム画面（音量: 0.4）
- **mbti-quiz.mp3**: MBTI診断画面（音量: 0.25）
- **quiz.mp3**: クイズ画面（音量: 0.3）
- **result.mp3**: 結果画面（音量: 0.3）

### SFX
- **button.wav**: ボタンクリック
- **correct.wav**: 正解
- **wrong.wav**: 不正解
- **levelup.wav**: レベルアップ
- **evolve.wav**: 進化

### 音量管理
- BGM音量: 0〜100%（スライダー）
- SFX音量: 0〜100%（スライダー）
- ミュートボタン（BGM/SFX個別）
- 音量設定は自動保存

---

## 🐛 デバッグ＆トラブルシューティング

### よくある問題

#### 1. 画像が表示されない
- **原因**: パスが間違っている、または拡張子が小文字
- **解決**: `/images/` から始まるパスを使用、`.PNG` を使用

#### 2. JSONが読み込めない
- **原因**: パスが `/assets/data/` になっている
- **解決**: `/data/` に変更

#### 3. 真っ暗な画面（iOS）
- **原因**: `CAPBridgeViewController` が初期化されていない
- **解決**: `SceneDelegate.swift` で `CAPBridgeViewController()` を設定

#### 4. BGM音量が変わらない
- **原因**: フェードイン中に音量が上書きされる
- **解決**: フェードインをキャンセルして即座に音量設定

#### 5. レスポンシブデザインが効かない
- **原因**: 固定サイズが設定されている
- **解決**: `clamp()` 関数を使用

---

## 📈 今後の改善案

### 短期（1-2週間）
- [ ] オープニング動画の最適化
- [ ] BGMのループポイント調整
- [ ] クイズ問題数の増加（難易度別）
- [ ] キャラクターアニメーションの追加

### 中期（1-2ヶ月）
- [ ] 複数キャラクター所持機能
- [ ] デイリーミッション
- [ ] アチーブメントシステム
- [ ] フレンド機能

### 長期（3ヶ月以降）
- [ ] Android版対応
- [ ] オンラインランキング
- [ - [ ] ボイス機能（音声読み上げ）
- [ ] 学習履歴グラフ表示
- [ ] 英語以外の言語対応

---

## 📝 開発ルール

### コーディング規約
1. **変更前に95%の確信を持つまで質問する**
2. **デバッグログとコメントを必ず追加する**
3. **適用したルールを明示的に記載する**
4. **コードの重複を避け、既存の実装を確認する**
5. **シンプルな解決策を優先する**

### Gitコミットメッセージ
- 日本語で記述
- 変更内容を明確に
- 箇条書きで詳細を記載

```
機能: オープニング画面を実装

- 4つの卵が孵化するアニメーション
- アプリアイコンの回転演出
- スキップ機能の追加
- レスポンシブデザイン対応

適用ルール:
- デバッグログとコメントを追加
- シンプルな解決策を優先
```

---

## 👥 チーム

- **開発者**: yoshidometoru
- **AIアシスタント**: Claude (Anthropic)
- **プロジェクト開始**: 2025年10月

---

## 📄 ライセンス

このプロジェクトは個人開発プロジェクトです。

---

## 🔗 リンク

- **GitHub**: https://github.com/kamui00002/kotoba-no-tammago
- **TestFlight**: （内部テスト中）
- **App Store**: （未公開）

---

**最終更新**: 2025年10月30日  
**バージョン**: 1.0.0  
**ビルド番号**: 1  
**ステータス**: ✅ オープニング画面完成、MBTI診断動作確認完了

