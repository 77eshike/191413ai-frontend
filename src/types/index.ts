// src/types/index.ts

// 用户信息结构
export interface User {
  id: number
  username: string
  email: string
  nickname?: string
  avatar?: string
  role?: string
  created_at?: string
  updated_at?: string
}

// JWT Payload（登录态）
export interface DecodedTokenPayload {
  userId: number
  username: string
  email: string
  role?: string
  iat?: number
  exp?: number
}

// 项目信息结构
export interface Project {
  id: string
  name: string
  description: string
  status: string
  created_at?: string
  updated_at?: string
}

// 可扩展的通用分页响应结构
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
}
