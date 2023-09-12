import type { ReactNode } from "react"
import type { useModal } from "../../../../ui"

export interface PopoverProps {
  position: number
  label: string
  trigger: (props: ReturnType<typeof useModal>) => ReactNode
  children: (props: ReturnType<typeof useModal>) => ReactNode
  disabled?: boolean
}

export interface PopoverContentProps {
  children: [ReactNode, ReactNode] | ReactNode
}
