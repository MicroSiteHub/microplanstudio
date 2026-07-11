import argparse
from pathlib import Path

import fitz

def convert_pdf_page_to_png(pdf_path: Path, output_path: Path, page_number: int, scale: float) -> None:
    if not pdf_path.exists():
        raise FileNotFoundError(f"PDF file not found: {pdf_path}")

    with fitz.open(pdf_path) as document:
        if document.page_count == 0:
            raise ValueError(f"PDF has no pages: {pdf_path}")
        if page_number < 1 or page_number > document.page_count:
            raise ValueError(f"Page number {page_number} is out of range for PDF with {document.page_count} pages: {pdf_path}")

        matrix = fitz.Matrix(scale, scale)
        page = document[page_number - 1]
        pixmap = page.get_pixmap(matrix=matrix, alpha=False)
        pixmap.save(output_path)

        print(f"Converted page {page_number} from {pdf_path} to {output_path}. ")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Convert a single page from a guide PDF to an image file."
    )
    parser.add_argument("input_path", help="Path to the input PDF file")
    parser.add_argument("output_path", help="Path to the output image file")
    return parser


def main() -> int:
    args = build_parser().parse_args()
    convert_pdf_page_to_png(
        pdf_path=Path(args.input_path),
        output_path=Path(args.output_path),
        page_number=1,
        scale=2.0
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
