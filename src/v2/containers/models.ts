import type { FixedObject, Rate, Seniority, Technology } from "../core/models"
import type { ImageProps } from "../ui/image/models"

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

interface AuthorSectionProps {
  fullName: string
  avatar: FixedObject
  role: string
  path: string
}

interface NavigationSectionProps {
  prevPath?: string
  nextPath?: string
  sourceUrl: string
  url: string
  title: string
  description: string
  duration: number
  seniority: Seniority
  technologies: Technology[]
  tags: string[]
}

interface SummaryFooterProps {
  type: ''
}

interface AddVoteSectionProps {
  path: string
}

interface CommentsSectionProps {
  path: string
  rate?: Rate
}

export type {
  ImageContainerProps,
  ImageRollerProps,
  AuthorSectionProps,
  LanguageLinksProps,
  ImageErrorWrapperProps,
  SummaryFooterProps,
  CodeErrorWrapperProps,
  AddVoteSectionProps,
  NavigationSectionProps,
  CommentsSectionProps,
}
