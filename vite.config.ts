import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

function getEntries(directory: string) {
    const entries: Record<string, string> = {};

    for (const file of fs.readdirSync(directory)) {
        const full = path.join(directory, file);

        if (fs.statSync(full).isDirectory()) {
            Object.assign(entries, getEntries(full));
        } else if (file.endsWith('.ts')) {
            const name = full
                .replace(directory + path.sep, '')
                .replace(/\.ts$/, '')
                .replace(/[\\/]/g, '/');

            entries[name] = full;
        }
    }

    return entries;
}

export default defineConfig({
    appType: 'custom',
    plugins: [react()],

    build: {
        outDir: 'public/out',
        emptyOutDir: false,

        rollupOptions: {
            input: getEntries(path.resolve(__dirname, 'src')),
            output: {
                entryFileNames: '[name].js',
                format: 'es',
            },
        },
    },
});
