import { render, screen } from '@testing-library/react'
import { TooltipProvider } from './TooltipProvider'
import { Tooltip, TooltipContent, TooltipTrigger } from '../Tooltip'

describe('TooltipProvider', () => {
  it('应正确提供上下文环境', () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>测试按钮</TooltipTrigger>
          <TooltipContent>测试提示</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    )

    expect(screen.getByText('测试按钮')).toBeInTheDocument()
    expect(screen.queryByText('测试提示')).not.toBeVisible()
  })
})
