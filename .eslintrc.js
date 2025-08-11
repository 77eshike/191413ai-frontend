/* eslint-env node */
module.exports = {
  root: true,
  ignorePatterns: ['.next', 'dist', 'build', 'coverage', '**/*.d.ts'],
  env: {
    browser: true,
    node: true,
    es2023: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'], // 如无此文件，可先删掉该行与下一行
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      typescript: {},
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import'],
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // 若保留上面的 project 配置，启用带类型的规则更准确：
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  rules: {
    // 生产环境保留告警，开发可关闭
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    // 你项目里常见的 ESLint 提示
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-misused-promises': [
      'error',
      { checksVoidReturn: { attributes: false } },
    ],

    // import 排序（可选）
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'object',
          'type',
        ],
      },
    ],

    // Next.js + React
    'react/react-in-jsx-scope': 'off',
  },

  // 测试文件的单独配置
  overrides: [
    {
      files: ['**/*.{test,spec}.{ts,tsx}', '**/vitest.setup.{ts,tsx}'],
      extends: ['plugin:testing-library/react', 'plugin:jest-dom/recommended'],
      env: { browser: true, node: true },
      // 不额外引入 eslint-plugin-vitest，直接声明全局
      globals: {
        vi: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
      rules: {
        'no-console': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
      },
    },
    {
      files: ['src/app/api/**/*.{ts,tsx}'],
      env: { node: true },
      rules: {
        'no-console': 'warn',
      },
    },
  ],
}
