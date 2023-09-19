import { createPageProvider } from "./PageProvider"
import type { ArticleBasedDataProviderModel } from "./models"

const [
    ArticleBasedDataProvider,
    useArticleBasedDataProvider,
] = createPageProvider<ArticleBasedDataProviderModel>(null)

export { ArticleBasedDataProvider, useArticleBasedDataProvider }
