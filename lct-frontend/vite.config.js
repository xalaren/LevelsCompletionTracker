import { defineConfig } from 'vite';
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
            minify: false,
            cssMinify: false,
            emptyOutDir: true,
            outDir: '../LevelsCompletionTracker.WebApi/wwwroot',

            rollupOptions: {
                output: {
                    chunkFileNames: "assets/ts/[name].ts",
                    entryFileNames: "assets/js/[name].js",

                    assetFileNames: ({name}) => {
                        if (/\.css$/.test(name ?? "")) {
                            return 'assets/css/[name][extname]';
                        }

                        if (/\.woff\d*$/.test(name ?? "")) {
                            return 'assets/fonts/[name].[ext]';
                        }
                        return "assets/[name].[ext]";
                    },
                },
            }
        },
});

