import React, { createContext, useContext, useMemo, useState } from "react"
import { ArticleProviderContext, ArticleProviderProps } from "./models"

const Context = createContext<ArticleProviderContext | null>(null)

export const ArticleProvider = ({
  children,
  initialState,
}: ArticleProviderProps) => {
  const [state, setState] = useState(initialState)
  
  const value = useMemo(
    (): ArticleProviderContext => ({
      state,
      setState,
    }),
    [state]
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useArticleProvider = (): ArticleProviderContext => {
  const context = useContext(Context)

  if (!context) {
    throw Error("Lack of provider!")
  }

  return context
}
