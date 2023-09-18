import React, { useEffect } from "react"
import { CodePlaceholder } from "./CodePlaceholder"
import { CodeErrorWrapperProps } from "./models"
import { useAnalytics } from "../../utils/useAnalytics"

const CodeErrorWrapper = ({ src }: CodeErrorWrapperProps) => {
  const { track } = useAnalytics()

  useEffect(() => {
    track({ name: "rendering_code_error", link: src })
  }, [])

  return <CodePlaceholder label="smth_wrong" />
}

export { CodeErrorWrapper }
