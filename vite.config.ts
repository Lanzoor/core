import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

const excludedDirs = [path.resolve(__dirname, 'src/scripts')];

function isExcluded(dir: string) {
    return excludedDirs.some((excluded) => dir.startsWith(excluded));
}

function getEntries(dir: string) {
    const entries: Record<string, string> = {};

    function scan(currentDir: string) {
        if (isExcluded(currentDir)) {
            console.info(`directory ${currentDir} skipped, as it is explicitly excluded`);
            return;
        }

        for (const file of fs.readdirSync(currentDir)) {
            const fullPath = path.join(currentDir, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                scan(fullPath);
                continue;
            }

            const isValidFile = (file.endsWith('.ts') || file.endsWith('.tsx')) && !file.endsWith('.d.ts');

            if (!isValidFile) {
                console.info(`file ${file} skipped, as it does not match the allowed file format`);
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
                                .replace(/\.(tsx?|css)$/, '')
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
