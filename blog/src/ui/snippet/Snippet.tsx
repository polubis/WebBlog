import React from "react"
import { SnippetContent } from "./SnippetContent"
import { LiveContent } from "./LiveSnippetContent"

interface SnippetProps {
  children?: string
  src?: string
  description?: string
  linesCount?: number
}

const Snippet = ({ children, description, src, linesCount }: SnippetProps) => {
  if (typeof src === "string")
    return (
      <LiveContent
        description={description}
        src={src}
        linesCount={linesCount}
      />
    )

  if (typeof children === "string")
    return <SnippetContent description={description} children={children} />

  return null
}

export type { SnippetProps }

export { Snippet }
