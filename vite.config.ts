import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sobre: resolve(__dirname, 'sobre.html'),
        pensamento: resolve(__dirname, 'pensamento-computacional.html'),
        utfpr: resolve(__dirname, 'utfpr.html'),
        scripts: resolve(__dirname, 'scripts.html'),
        contato: resolve(__dirname, 'contato.html'),
        notfound: resolve(__dirname, '404.html'),
      },
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    hmr: false,
  },
});
