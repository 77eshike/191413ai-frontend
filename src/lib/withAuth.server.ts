import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export async function withAuth<T>(
  callback: (session: Awaited<ReturnType<typeof getServerSession>>) => Promise<T>,
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return callback(session) // ✅ 去除不必要的类型断言
}
