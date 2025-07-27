// lint-staged.config.js
export default {
  'src/**/*.{js,ts,jsx,tsx}': ['eslint --fix', 'prettier --write'],
  'src/**/*.{json,md,css,scss}': ['prettier --write'],
};
