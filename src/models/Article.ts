import type { Author } from "./Author"
import type { Image } from "./Image"
import type { LangKey } from "./Site"
import type { Technology } from "./Technology"
import type { Translated, Translation } from "./Translation"

export enum SeniorityLevel {
  beginner = "🔰",
  intermediate = "⭐",
  advanced = "🌟",
  expert = "🥇",
}

export interface ArticleFrontmatter {
  cdate: string
  mdate: string
  authorId: string
  treviewerId: string
  lreviewerId: string
  tags: string
  description: string
  readTime: number
  stack: string
  title: string
  langs: string[] | null
  seniorityLevel: SeniorityLevel
}

export interface Article {
  title: ArticleFrontmatter["title"]
  description: ArticleFrontmatter["description"]
  readTime: ArticleFrontmatter["readTime"]
  tags: ArticleFrontmatter["tags"]
  seniorityLevel: ArticleFrontmatter["seniorityLevel"]
  author: Author
  stack: Technology[]
  path: string
  slug: string
  thumbnail: Image
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
  next?: Article
  previous?: Article
}

export interface TranslatedArticleFrontmatter
  extends Omit<ArticleFrontmatter, "langs"> {}

export interface TranslatedArticle
  extends Omit<Article, "next" | "previous" | "translations"> {
  originalArticlePath: string
}
