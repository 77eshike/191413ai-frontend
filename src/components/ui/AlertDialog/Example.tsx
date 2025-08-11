'use client'

import React from 'react'
import { AlertDialog } from './AlertDialog'
import { Button } from '../Button'

export default function Example() {
  return (
    <AlertDialog
      title="� 除确认"
      onConfirm={() => {
        alert('已� 除')
      }}
      trigger={<Button>� 除</Button>}
    />
  )
}
