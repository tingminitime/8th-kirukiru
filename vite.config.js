import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'

export default ({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd())
  }
  return defineConfig({
    base: './',
    plugins: [
      vue()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: process.env.VITE_PORT || 3005,
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name]-[hash].js`,
          chunkFileNames: `assets/[name]-[hash].js`,
          assetFileNames: `assets/[name]-[hash].[ext]`,
        }
      }
    }
  })
}

// export default defineConfig({
//   base: './',
//   plugins: [
//     vue()
//   ],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   },
// })
