import type { ReactElement, DetailedHTMLProps, HTMLAttributes } from "react"

interface TabProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  active?: boolean
}

interface TabsProps {
  className?: string
  children: ReactElement<TabProps>[]
}

export type { TabsProps, TabProps }
