// next.config.js (ESM 模式兼容写法)
import path from 'path';
import { fileURLToPath } from 'url';

// 在 ESM 中获取 __dirname 的替代方法
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: config => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

export default nextConfig;
