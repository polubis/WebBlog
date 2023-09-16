import type { ReactNode } from "react"
import type { ToggleReturn } from "../../utils/useToggle"

interface ImageProps {
  className?: string
  src: string
  description?: string
  title: string
  alt: string
  // Blocks rendering image. Can be done only
  // after clicking the button.
  rolled?: boolean
  Roller: (props: ToggleReturn) => ReactNode
  Loading: () => ReactNode
  Error: () => ReactNode
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
  className?: string
}

interface ImageWrapperProps {
  className?: string
  children: ReactNode
  description?: string
}

export type {
  ImageProps,
  ImageContentProps,
  ImagePreviewProps,
  ImageWrapperProps,
}
