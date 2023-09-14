import React from "react"
import { useBlogCreatorAlertsProvider } from "../providers/BlogCreatorAlertsProvider"
import { FormatIcon } from "../../../../ui/icons/FormatIcon"
import { IconButton } from "../../../../ui/button/IconButton"
import type { MarkdownFormatterProps } from "./models"
import { beautifyMdx } from "../../../utils/beautifyMdx"
import { useBlogCreatorPageProvider } from "../BlogCreatorPageProvider"

const MarkdownFormatter = ({ code, onFormat }: MarkdownFormatterProps) => {
  const { add } = useBlogCreatorAlertsProvider()
  const creator = useBlogCreatorPageProvider()

  const format = () => {
    const result = beautifyMdx(code)
    add({ message: creator.t.formatted })
    onFormat(result)
  }

  return (
    <IconButton title={creator.t.format_code} onClick={format}>
      <FormatIcon />
    </IconButton>
  )
}

export { MarkdownFormatter }
