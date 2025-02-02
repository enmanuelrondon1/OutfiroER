import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: { port: 5173 }
// })

export default {
  server: {
    proxy: {
      '/api': {
        target: 'https://outfiro-er-backend-cmaixboyb-enmanuelrondon1s-projects.vercel.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
};