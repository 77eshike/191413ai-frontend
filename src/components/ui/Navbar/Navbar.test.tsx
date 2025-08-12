import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Navbar from './Navbar'

vi.mock('@/hooks/useAuthStatus', () => ({
  useAuthStatus: () => ({ user: { username: 'tester' }, isLoading: false }),
}))

describe('Navbar', () => {
  it('renders brand text', () => {
    render(<Navbar />)
    expect(screen.getByText('191413AI 控制台')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Navbar />)
    expect(screen.getByText('控制台')).toBeInTheDocument()
    expect(screen.getByText('个人中心')).toBeInTheDocument()
    expect(screen.getByText('退出')).toBeInTheDocument()
  })
})
