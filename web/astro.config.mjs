import { defineConfig } from 'astro/config';

// Sitio estático: cada propuesta, fuente y categoría es una página HTML legible sin JavaScript.
export default defineConfig({
  site: process.env.SITE_URL || 'https://entre-todos.org',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  compressHTML: true,
});
