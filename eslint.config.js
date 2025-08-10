// eslint.config.js
import js from '@eslint/js'
import tseslint from 'typescript-eslint' // ✅ 正确的聚合包
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import react from 'eslint-plugin-react'
import prettier from 'eslint-plugin-prettier'
import unused from 'eslint-plugin-unused-imports'
import globals from 'globals'

export default [
  // 1) 全局忽略
  {
    ignores: [
      '**/.next/**',
      '**/storybook-static/**',
      '**/dist/**',
      '**/coverage/**',
      '**/.turbo/**',
      '**/node_modules/**',
    ],
  },

  // 2) 源码规则（type-aware on）
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: process.cwd(),
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        React: 'readonly',
        NodeJS: 'readonly',
        alert: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react,
      prettier,
      'unused-imports': unused,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      // 基础推荐
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommendedTypeChecked.rules, // ✅ 正确来源
      ...react.configs.recommended.rules,

      // React 17+ 自动 JSX Transform
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      // import 清理
      'unused-imports/no-unused-imports': 'error',

      // 控制台降噪
      'no-console': 'warn',

      // Promise / 事件处理
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true, ignoreIIFE: true }],

      // 与 Prettier 对齐 + 强制 LF（去除 ␍）
      'prettier/prettier': ['error', { endOfLine: 'lf' }],
    },
  },

  // 3) 在 Client 侧禁止引入 *.server.*（默认应用于所有 src/*，下一个块对白名单放开）
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '**/*.server', // 任意后缀的 *.server
                '**/*.server.*',
                '@/lib/*server*',
                '@/*/*server*',
              ],
              message:
                '不要在 Client 代码中导入 server-only 模块（*.server.ts）。请在服务器环境使用，或通过 API 调用。',
            },
          ],
        },
      ],
    },
  },

  // 4) Server 文件白名单：关闭上面的限制
  {
    files: [
      'src/app/**/route.{ts,tsx}',
      'src/app/**/page.{ts,tsx}',
      'src/app/**/layout.{ts,tsx}',
      'src/app/**/loading.{ts,tsx}',
      'src/app/**/actions.{ts,tsx}',
      'src/**/*.server.{ts,tsx,js,jsx}', // ✅ 保留这条即可
    ],
    rules: {
      'no-restricted-imports': 'off',
    },
  },

  // 5) 测试文件（非 type-aware）
  {
    files: ['**/*.test.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        ...globals.browser,
        ...globals.node,
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
    plugins: { prettier },
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'lf' }],
      'no-console': 'off',
    },
  },

  // 6) 工具/配置文件（非 type-aware）
  {
    files: [
      '*.config.{js,cjs,mjs,ts}',
      '.*rc.{js,cjs,mjs}',
      'scripts/**/*.{js,ts}',
      'commitlint.config.{js,cjs,mjs}',
      'lint-staged.config.{js,cjs,mjs}',
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tsParser,
    },
    plugins: { prettier },
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'lf' }],
      'no-console': 'off',
    },
  },
]
