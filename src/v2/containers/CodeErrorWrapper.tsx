import React, { useEffect } from "react"
import { CodePlaceholder } from "./CodePlaceholder"
import { CodeErrorWrapperProps } from "./models"
import { useAnalytics } from "../../utils/useAnalytics"
import { useIsInBlogCreator } from "../logic/useIsInBlogCreator"

const CodeErrorWrapper = ({ src }: CodeErrorWrapperProps) => {
  const { trackFullEvent } = useAnalytics()
  const { is, url } = useIsInBlogCreator()

  useEffect(() => {
    if (!is()) {
      return
    }

    trackFullEvent({
      name: "rendering_code_error",
      category: "errors",
      src,
      message: 'Code display failed',
      url: url(),
    })
  }, [])

  return <CodePlaceholder label="smth_wrong" />
}

export { CodeErrorWrapper }
