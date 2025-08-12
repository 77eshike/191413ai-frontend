import bcrypt from 'bcryptjs'

/**
 * 对密� �进行� 密处理
 * @param password 明文密� �
 * @returns � 密后的密� �哈希
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

/**
 * � �验密� �是否匹配
 * @param inputPassword 用户输入的密� �
 * @param hashedPassword 数据库存储的哈希密� �
 * @returns 是否匹配
 */
export async function verifyPassword(
  inputPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(inputPassword, hashedPassword)
}
