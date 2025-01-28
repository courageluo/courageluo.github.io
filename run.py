import http.server
import socketserver

Handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("", 8000), Handler) as httpd:
    print("serving at port", 8000)
    httpd.serve_forever()
