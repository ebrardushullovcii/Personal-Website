"""Create the privacy-safe public resume from rendered pages kept outside Git.

Install the optional dependencies from ``scripts/requirements-resume.txt`` and
pass a private directory containing ``page1.png`` through ``page3.png``. The
output is rasterized so removed contact metadata cannot survive in a hidden PDF
text layer or content stream.
"""

import argparse
from io import BytesIO
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.utils import ImageReader
    from reportlab.pdfgen import canvas
except ModuleNotFoundError as error:
    raise SystemExit(
        "Missing optional resume dependencies. Run "
        "`python -m pip install -r scripts/requirements-resume.txt`."
    ) from error


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT = ROOT / "assets" / "resume" / "Ebrar-Dushullovci-Resume.pdf"


def font(size: int, *, bold: bool = False) -> ImageFont.FreeTypeFont:
    filename = "segoeuib.ttf" if bold else "segoeui.ttf"
    return ImageFont.truetype(str(Path("C:/Windows/Fonts") / filename), size)


def sanitized_first_page(source_dir: Path) -> Image.Image:
    page = Image.open(source_dir / "page1.png").convert("RGB")
    draw = ImageDraw.Draw(page)

    # Remove the DOB, nationality, phone, personal email, and home address.
    draw.rectangle((0, 51, page.width, 146), fill="#ffffff")

    ink = "#343a40"
    accent = "#4f5962"
    draw.text((15, 65), "FULL-STACK SOFTWARE ENGINEER  |  REMOTE / EUROPE", fill=ink, font=font(15, bold=True))
    draw.text(
        (15, 98),
        "github.com/ebrardushullovcii  |  hello@ebrar.dev",
        fill=accent,
        font=font(14),
    )
    return page


def pages(source_dir: Path) -> list[Image.Image]:
    return [
        sanitized_first_page(source_dir),
        Image.open(source_dir / "page2.png").convert("RGB"),
        Image.open(source_dir / "page3.png").convert("RGB"),
    ]


def build_pdf(source_dir: Path, output: Path) -> None:
    required = ("page1.png", "page2.png", "page3.png")
    missing = [name for name in required if not (source_dir / name).is_file()]
    if missing:
        raise SystemExit(f"Missing rendered private resume pages in {source_dir}: {', '.join(missing)}")

    output.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(output), pagesize=A4, pageCompression=1)
    page_width, page_height = A4

    for page in pages(source_dir):
        encoded = BytesIO()
        page.save(encoded, format="PNG", optimize=True)
        encoded.seek(0)
        pdf.drawImage(ImageReader(encoded), 0, 0, width=page_width, height=page_height)
        pdf.showPage()

    pdf.save()
    print(f"Created {output}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--source-dir",
        required=True,
        type=Path,
        help="Private directory containing page1.png through page3.png",
    )
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()
    build_pdf(args.source_dir.resolve(), args.output.resolve())
