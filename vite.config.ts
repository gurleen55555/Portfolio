import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function portraitSyncPlugin(): Plugin {
  return {
    name: 'portrait-sync-api',
    configureServer(server) {
      server.middlewares.use('/api/sync-portrait', (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const { dataUrl } = JSON.parse(body);
              if (dataUrl && typeof dataUrl === 'string' && dataUrl.startsWith('data:image/')) {
                const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
                const buffer = Buffer.from(base64Data, 'base64');
                fs.writeFileSync(path.resolve(process.cwd(), 'public/gurleen-portrait.jpg'), buffer);
                fs.writeFileSync(path.resolve(process.cwd(), 'public/images/profile.jpg'), buffer);

                const distDir = path.resolve(process.cwd(), 'dist');
                if (fs.existsSync(distDir)) {
                  fs.writeFileSync(path.resolve(distDir, 'gurleen-portrait.jpg'), buffer);
                  const distImages = path.resolve(distDir, 'images');
                  if (!fs.existsSync(distImages)) {
                    fs.mkdirSync(distImages, { recursive: true });
                  }
                  fs.writeFileSync(path.resolve(distImages, 'profile.jpg'), buffer);
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, bytes: buffer.length }));
                return;
              }
            } catch (err) {
              console.error('Portrait sync failed:', err);
            }
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid payload' }));
          });
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), portraitSyncPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
