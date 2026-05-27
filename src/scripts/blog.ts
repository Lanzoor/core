import fs from 'fs';
import path from 'path';

import slugify from 'slugify';
import * as cheerio from 'cheerio';

const rootDir = process.cwd();
const blogDir = path.join(rootDir, 'public/docs/blog');

export type BlogEntry = {
    path: string;
    slug: string;

    title: string;
    description: string;
    tags: string[];

    date: {
        year: string;
        month: string;
    };
};

function getFiles(dir: string): string[] {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = path.join(dir, entry.name);

        return entry.isDirectory() ? getFiles(full) : full.endsWith('.html') ? [full] : [];
    });
}

const files = getFiles(blogDir);

const index: BlogEntry[] = files
    .filter((file) => path.basename(file) !== 'index.html')
    .map((file) => {
        const relative = path.relative(blogDir, file).replace(/\\/g, '/');

        const parts = relative.split('/');

        const year = parts[0] ?? 'unknown';
        const month = parts[1] ?? 'unknown';

        const filename = path.basename(file, '.html');

        const html = fs.readFileSync(file, 'utf8');

        const $ = cheerio.load(html);

        const title = $('title').text().trim();

        const description = $('meta[name="description"]').attr('content')?.trim() ?? '';
        const tagsContent = $('meta[name="tags"]').attr('content') ?? '';

        const tags = tagsContent
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean);

        return {
            path: relative,

            slug: slugify(filename, {
                lower: true,
                strict: true,
            }),

            title,
            description,
            tags,

            date: {
                year,
                month,
            },
        };
    });

fs.writeFileSync(path.join(blogDir, 'entries.json'), JSON.stringify(index, null, 2));

console.log(`generated ${index.length} blog entries`);
