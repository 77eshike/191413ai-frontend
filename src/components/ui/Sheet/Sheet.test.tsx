import { render, screen } from '@testing-library/react'
import { Sheet, SheetContent, SheetTrigger } from './Sheet'
import { Button } from '../Button'

describe('Sheet', () => {
  it('渲染触发按钮', () => {
    render(
      <Sheet>
        <SheetTrigger asChild>
          <Button>打开</Button>
        </SheetTrigger>
        <SheetContent>内容</SheetContent>
      </Sheet>,
    )
    expect(screen.getByText('打开')).toBeInTheDocument()
  })
})
