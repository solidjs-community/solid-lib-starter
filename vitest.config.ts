import path from 'path'
import { defineConfig } from 'vitest/config'
import solidPlugin from 'vite-plugin-solid'

const cwd = process.cwd()

export default defineConfig({
  test: {
    watch: false,
    env: {
      NODE_ENV: 'development',
      DEV: '1',
      SSR: '',
      PROD: '',
    },
    transformMode: {
      web: [/\.[jt]sx$/],
    },
    environment: 'jsdom',
  },
  plugins: [solidPlugin({ hot: false })],
  resolve: {
    conditions: ['browser', 'development'],
    alias: {
      'solid-js/web': path.resolve(cwd, 'node_modules/solid-js/web/dist/dev.js'),
      'solid-js/store': path.resolve(cwd, 'node_modules/solid-js/store/dist/dev.js'),
      'solid-js': path.resolve(cwd, 'node_modules/solid-js/dist/dev.js'),
    },
  },
})
