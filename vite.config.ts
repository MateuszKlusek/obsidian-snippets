import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';

const scriptsDir = path.resolve('scripts');
const entries: Record<string, string> = {};

fs.readdirSync(scriptsDir).forEach((file) => {
  if (file.endsWith('.ts')) {
    const name = path.parse(file).name;
    entries[name] = path.resolve(scriptsDir, file);
  }
});
export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: entries,
      output: {
        entryFileNames: '[name].js',
      },
    },
    minify: false,
  },
});
