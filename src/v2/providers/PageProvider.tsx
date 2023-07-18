import React, { createContext, useContext, ReactNode } from "react"

interface PageProviderProps<S extends Record<string, any>> {
  children: ReactNode
  initialState: S
}

const createPageProvider = <S extends Record<string, any>>(
  initialState: S | null
) => {
  const Ctx = createContext<S | null>(initialState)

  const PageProvider = ({ children, initialState }: PageProviderProps<S>) => {
    return <Ctx.Provider value={initialState}>{children}</Ctx.Provider>
  }

  const usePageProvider = () => {
    return useContext(Ctx)!
  }

  return [PageProvider, usePageProvider] as const
}

export { createPageProvider }
