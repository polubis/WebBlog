import type { ReactNode } from "react"
import type { ToggleReturn } from "../../utils/useToggle"

interface ImageProps {
  className?: string
  src: string
  description?: string
  border?: boolean
  title: string
  alt: string
  // Blocks rendering image. Can be done only
  // after clicking the button.
  performant?: boolean
  Roller: (props: ToggleReturn) => ReactNode
  Loading: () => ReactNode
  Error: () => ReactNode
}

interface ImageRollerProps {
  onExpand(): void
}

interface ImagePreviewProps {
  title: string
  src: string
  alt: string
  onClose(): void
}

interface ImageContentProps {
  src: string
  description?: string
  title: string
  alt: string
  border?: boolean
  className?: string
}

interface ImageWrapperProps {
  className?: string
  children: ReactNode
}

export type {
  ImageProps,
  ImageContentProps,
  ImageRollerProps,
  ImagePreviewProps,
  ImageWrapperProps,
}
