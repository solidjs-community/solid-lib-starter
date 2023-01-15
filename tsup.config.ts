import { defineConfig, Options } from 'tsup'
import { solidPlugin } from 'esbuild-plugin-solid'

type CustomEntry = { readonly dev: boolean; readonly solid: boolean }

export default defineConfig(config => {
  const watching = !!config.watch
  const inputFilename = 'src/index.tsx'

  const packageEntries: CustomEntry[] = [
    { dev: false, solid: false },
    { dev: true, solid: false },
    { dev: false, solid: true },
    { dev: true, solid: true },
  ]

  return packageEntries.map(({ dev, solid }, i) => {
    const outFilename = `index${dev ? '.dev' : ''}${solid ? '.solid' : ''}`

    return {
      watch: watching,
      target: 'esnext',
      format: watching || solid ? 'esm' : ['cjs', 'esm'],
      clean: i === 0,
      dts: i === 0 ? inputFilename : undefined,
      entry: { [outFilename]: inputFilename },
      treeshake: watching ? undefined : { preset: 'safest' },
      replaceNodeEnv: true,
      esbuildOptions(options) {
        options.define = {
          ...options.define,
          'process.env.NODE_ENV': dev ? `"development"` : `"production"`,
          'process.env.PROD': dev ? 'false' : 'true',
          'process.env.DEV': dev ? 'true' : 'false',
          'import.meta.env.NODE_ENV': dev ? `"development"` : `"production"`,
          'import.meta.env.PROD': dev ? 'false' : 'true',
          'import.meta.env.DEV': dev ? 'true' : 'false',
        }
        options.jsx = 'preserve'

        if (!dev) options.drop = ['console', 'debugger']

        return options
      },
      outExtension: ({ format }) => {
        if (format === 'esm' && solid) return { js: '.jsx' }
        return {}
      },
      esbuildPlugins: !solid ? [solidPlugin() as any] : undefined,
    } satisfies Options
  })
})
