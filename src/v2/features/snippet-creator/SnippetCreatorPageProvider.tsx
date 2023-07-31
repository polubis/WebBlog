import type { SnippetCreatorPageModel } from "../../core/models"
import { createPageProvider } from "../../providers/PageProvider"

const [
  SnippetCreatorPageProvider,
  useSnippetCreatorPageProvider,
] = createPageProvider<SnippetCreatorPageModel>(null)

export { SnippetCreatorPageProvider, useSnippetCreatorPageProvider }
