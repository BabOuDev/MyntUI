/**
 * Simple development server for testing MyntUI components
 * Run with: node serve.js
 */

import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { resolve, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 8081;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = createServer(async (req, res) => {
  try {
    let filePath = resolve(__dirname, '..', req.url === '/' ? 'examples/index.html' : req.url.substring(1));
    
    // Security check - prevent directory traversal
    if (!filePath.startsWith(resolve(__dirname, '..'))) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    const ext = extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    const data = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
    
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.writeHead(404);
      res.end('File not found');
    } else {
      res.writeHead(500);
      res.end('Internal server error');
    }
    console.error('Server error:', error);
  }
});

server.listen(PORT, () => {
  console.log(`MyntUI Development Server running at http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down development server...');
  server.close(() => {
    console.log('Server stopped');
    process.exit(0);
  });
});