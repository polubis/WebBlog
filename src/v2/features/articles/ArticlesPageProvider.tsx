import { ArticlesPageModel } from "../../core/models"
import { createPageProvider } from "../../providers/PageProvider"

const [
  ArticlesPageProvider,
  useArticlesPageProvider,
] = createPageProvider<ArticlesPageModel>(null)

export { ArticlesPageProvider, useArticlesPageProvider }
