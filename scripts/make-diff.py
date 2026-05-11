from PIL import Image, ImageChops

ref = Image.open(r"assets/references/design/personal-website.png").convert("RGB")
imp = Image.open(r"artifacts-website-viewport-3.png").convert("RGB")
diff = ImageChops.difference(ref, imp)
diff = diff.point(lambda p: min(255, p * 4))
diff.save(r"artifacts-diff-v3.png")
