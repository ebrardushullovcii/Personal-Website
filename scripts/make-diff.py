"""Create an amplified pixel-difference image for two equal-size screenshots."""

from argparse import ArgumentParser
from pathlib import Path

from PIL import Image, ImageChops


def parse_args():
    parser = ArgumentParser(
        description="Create an amplified visual diff for two equal-size images."
    )
    parser.add_argument("reference", type=Path, help="Reference image path")
    parser.add_argument("implementation", type=Path, help="Implementation image path")
    parser.add_argument("output", type=Path, help="Output image path")
    parser.add_argument(
        "--gain",
        type=float,
        default=4.0,
        help="Brightness multiplier applied to differing pixels (default: 4)",
    )
    return parser.parse_args()


def main():
    args = parse_args()
    if args.gain <= 0:
        raise SystemExit("--gain must be greater than zero")

    reference = Image.open(args.reference).convert("RGB")
    implementation = Image.open(args.implementation).convert("RGB")
    if reference.size != implementation.size:
        raise SystemExit(
            f"Size mismatch: reference is {reference.size}, "
            f"implementation is {implementation.size}"
        )

    diff = ImageChops.difference(reference, implementation)
    diff = diff.point(lambda value: min(255, round(value * args.gain)))
    args.output.parent.mkdir(parents=True, exist_ok=True)
    diff.save(args.output)
    print(f"Wrote {args.output} ({reference.width}x{reference.height}, gain {args.gain:g}x)")


if __name__ == "__main__":
    main()
