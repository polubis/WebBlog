import type { ArticlePageModel } from "../../core/models"
import { createPageProvider } from "../../providers/PageProvider"

const [
  ArticlePageProvider,
  useArticlePageProvider,
] = createPageProvider<ArticlePageModel>(null)

export { ArticlePageProvider, useArticlePageProvider }
