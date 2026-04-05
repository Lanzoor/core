import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

function getEntries(dir: string) {
    const entries: Record<string, string> = {};

    function scan(currentDir: string) {
        const files = fs.readdirSync(currentDir);

        for (const file of files) {
            const fullPath = path.join(currentDir, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                scan(fullPath);
            } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
                const relative = path.relative(dir, fullPath);
                const name = relative.replace(/\.tsx?$/, '').replace(/\\/g, '/');

                entries[name] = fullPath;
            }
        }
    }

    scan(dir);
    return entries;
}

const entries = getEntries(path.resolve(__dirname, 'src'));

export default defineConfig({
    appType: 'custom',
    plugins: [react()],

    build: {
        outDir: 'public/out',
        emptyOutDir: false,

        rollupOptions: {
            input: entries,
            output: {
                entryFileNames: '[name].js',
                format: 'es',
            },
        },
    },
});
