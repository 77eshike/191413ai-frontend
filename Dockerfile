# 使用 Node.js 官方 Alpine 镜像
FROM node:20-alpine

# 设置工作目录
WORKDIR /usr/src/app

# 拷贝依赖文件并安装
COPY package*.json ./
RUN npm install --legacy-peer-deps

# 拷贝项目源码（按迁移后结构）
COPY ./src ./src
COPY ./public ./public
COPY next.config.js ./
COPY tsconfig.json ./

# 构建前端项目
RUN npm run build

# 启动
CMD ["npm", "run", "start"]
