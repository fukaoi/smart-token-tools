import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { cjsInterop } from 'vite-plugin-cjs-interop';
import react from '@vitejs/plugin-react';

export default defineConfig({
  ssr: {
    noExternal: process.env.NODE_ENV === 'production' ? [/^@mui\//] : [], // or  `['@mui/**']`
  },

  plugins: [
    // react(),
    remix({
      ssr: false,
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
    process.env.NODE_ENV === 'development' &&
    cjsInterop({
      dependencies: ['@mui/material/*'],
    }),
  ],
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
      'node-fetch': 'isomorphic-fetch',
    },
  },
  define: {
    process: {},
    global: {},
  },
});
