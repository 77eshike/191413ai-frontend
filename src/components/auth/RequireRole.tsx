// src/components/auth/RequireRole.tsx

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  role: string | string[] // 单个或多个角色
  currentRole: string
  redirectTo?: string
}

export default function RequireRole({
  children,
  role,
  currentRole,
  redirectTo = '/dashboard',
}: Props) {
  const router = useRouter()

  const allowedRoles = Array.isArray(role) ? role : [role]

  useEffect(() => {
    if (!allowedRoles.includes(currentRole)) {
      router.replace(redirectTo)
    }
  }, [currentRole, allowedRoles, router, redirectTo])

  if (!allowedRoles.includes(currentRole)) return null

  return <>{children}</>
}
