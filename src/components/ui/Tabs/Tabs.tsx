import React, { useState } from 'react'
export interface TabItem {
  label: string
  content: React.ReactNode
}
export interface TabsProps {
  tabs: TabItem[]
  defaultIndex?: number
}
function TabsBase({ tabs, defaultIndex = 0 }: TabsProps) {
  const [i, setI] = useState(defaultIndex)
  return (
    <div>
      <div role="tablist">
        {tabs.map((t, idx) => (
          <button key={idx} role="tab" aria-selected={i === idx} onClick={() => setI(idx)}>
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel">{tabs[i]?.content}</div>
    </div>
  )
}
export default TabsBase
export { TabsBase as Tabs }
