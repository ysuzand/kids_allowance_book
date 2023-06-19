import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
  },
  resolve:{
    alias:{
      '@components': path.resolve(__dirname, './src/client/components'),
      '@config': path.resolve(__dirname, './src/client/config'),
      '@providers': path.resolve(__dirname, './src/client/providers'),
      '@assets': path.resolve(__dirname, './src/client/assets'),
      '@utils': path.resolve(__dirname, './src/client/utils'),
      '@type': path.resolve(__dirname, './src/client/type'),
    },
  },
  plugins: [react()],
})
