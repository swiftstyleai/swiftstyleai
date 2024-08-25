/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { makeEntryPointPlugin, watchRebuildPlugin } from '@llm-101/hmr';
import * as child_process from 'child_process';

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, 'src');

const isDev = process.env.__DEV__ === 'true';
const isProduction = !isDev;

function buildTailwindCss() {
  child_process.execSync('pnpm build:tailwindcss', { stdio: 'inherit' });
}

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
  },
  resolve: {
    alias: {
      '@': srcDir,
    },
  },
  base: '',
  plugins: [
    react(),
    isDev && watchRebuildPlugin({ refresh: true, onStart: buildTailwindCss }),
    isDev && makeEntryPointPlugin(),
  ],
  publicDir: resolve(rootDir, 'public'),
  build: {
    lib: {
      entry: resolve(srcDir, 'index.tsx'),
      name: 'contentUI',
      formats: ['iife'],
      fileName: 'index',
    },
    outDir: resolve(rootDir, '..', '..', 'dist', 'content-ui'),
    sourcemap: isDev,
    minify: isProduction,
    reportCompressedSize: isProduction,
    rollupOptions: {
      external: ['chrome'],
    },
  },
  define: {
    'process.env.NODE_ENV': isDev ? `"development"` : `"production"`,
  },
});
