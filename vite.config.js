import { defineConfig } from 'vite'
import { resolve } from 'path'
import { copyFileSync, existsSync, mkdirSync } from 'fs'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ios: resolve(__dirname, 'ios.html'),
        android: resolve(__dirname, 'android.html'),
        iosZh: resolve(__dirname, 'ios-zh.html'),
        androidZh: resolve(__dirname, 'android-zh.html')
      }
    }
  },
  publicDir: 'public'
})
