import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

function getEntries(dir: any) {
    const entries = {};

    function scan(currentDir: any) {
        for (const file of fs.readdirSync(currentDir)) {
            const fullPath = path.join(currentDir, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                scan(fullPath);
            } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
                const relative = path.relative(dir, fullPath);
                const name = relative.replace(/\.tsx?$/, '').replace(/\\/g, '/');
                (entries as any)[name] = fullPath;
            }
        }
    }

    scan(dir);
    return entries;
}

const entries = getEntries(path.resolve(__dirname, 'src'));

export default defineConfig({
    plugins: [react()],

    build: {
        outDir: 'public/out',
        emptyOutDir: true,
        rollupOptions: {
            input: entries,
            output: {
                entryFileNames: '[name].js',
                format: 'es',
            },
        },
    },
});
