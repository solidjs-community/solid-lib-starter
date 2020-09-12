// @ts-check
import { babel } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json';

const extensions = ['.tsx', '.ts'];

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: 'src/solid-tiny-router.tsx',
  treeshake: true,
  external: [...Object.keys(pkg.dependencies), 'solid-js/dom'],
  output: [
    {
      name: pkg.name,
      file: pkg.main,
      format: 'cjs',
    },
    {
      name: pkg.name,
      file: pkg.module,
      format: 'esm',
    },
  ],
  plugins: [
    resolve({
      extensions,
    }),
    babel({
      extensions,
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      presets: ['babel-preset-solid', '@babel/preset-typescript'],
      plugins: ['@babel/plugin-transform-runtime'],
    }),
  ],
};

export default config;
