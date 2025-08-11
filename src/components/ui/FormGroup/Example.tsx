'use client'

import React, { useState } from 'react'
import { FormGroup } from './FormGroup'
import { action } from '@storybook/addon-actions'

export default function Example() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    action('提交表单')(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup label="姓名" name="name" value={formData.name} onChange={handleChange} />
      <FormGroup label="邮箱" name="email" value={formData.email} onChange={handleChange} />
      <button type="submit">提交</button>
    </form>
  )
}
