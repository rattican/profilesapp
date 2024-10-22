import { defineConfig } from 'vite'
import { resolve } from 'path'  // added
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { // added
    alias: [{find: "@", replacement: resolve(__dirname, "./src")}]
  },
})
