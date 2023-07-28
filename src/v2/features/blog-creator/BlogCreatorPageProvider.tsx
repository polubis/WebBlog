import type { BlogCreatorPageModel } from "../../core/models"
import { createPageProvider } from "../../providers/PageProvider"

const [
  BlogCreatorPageProvider,
  useBlogCreatorPageProvider,
] = createPageProvider<BlogCreatorPageModel>(null)

export { BlogCreatorPageProvider, useBlogCreatorPageProvider }
