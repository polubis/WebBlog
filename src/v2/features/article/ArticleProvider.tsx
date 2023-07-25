import type { ArticlePageModel } from "../../core/models"
import { createPageProvider } from "../../providers/PageProvider"

const [
  ArticleProvider,
  useArticleProvider,
] = createPageProvider<ArticlePageModel>(null)

export { ArticleProvider, useArticleProvider }
