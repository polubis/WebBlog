import type { Language } from "prism-react-renderer"
import type { ReactNode } from "react"

interface CodeProps {
  children: string
  lang?: Language
  description?: ReactNode
  linesOff?: boolean
}

interface LazyCodeProps extends CodeProps {}

export type { CodeProps, LazyCodeProps }
