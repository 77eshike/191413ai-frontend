import { mergeConfig } from 'vite'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import react from '@vitejs/plugin-react' // ✅ 自动注入 React
import tsconfigPaths from 'vite-tsconfig-paths' // 可选

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/** @type {import('@storybook/react-vite').StorybookConfig} */
const config = {
  stories: ['../src/components/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (config, { configType }) => {
    return mergeConfig(config, {
      plugins: [
        react({ jsxRuntime: 'classic' }), // ✅ 注入经典模式 React
        tsconfigPaths(), // ✅ 可选，自动识别路径别名
      ],
      resolve: {
        alias: {
          '@': resolve(__dirname, '../src'),
        },
      },
    })
  },
}

export default config
