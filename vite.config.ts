import { defineConfig, Plugin } from 'vite'
import preact from '@preact/preset-vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'
import GlobalsPolyfills from '@esbuild-plugins/node-globals-polyfill'
import inject from '@rollup/plugin-inject'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import removeConsole from 'vite-plugin-remove-console'
import { builtinModules } from 'module'

export default defineConfig({
  plugins: [preact(), tsconfigPaths()],
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          gzipSize: true,
          brotliSize: true,
        }) as unknown as Plugin,
        nodePolyfills() as unknown as Plugin,
        inject({
          assert: 'assert',
          process: 'process',
          Buffer: ['buffer', 'Buffer'],
          global: 'global',
          stream: 'stream',
          _stream_duplex: 'duplex',
        }) as unknown as Plugin,
        removeConsole(),
      ],
      external: builtinModules,
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        GlobalsPolyfills({
          buffer: true,
        }),
      ],
    },
  },
  server: { port: 3000 },
  resolve: {
    alias: {
      http: 'rollup-plugin-node-polyfills/polyfills/http',
      https: 'rollup-plugin-node-polyfills/polyfills/http',
      stream: 'stream-browserify',
      assert: 'assert-browserify',
    },
  },
})
