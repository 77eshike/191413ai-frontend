'use client'

import { useState } from 'react'
import axios from 'axios'
import { useToast } from '@/components/ui/Toast/useToast'

export function usePasswordChange() {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const validate = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast({
        title: '请填写所有字段',
        variant: 'destructive',
      })
      return false
    }
    if (newPassword !== confirmPassword) {
      toast({
        title: '两次密码不一致',
        variant: 'destructive',
      })
      return false
    }
    if (newPassword.length < 6) {
      toast({
        title: '密码太短',
        description: '请至少输入 6 个字符',
        variant: 'destructive',
      })
      return false
    }
    return true
  }

  const changePassword = async () => {
    if (!validate()) return

    try {
      setLoading(true)
      await axios.post('/api/change-password', {
        oldPassword,
        newPassword,
      })

      toast({
        title: '密码修改成功',
        description: '请使用新密码重新登录',
      })

      // 清空字段
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
      toast({
        title: '修改失败',
        description: axios.isAxiosError(error)
          ? (error.response?.data?.message ?? '网络错误')
          : '未知错误',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    oldPassword,
    newPassword,
    confirmPassword,
    setOldPassword,
    setNewPassword,
    setConfirmPassword,
    changePassword,
    loading,
  }
}
