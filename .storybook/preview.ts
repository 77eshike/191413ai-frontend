// .storybook/preview.ts
import type { Preview } from '@storybook/react'

// 全局样式（Tailwind / 全局 CSS）
// 注意按你的项目路径调整
import '@/styles/globals.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/ },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0b0b0c' },
      ],
    },
  },
}

export default preview
