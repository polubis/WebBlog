import React from "react"
import { SnippetContent } from "./SnippetContent"
import { DynamicSnippet } from "./DynamicSnippet"
import { SnippetProps } from "./defs"

const Snippet = (props: SnippetProps) => {
  const { src, children, linesCount } = props

  if (typeof src === "string")
    return <DynamicSnippet {...props} src={src} linesCount={linesCount} />

  if (typeof children === "string")
    return <SnippetContent {...props} children={children} />

  console.error("Component requires src parameter or children parameter")
  return null
}

export { Snippet }
