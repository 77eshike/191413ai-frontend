#!/bin/bash

set -e

# 检测并接收环境参数（prod 或 preview）
ENV=$1

if [ -z "$ENV" ]; then
  echo "❌ 请指定环境参数，例如：prod 或 preview"
  exit 1
fi

if [[ "$ENV" != "prod" && "$ENV" != "preview" ]]; then
  echo "❌ 环境参数无效，只允许 prod 或 preview"
  exit 1
fi

# 进入项目根目录（通过相对位置推导）
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

echo "📦 正在构建 Storybook [$ENV]..."
npm run build-storybook

SERVICE_NAME="storybook-$ENV"

echo "🧹 停止旧容器 [$SERVICE_NAME]..."
docker compose -f docker-compose.override.yml down $SERVICE_NAME || true

echo "🔁 构建 [$SERVICE_NAME] 容器..."
docker compose -f docker-compose.override.yml build $SERVICE_NAME

echo "🚀 启动 [$SERVICE_NAME] 容器..."
docker compose -f docker-compose.override.yml up -d $SERVICE_NAME

DOMAIN="$ENV.191413.ai"
if [ "$ENV" == "prod" ]; then
  DOMAIN="storybook.191413.ai"
fi

echo "✅ [$ENV] 环境部署成功：https://$DOMAIN"
