import { defineConfig } from 'vite'
import path from 'path'

// @ts-ignore - dynamic import to avoid TS2307 in Vercel ci where tsc is off
import _react from '@vitejs/plugin-react'
// @ts-ignore
import _tw from '@tailwindcss/vite'

const react = (_react as any).default || _react
const tailwindcss = (_tw as any).default || _tw

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
