import React, { useEffect } from "react"
import { useCustomGAEvent } from "../../utils/useCustomGAEvent"
import { CodePlaceholder } from "./CodePlaceholder"
import { CodeErrorWrapperProps } from "./models"

const CodeErrorWrapper = ({ src }: CodeErrorWrapperProps) => {
  const { track } = useCustomGAEvent()

  useEffect(() => {
    track({ name: "rendering_code_error", link: src })
  }, [])

  return <CodePlaceholder label="smth_wrong" />
}

export { CodeErrorWrapper }
