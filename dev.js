import http from 'http';
import esbuild from 'esbuild';
import vue from 'esbuild-plugin-vue-next';
import { promises as fs } from 'fs';

const outdir = 'build';
const index = outdir + '/app.html';

await fs.rm(outdir, { recursive: true, force: true });
await fs.mkdir(outdir);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1" name="viewport" />
  <title>Foxflue Task</title>
  <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
  <link rel="stylesheet" href="app.css" />
</head>
<body>
  <div class="app"></div>
  <script src="app.js" type="module"></script>
</body>
</html>`;

const frontendServer = () => {
  const port = 3000;
  let connections = [];

  const reload = () => {
    connections.forEach(connection =>
      connection.write(`data: ${JSON.stringify({ action: 'reload' })}\n\n`)
    );
  };

  const server = http.createServer(async (request, response) => {
    const types = {
      html: 'text/html',
      js: 'text/javascript',
      css: 'text/css',
      json: 'application/json',
      png: 'image/png',
      svg: 'image/svg+xml',
      woff2: 'font/woff2'
    };

    const path = request.url;
    if (path == '/events') {
      response.writeHead(200, {
        'Content-Type': 'text/event-stream',
        Connection: 'keep-alive',
        'Cache-Control': 'no-cache'
      });
      request.on('close', () => {
        connections = connections.filter(connection => connection != response);
      });
      return connections.push(response);
    }

    if (path.includes(index)) {
      const content = html.replace(
        /<\/body>/,
        `<script>
      const server = new EventSource('http://localhost:${port}/events');
      server.onmessage = event => {
        const { action } = JSON.parse(event.data);
        if (action == 'reload') {
          location.reload();
        }
      };
      server.onerror = () => {
        console.error('Frontend server disconnected.');
        server.close();
      }
      let timeout = null;
      window.addEventListener('DOMContentLoaded', () => {
        window.addEventListener('scroll', () => {
          clearTimeout(timeout);
          timeout = setTimeout(() => localStorage.setItem('scroll_top', window.scrollY), 1000);
        });
        setTimeout(() => window.scrollTo(0, localStorage.getItem('scroll_top'), 500));
      });
      </script></body>`
      );
      response.writeHead(200, { 'content-type': types.html });
      return response.end(content);
    }

    try {
      const extension = path.split('.').pop();
      const file = await fs.readFile('.' + path);
      response.writeHead(200, { 'content-type': types[extension] || 'text/plain' });
      response.end(file);
    } catch (error) {
      response.writeHead(error.code == 'ENOENT' ? 404 : 500);
      response.end();
    }
  });

  server.listen(port);
  return { reload, port };
};

const config = {
  outdir,
  entryPoints: ['app.js'],
  entryNames: '[name]',
  assetNames: '[name]',
  format: 'esm',
  bundle: true,
  logLevel: 'silent',
  minify: !process.env.DEV_MODE,
  plugins: [vue()],
  loader: {
    '.woff2': 'file',
    '.otf': 'file',
    '.png': 'file',
    '.svg': 'file'
  },
  define: {
    __VUE_OPTIONS_API__: false,
    __VUE_PROD_DEVTOOLS__: false,
    'process.env.DEV_MODE': process.env.DEV_MODE
  }
};

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m'
};

if (process.env.DEV_MODE) {
  const { reload, port } = frontendServer();
  config.watch = {
    async onRebuild(error) {
      console.clear();
      if (error) {
        console.log(colors.red, error.message, colors.reset);
      } else {
        reload();
      }
    }
  };
  console.clear();
  console.log(colors.green, `http://localhost:${port}/${index}`, colors.reset);
} else {
  fs.writeFile(index, html.replace(/>\s+</g, '><'));
}

esbuild.build(config);
