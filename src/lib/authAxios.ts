import axios from 'axios'
import { refreshAccessToken } from './withToken'

const authAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

authAxios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const newAccessToken = await refreshAccessToken()

        if (newAccessToken) {
          authAxios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          return authAxios(originalRequest)
        }
      } catch (refreshError) {
        console.error('Token 刷新失败', refreshError)
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  },
)

export default authAxios
