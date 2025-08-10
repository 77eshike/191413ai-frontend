import { render, screen } from '@testing-library/react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from './DropdownMenu'
import { Button } from '../Button'

describe('DropdownMenu', () => {
  it('renders trigger button', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>菜单按钮</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>菜单项</DropdownMenuContent>
      </DropdownMenu>,
    )

    expect(screen.getByText('菜单按钮')).toBeInTheDocument()
  })
})
