// src/lib/withAuth.server.ts
import 'server-only'
import { NextRequest, NextResponse } from 'next/server'
import { cookies, headers } from 'next/headers'
import { jwtVerify, type JWTPayload } from 'jose'
import { redirect } from 'next/navigation'

type Role = 'admin' | 'user' | (string & {}) // 允许扩展
export type AuthPayload = JWTPayload & {
  userId?: number
  role?: Role
  [k: string]: unknown
}

export type AuthInfo = {
  isAuthenticated: boolean
  token?: string
  payload?: AuthPayload
}

/** 从 Authorization: Bearer / cookie('access_token') 取 token */
function readToken(req?: NextRequest): string | undefined {
  const h = (req?.headers.get('authorization') ?? headers().get('authorization')) || ''
  if (h.toLowerCase().startsWith('bearer ')) return h.slice(7).trim()
  const ck = cookies().get('access_token')?.value
  return ck || undefined
}

/** � �验并返回鉴权信息（不会抛错） */
export async function getAuth(req?: NextRequest): Promise<AuthInfo> {
  const token = readToken(req)
  if (!token) return { isAuthenticated: false }

  const secretStr =
    process.env.ACCESS_SECRET || process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET || ''
  if (!secretStr) {
    // 没配置密钥时视为未登录，避免把内部错误暴露给调用方
    return { isAuthenticated: false }
  }

  try {
    const secret = new TextEncoder().encode(secretStr)
    const { payload } = await jwtVerify(token, secret)
    return { isAuthenticated: true, token, payload: payload as AuthPayload }
  } catch {
    return { isAuthenticated: false }
  }
}

/** HOF：包装 API Route Handler（GET/POST/…），做登录/角色� �验 */
export function withAuth<
  // Next App Router 的第二个参数一般是 { params: ... }
  Ctx extends Record<string, unknown> = { params?: Record<string, string> },
>(
  handler: (req: NextRequest, ctx: Ctx, auth: Required<AuthInfo>) => Promise<Response> | Response,
  opts?: { roles?: Role[]; optional?: boolean },
) {
  return async (req: NextRequest, ctx: Ctx) => {
    const auth = await getAuth(req)

    // 未登录
    if (!auth.isAuthenticated) {
      if (opts?.optional) {
        // 可选登录：不给 auth 调用方强转，直接返回 401 以免误用
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
      }
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    // 角色� �验
    if (opts?.roles?.length) {
      const role = auth.payload?.role
      if (!role || !opts.roles.includes(role)) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
      }
    }

    return handler(req, ctx, auth as Required<AuthInfo>)
  }
}

/** 用在 Server Component / Server Action：� 权则重定向到登录页 */
export async function requireAuth(opts?: {
  roles?: Role[]
  redirectTo?: string
}): Promise<Required<AuthInfo>> {
  const auth = await getAuth()
  if (!auth.isAuthenticated) redirect(opts?.redirectTo ?? '/login')

  if (opts?.roles?.length) {
    const role = auth.payload?.role
    if (!role || !opts.roles.includes(role)) {
      redirect(opts?.redirectTo ?? '/login')
    }
  }
  return auth as Required<AuthInfo>
}
