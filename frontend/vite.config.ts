import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
    fs: {
      strict: false,
    },
  },
  plugins: [react(), tsconfigPaths()],
  // resolve: {
  //   alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  // },
});
