import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Base path '/' for custom domain drhimani.pixeltocloud.com
export default defineConfig({
  plugins: [react()],
  base: '/',
})
