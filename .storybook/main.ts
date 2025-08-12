// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx|js|jsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    // ✅ Next.js 项目可开启（SB 8 支持 Vite）
    // '@storybook/nextjs',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {
      strictMode: true,
    },
  },

  // ✅ 打开自动文档
  docs: { autodocs: true },

  // ✅ 若使用 public 里的静态资源
  staticDirs: ['../public'],

  async viteFinal(base) {
    return mergeConfig(base, {
      plugins: [
        tsconfigPaths(),
        svgr({
          svgrOptions: { icon: true }, // SVG 当图标用更顺手，可按需
        }),
      ],
      define: {
        // 避免某些库访问 process.env 报错
        'process.env': {},
      },
      resolve: {
        // 避免多份 React 被打进来
        dedupe: ['react', 'react-dom'],
      },
      build: {
        // 只是降低大包警告的噪音；实际大小不变
        chunkSizeWarningLimit: 1200,
      },
    })
  },
}

export default config
