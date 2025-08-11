import React, { useContext } from 'react'
import { TooltipContext } from '../TooltipProvider/TooltipProvider'

export interface TooltipProps {
  content?: React.ReactNode
  children?: React.ReactNode
}

export const TooltipTrigger: React.FC<React.PropsWithChildren<React.ComponentProps<'span'>>> = ({
  children,
  ...rest
}) => <span {...rest}>{children}</span>

export const TooltipContent: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { defaultOpen } = useContext(TooltipContext)
  return (
    <span role="tooltip" data-visible={defaultOpen} hidden={!defaultOpen}>
      {children}
    </span>
  )
}

function TooltipBase({ content, children }: TooltipProps) {
  const { defaultOpen } = useContext(TooltipContext)

  if (content !== undefined) {
    return (
      <span>
        {children}
        <span role="tooltip" data-visible={defaultOpen} hidden={!defaultOpen}>
          {content}
        </span>
      </span>
    )
  }
  return <span>{children}</span>
}

;(TooltipBase as any).Trigger = TooltipTrigger
;(TooltipBase as any).Content = TooltipContent

export default TooltipBase
export { TooltipBase as Tooltip }
