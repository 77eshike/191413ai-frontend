'use client'

import React from 'react'
import { Fieldset } from './Fieldset'

export default function FieldsetExample() {
  return (
    <div className="p-4">
      <Fieldset legend="用户信息">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            姓名
          </label>
          <input
            id="name"
            type="text"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="请输入姓名"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            邮箱
          </label>
          <input
            id="email"
            type="email"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="you@example.com"
          />
        </div>
      </Fieldset>
    </div>
  )
}
