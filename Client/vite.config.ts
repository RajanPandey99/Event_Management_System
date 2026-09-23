import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    mkcert(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server:{
    port:5173,
    strictPort:true
  },
})






