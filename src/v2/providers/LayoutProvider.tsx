import { createPageProvider } from "./PageProvider"
import type meta from "../core/meta.json"
import type layout_en from "../translation/layout/en.json"
import type layout_pl from "../translation/layout/pl.json"
import { MinimumArticle } from "../core/models"

interface LayoutProviderState {
  lang: typeof meta["langs"]["en"] | typeof meta["langs"]["pl"]
  meta: typeof meta
  t: typeof layout_en | typeof layout_pl
  articles: MinimumArticle[]
}

const [
  LayoutProvider,
  useLayoutProvider,
] = createPageProvider<LayoutProviderState>(null)

export type { LayoutProviderState }
export { LayoutProvider, useLayoutProvider }
