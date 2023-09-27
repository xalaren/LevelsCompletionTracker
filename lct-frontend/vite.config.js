import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
        server: {
            port: 3173,
            proxy: {
                '/api': {
                    target: 'http://localhost:5173',
                }
            },
            /*open: true,*/
        },
        build: {
            emptyOutDir: true,
            outDir: '../LevelsCompletionTracker.WebApi/wwwroot',
        },
});

