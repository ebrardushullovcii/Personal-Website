from PIL import Image
import sys

ref = Image.open(sys.argv[1]).convert("RGB")
imp = Image.open(sys.argv[2]).convert("RGB")
w, h = ref.size
if imp.size != (w, h):
    raise SystemExit(f"Size mismatch: {ref.size} vs {imp.size}")

total = 0
maxd = 0
gt15 = 0
gt60 = 0
for y in range(h):
    for x in range(w):
        r1, g1, b1 = ref.getpixel((x, y))
        r2, g2, b2 = imp.getpixel((x, y))
        d = abs(r1 - r2) + abs(g1 - g2) + abs(b1 - b2)
        total += d
        maxd = max(maxd, d)
        gt15 += d > 15
        gt60 += d > 60

pts = w * h
print({
    "avg_abs_sum": round(total / pts, 3),
    "max_abs_sum": maxd,
    "pct_gt15": round(gt15 / pts, 4),
    "pct_gt60": round(gt60 / pts, 4),
})
