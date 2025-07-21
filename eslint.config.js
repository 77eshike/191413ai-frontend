/**
 * ✅ 通用统一格式 ESLint 配置
 * 适配 Flat Config 模式，兼容 Prettier 与 Unused Imports
 */

import js from '@eslint/js';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import prettier from 'eslint-config-prettier';

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
  js.configs.recommended,

  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    plugins: {
      unusedImports: eslintPluginUnusedImports,
    },
    rules: {
      // ✅ Unused Imports 清理
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // ✅ 格式由 Prettier 接管
      'prettier/prettier': 'off',
    },
  },

  // ✅ 集成 Prettier，关闭 ESLint 中与 Prettier 冲突的规则
  {
    rules: {},
    ...prettier,
  },
];

export default config;
