// src/lib/request.ts
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'

// 创建带 Cookie 的 Axios 实例（适用于服务器 HttpOnly Cookie JWT 策略）
export const withToken: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || '',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 可选：响应拦截器（统一处理错误）
withToken.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error(`❌ [HTTP ${error.response.status}]`, error.response.data)
    } else {
      console.error('❌ Network or CORS error:', error.message)
    }
    return Promise.reject(error)
  },
)
