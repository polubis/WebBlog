import type { MentoringPageModel } from "../../core/models"
import { createPageProvider } from "../../providers/PageProvider"

const [
  MentoringPageProvider,
  useMentoringPageProvider,
] = createPageProvider<MentoringPageModel>(null)

export { MentoringPageProvider, useMentoringPageProvider }
