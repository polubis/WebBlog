import type { LessonPageModel } from "../../core/models"
import { createPageProvider } from "../../providers/PageProvider"

const [
  LessonPageProvider,
  useLessonPageProvider,
] = createPageProvider<LessonPageModel>(null)

export { LessonPageProvider, useLessonPageProvider }
