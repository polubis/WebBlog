import React from "react"
import { StaticSnippet } from "./StaticSnippet"
import { DynamicSnippet } from "./DynamicSnippet"
import { SnippetProps } from "./defs"

const Snippet = (props: SnippetProps) => {
  const { src, children, linesCount } = props

  if (typeof src === "string")
    return <DynamicSnippet {...props} src={src} linesCount={linesCount} />

  if (typeof children === "string")
    return <StaticSnippet {...props} children={children} />

  console.error("Component requires src parameter or children parameter")
  return null
}

export { Snippet }
