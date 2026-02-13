// @ts-check
import { defineConfig } from 'astro/config';
import pagefind from 'astro-pagefind';
import { remarkFractions } from './src/plugins/remark-fractions.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://cookbook.hau5.pro',
  integrations: [pagefind()],
  image: {
    domains: ['cookbookcdn.hau5.pro'],
  },
  markdown: {
    remarkPlugins: [remarkFractions],
  },
});
