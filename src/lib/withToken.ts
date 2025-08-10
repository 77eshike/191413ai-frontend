import axios, { AxiosRequestConfig } from 'axios'

let isRefreshing = false
let refreshSubscribers: ((token: string) => void)[] = []

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb)
}

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach(cb => cb(token))
  refreshSubscribers = []
}

export const withToken = (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  return new Promise(resolve => {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      }
    }

    resolve(config)
  })
}

export const withTokenResponse = async (error: unknown): Promise<never> => {
  if (axios.isAxiosError(error) && error.response?.status === 401 && !error.config?._retry) {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }
    originalRequest._retry = true

    if (!isRefreshing) {
      isRefreshing = true

      try {
        const response = await axios.post('/api/refresh-token')
        const { accessToken } = response.data as { accessToken: string }

        localStorage.setItem('accessToken', accessToken)
        onRefreshed(accessToken)
        isRefreshing = false
      } catch {
        isRefreshing = false
        return Promise.reject(new Error('刷新 token 失败'))
      }
    }

    return new Promise((resolve, reject) => {
      subscribeTokenRefresh((token: string) => {
        if (!originalRequest.headers) {
          originalRequest.headers = {}
        }
        originalRequest.headers.Authorization = `Bearer ${token}`
        axios(originalRequest)
          .then(resolve)
          .catch(err => reject(new Error(String(err))))
      })
    })
  }

  return Promise.reject(error instanceof Error ? error : new Error('未知错误'))
}
