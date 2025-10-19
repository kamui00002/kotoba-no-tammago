// components/ExpBarView.tsx
import React from 'react';

/**
 * @props ExpBarViewProps
 * このコンポーネントが受け取るデータの方を定義します。
 * SwiftUIの `let currentExp: Int` と `let maxExp: Int` に相当します。
 */
interface ExpBarViewProps {
    currentExp: number;
    maxExp: number;
}

/**
 * @view SwiftUIの `ExpBarView` に相当する再利用可能なコンポーネント
 *
 * このコンポーネントは、経験値バーの表示に特化しています。
 * 必要なデータをPropsとして受け取ることで、アプリ内のどこでも同じUIを再利用できます。
 */
const ExpBarView: React.FC<ExpBarViewProps> = ({ currentExp, maxExp }) => {
    /**
     * @computed_property SwiftUIの `var progress: CGFloat` に相当する計算
     *
     * 受け取った経験値から、プログレスバーの幅をパーセンテージで計算します。
     * 0で割ることを防ぐためのチェックも入れています。
     */
    const progressPercentage = maxExp > 0 ? (currentExp / maxExp) * 100 : 0;

    return (
        // SwiftUIの `VStack` のように、要素を縦に並べるためのコンテナ
        <div>
            {/* 1. テキスト表示: "⭐ 120 / 200 EXP" */}
            <div className="flex justify-between text-sm font-medium text-gray-200 mb-1">
                <span>⭐ XP</span>
                <span>{currentExp} / {maxExp}</span>
            </div>

            {/* 
             * 2. バーの表示エリア
             * SwiftUIの `ZStack` と `GeometryReader` の組み合わせに相当します。
             *
             * - まず背景となる灰色のバーを配置します。
             * - その上に、進捗を示すグラデーションのバーを重ねます。
             * - `w-full` (width: 100%) が `GeometryReader` のように親の幅いっぱいに広がる役割を担います。
             */}
            <div className="w-full bg-gray-700 rounded-full h-4 relative">
                {/* 
                 * 背景バー (SwiftUIの `Rectangle().fill(.gray)`)
                 * この要素自体は、上のdivが背景色を持っているので不要ですが、
                 * 構造を明確にするためにコメントとして残します。
                 */}

                {/*
                 * 進捗バー (SwiftUIの `Rectangle().fill(LinearGradient(...)).frame(width: ...)` )
                 *
                 * - `style={{ width: `${progressPercentage}%` }}`:
                 *   これが動的なサイズ指定の核心部分です。計算したパーセンテージを直接widthに適用します。
                 *   SwiftUIの `.frame(width: geometry.size.width * progress)` と同じ考え方です。
                 *
                 * - `transition-all duration-500`:
                 *   これがアニメーションの指定です。widthプロパティが変更されたときに、
                 *   0.5秒かけて滑らかに変化します。SwiftUIの `withAnimation(.easeInOut(duration: 0.5))` に相当します。
                 */}
                <div
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                    // アクセシビリティのためのARIA属性
                    role="progressbar"
                    aria-valuenow={currentExp}
                    aria-valuemin={0}
                    aria-valuemax={maxExp}
                    aria-label="Experience points progress"
                ></div>
            </div>
        </div>
    );
};

export default ExpBarView;
