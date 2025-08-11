'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

interface User {
  id: number
  username: string
  role: string
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    void (async () => {
      try {
        const res = await axios.get('/api/admin/users')
        setUsers(res.data)
      } catch {
        // 可以放 toast 提示
      }
    })()
  }, [])

  const updateRole = async (id: number, role: string) => {
    await axios.post('/api/admin/users/update-role', { id, role })
    setUsers(prev => prev.map(u => (u.id === id ? { ...u, role } : u)))
  }

  return (
    <table className="w-full text-sm border">
      <thead>
        <tr>
          <th className="border p-2">用户名</th>
          <th className="border p-2">角色</th>
          <th className="border p-2">操作</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td className="border p-2">{user.username}</td>
            <td className="border p-2">{user.role}</td>
            <td className="border p-2 space-x-2">
              <button
                className="px-2 py-1 text-xs bg-green-100 rounded"
                onClick={() => void updateRole(user.id, 'admin')}
              >
                设为管理员
              </button>
              <button
                className="px-2 py-1 text-xs bg-red-100 rounded"
                onClick={() => void updateRole(user.id, 'user')}
              >
                降为普通用户
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
