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
}

export interface Article {
  author: Author
  stack: Technology[]
  frontmatter: ArticleFrontmatter
  slug: string
  thumbnail: Image
  body?: string
  isNew?: boolean
  lingReviewer: Author
  techReviewer: Author
}
