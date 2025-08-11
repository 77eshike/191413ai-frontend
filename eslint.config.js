// eslint.config.js
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
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

  // 2) 源码（Type-aware）
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
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
      ...tseslint.configs.recommendedTypeChecked.rules,
      ...react.configs.recommended.rules,

      // React 17+ 自动 JSX Transform
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      // import 清理
      'unused-imports/no-unused-imports': 'error',

      // 默认对 console 警告（非白名单文件）
      'no-console': 'warn',

      // Promise/事件处理
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true, ignoreIIFE: true }],

      // 与 Prettier 对齐（强制 LF）
      'prettier/prettier': ['error', { endOfLine: 'lf' }],

      // 临时放宽
      '@typescript-eslint/no-empty-interface': 'off',
      'no-unused-expressions': 'warn',
      'no-empty': ['warn', { allowEmptyCatch: true }],

      // 用 TS 版替换基础 no-unused-vars，并允许 _ 前缀忽略
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  // 3) Client 端禁止导入 *.server.*
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/*.server', '**/*.server.*', '@/lib/*server*', '@/*/*server*'],
              message:
                '不要在 Client 代码中导入 server-only 模块（*.server.ts）。请在服务器环境使用，或通过 API 调用。',
            },
          ],
        },
      ],
    },
  },

  // 4) ✅ Server 侧白名单：关闭 no-console + 关闭导入限制
  {
    files: [
      'src/app/**/route.{ts,tsx}',
      'src/app/**/actions.{ts,tsx}',
      'src/app/**/page.{ts,tsx}',
      'src/app/**/layout.{ts,tsx}',
      'src/app/**/loading.{ts,tsx}',
      'src/**/*.server.{ts,tsx,js,jsx}',
    ],
    rules: {
      'no-console': 'off',
      'no-restricted-imports': 'off',
    },
  },

  // 5) Storybook/Example 放宽（避免示例导致 CI 红）
  {
    files: ['**/*.stories.{ts,tsx}', '**/Example.{ts,tsx}'],
    rules: {
      'no-console': 'off',
      'prettier/prettier': 'off',
      'no-unused-expressions': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },

  // 6) 测试（非 type-aware）
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
        vi: 'readonly',
        jest: 'readonly',
      },
    },
    plugins: { prettier },
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'lf' }],
      'no-console': 'off',
    },
  },

  // 7) 工具/配置（非 type-aware）
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
