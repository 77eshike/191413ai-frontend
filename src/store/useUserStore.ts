// src/store/useUserStore.ts
import { create } from 'zustand'

export interface User {
  id: number
  username: string
  nickname?: string
  avatar?: string
  role?: string
  email?: string
}

interface UserStore {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

export const useUserStore = create<UserStore>(set => ({
  user: null,
  setUser: user => set({ user }),
  clearUser: () => set({ user: null }),
}))
