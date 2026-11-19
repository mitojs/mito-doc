import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    // The public /zh-CN/ URLs predate this content collection and are case-sensitive.
    loader: docsLoader({ generateId: ({ entry }) => entry.replace(/\.mdx?$/, '').replace(/\/index$/, '') }),
    schema: docsSchema(),
  }),
};
