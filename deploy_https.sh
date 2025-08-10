#!/bin/bash

set -e

echo "🚀 [1/5] 停止并清理旧 nginx-proxy / acme 容器..."
docker stop nginx-proxy nginx-proxy-acme 2>/dev/null || true
docker rm nginx-proxy nginx-proxy-acme 2>/dev/null || true

echo "🌐 [2/5] 创建 Docker 网络（如已存在会跳过）..."
docker network create web 2>/dev/null || true

echo "🧩 [3/5] 启动 nginx-proxy 容器..."
docker run -d \
  --name nginx-proxy \
  --restart always \
  --network web \
  -p 80:80 -p 443:443 \
  -v /etc/nginx/certs:/etc/nginx/certs:ro \
  -v /etc/nginx/vhost.d:/etc/nginx/vhost.d \
  -v /usr/share/nginx/html:/usr/share/nginx/html \
  -v /var/run/docker.sock:/tmp/docker.sock:ro \
  jwilder/nginx-proxy

echo "🔐 [4/5] 启动 acme-companion 证书签发容器..."
docker run -d \
  --name nginx-proxy-acme \
  --restart always \
  --network web \
  -v /etc/nginx/certs:/etc/nginx/certs \
  -v /etc/nginx/vhost.d:/etc/nginx/vhost.d \
  -v /usr/share/nginx/html:/usr/share/nginx/html \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -e DEFAULT_EMAIL=admin@191413.ai \
  jrcs/letsencrypt-nginx-proxy-companion

echo "🧱 [5/5] 启动前端服务（191413.ai、storybook、preview）..."
docker compose -f docker-compose.yml up -d --remove-orphans

echo ""
echo "✅ 部署完成，请访问以下地址检查 HTTPS 是否成功："
echo " - https://191413.ai"
echo " - https://storybook.191413.ai"
echo " - https://preview.191413.ai"
echo ""
echo "🎉 全部容器状态："
docker ps
