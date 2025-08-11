import React, { createContext } from 'react'

export const TooltipContext = createContext<{ defaultOpen: boolean }>({ defaultOpen: true })

function TooltipProviderBase({
  children,
  defaultOpen = false, // Provider 下默认关闭
}: {
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  return <TooltipContext.Provider value={{ defaultOpen }}>{children}</TooltipContext.Provider>
}

export default TooltipProviderBase
export { TooltipProviderBase as TooltipProvider }
