from PIL import Image
import sys

path = sys.argv[1]
threshold = int(sys.argv[2]) if len(sys.argv) > 2 else 75
minimum = int(sys.argv[3]) if len(sys.argv) > 3 else 100
x1 = int(sys.argv[4]) if len(sys.argv) > 4 else 0
y1 = int(sys.argv[5]) if len(sys.argv) > 5 else 0
x2 = int(sys.argv[6]) if len(sys.argv) > 6 else None
y2 = int(sys.argv[7]) if len(sys.argv) > 7 else None

img = Image.open(path).convert("RGB")
w, h = img.size
x2 = w if x2 is None else x2
y2 = h if y2 is None else y2
pix = img.load()

def ranges(items):
    out = []
    for idx, cnt in items:
        if out and idx == out[-1][1] + 1:
            out[-1] = (out[-1][0], idx, max(out[-1][2], cnt))
        else:
            out.append((idx, idx, cnt))
    return out

cols = []
for x in range(x1, x2):
    cnt = 0
    for y in range(y1, y2):
        r, g, b = pix[x, y]
        if r + g + b > threshold:
            cnt += 1
    if cnt >= minimum:
        cols.append((x, cnt))

rows = []
for y in range(y1, y2):
    cnt = 0
    for x in range(x1, x2):
        r, g, b = pix[x, y]
        if r + g + b > threshold:
            cnt += 1
    if cnt >= minimum:
        rows.append((y, cnt))

print("cols", ranges(cols))
print("rows", ranges(rows))
