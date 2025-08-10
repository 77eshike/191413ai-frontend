'use client'

import React, { useState } from 'react'
import { Modal } from './Modal'

export default function ModalExample() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="p-4">
      <button
        onClick={() => setIsOpen(true)}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        打开模态框
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="示例模态框">
        <p className="text-gray-700">这是一个简单的模态框内容。</p>
      </Modal>
    </div>
  )
}
