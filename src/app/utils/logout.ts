// src/app/utils/logout.ts
'use client';

import { deleteCookie } from 'cookies-next';

export function logout() {
  deleteCookie('token');
  deleteCookie('refreshToken');
  window.location.href = '/login';
}
