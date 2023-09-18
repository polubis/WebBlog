import { isInSSR } from "./isInSSR"
import { isProd } from "./isProd"
import { useEffect } from "react"
import type { GA4 } from "react-ga4/types/ga4"

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

interface SnippetCreatorOpened {
  name: "snippet_creator_opened"
}

interface RenderingCodeError {
  name: "rendering_code_error"
  link: string
}

interface RenderingImageError {
  name: "rendering_image_error"
  link: string
}

interface CommentsSectionOpened {
  name: "comments_section_opened"
}

type AnalyticsEvent =
  | FullScreenClicked
  | ArticleSourceClicked
  | SnippetCreated
  | LessonSourceClicked
  | SnippetCreatorOpened
  | RenderingCodeError
  | CommentsSectionOpened
  | RenderingImageError

const isTrackable = () => !isInSSR() && isProd()

let ga4: GA4 | null = null

const get = (cb: (instance: GA4) => void): void => {
  if (!isTrackable()) {
    return
  }

  if (!ga4) {
    import("react-ga4").then(lib => {
      ga4 = lib.default
      ga4.initialize("G-NVC90KSB0J")
      cb(ga4)
    })
    return
  }

  cb(ga4)
}

const track = (e: AnalyticsEvent): void => {
  get(({ event }) => event(e.name))
}

const trackPage = (page?: string): void => {
  if (page === undefined) return

  get(({ send }) => send({ hitType: "pageview", page }))
}

const useAnalytics = (page?: string) => {
  useEffect(() => {
    trackPage(page)
  }, [])

  return { track }
}

export { useAnalytics }
