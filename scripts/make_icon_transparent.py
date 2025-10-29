#!/usr/bin/env python3
"""
アプリアイコンの白い背景部分を透明化するスクリプト
角丸の外側の白い余白を透明にして、紫のグラデーション背景とキャラクターのみを残す
"""

from PIL import Image
import sys

def make_white_transparent(input_path, output_path, threshold=240):
    """
    白い部分を透明化する

    Args:
        input_path: 入力画像のパス
        output_path: 出力画像のパス
        threshold: 白と判定する閾値（0-255）。この値以上のRGB値を持つピクセルを透明化
    """
    print(f"📖 Reading image: {input_path}")

    # 画像を読み込み、RGBAモードに変換
    img = Image.open(input_path)
    img = img.convert("RGBA")

    width, height = img.size
    print(f"📐 Image size: {width}x{height}")

    # ピクセルデータを取得
    pixels = img.load()

    # 透明化するピクセル数をカウント
    transparent_count = 0

    # 各ピクセルをチェック
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]

            # 白っぽいピクセル（すべてのRGB値がthreshold以上）を透明化
            if r >= threshold and g >= threshold and b >= threshold:
                pixels[x, y] = (r, g, b, 0)  # アルファチャンネルを0（完全透明）に
                transparent_count += 1

    total_pixels = width * height
    transparent_percentage = (transparent_count / total_pixels) * 100

    print(f"✨ Transparent pixels: {transparent_count:,} / {total_pixels:,} ({transparent_percentage:.2f}%)")

    # 画像を保存
    print(f"💾 Saving image: {output_path}")
    img.save(output_path, "PNG")

    print(f"✅ Done! Image saved to: {output_path}")

if __name__ == "__main__":
    # 入力ファイルと出力ファイルのパス
    input_file = "/Users/yoshidometoru/Documents/GitHub/kotoba-no-tammago/assets/images/app_icon.png"
    output_file = "/Users/yoshidometoru/Documents/GitHub/kotoba-no-tammago/assets/images/app_icon_transparent.png"

    # 閾値（240 = かなり白い色のみを透明化）
    # 必要に応じて調整可能：220-250の範囲が推奨
    threshold = 240

    print("🎨 App Icon Transparency Tool")
    print("=" * 50)
    print(f"Input:  {input_file}")
    print(f"Output: {output_file}")
    print(f"Threshold: {threshold} (RGB値がこの値以上のピクセルを透明化)")
    print("=" * 50)
    print()

    try:
        make_white_transparent(input_file, output_file, threshold)
        print("\n🎉 Success! The white background has been made transparent.")
        print(f"\nYou can now use '{output_file}' in your splash screen.")
    except Exception as e:
        print(f"\n❌ Error: {e}")
        sys.exit(1)
