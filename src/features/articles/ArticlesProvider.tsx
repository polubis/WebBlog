import React, { createContext, ReactNode, useContext } from "react"
import { Article, Author } from "../../models"
import { useArticlesFilters } from "./useArticlesFilters"

type ArticlesCtx = ReturnType<typeof useArticlesFilters>

const Context = createContext<ArticlesCtx | undefined>(undefined)

interface ArticlesProviderProps {
  children: ReactNode
  authors: Author[]
  articles: Article[]
}

const ArticlesProvider = ({
  articles,
  authors,
  children,
}: ArticlesProviderProps) => {
  const articlesFilters = useArticlesFilters(authors, articles)
  return <Context.Provider value={articlesFilters}>{children}</Context.Provider>
}

const useArticlesProvider = (): ArticlesCtx => {
  const ctx = useContext(Context)

  return ctx!
}

export { ArticlesProvider, useArticlesProvider }
