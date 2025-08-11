export default {
  '**/*.{ts,tsx,js,jsx}': ['prettier --write', 'eslint --fix'],
  '**/*.{json,md,css,scss,html,yml,yaml}': ['prettier --write'],
}
