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

            const relative = path
                .relative(dir, fullPath)
                .replace(/\.tsx?$/, '')
                .replace(/\\/g, '/');

            entries[relative] = fullPath;
        }
    }

    scan(dir);
    return entries;
}

const componentsDir = path.resolve(__dirname, 'src/components');

export default defineConfig({
    plugins: [react()],
    publicDir: false,

    build: {
        outDir: 'public/out/components',
        emptyOutDir: false,
        rollupOptions: {
            input: getEntries(componentsDir),

            output: {
                format: 'es',
                entryFileNames: '[name].js',

                assetFileNames: (assetInfo) => {
                    const name = assetInfo.name ?? '';

                    if (name.endsWith('.css')) {
                        return '[name][extname]';
                    }

                    return 'assets/[name][extname]';
                },
            },
        },
    },
});
