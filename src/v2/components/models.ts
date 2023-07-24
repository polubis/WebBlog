import type { ReactElement, ReactNode } from "react"
import type { FixedObject, User } from "../core/models"

interface BaseProps {
  className?: string
}

interface TagsProps extends BaseProps {
  children: ReactElement[]
}

interface BreadcrumbsProps extends BaseProps {
  children: ReactElement[]
}

interface UserBadgeProps {
  avatar: FixedObject
  fullName: string
  role: string
  mini?: boolean
}

interface ObserveMeProps {
  author: User
  header: ReactNode
  description: ReactNode
  btnTitle: ReactNode
}

interface ReviewersProps {
  author: User
  tech: User
  ling: User
  authorLabel: string
  lingLabel: string
  techLabel: string
}

export type {
  TagsProps,
  BreadcrumbsProps,
  UserBadgeProps,
  ObserveMeProps,
  ReviewersProps,
}
