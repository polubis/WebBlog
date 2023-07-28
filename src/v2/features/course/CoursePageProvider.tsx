import type { CoursePageModel } from "../../core/models"
import { createPageProvider } from "../../providers/PageProvider"

const [
  CoursePageProvider,
  useCoursePageProvider,
] = createPageProvider<CoursePageModel>(null)

export { CoursePageProvider, useCoursePageProvider }
