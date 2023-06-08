import type { Author } from "./Author"
import type { Image } from "./Image"
import type { LangKey } from "./Site"
import type { Technology } from "./Technology"
import type { Translated, Translation } from "./Translation"

enum seniorityLevel {
  beginner = '🔰',
  intermediate ='⭐',
  advanced = '🌟',
  expert = '🥇'
}

export interface ArticleFrontmatter {
  cdate: string
  mdate: string
  tbcdate?: string
  authorId: string
  treviewerId: string
  lreviewerId: string
  tags: string
  description: string
  readTime: number
  stack: string
  title: string
  langs: string[] | null
  graphicauthor?: string
  seniorityLevel : seniorityLevel
}

export interface Article {
  title: ArticleFrontmatter["title"]
  description: ArticleFrontmatter["description"]
  readTime: ArticleFrontmatter["readTime"]
  tags: ArticleFrontmatter["tags"]
  author: Author
  stack: Technology[]
  path: string
  slug: string
  thumbnail: Image
  rawBody: string
  body: string
  isNew: boolean
  lingReviewer: Author
  translations: Translation[]
  techReviewer: Author
  lang: LangKey
  createdAt: string
  t: Translated
  modifiedAt: string
  gaPage: string
  toBeContinuedDate?: string
  graphicAuthorLink?: string
  next?: Article
  previous?: Article
}

export interface TranslatedArticleFrontmatter
  extends Omit<ArticleFrontmatter, "langs"> {}

export interface TranslatedArticle
  extends Omit<Article, "next" | "previous" | "translations"> {
  originalArticlePath: string
}
