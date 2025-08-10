'use client'

import React from 'react'
import { Label } from './Label'

export default function LabelExample() {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name-input">姓名</Label>
        <input
          type="text"
          id="name-input"
          className="mt-1 w-full rounded border px-3 py-2"
          placeholder="请输入姓名"
        />
      </div>

      <div>
        <Label htmlFor="email-input">邮箱</Label>
        <input
          type="email"
          id="email-input"
          className="mt-1 w-full rounded border px-3 py-2"
          placeholder="请输入邮箱"
        />
      </div>
    </div>
  )
}
