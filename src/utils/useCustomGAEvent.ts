import ReactGA from "react-ga4"
import { isProd } from "./isProd"

interface AuthorRequest {
  name: "author_request"
  payload: {
    email: string
    about: string
  }
}

interface FullScreenClicked {
  name: "full_screen_clicked"
}

interface ArticleSourceClicked {
  name: "article_source_clicked"
}

type AnalyticsEvent = AuthorRequest | FullScreenClicked | ArticleSourceClicked

export const useCustomGAEvent = () => {
  const track = (e: AnalyticsEvent): void => {
    if (!isProd()) return

    ReactGA.initialize("G-NVC90KSB0J")

    if (e.name === "author_request") {
      ReactGA.event(e.name, {
        value: JSON.stringify(e.payload),
      })
      return
    }

    ReactGA.event(e.name)
  }

  return { track }
}
