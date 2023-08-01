import type { Language } from "prism-react-renderer"
import type { ReactNode } from "react"

export interface PreProps {
  children: string
  lang?: Language
  description?: ReactNode
  linesOff?: boolean
}

export type CodeProps = PreProps
