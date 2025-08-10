// src/components/ui/ModalForm/ModalForm.tsx
import React from 'react'

interface ModalFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: Record<string, string>) => void
  title?: string
}

export const ModalForm: React.FC<ModalFormProps> = ({ isOpen, onClose, onSubmit, title }) => {
  const [formData, setFormData] = React.useState({ name: '', email: '' })

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-md p-6 w-full max-w-md shadow-xl">
        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
