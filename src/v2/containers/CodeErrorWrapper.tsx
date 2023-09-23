import React, { useEffect } from "react"
import { CodePlaceholder } from "./CodePlaceholder"
import { CodeErrorWrapperProps } from "./models"
import { useAnalytics } from "../../utils/useAnalytics"
import { useLayoutProvider } from "../providers/LayoutProvider"

const CodeErrorWrapper = ({ src }: CodeErrorWrapperProps) => {
  const { trackFullEvent } = useAnalytics()
  const layout = useLayoutProvider()

  useEffect(() => {
    const url = window.location.pathname + window.location.search

    if (url.includes(layout.routes.creator.to)) {
      return
    }

    trackFullEvent({
      name: "rendering_code_error",
      category: "errors",
      src,
      url: window.location.pathname + window.location.search,
    })
  }, [])

  return <CodePlaceholder label="smth_wrong" />
}

export { CodeErrorWrapper }
