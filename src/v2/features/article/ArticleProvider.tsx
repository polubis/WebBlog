import type { Article } from "../../core/models"
import { createPageProvider } from "../../providers/PageProvider"

const [
  ArticleProvider,
  useArticleProvider,
] = createPageProvider<Article>(null)

export { ArticleProvider, useArticleProvider }
