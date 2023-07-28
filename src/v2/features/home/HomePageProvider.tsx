import type { HomePageModel } from "../../core/models"
import { createPageProvider } from "../../providers/PageProvider"

const [
  HomePageProvider,
  useHomePageProvider,
] = createPageProvider<HomePageModel>(null)

export { HomePageProvider, useHomePageProvider }
