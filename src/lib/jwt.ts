import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

type TokenPayload = {
  userId: number;
  username: string;
};

// 生成 Access Token（短期）
export function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m' });
}

// 生成 Refresh Token（长期）
export function generateRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
  });
}

// 校验 Access Token
export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (err) {
    return null;
  }
}

// 校验 Refresh Token
export function verifyRefreshToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, REFRESH_SECRET) as TokenPayload;
  } catch (err) {
    return null;
  }
}

// 从 Request Cookie 中提取用户信息
export function getUserFromToken(req: Request): TokenPayload | null {
  const cookie = req.headers.get('cookie');
  if (!cookie) return null;

  const token = cookie
    .split(';')
    .map(c => c.trim())
    .find(c => c.startsWith('token='))
    ?.split('=')[1];

  if (!token) return null;

  return verifyToken(token);
}
