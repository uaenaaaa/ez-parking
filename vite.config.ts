import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default defineConfig(({ mode }) => {
    const isDevelopment = mode === 'development'; // Check if running in development mode

    return {
        plugins: [sveltekit()],
        worker: {
            format: 'es'
        },
        optimizeDeps: {
            exclude: ['@sqlite.org/sqlite-wasm']
        },
        build: {
            target: 'esnext'
        },
        server: isDevelopment
            ? {
                  https: {
                      key: fs.readFileSync(
                          path.resolve(__dirname, './certificates/localhost-key.pem')
                      ),
                      cert: fs.readFileSync(path.resolve(__dirname, './certificates/localhost.pem'))
                  },
                  proxy: {
                      '/api': {
                          target: 'https://localhost:5000',
                          secure: false,
                          changeOrigin: true
                      }
                  }
              }
            : undefined
    };
});
