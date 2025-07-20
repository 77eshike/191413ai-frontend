import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    plugins: {
      'unused-imports': eslintPluginUnusedImports,
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'error',
      'require-await': 'warn',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }
      ]
    }
  }
);
