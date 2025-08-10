// src/lib/permission.ts
import type { TokenPayload } from '@/lib/auth'

/**
 * 判断是否为项目所有者
 */
export function isProjectOwner(user: TokenPayload, ownerId: number): boolean {
  return user.userId === ownerId
}

/**
 * 判断是否为管理员
 */
export function isAdmin(user: TokenPayload): boolean {
  return user.role === 'admin'
}
