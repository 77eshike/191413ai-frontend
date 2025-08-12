import React, { useState } from 'react'

export interface PopoverProps {
  trigger: React.ReactNode
  children?: React.ReactNode
  content?: React.ReactNode
}

function PopoverBase({ trigger, children, content }: PopoverProps) {
  const [open, setOpen] = useState(false)

  const openIt = () => setOpen(true)

  const renderTrigger = () => {
    if (React.isValidElement(trigger)) {
      const origOnClick = (trigger as any).props?.onClick
      return React.cloneElement(trigger as any, {
        onClick: (e: any) => {
          origOnClick?.(e)
          openIt()
        },
      })
    }
    return <span onClick={openIt}>{trigger}</span>
  }

  return (
    <div>
      {renderTrigger()}
      {open && (
        <div role="dialog" aria-modal="false">
          {children ?? content}
        </div>
      )}
    </div>
  )
}

export default PopoverBase
export { PopoverBase as Popover }
