"""
Smoothie HQ - Robust Multi-Threaded Local Real-Time Server
Engineered for rock-solid stability with mobile devices.
Handles client connection resets, background tab sleeps, and concurrent requests.
"""

import http.server
import socketserver
import json
import os
import socket
import sys
import time

PORT = 8000
DATA_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "recipes.json")

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.settimeout(0.5)
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

# Multi-Threaded server: isolates every request so mobile socket drops never crash the main server
class MultiThreadedTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    allow_reuse_address = True
    daemon_threads = True

    def server_bind(self):
        self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        super().server_bind()

    def handle_error(self, request, client_address):
        # Silently ignore mobile connection drops (WinError 10054 / BrokenPipe)
        pass

class JuiceSyncHandler(http.server.SimpleHTTPRequestHandler):
    # Suppress verbose terminal log spam for routine file requests
    def log_message(self, format, *args):
        pass

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        try:
            self.send_response(200)
            self.end_headers()
        except Exception:
            pass

    def do_GET(self):
        try:
            if self.path == '/api/sync':
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                
                if os.path.exists(DATA_FILE):
                    try:
                        with open(DATA_FILE, 'r', encoding='utf-8') as f:
                            data = f.read()
                            self.wfile.write(data.encode('utf-8'))
                            return
                    except Exception as e:
                        print(f"Error reading {DATA_FILE}:", e)

                self.wfile.write(b'{}')
                return

            if self.path == '/api/info':
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                info = {
                    "local_ip": get_local_ip(),
                    "port": PORT,
                    "url": f"http://{get_local_ip()}:{PORT}"
                }
                self.wfile.write(json.dumps(info).encode('utf-8'))
                return

            super().do_GET()
        except (ConnectionResetError, ConnectionAbortedError, BrokenPipeError):
            pass
        except Exception as e:
            pass

    def do_POST(self):
        try:
            if self.path == '/api/sync':
                content_length = int(self.headers.get('Content-Length', 0))
                post_data = self.rfile.read(content_length)

                try:
                    parsed = json.loads(post_data.decode('utf-8'))
                    with open(DATA_FILE, 'w', encoding='utf-8') as f:
                        json.dump(parsed, f, indent=2, ensure_ascii=False)

                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    self.wfile.write(b'{"status": "ok", "message": "Saved"}')
                    return
                except Exception as e:
                    self.send_response(500)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))
                    return

            self.send_response(404)
            self.end_headers()
        except (ConnectionResetError, ConnectionAbortedError, BrokenPipeError):
            pass
        except Exception as e:
            pass

def run_server():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    local_ip = get_local_ip()
    
    print("=" * 65)
    print("  SMOOTHIE HQ - ROCK-SOLID MULTI-THREADED SERVER")
    print("=" * 65)
    print(f"  PC Local URL:    http://localhost:{PORT}")
    print(f"  Phone/LAN URL:   http://{local_ip}:{PORT}")
    print("=" * 65)
    print("  Server is ONLINE with client crash protection.")
    print("  Keep this window open while using Smoothie HQ.")
    print("=" * 65)

    while True:
        try:
            with MultiThreadedTCPServer(("", PORT), JuiceSyncHandler) as httpd:
                httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped by user.")
            sys.exit(0)
        except Exception as e:
            print(f"\n[Watchdog Notice] Server encountered: {e}. Auto-recovering in 1s...")
            time.sleep(1)

if __name__ == '__main__':
    run_server()
