import React, { createContext, ReactNode, useContext } from "react"
import { useArticlesFilters } from "./logic/useArticlesFilters"

type ArticlesFiltersProviderCtx = ReturnType<typeof useArticlesFilters>

const Context = createContext<ArticlesFiltersProviderCtx | undefined>(undefined)

interface ArticlesFiltersProviderProps {
  children: ReactNode
}

const ArticlesFiltersProvider = ({
  children,
}: ArticlesFiltersProviderProps) => {
  const filters = useArticlesFilters()
  return <Context.Provider value={filters}>{children}</Context.Provider>
}

const useArticlesFiltersProvider = (): ArticlesFiltersProviderCtx => {
  const ctx = useContext(Context)

  return ctx!
}

export { ArticlesFiltersProvider, useArticlesFiltersProvider }
