import React, { useState } from 'react'

export interface CollapseProps {
  title: React.ReactNode
  isOpen?: boolean
  onToggle?: () => void
  children?: React.ReactNode
}

function CollapseBase({ title, isOpen, onToggle, children }: CollapseProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = isOpen ?? internalOpen
  const toggle = () => {
    onToggle?.()
    if (isOpen === undefined) setInternalOpen(o => !o)
  }
  return (
    <div>
      <button type="button" onClick={toggle}>
        {title}
      </button>
      {open ? <div>{children}</div> : null}
    </div>
  )
}
export default CollapseBase
export { CollapseBase as Collapse }
