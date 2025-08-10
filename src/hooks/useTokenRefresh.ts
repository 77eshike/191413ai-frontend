'use client'

import axios from 'axios'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useTokenRefresh() {
  const router = useRouter()

  useEffect(() => {
    const instance = axios.create()

    let isRefreshing = false
    let subscribers: ((token: string) => void)[] = []

    const onAccessTokenFetched = (token: string) => {
      subscribers.forEach(callback => callback(token))
      subscribers = []
    }

    const addSubscriber = (callback: (token: string) => void) => {
      subscribers.push(callback)
    }

    instance.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config

        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !originalRequest.url.includes('/refresh-token')
        ) {
          originalRequest._retry = true

          if (!isRefreshing) {
            isRefreshing = true

            try {
              const res = await axios.post('/api/refresh-token')
              const newToken = res.data.accessToken

              onAccessTokenFetched(newToken)
              isRefreshing = false
            } catch (refreshError) {
              isRefreshing = false
              router.replace('/login')
              return Promise.reject(refreshError)
            }
          }

          return new Promise(resolve => {
            addSubscriber(token => {
              originalRequest.headers.Authorization = `Bearer ${token}`
              resolve(instance(originalRequest))
            })
          })
        }

        return Promise.reject(error)
      },
    )
  }, [router])
}
