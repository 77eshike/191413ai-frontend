import bcrypt from 'bcryptjs'

/**
 * 对密码进行加密处理
 * @param password 明文密码
 * @returns 加密后的密码哈希
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

/**
 * 校验密码是否匹配
 * @param inputPassword 用户输入的密码
 * @param hashedPassword 数据库存储的哈希密码
 * @returns 是否匹配
 */
export async function verifyPassword(
  inputPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(inputPassword, hashedPassword)
}
