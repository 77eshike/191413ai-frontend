'use client'

import React from 'react'
import { AlertDialog } from './AlertDialog'
import { Button } from '../Button'

export default function Example() {
  return (
    <AlertDialog
      title="删除确认"
      onConfirm={() => {
        alert('已删除')
      }}
      trigger={<Button>删除</Button>}
    />
  )
}
