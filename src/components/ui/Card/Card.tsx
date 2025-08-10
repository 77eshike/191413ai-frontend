// src/components/ui/Card/Card.tsx

import React from 'react'

export function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border p-4 shadow bg-white">{children}</div>
}
