import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
});

export async function findUserByUsername(username: string) {
  const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
}

export async function getUserById(id: number) {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
}

export async function createUser(user: {
  username: string;
  password: string;
  email: string;
  nickname?: string;
  avatar?: string;
  role?: string;
}) {
  const { username, password, email, nickname = '', avatar = '', role = 'user' } = user;
  const [result] = await pool.query(
    'INSERT INTO users (username, password, email, nickname, avatar, role) VALUES (?, ?, ?, ?, ?, ?)',
    [username, password, email, nickname, avatar, role],
  );
  return { id: (result as any).insertId };
}

export async function updateUserProfile(
  id: number,
  updates: Partial<{ nickname: string; email: string; avatar: string }>,
) {
  const fields = [];
  const values = [];

  if (updates.nickname !== undefined) {
    fields.push('nickname = ?');
    values.push(updates.nickname);
  }
  if (updates.email !== undefined) {
    fields.push('email = ?');
    values.push(updates.email);
  }
  if (updates.avatar !== undefined) {
    fields.push('avatar = ?');
    values.push(updates.avatar);
  }

  if (fields.length === 0) return;

  values.push(id);
  await pool.query(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values);
}

export async function updateUserPassword(id: number, newPassword: string) {
  const hashed = await bcrypt.hash(newPassword, 10);
  await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashed, id]);
}

export { pool };
