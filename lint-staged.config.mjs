// lint-staged.config.mjs
export default {
  '*.{js,jsx,ts,tsx}': ['eslint --fix'],
  '*.{json,md,css,scss,html}': ['prettier --write'],
}
