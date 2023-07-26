import type { AuthorsPageModel } from "../../core/models"
import { createPageProvider } from "../../providers/PageProvider"

const [
  AuthorsProvider,
  useAuthorsProvider,
] = createPageProvider<AuthorsPageModel>(null)

export { AuthorsProvider, useAuthorsProvider }
