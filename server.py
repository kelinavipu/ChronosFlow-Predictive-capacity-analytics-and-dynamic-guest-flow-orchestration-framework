#!/usr/bin/env python3
"""
ChronosFlow Operational Server with Real-Time Inter-Window & Incognito Sync Engine
Standard Python 3 HTTP Server - Requires NO external packages.
Runs out of the box with `python server.py`.
"""

import http.server
import socketserver
import webbrowser
import os
import sys
import json

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
SYNC_CACHE = {}

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS and disable caching for smooth local prototyping
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        if self.path == '/api/sync' or self.path.startswith('/api/sync?'):
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(SYNC_CACHE).encode('utf-8'))
            return
        super().do_GET()

    def do_POST(self):
        if self.path == '/api/sync':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            try:
                data = json.loads(body.decode('utf-8'))
                key = data.get('key')
                value = data.get('value')
                if key:
                    SYNC_CACHE[key] = value
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "ok", "syncedKey": key}).encode('utf-8'))
            except Exception as e:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))
            return
        self.send_response(404)
        self.end_headers()

def main():
    os.chdir(DIRECTORY)
    socketserver.TCPServer.allow_reuse_address = True
    
    port = PORT
    httpd = None
    
    # Try PORT first, then try incremental ports if occupied
    for try_port in range(PORT, PORT + 10):
        try:
            httpd = socketserver.TCPServer(("", try_port), Handler)
            port = try_port
            break
        except OSError as e:
            if e.winerror == 10048 or e.errno == 98:
                continue
            raise e

    if not httpd:
        print(f"Error: Could not bind to any port between {PORT} and {PORT + 9}.")
        sys.exit(1)

    with httpd:
        url = f"http://localhost:{port}"
        print("=" * 60)
        print(" CHRONOSFLOW: Real-Time Multi-Profile Sync Server")
        print("=" * 60)
        print(f" Local Server running at: {url}")
        print(" Incognito / Multi-Profile cross-tab sync API enabled on /api/sync")
        print(" Press Ctrl+C to terminate the server.\n")
        
        # Try to automatically open in default browser
        try:
            webbrowser.open(url)
        except Exception:
            pass

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server. Goodbye!")
            sys.exit(0)

if __name__ == '__main__':
    main()
