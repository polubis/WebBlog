import React from "react"
import { SnippetContent } from "./SnippetContent"
import { LiveContent } from "./LiveSnippetContent"

interface SnippetProps {
  children?: string
  added?: [number | [number, number]] // array of numbers or ranges ex. [1, 4, [6,30]]
  deleted?: [number | [number, number]] // array of numbers or ranges ex. [1, 4, [6,30]]
  changed?: [number | [number, number]] // array of numbers or ranges ex. [1, 4, [6,30]]
  src?: string
  description?: string
  linesCount?: number
}

const Snippet = ({
  children,
  description,
  src,
  linesCount,
  added,
  deleted,
  changed,
}: SnippetProps) => {
  if (typeof src === "string")
    return (
      <LiveContent
        description={description}
        src={src}
        linesCount={linesCount}
        added={added}
        deleted={deleted}
        changed={changed}
      />
    )

  if (typeof children === "string")
    return (
      <SnippetContent
        description={description}
        children={children}
        added={added}
        deleted={deleted}
        changed={changed}
      />
    )

  return null
}

export type { SnippetProps }

export { Snippet }
