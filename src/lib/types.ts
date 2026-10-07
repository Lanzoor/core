export type ChangelogEntry = {
    version: string;
    title?: string;
    published: Date;
    commit?: string;
};

export type BlogEntry = {
    slug: string;
    title: string;
    description?: string;
    tags?: string[];
    published: string;
};
