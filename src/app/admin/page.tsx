// src/app/admin/page.tsx
import { getUserFromRequest } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminPanel from '@/components/admin/AdminPanel'
import { isAdmin } from '@/lib/permission'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const user = await getUserFromRequest()

  if (!user || !isAdmin(user)) {
    redirect('/dashboard') // ❗ 注意：redirect 是同步函数，不能 return
    return null
  }

  return (
    <div className="p-6">
      <AdminPanel />
    </div>
  )
}
