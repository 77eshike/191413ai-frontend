import { pool } from '@/lib/db'
import type { RowDataPacket, ResultSetHeader } from 'mysql2'

export interface Project {
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
}

// 获取所有项目
export async function getAllProjects(): Promise<Project[]> {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM projects ORDER BY id DESC')
  return rows as Project[]
}

// 获取单个项目
export async function getProjectById(id: number): Promise<Project | null> {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM projects WHERE id = ?', [id])
  if (rows.length === 0) return null
  return rows[0] as Project
}

// 创建新项目
export async function createProject(name: string, description: string): Promise<number> {
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO projects (name, description) VALUES (?, ?)',
    [name, description],
  )
  return result.insertId
}

// 更新项目
export async function updateProject(
  id: number,
  name: string,
  description: string,
): Promise<boolean> {
  const [result] = await pool.query<ResultSetHeader>(
    'UPDATE projects SET name = ?, description = ?, updated_at = NOW() WHERE id = ?',
    [name, description, id],
  )
  return result.affectedRows > 0
}

// 删除项目
export async function deleteProject(id: number): Promise<boolean> {
  const [result] = await pool.query<ResultSetHeader>('DELETE FROM projects WHERE id = ?', [id])
  return result.affectedRows > 0
}
