'use client'

import { useState } from 'react'
import axios from 'axios'
import { useToast } from '@/components/ui/Toast/useToast'

export function useAvatarUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)
    setPreviewUrl(URL.createObjectURL(selectedFile))
  }

  const uploadAvatar = async (): Promise<string | null> => {
    if (!file) {
      toast({
        title: '请选择头像文件',
        variant: 'destructive',
      })
      return null
    }

    const formData = new FormData()
    formData.append('avatar', file)

    try {
      setUploading(true)
      const res = await axios.post('/api/upload-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      const avatarUrl = res.data.avatarUrl
      toast({
        title: '上� 成功',
        description: '头像已成功更新',
      })

      return avatarUrl
    } catch (error) {
      toast({
        title: '上� 失败',
        description: axios.isAxiosError(error)
          ? (error.response?.data?.message ?? '网络错误')
          : '未知错误',
        variant: 'destructive',
      })
      return null
    } finally {
      setUploading(false)
    }
  }

  return {
    file,
    previewUrl,
    uploading,
    onFileChange,
    uploadAvatar,
  }
}
