import React from "react"
import { CodePlaceholder } from "./CodePlaceholder"
import { CodeHeader } from "./CodeHeader"
import { CodeRoller } from "./CodeRoller"
import { CodeErrorWrapper } from "./CodeErrorWrapper"
import { Code } from "../ui/code/Code"
import type { CodeProps } from "../ui/code/models"
import { useAnalytics } from "../../utils/useAnalytics"
import { useIsInBlogCreator } from "../logic/useIsInBlogCreator"

const CodeContainer = (props: CodeProps) => {
  const { trackFullEvent } = useAnalytics()
  const { is, url } = useIsInBlogCreator()

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
          if (!is()) {
            return
          }

          trackFullEvent({
            name: "rendering_code_lines_count_warn",
            category: "warnings",
            message: `Exp: ${linesCount}, given: ${codeLinesCount}`,
            src: props.src,
            url: url(),
          })
        }}
      />
    )
  }

  return <Code {...base} />
}

export { CodeContainer }
