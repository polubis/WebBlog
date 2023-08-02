import type { Language } from "prism-react-renderer"
import type { ReactNode } from "react"

export interface PreProps {
  children: string
  lang?: Language
  description?: ReactNode
  linesOff?: boolean
}

export interface StaticCodeProps extends PreProps {
  mode: "static"
  Loading: () => JSX.Element
}

export interface DynamicCodeProps extends Omit<PreProps, "children"> {
  mode: "dynamic"
  linesCount: number
  src: string
  Error: () => JSX.Element
  Loading: () => JSX.Element
  onError?: () => void
}

export type CodeProps = StaticCodeProps | DynamicCodeProps
