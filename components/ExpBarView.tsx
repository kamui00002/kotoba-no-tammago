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
    const progressPercentage = maxExp > 0 ? (currentExp / maxExp) * 100 : 0;

    return (
        <div>
            <div className="flex justify-between text-sm font-medium text-gray-800 mb-1">
                <span>⭐ XP</span>
                <span>{currentExp} / {maxExp}</span>
            </div>
            {/* 
             * @animation 経験値バーのアニメーション
             *
             * 1. 背景バー (ZStackの奥)
             * `w-full bg-gray-700` が背景のバーを定義します。
             * `w-full` は SwiftUI の `GeometryReader` のように親の幅いっぱいに広がる役割をします。
             *
             * 2. 進捗バー (ZStackの手前)
             * `style={{ width: ... }}` で進捗率に応じてバーの幅を動的に変更します。
             *
             * 3. アニメーションの適用
             * `transition-all duration-500` というクラスが、SwiftUIの 
             * `.animation(.easeInOut(duration: 0.5), value: animatedProgress)` に相当します。
             * これにより、`width`プロパティが変更されるたびに、0.5秒かけて滑らかに変化します。
             * Reactでは、このように「状態変化」と「CSSトランジション」を組み合わせるのが一般的なアニメーション実装です。
             */}
            <div className="w-full bg-gray-700 rounded-full h-4 relative">
                <div
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
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