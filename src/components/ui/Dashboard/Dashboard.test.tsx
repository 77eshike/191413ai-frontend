import { render, screen } from '@testing-library/react'
import Dashboard from './Dashboard'

test('renders dashboard', () => {
  render(<Dashboard />)
  expect(screen.getByText('欢迎使用控制台')).toBeInTheDocument()
})
