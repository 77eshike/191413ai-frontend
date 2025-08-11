// src/lib/utils.ts
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

// 合并 className，兼容 tailwind 冲突
export function cn(...inputs: any[]) {
  return twMerge(clsx(...inputs))
}
