import React from "react"
import { CodePlaceholder } from "./CodePlaceholder"
import { CodeHeader } from "./CodeHeader"
import { CodeRoller } from "./CodeRoller"
import { CodeErrorWrapper } from "./CodeErrorWrapper"
import { Code } from "../ui/code/Code"
import type { CodeProps } from "../ui/code/models"

const getCodeProps = (props: CodeProps) => {
  const base = {
    ...props,
    animated: true,
    Roller: CodeRoller,
    Header: CodeHeader,
    Loading: () => <CodePlaceholder label="loading" />,
  }

  if (props.mode === "dynamic") {
    return {
      ...base,
      Error: () => <CodeErrorWrapper src={props.src} />,
    }
  }

  return base
}

const CodeContainer = (props: CodeProps) => {
  return <Code {...getCodeProps(props)} />
}

export { CodeContainer }
