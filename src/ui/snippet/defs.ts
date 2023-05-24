import { ReactNode } from "react"

import { type Language } from "prism-react-renderer"

type Pair = [number, number]
type Range = (number | Pair)[]

interface SnippetProps {
  children?: string
  added?: Range
  deleted?: Range
  changed?: Range
  src?: string
  description?: React.ReactNode
  linesCount?: number
}

interface CodeProps {
  className?: string
  header?: ReactNode
  children: string
  footer?: ReactNode
  animated?: boolean
  language?: Language
}

interface DynamicSnippetProps extends Omit<SnippetProps, "linesCount" | "src"> {
  linesCount: number
  src: string
}

type HighlightStatus = "added" | "deleted" | "changed" | ""

interface Highlightable {
  status: HighlightStatus
}

export type {
  Range,
  SnippetProps,
  HighlightStatus,
  Highlightable,
  DynamicSnippetProps,
  CodeProps,
}
