'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: ReactNode;
}

export default function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-xl px-4 py-2 font-medium transition-all',
        variant === 'primary' && 'bg-black text-white hover:bg-neutral-800',
        variant === 'secondary' && 'border border-gray-300 text-black hover:bg-gray-100',
        variant === 'ghost' && 'text-gray-600 hover:text-black',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
