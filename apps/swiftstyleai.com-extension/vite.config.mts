import { defineConfig } from 'vite';
import { resolve } from 'path';
import libAssetsPlugin from '@laynezh/vite-plugin-lib-assets';
import makeManifestPlugin from './utils/plugins/make-manifest-plugin';
import { watchRebuildPlugin } from '@llm-101/hmr';

const rootDir = resolve(__dirname);
const bsDir = resolve(rootDir, 'background-scripts');

const isDev = process.env.__DEV__ === 'true';
const isProduction = !isDev;

const outDir = resolve(rootDir, '..', '..', 'dist');

export default defineConfig({
  resolve: {
    alias: {
      '@root': rootDir,
      '@bs': bsDir,
      '@assets': resolve(bsDir, 'assets'),
    },
  },
  plugins: [
    libAssetsPlugin({
      outputPath: outDir,
    }),
    makeManifestPlugin({ outDir }),
    isDev && watchRebuildPlugin({ reload: true }),
  ],
  publicDir: resolve(rootDir, 'public'),
  build: {
    lib: {
      formats: ['iife'],
      entry: resolve(__dirname, 'background-scripts/index.ts'),
      name: 'BackgroundScript',
      fileName: 'background',
    },
    outDir,
    sourcemap: isDev,
    minify: isProduction,
    reportCompressedSize: isProduction,
    modulePreload: true,
    rollupOptions: {
      external: ['chrome'],
    },
  },
});
