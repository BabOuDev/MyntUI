#!/usr/bin/env python3
"""
MyntUI Development Server
A simple HTTP server for serving the component library during development
"""

import http.server
import socketserver
import os
import sys
from pathlib import Path

def find_available_port(start_port=8081, max_attempts=10):
    """Find an available port starting from start_port"""
    for port in range(start_port, start_port + max_attempts):
        try:
            with socketserver.TCPServer(("", port), http.server.SimpleHTTPRequestHandler) as httpd:
                return port
        except OSError:
            continue
    return None

def main():
    # Change to the project root directory
    project_root = Path(__file__).parent
    os.chdir(project_root)
    
    # Find available port
    port = find_available_port()
    if port is None:
        print("❌ Could not find an available port. Please check running services.")
        sys.exit(1)
    
    # Set up the server
    handler = http.server.SimpleHTTPRequestHandler
    
    try:
        with socketserver.TCPServer(("", port), handler) as httpd:
            print(f"🚀 MyntUI Development Server")
            print(f"📡 Server running at http://localhost:{port}")
            print(f"🌐 Open http://localhost:{port}/examples/ to view components")
            print(f"⏹️  Press Ctrl+C to stop")
            print()
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n👋 Shutting down development server...")
        sys.exit(0)
    except Exception as e:
        print(f"❌ Server error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()