import { createPageProvider } from "./PageProvider"
import { Layout, } from "../core/models"

const [
  LayoutProvider,
  useLayoutProvider,
] = createPageProvider<Layout>(null)

export { LayoutProvider, useLayoutProvider }
