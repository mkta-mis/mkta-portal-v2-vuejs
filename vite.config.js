import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
// import { defineConfig } from 'vite';
// import { resolve } from 'path';
// import vue from '@vitejs/plugin-vue';
// import vuetify from 'vite-plugin-vuetify';

// export default defineConfig({
//   resolve: {
//     alias: {
//       "@": resolve(__dirname, "./src"),
//     },
//   },
//   plugins: [
//     vue(),
//     vuetify({ autoImport: true }), // Enabled by default
//   ],
// });