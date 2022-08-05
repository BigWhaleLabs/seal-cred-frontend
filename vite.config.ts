import { defineConfig, Plugin } from 'vite'
import preact from '@preact/preset-vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'
import GlobalsPolyfills from '@esbuild-plugins/node-globals-polyfill'
import inject from '@rollup/plugin-inject'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import removeConsole from 'vite-plugin-remove-console'
import { builtinModules } from 'module'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

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
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  server: { port: 3000 },
})
