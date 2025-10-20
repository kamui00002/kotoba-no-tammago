# 🥚 ことばのたまご

**～育てて学ぶ、あなただけの英単語～**

MBTI診断で決まった専用キャラクターを育てながら英単語を学習する、育成×学習Webアプリ

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/kamui00002/kotoba-no-tamago)

[🎮 デモを見る](https://kamui00002.github.io/kotoba-no-tamago/) | [🐛 バグ報告](https://github.com/kamui00002/kotoba-no-tamago/issues)

---

## 📱 アプリの概要

「ことばのたまご」は、あなたの性格タイプに合わせた専用キャラクターと一緒に英単語を学習できるWebアプリケーションです。

### 💡 特徴

- MBTI診断であなた専用のキャラクターが決定
- 英単語クイズに正解すると経験値を獲得
- レベルアップでキャラクターが成長
- たまご → 子供 → 大人へと進化

---

## ✨ 主な機能

- 🎭 **MBTI診断（16問）**  
  4種類のキャラクター（妖精・魔法使い・騎士・発明家）
  
- 📚 **英単語クイズ**  
  3段階の難易度（初級・中級・上級）× 各30語 = 計90語
  
- 🎮 **育成システム**  
  経験値を貯めてレベルアップ、キャラクターが進化
  
- 📊 **統計機能**（HTML版）  
  学習履歴、正解率、連続学習日数を記録

---

## 🚀 使い方

### オンラインで試す

🌐 **デモ**: https://kamui00002.github.io/kotoba-no-tamago/

### ローカルで実行（React版）
```bash
# リポジトリをクローン
git clone https://github.com/kamui00002/kotoba-no-tamago.git
cd kotoba-no-tamago

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

### HTML版（依存関係なし）
```bash
# ブラウザで直接開く
open original-kotoba-full.html
```

---

## 🛠️ 技術スタック

### React版
- React 19.2.0
- TypeScript 5.8.2
- Vite 6.2.0
- Tailwind CSS
- Context API + Custom Hooks

### HTML版
- HTML5 + CSS3
- Vanilla JavaScript (ES6+)
- Lottie Web 5.12.2
- LocalStorage

---

## 📁 プロジェクト構造
```
kotoba-no-tamago/
├── README.md
├── package.json
├── original-kotoba-full.html   # HTML版
├── public/
│   └── assets/
│       ├── data/               # JSONデータ
│       │   ├── mbti_questions.json
│       │   └── words.json
│       └── images/             # 画像アセット
└── src/                        # React版
    ├── components/             # UIコンポーネント
    ├── hooks/                  # カスタムフック
    ├── context/                # 状態管理
    └── utils/                  # ユーティリティ
```

---

## 🎮 遊び方

1. **起動** → スプラッシュ画面（3秒）
2. **MBTI診断**（16問） → キャラクター決定
3. **レベル選択**（初級/中級/上級）
4. **ホーム画面** → キャラクターをタップ
5. **クイズに挑戦**（10問） → 経験値獲得
6. **レベルアップ** → 華やかな演出！

---

## 📊 データ仕様

### 経験値システム

- 初級: 10 EXP / 正解
- 中級: 20 EXP / 正解
- 上級: 30 EXP / 正解

### レベルアップ必要経験値
```
Lv.1 → Lv.2: 100 XP
Lv.2 → Lv.3: 150 XP
Lv.3 → Lv.4: 225 XP
...（1.5倍ずつ増加）
```

### 進化システム

- 🥚 Lv.1-4: たまご
- 🐣 Lv.5-14: 子供
- 🦅 Lv.15+: 大人

---

## 🔮 ロードマップ

### Phase 3（予定）
- [ ] 卵孵化アニメーション（Lottie）
- [ ] 詳細統計画面（React版）
- [ ] 設定画面の拡張

### Phase 4（予定）
- [ ] サウンドエフェクト・BGM
- [ ] 音声読み上げ（英単語発音）

### Phase 5（予定）
- [ ] PWA化（オフライン対応）
- [ ] マルチプレイヤー機能
- [ ] SNSシェア機能

---

## 🤝 コントリビューション

バグ報告や機能提案は [Issue](https://github.com/kamui00002/kotoba-no-tamago/issues) からお願いします。

### プルリクエスト手順
```bash
# 1. フォーク
# 2. ブランチ作成
git checkout -b feature/amazing-feature

# 3. コミット
git commit -m "Add: amazing feature"

# 4. プッシュ
git push origin feature/amazing-feature

# 5. プルリクエスト作成
```

---

## 📄 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) を参照

---

## 👤 作成者

**kamui00002**

- GitHub: [@kamui00002](https://github.com/kamui00002)
- Project: [kotoba-no-tamago](https://github.com/kamui00002/kotoba-no-tamago)

---

## 🙏 謝辞

- **MBTI理論**: 16Personalities
- **デザインインスピレーション**: たまごっち、デジモン、ポケモン
- **技術スタック**: React, TypeScript, Vite, Tailwind CSS

---

⭐ **このプロジェクトが気に入ったら、スターをお願いします！**

---

**作成日**: 2025年1月  
**最終更新**: 2025年1月

Made with ❤️ by kamui00002
