import { Author } from "./Author"
import { Image } from "./Image"
import { Technology } from "./Technology"

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
  graphicauthor?: string
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
  body: string
  isNew: boolean
  lingReviewer: Author
  techReviewer: Author
  createdAt: string
  modifiedAt: string
  gaPage: string
  toBeContinuedDate?: string
  graphicAuthorLink?: string
}
