import { promises as fs } from "node:fs";
import path from "node:path";
import { type ChangelogEntry } from "../src/lib/types";

const CHANGELOG_ROOT = path.resolve("src/routes/(main)/changelog/(entries)/");
const OUTPUT = path.join(CHANGELOG_ROOT, "entries.json");

const entries: ChangelogEntry[] = [];

async function walk(dir: string): Promise<void> {
    const items = await fs.readdir(dir, { withFileTypes: true });

    for (const item of items) {
        const target: string = path.join(dir, item.name);

        if (item.isDirectory()) {
            await walk(target);
            continue;
        }

        if (
            item.name !== "+page.svelte" ||
            path.dirname(target) === CHANGELOG_ROOT
        )
            continue;

        const source = await fs.readFile(target, "utf8");

        const match = source.match(
            /export\s+const\s+metadata\s*=\s*({[\s\S]*?})\s*;?/,
        );

        if (!match) continue;

        const metadata = Function(
            `return (${match[1]})`,
        )() as Partial<ChangelogEntry>;

        if (!metadata.published) {
            console.warn(
                `warn: ${target}: missing metadata.published, skipping...`,
            );
            continue;
        }

        entries.push({
            ...metadata,
            version: path.basename(path.dirname(target)),
        } as ChangelogEntry);

        console.info(`info: parsed file ${target}`);
    }
}

await walk(CHANGELOG_ROOT);

entries.sort((a, b) => Number(b.published) - Number(a.published));

await fs.writeFile(OUTPUT, JSON.stringify(entries, null, 4));

console.log(
    `successfully generated ${entries.length} changelog entries @ /changelog/(entries)/entries.json`,
);
