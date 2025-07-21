#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "�� Running ESLint & Prettier checks..."

# ESLint 检查
npx eslint . --config eslint.config.js --ext .ts,.tsx

# Prettier 检查
npx prettier --check .

status=$?
if [ $status -ne 0 ]; then
  echo "❌ Lint or format checks failed."
  exit $status
fi

echo "✅ Lint & format checks passed."
