import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import AutoImport from 'unplugin-auto-import/vite';
import {resolve} from 'path';

export default defineConfig({
  plugins: [
    AutoImport({
      dirs: [ 'src/module_bindings', 'src/utils' ],
      imports: [
        'solid-js', 
        {
          '@clockworklabs/spacetimedb-sdk' : [
            'SpacetimeDBClient', 
            ['Identity', 'stdbIdentity'],
          ]
        },
        {
          '@solid-primitives/map' : [
            'ReactiveMap', 
            'ReactiveWeakMap',
          ]
        },
        {
          from: '@clockworklabs/spacetimedb-sdk',
          imports: ['Identity'],
          type: true,
        }
      ]
    }),
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
