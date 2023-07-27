import type { CoursesPageModel } from "../../core/models"
import { createPageProvider } from "../../providers/PageProvider"

const [
  CoursesPageProvider,
  useCoursesPageProvider,
] = createPageProvider<CoursesPageModel>(null)

export { CoursesPageProvider, useCoursesPageProvider }
