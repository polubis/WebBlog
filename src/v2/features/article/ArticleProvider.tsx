import type { Article } from "../../../models"
import { createPageProvider } from "../../providers/PageProvider"
import type article_en from "../../translation/article/en.json"
import type article_pl from "../../translation/article/pl.json"

interface ArticleProviderState {
  article: Article
  author: string
  dates: {
    updated: string
    created: string
  }
  t: typeof article_en | typeof article_pl
}

const [
  ArticleProvider,
  useArticleProvider,
] = createPageProvider<ArticleProviderState>(null)

export type { ArticleProviderState }
export { ArticleProvider, useArticleProvider }
