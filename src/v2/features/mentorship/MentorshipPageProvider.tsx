import type { MentorshipPageModel } from "../../core/models"
import { createPageProvider } from "../../providers/PageProvider"

const [
  MentorshipPageProvider,
  useMentorshipPageProvider,
] = createPageProvider<MentorshipPageModel>(null)

export { MentorshipPageProvider, useMentorshipPageProvider }
