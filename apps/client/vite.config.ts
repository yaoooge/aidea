import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, root, 'VITE_');
  const apiBase =
    env.VITE_API_BASE_URL && env.VITE_API_BASE_URL.trim().length > 0
      ? env.VITE_API_BASE_URL.trim()
      : 'http://127.0.0.1:3000';

  return {
    plugins: [uni()],
    envDir: root,
    resolve: {
      alias: {
        '@ail/config': path.resolve(root, '../../packages/config/src/index.ts'),
      },
    },
    define: {
      'import.meta.env.VITE_API_BASE_URL': JSON.stringify(apiBase),
    },
  };
});
