// @ts-check
import { defineConfig } from 'astro/config';
import { remarkFractions } from './src/plugins/remark-fractions.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://cookbook.hau5.pro',
  image: {
    domains: ['cookbookcdn.hau5.pro'],
  },
  markdown: {
    remarkPlugins: [remarkFractions],
  },
});
