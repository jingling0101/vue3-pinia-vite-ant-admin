import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import usePluginImport from 'vite-plugin-importer'
import {join} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    vue(),
    usePluginImport({
      libraryName: "ant-design-vue",
      libraryDirectory: "es",
      style: "css",
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: join(__dirname, 'src')
      }
    ]
  }
})
