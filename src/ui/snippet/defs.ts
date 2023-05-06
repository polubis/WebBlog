type Pair = [number, number]
type Range = (number | Pair)[]

interface SnippetProps {
  children?: string
  added?: Range
  deleted?: Range
  changed?: Range
  src?: string
  description?: string
  linesCount?: number
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
}
