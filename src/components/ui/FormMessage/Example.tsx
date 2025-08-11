'use client'

import React, { useState } from 'react'
import { FormMessage } from './FormMessage'

export default function FormMessageExample() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)

    if (!validateEmail(value)) {
      setError('请输入有效的邮箱地址')
    } else {
      setError('')
    }
  }

  return (
    <div className="space-y-2 max-w-md">
      <label htmlFor="email" className="block text-sm font-medium">
        邮箱地址
      </label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
        placeholder="example@email.com"
      />
      <FormMessage type={error ? 'error' : 'success'}>{error || '邮箱� �式正确'}</FormMessage>
    </div>
  )
}
