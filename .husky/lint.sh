#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "í ½í´ Running ESLint & Prettier checks..."

# ESLint æ£€æŸ¥
npx eslint . --config eslint.config.js --ext .ts,.tsx

# Prettier æ£€æŸ¥
npx prettier --check .

status=$?
if [ $status -ne 0 ]; then
  echo "âŒ Lint or format checks failed."
  exit $status
fi

echo "âœ… Lint & format checks passed."
