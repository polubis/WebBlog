import type { Language } from "prism-react-renderer"
import type { CSSProperties, ReactNode } from "react"

export type Pair = [number, number]
export type Range = (number | Pair)[]
export type HighlightStatus = "added" | "deleted" | "changed" | ""

export interface InjectedPreProps {
  copy: () => void
}

export interface PreProps {
  children: string
  lang?: Language
  description?: ReactNode
  height?: string
  linesOff?: boolean
  added?: Range
  deleted?: Range
  animated?: boolean
  changed?: Range
  Header?: (props: InjectedPreProps) => ReactNode
  Footer?: (props: InjectedPreProps) => ReactNode
}

export interface RollerProps {
  onExpand: () => void
  style: CSSProperties
}

export interface StaticCodeProps extends PreProps {
  mode: "static"
  skipTrim?: boolean
  rolled?: boolean
  Loading?: () => JSX.Element
  Roller?: (props: RollerProps) => JSX.Element
}

export interface DynamicCodeProps extends Omit<PreProps, "children"> {
  mode: "dynamic"
  linesCount: number
  skipTrim?: boolean
  src: string
  rolled?: boolean
  Error?: () => JSX.Element
  onLinesDiff?: (linesCount: number, codeLinesCount: number) => void;
  Loading?: () => JSX.Element
  Roller?: (props: RollerProps) => void
}

export interface InteractiveProps {
  delay?: number
  children: (props: { active: boolean; start: () => void }) => ReactNode
}

export type CodeProps = StaticCodeProps | DynamicCodeProps
