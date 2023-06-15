import { useMemo } from "react"
import { Article } from "../models/Article"
import { useLocalStorage } from "./useLocalStorage"

const useAddToFavourite = () => {
  const [articles, { set }] = useLocalStorage<Article[]>("articles", [])

  const isAdded = (title: Article["title"]): boolean => {
    const exists = articles.some(current => current.title === title)

    return exists
  }

  const add = (article: Article): void => {
    if (isAdded(article.title)) return

    set([...articles, article])
  }

  const remove = (title: Article["title"]): void => {
    set(articles.filter(curr => curr.title !== title))
  }

  const api = useMemo(() => {
    return { articles, add, remove, isAdded }
  }, [articles])

  return api
}

export { useAddToFavourite }
