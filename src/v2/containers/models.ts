import { ImageProps } from "../ui/image/models"

interface ImageContainerProps
  extends Omit<ImageProps, "Error" | "Loading" | "Roller" | "alt" | "title"> {}

interface ImageRollerProps {
  onExpand(): void
}

interface ImageErrorWrapperProps {
  src: string
}

interface CodeErrorWrapperProps {
  src: string
}

interface LanguageLinksProps {
  row?: boolean
}

interface VoteButtonProps {
  disabled?: boolean
  onClick?(): void
  vote?: number
}

export interface RatingSectionProps {
  className?: string
}

export interface ArticleBodyProps {
  breadcrumbs: ReactNode
}

export type {
  ImageContainerProps,
  ImageRollerProps,
  LanguageLinksProps,
  ImageErrorWrapperProps,
  CodeErrorWrapperProps,
  VoteButtonProps,
}
