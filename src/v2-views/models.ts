import { Article, Author, Image } from "../models"

interface ArticlesViewProps {
  bubblesImg: Image
  articles: Article[]
  authors: Author[]
}

export { ArticlesViewProps }
