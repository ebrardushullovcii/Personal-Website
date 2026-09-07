"""Create a reusable side-by-side comparison for two equal-size screenshots."""

from argparse import ArgumentParser
from pathlib import Path

from PIL import Image, ImageDraw


def parse_args():
    parser = ArgumentParser(
        description="Place two equal-size screenshots side by side for visual review."
    )
    parser.add_argument("reference", type=Path, help="Reference image path")
    parser.add_argument("implementation", type=Path, help="Implementation image path")
    parser.add_argument("output", type=Path, help="Output PNG or JPEG path")
    parser.add_argument(
        "--max-width",
        type=int,
        default=1800,
        help="Maximum output width; images are scaled together (default: 1800)",
    )
    parser.add_argument("--reference-label", default="REFERENCE")
    parser.add_argument("--implementation-label", default="IMPLEMENTATION")
    return parser.parse_args()


def main():
    args = parse_args()
    if args.max_width <= 0:
        raise SystemExit("--max-width must be greater than zero")

    reference = Image.open(args.reference).convert("RGB")
    implementation = Image.open(args.implementation).convert("RGB")
    if reference.size != implementation.size:
        raise SystemExit(
            f"Size mismatch: reference is {reference.size}, "
            f"implementation is {implementation.size}"
        )

    header_height = 30
    natural_width = reference.width * 2
    scale = min(1.0, args.max_width / natural_width)
    image_width = max(1, round(reference.width * scale))
    image_height = max(1, round(reference.height * scale))
    if scale < 1:
        size = (image_width, image_height)
        reference = reference.resize(size, Image.Resampling.LANCZOS)
        implementation = implementation.resize(size, Image.Resampling.LANCZOS)

    canvas = Image.new("RGB", (image_width * 2, image_height + header_height), (8, 12, 16))
    canvas.paste(reference, (0, header_height))
    canvas.paste(implementation, (image_width, header_height))

    draw = ImageDraw.Draw(canvas)
    draw.text((9, 9), args.reference_label, fill=(230, 236, 234))
    draw.text((image_width + 9, 9), args.implementation_label, fill=(230, 236, 234))
    draw.line((image_width, 0, image_width, canvas.height), fill=(86, 110, 112), width=1)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    save_options = {"quality": 90} if args.output.suffix.lower() in {".jpg", ".jpeg"} else {}
    canvas.save(args.output, **save_options)
    print(f"Wrote {args.output} ({canvas.width}x{canvas.height})")


if __name__ == "__main__":
    main()
