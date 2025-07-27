import js from '@eslint/js';
import * as tseslint from 'typescript-eslint';
import globals from 'globals';

const typedFiles = ['src/**/*.ts', 'src/**/*.tsx'];
const untypedFiles = ['*.js', '*.cjs', '*.mjs', '*.ts', '*.tsx'];

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/build/**',
      '**/storybook-static/**',
    ],
  },
  {
    files: ['eslint.config.js'],
    languageOptions: {
      parserOptions: {
        project: null, // 关闭类型感知
      },
    },
    rules: {
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
  {
    files: untypedFiles,
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'warn',
      'no-undef': 'off',
    },
  },
  {
    files: typedFiles,
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        React: true,
        JSX: true,
        fetch: true,
        process: true,
        console: true,
        describe: true,
        it: true,
        expect: true,
        vi: true,
        alert: true,
        window: true,
      },
    },
    rules: {
      ...tseslint.configs.recommendedTypeChecked[1].rules,
      'no-console': 'warn',
      'no-undef': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
];
