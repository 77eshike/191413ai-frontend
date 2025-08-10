export interface DecodedTokenPayload {
  userId: number
  role?: string
  iat?: number
  exp?: number
}

export interface UserSession {
  id: number
  username: string
  nickname: string
  email: string
  avatar: string
  role: string
}
