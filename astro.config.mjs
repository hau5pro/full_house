// @ts-check
import { defineConfig } from 'astro/config';
import pagefind from 'astro-pagefind';
import sitemap from '@astrojs/sitemap';
import { remarkFractions } from './src/plugins/remark-fractions.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://cookbook.hau5.pro',
  integrations: [sitemap(), pagefind()],
  image: {
    domains: ['cookbookcdn.hau5.pro'],
  },
  markdown: {
    remarkPlugins: [remarkFractions],
  },
});
