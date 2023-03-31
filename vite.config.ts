import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      '@components': path.resolve(__dirname, './src/components'),
      '@providers': path.resolve(__dirname, './src/providers'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@type': path.resolve(__dirname, './src/type')
    },
  },
  plugins: [react()],
})
