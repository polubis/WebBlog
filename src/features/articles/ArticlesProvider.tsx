import React, {
  createContext,
  useState,
  useMemo,
  ReactNode,
  useContext,
} from "react"
import { Article, Author, SeniorityLevel } from "../../models"

interface ArticlesFilters {
  authors: Record<string, boolean>
  seniorityLevels: Record<string, boolean>
}

const useArticlesFilters = (authors: Author[], articles: Article[]) => {
  const initialFilters = useMemo(
    (): ArticlesFilters => ({
      authors: authors.reduce<Record<string, boolean>>(
        (acc, author) => ({
          ...acc,
          [author.id]: true,
        }),
        {}
      ),
      seniorityLevels: Object.keys(SeniorityLevel).reduce<
        Record<string, boolean>
      >(
        (acc, key) => ({
          ...acc,
          [key]: true,
        }),
        {}
      ),
    }),
    []
  )
  const [filters, setFilters] = useState(initialFilters)

  const allAuthorsSelected = useMemo(
    () =>
      Object.values(filters.authors).filter(flag => flag).length ===
      authors.length,
    [filters.authors]
  )

  const allSeniorityLevelsSelected = useMemo(
    () =>
      Object.values(filters.seniorityLevels).filter(flag => flag).length ===
      Object.values(SeniorityLevel).length,
    [filters.seniorityLevels]
  )

  const changed = useMemo(
    () => JSON.stringify(initialFilters) !== JSON.stringify(filters),
    [filters]
  )

  const changeSeniority = (seniority: string) => {
    setFilters({
      ...filters,
      seniorityLevels: {
        ...filters.seniorityLevels,
        [seniority]: filters.seniorityLevels[seniority] ? false : true,
      },
    })
  }

  const changeAuthor = (id: Author["id"]) => {
    setFilters({
      ...filters,
      authors: {
        ...filters.authors,
        [id]: filters.authors[id] ? false : true,
      },
    })
  }

  const setAllAuthors = () => {
    setFilters({
      ...filters,
      authors: allAuthorsSelected ? {} : initialFilters.authors,
    })
  }

  const setAllSeniorityLevels = () => {
    setFilters({
      ...filters,
      seniorityLevels: allSeniorityLevelsSelected
        ? {}
        : initialFilters.seniorityLevels,
    })
  }

  const reset = () => {
    setFilters(initialFilters)
  }

  const filteredArticles = useMemo(
    () =>
      articles.filter(
        article =>
          !!filters.authors[article.author.id] &&
          !!filters.seniorityLevels[article.seniorityLevel]
      ),
    [articles, filters]
  )

  return {
    filters,
    allAuthorsSelected,
    allSeniorityLevelsSelected,
    changed,
    filteredArticles,
    changeSeniority,
    changeAuthor,
    reset,
    setAllAuthors,
    setAllSeniorityLevels,
  }
}

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
