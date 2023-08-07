import type { ReactNode } from "react"

export interface AsideProps {
  children: ReactNode
}

export interface HeaderProps {
  text: string
  onClose: () => void
}
