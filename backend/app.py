from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import json
import urllib.parse
import mimetypes
import os

PROJECT_ROOT  = Path(__file__).resolve().parent.parent
FRONTEND_ROOT = PROJECT_ROOT / "frontend"
PAGES_ROOT    = FRONTEND_ROOT / "pages"


class SapSandboxHandler(SimpleHTTPRequestHandler):

    def translate_path(self, path):
        # Strip query string (cache busting like ?v=3.0)
        path = path.split("?")[0]
        # URL-decode (e.g. %20 → space)
        path = urllib.parse.unquote(path)
        path = path.lstrip("/")

        # Root → index
        if path in ("", "pages/index.html", "frontend/pages/index.html"):
            return str(PAGES_ROOT / "index.html")

        # /frontend/css/... or /frontend/js/... → strip the "frontend/" prefix
        # This is what the browser sends because the HTML is served from /frontend/pages/
        # and the CSS/JS links are ../css/  ../js/ which resolve to /frontend/css/ etc.
        if path.startswith("frontend/"):
            rel = path[len("frontend/"):]
            candidate = FRONTEND_ROOT / rel
            if candidate.exists():
                return str(candidate)

        # Direct lookup under FRONTEND_ROOT (e.g. css/styles.css, js/app/main.js)
        candidate = FRONTEND_ROOT / path
        if candidate.exists():
            return str(candidate)

        # Lookup under PAGES_ROOT
        candidate2 = PAGES_ROOT / path
        if candidate2.exists():
            return str(candidate2)

        # Final fallback → index (SPA behaviour)
        return str(PAGES_ROOT / "index.html")

    def do_GET(self):
        # Health-check endpoint
        if self.path.split("?")[0] == "/api/health":
            payload = {
                "status": "ok",
                "service": "sap-skillbridge-sandbox",
                "mode": "local-development"
            }
            body = json.dumps(payload).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return

        super().do_GET()

    def guess_type(self, path):
        # Ensure correct MIME for JS modules
        base, ext = os.path.splitext(path)
        if ext == ".js":
            return "application/javascript"
        if ext == ".mjs":
            return "application/javascript"
        if ext == ".css":
            return "text/css"
        return super().guess_type(path)

    def log_message(self, fmt, *args):
        # Cleaner console output
        print(f"  {self.address_string()} {fmt % args}")


def run():
    server = ThreadingHTTPServer(("127.0.0.1", 8000), SapSandboxHandler)
    print("=" * 56)
    print("  SAP SkillBridge Sandbox")
    print("  http://127.0.0.1:8000/frontend/pages/index.html")
    print("  Ctrl+C to stop")
    print("=" * 56)
    server.serve_forever()


if __name__ == "__main__":
    run()

# Made with Bob
