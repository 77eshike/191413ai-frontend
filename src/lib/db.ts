import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import type { RowDataPacket } from 'mysql2'
import type { User } from '@/types'
import { hashPassword } from '@/lib/hash'

dotenv.config()

const pool = mysql.createPool({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
})

// === 用户操作 ===

async function findUserByUsername(username: string): Promise<RowDataPacket | null> {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE username = ?', [
    username,
  ])
  return rows[0] ?? null
}

async function getUserById(id: number): Promise<User | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT id, username, email, nickname, avatar, role FROM users WHERE id = ?',
    [id],
  )
  return (rows[0] as User) ?? null
}

async function getUserWithPasswordById(id: number): Promise<RowDataPacket | null> {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [id])
  return rows[0] ?? null
}

async function createUser(user: {
  username: string
  password: string
  email: string
  nickname?: string
  avatar?: string
  role?: string
}) {
  const { username, password, email, nickname = '', avatar = '', role = 'user' } = user
  const hashed = await hashPassword(password)
  const [result] = await pool.query(
    'INSERT INTO users (username, password, email, nickname, avatar, role) VALUES (?, ?, ?, ?, ?, ?)',
    [username, hashed, email, nickname, avatar, role],
  )
  return { id: (result as any).insertId }
}

async function updateUserProfile(
  id: number,
  updates: Partial<{ nickname: string; email: string; avatar: string }>,
) {
  const fields = []
  const values: any[] = []

  if (updates.nickname !== undefined) {
    fields.push('nickname = ?')
    values.push(updates.nickname)
  }
  if (updates.email !== undefined) {
    fields.push('email = ?')
    values.push(updates.email)
  }
  if (updates.avatar !== undefined) {
    fields.push('avatar = ?')
    values.push(updates.avatar)
  }

  if (fields.length === 0) return

  values.push(id)
  await pool.query(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values)
}

async function updateUserPassword(id: number, newPassword: string) {
  const hashed = await hashPassword(newPassword)
  await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashed, id])
}

async function getAllUsers() {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT id, username, role FROM users')
  return rows
}

async function updateUserRole(id: number, role: string) {
  await pool.query('UPDATE users SET role = ? WHERE id = ?', [role, id])
}

// === 项目操作 ===

async function createProject(project: { name: string; description?: string; owner_id: number }) {
  const { name, description = '', owner_id } = project
  const [result] = await pool.query(
    'INSERT INTO projects (name, description, owner_id) VALUES (?, ?, ?)',
    [name, description, owner_id],
  )
  return { id: (result as any).insertId }
}

async function getProjectById(id: number): Promise<RowDataPacket | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT id, name, description, owner_id FROM projects WHERE id = ?',
    [id],
  )
  return rows[0] ?? null
}

async function getProjectsByOwnerId(ownerId: number): Promise<RowDataPacket[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT id, name, description FROM projects WHERE owner_id = ? ORDER BY id DESC',
    [ownerId],
  )
  return rows
}

async function deleteProject({ id, owner_id }: { id: number; owner_id: number }) {
  const [result] = await pool.query('DELETE FROM projects WHERE id = ? AND owner_id = ?', [
    id,
    owner_id,
  ])
  return { success: (result as any).affectedRows > 0 }
}

async function updateProject(id: number, name: string, description: string, userId: number) {
  const [result] = await pool.query(
    'UPDATE projects SET name = ?, description = ? WHERE id = ? AND owner_id = ?',
    [name, description, id, userId],
  )
  return (result as any).affectedRows > 0
}

async function updateProjectById(id: number, data: { name: string; description?: string }) {
  await pool.query('UPDATE projects SET name = ?, description = ? WHERE id = ?', [
    data.name,
    data.description || '',
    id,
  ])
}

// === 导出 ===

export {
  pool,
  findUserByUsername,
  getUserById,
  getUserWithPasswordById,
  createUser,
  updateUserProfile,
  updateUserPassword,
  getAllUsers,
  updateUserRole,
  createProject,
  getProjectById,
  getProjectsByOwnerId,
  deleteProject,
  updateProject,
  updateProjectById,
}
