// src/components/admin/UserTable.tsx
import React from 'react'
import clsx from 'clsx'

type User = {
  id: number
  username: string
  role: string
}

type Props = {
  users?: User[]
  className?: string
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

export default function UserTable({ users = [], className, onEdit, onDelete }: Props) {
  if (users.length === 0) {
    return <p className="text-sm text-gray-500">暂� 用户</p>
  }

  return (
    <div className={clsx('w-full overflow-x-auto', className)}>
      <table className="min-w-[600px] w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left px-4 py-2 border-b">ID</th>
            <th className="text-left px-4 py-2 border-b">用户名</th>
            <th className="text-left px-4 py-2 border-b">角色</th>
            <th className="text-right px-4 py-2 border-b">操作</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="odd:bg-white even:bg-gray-50">
              <td className="px-4 py-2 border-b">{u.id}</td>
              <td className="px-4 py-2 border-b">{u.username}</td>
              <td className="px-4 py-2 border-b">{u.role}</td>
              <td className="px-4 py-2 border-b">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    aria-label={`edit-${u.id}`}
                    onClick={onEdit ? () => onEdit(u.id) : undefined}
                    className="px-3 py-1 rounded border text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    编辑
                  </button>
                  <button
                    type="button"
                    aria-label={`delete-${u.id}`}
                    onClick={onDelete ? () => onDelete(u.id) : undefined}
                    className="px-3 py-1 rounded border text-red-600 border-red-200 hover:bg-red-50"
                  >
                    � 除
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
