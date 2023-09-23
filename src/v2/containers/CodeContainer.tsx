import React from "react"
import { CodePlaceholder } from "./CodePlaceholder"
import { CodeHeader } from "./CodeHeader"
import { CodeRoller } from "./CodeRoller"
import { CodeErrorWrapper } from "./CodeErrorWrapper"
import { Code } from "../ui/code/Code"
import type { CodeProps } from "../ui/code/models"
import { useAnalytics } from "../../utils/useAnalytics"
import { useLayoutProvider } from "../providers/LayoutProvider"

const CodeContainer = (props: CodeProps) => {
  const { trackFullEvent } = useAnalytics()
  const layout = useLayoutProvider()

  const base = {
    ...props,
    animated: true,
    Roller: CodeRoller,
    Header: CodeHeader,
    Loading: () => <CodePlaceholder label="loading" />,
  }

  if (props.mode === "dynamic") {
    return (
      <Code
        {...base}
        Error={() => <CodeErrorWrapper src={props.src} />}
        onLinesDiff={(linesCount, codeLinesCount) => {
          const url = window.location.pathname + window.location.search

          if (url.includes(layout.routes.creator.to)) {
            return
          }

          trackFullEvent({
            name: "rendering_code_lines_count_warn",
            category: "warnings",
            linesCount,
            codeLinesCount,
            src: props.src,
            url,
          })
        }}
      />
    )
  }

  return <Code {...base} />
}

export { CodeContainer }
