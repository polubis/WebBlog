import { ReactNode } from "react"

import type { Language } from "prism-react-renderer"

type Pair = [number, number]
type Range = (number | Pair)[]

interface CodeProps {
  className?: string
  header?: ReactNode
  children: string
  footer?: ReactNode
  animated?: boolean
  language?: Language
  added?: Range
  deleted?: Range
  changed?: Range
}

type HighlightStatus = "added" | "deleted" | "changed" | ""

interface Highlightable {
  status: HighlightStatus
}

export type { Range, HighlightStatus, Highlightable, CodeProps }
