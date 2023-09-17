import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import AutoImport from 'unplugin-auto-import/vite'
import {resolve} from 'path';
// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    solidPlugin(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: [
        { find: '~', replacement: resolve(__dirname, 'src') },
    ],
  },
});
