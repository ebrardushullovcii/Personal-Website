from PIL import Image, ImageDraw

ref = Image.open(r"assets/references/design/personal-website.png").convert("RGB")
imp = Image.open(r"artifacts-desktop-final.png").convert("RGB")

boxes = [
    (0, 0, 1122, 390, "top"),
    (0, 370, 1122, 860, "middle"),
    (0, 830, 1122, 1170, "projects"),
    (0, 1130, 1122, 1402, "bottom"),
]

for x1, y1, x2, y2, name in boxes:
    w, h = x2 - x1, y2 - y1
    scale = 0.55
    rw, rh = int(w * scale), int(h * scale)
    left = ref.crop((x1, y1, x2, y2)).resize((rw, rh))
    right = imp.crop((x1, y1, x2, y2)).resize((rw, rh))
    canvas = Image.new("RGB", (rw * 2, rh + 24), (8, 12, 16))
    canvas.paste(left, (0, 24))
    canvas.paste(right, (rw, 24))
    d = ImageDraw.Draw(canvas)
    d.text((8, 6), f"REFERENCE {name}", fill=(230, 236, 234))
    d.text((rw + 8, 6), f"IMPLEMENTATION {name}", fill=(230, 236, 234))
    canvas.save(f"artifacts-compare-{name}.jpg", quality=82)
    medium = canvas.resize((900, int(canvas.height * 900 / canvas.width)))
    medium.save(f"artifacts-compare-{name}-900.jpg", quality=84)
