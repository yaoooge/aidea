import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: {
      '@ail/config': path.resolve(root, '../../packages/config/src/index.ts'),
    },
  },
});
