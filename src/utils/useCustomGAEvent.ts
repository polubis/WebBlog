import ReactGA from "react-ga4"
import { isProd } from "./isProd"

interface FullScreenClicked {
  name: "full_screen_clicked"
}

interface ArticleSourceClicked {
  name: "article_source_clicked"
}

interface SnippetCreated {
  name: "snippet_created"
}

interface LessonSourceClicked {
  name: "lesson_source_clicked"
}

type AnalyticsEvent =
  | FullScreenClicked
  | ArticleSourceClicked
  | SnippetCreated
  | LessonSourceClicked

export const useCustomGAEvent = () => {
  const track = (e: AnalyticsEvent): void => {
    if (!isProd()) return

    ReactGA.initialize("G-NVC90KSB0J")
    ReactGA.event(e.name)
  }

  return { track }
}
