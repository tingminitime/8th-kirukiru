import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import { triggerAsyncId } from 'async_hooks'

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
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@img': fileURLToPath(new URL('./src/assets/images', import.meta.url)),
        '@api': fileURLToPath(new URL('./src/http/api.js', import.meta.url)),
      }
    },
    server: {
      port: process.env.VITE_PORT || 3005,
      proxy: {
        '/api': {
          target: 'https://kirukiru.rocket-coding.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
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
