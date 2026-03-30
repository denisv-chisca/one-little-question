import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
    base: "/one-little-question/", // MUST match repo name
  plugins: [react(), tailwindcss(), svgr(),],
})