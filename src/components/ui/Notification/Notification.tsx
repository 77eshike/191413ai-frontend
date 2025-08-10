// src/components/ui/Notification/Notification.tsx
import React, { useEffect } from 'react'

export interface NotificationProps {
  message: string
  onClose: () => void
  duration?: number
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [onClose, duration])

  return (
    <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow-md z-50">
      {message}
    </div>
  )
}
