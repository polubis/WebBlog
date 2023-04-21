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

export type { Range, SnippetProps }
