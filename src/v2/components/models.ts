import type { ReactElement, ReactNode } from "react"
import type { ArticlePageModel, FixedObject, User } from "../core/models"

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
  author: ArticlePageModel["author"]
  tech: ArticlePageModel["tech_reviewer"]
  ling: ArticlePageModel["ling_reviewer"]
  authorLabel: string
  lingLabel: string
  techLabel: string
}

interface SEOProps {
  title: string
  site_name: string
  locale: string
  locale_alternate: string
  lang: string
  description: string
  type: string
  robots?: string
  url: string
  ga_page: string
  children: ReactNode
  image?: string
  author?: string
}

interface AuthorTileProps {
  avatar: ReactNode
  fullName: string
  role: string
  bio: string
  footer: ReactNode
}

export type {
  AuthorTileProps,
  TagsProps,
  BreadcrumbsProps,
  UserBadgeProps,
  ObserveMeProps,
  ReviewersProps,
  SEOProps,
}