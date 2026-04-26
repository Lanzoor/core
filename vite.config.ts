import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

function getEntries(dir: string) {
    const entries: Record<string, string> = {};

    function scan(currentDir: string) {
        for (const file of fs.readdirSync(currentDir)) {
            const fullPath = path.join(currentDir, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                scan(fullPath);
                continue;
            }

            if (!file.endsWith('.ts') && !file.endsWith('.tsx')) {
                continue;
            }

            if (file.endsWith('.d.ts')) {
                continue;
            }

            const relative = path
                .relative(path.resolve(__dirname, 'src'), fullPath)
                .replace(/\.tsx?$/, '')
                .replace(/\\/g, '/');

            entries[relative] = fullPath;
        }
    }

    scan(dir);
    return entries;
}

const srcDir = path.resolve(__dirname, 'src');

export default defineConfig({
    plugins: [react()],
    publicDir: false,

    build: {
        outDir: 'public/out',
        emptyOutDir: true,

        rollupOptions: {
            input: getEntries(srcDir),

            output: {
                format: 'es',

                entryFileNames: '[name].js',
                chunkFileNames: 'chunks/[name].js',

                assetFileNames: (assetInfo) => {
                    const name = assetInfo.name ?? '';

                    if (name.endsWith('.css')) {
                        const originalPath = assetInfo.originalFileName ?? '';
                        if (originalPath) {
                            const relative = path
                                .relative(srcDir, originalPath)
                                .replace(/\.tsx?$/, '')
                                .replace(/\\/g, '/');
                            return `${relative}[extname]`;
                        }
                    }

                    return 'assets/[name][extname]';
                },
            },
        },
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
});
