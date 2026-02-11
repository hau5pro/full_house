// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://cookbook.hau5.pro',
  image: {
    domains: ['cookbookcdn.hau5.pro'],
  },
});
