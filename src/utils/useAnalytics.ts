import { isInSSR } from "./isInSSR"
import { isProd } from "./isProd"
import { useEffect } from "react"
import type { GA4, UaEventOptions } from "react-ga4/types/ga4"
import ga4 from "react-ga4"

interface FullScreenClicked {
  name: "full_screen_clicked"
}

interface SnippetCreated {
  name: "snippet_created"
}

interface SnippetCreatorOpened {
  name: "snippet_creator_opened"
}

interface CommentsSectionOpened {
  name: "comments_section_opened"
}

interface SourceClicked {
  name: "source_clicked"
}

type AnalyticsEvent =
  | FullScreenClicked
  | SnippetCreated
  | SnippetCreatorOpened
  | CommentsSectionOpened
  | SourceClicked

interface RenderingCodeErrorEvent {
  name: "rendering_code_error"
  url: string
  src: string
  category: "errors"
}

interface RenderingImageErrorEvent {
  name: "rendering_image_error"
  url: string
  src: string
  category: "errors"
}

interface RenderingCodeLinesCountWarnEvent {
  name: "rendering_code_lines_count_warn"
  url: string
  linesCount: number
  codeLinesCount: number
  src: string
  category: "warnings"
}

type FullAnalyticsEvent =
  | RenderingCodeErrorEvent
  | RenderingImageErrorEvent
  | RenderingCodeLinesCountWarnEvent

const isTrackable = () => !isInSSR() && isProd()

const get = (cb: (instance: GA4) => void): void => {
  if (!isTrackable()) {
    return
  }

  ga4.initialize("G-NVC90KSB0J")
  cb(ga4)
}

const track = (e: AnalyticsEvent): void => {
  get(({ event }) => event(e.name))
}

const trackFullEvent = ({ name, ...payload }: FullAnalyticsEvent): void => {
  get(({ event }) => event(name, payload))
}

const trackPage = (page?: string): void => {
  if (page === undefined) return

  get(({ send }) => send({ hitType: "pageview", page }))
}

const useAnalytics = (page?: string) => {
  useEffect(() => {
    trackPage(page)
  }, [])

  return { track, trackFullEvent }
}

export { useAnalytics }
