import type { ReactElement, ReactNode } from "react"
import type { ArticlePageModel, CourseStatus, User } from "../core/models"

interface BaseProps {
  className?: string
}

interface TagsProps extends BaseProps {
  children: ReactElement[]
}

interface BreadcrumbsProps extends BaseProps {
  children: ReactElement[]
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

interface ReadTimeProps {
  time: number
}

interface CourseChaptersProps {
  activeLessonId: string
  activeChapterId: string
  chapters: {
    title: string
    path: string
    duration: number
    lessons: {
      title: string
      path: string
      duration: number
    }[]
  }[]
}

interface CourseStatusBadgeProps {
  value: CourseStatus
}

interface TimeBadgeProps {
  value: number
}

export interface AvatarProps {
  src?: string | null
  alt: string
}

export interface RateProps {
  rate: number
}

export interface VotesBoxProps {
  children?: ReactNode
}

export type {
  AuthorTileProps,
  TagsProps,
  BreadcrumbsProps,
  ObserveMeProps,
  ReviewersProps,
  SEOProps,
  ReadTimeProps,
  CourseChaptersProps,
  CourseStatusBadgeProps,
  TimeBadgeProps,
}
