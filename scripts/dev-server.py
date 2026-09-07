"""Serve the static portfolio locally without stale HTML or CSS caches."""

from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


HOST = "127.0.0.1"
PORT = 4173
ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


if __name__ == "__main__":
    if not DIST.is_dir():
        raise SystemExit("dist/ is missing. Run `npm run build` before starting the server.")

    handler = partial(NoCacheHandler, directory=str(DIST))
    server = ThreadingHTTPServer((HOST, PORT), handler)
    print(f"Serving portfolio at http://{HOST}:{PORT}/ (cache disabled)")
    server.serve_forever()
