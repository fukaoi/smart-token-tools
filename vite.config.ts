import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { cjsInterop } from 'vite-plugin-cjs-interop';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  ssr: {
    noExternal: process.env.NODE_ENV === 'production' ? [/^@mui\//] : [], // or  `['@mui/**']`
  },

  plugins: [
    nodePolyfills(),
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
  define: {
    // global: {},
    'process.browser': null,
    // 'process.version': ['v20.0.0'],
    'process.env.NODE_DEBUG': false,
  },
});
