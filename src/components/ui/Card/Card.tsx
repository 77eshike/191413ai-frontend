import React from 'react'

export function Card({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <div className={`rounded border p-4 ${className ?? ''}`}>{children}</div>
}

export default Card // ✅
