import { defineConfig } from 'tsup-preset-solid'

export default defineConfig(
  {
    entry: 'src/index.tsx',
    devEntry: true,
    dropConsole: true,
  },
  {
    // Enable this to write export conditions to package.json
    // writePackageJson: true,
  },
)
