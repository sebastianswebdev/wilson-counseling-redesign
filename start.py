"""Start the Wilson Counseling local preview. Uses Python's standard library only."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.request import urlopen
import os
import webbrowser

ROOT = Path(__file__).resolve().parent
os.chdir(ROOT)

def main():
    for port in range(8080, 8100):
        url = f'http://127.0.0.1:{port}/'
        try:
            server = ThreadingHTTPServer(('127.0.0.1', port), SimpleHTTPRequestHandler)
            break
        except OSError:
            try:
                with urlopen(url, timeout=1) as response:
                    if b'Wilson Counseling' in response.read(12000):
                        print(f'Wilson Counseling is already running: {url}', flush=True)
                        webbrowser.open(url)
                        return
            except Exception:
                continue
    else:
        raise SystemExit('No free local port. Close a previous preview and try again.')
    print(f'\nWilson Counseling — local preview\n{url}\n\nPress Control+C to stop.\n', flush=True)
    webbrowser.open(url)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nPreview stopped.')
    finally:
        server.server_close()

if __name__ == '__main__':
    main()
