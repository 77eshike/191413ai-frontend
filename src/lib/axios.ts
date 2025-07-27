// src/lib/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // 允许发送 Cookie
});

// 请求拦截器：可选设置 Authorization 头
api.interceptors.request.use(config => {
  // 可添加其他公共头部
  return config;
});

// 响应拦截器：捕捉 token 过期，尝试刷新
api.interceptors.response.use(
  response => response,
  async error => {
    if (
      error.response?.status === 401 &&
      !error.config._retry &&
      !error.config.url?.includes('/refresh-token')
    ) {
      error.config._retry = true;

      try {
        await axios.post('/api/refresh-token', null, {
          withCredentials: true,
        });

        return api(error.config); // 重新发送原始请求
      } catch (refreshError) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
