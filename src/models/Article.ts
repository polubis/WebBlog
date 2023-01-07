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
}

export interface ArticleThumbnail {
  aspectRatio: number
  base64: string
  sizes: string
  src: string
  srcSet: string
}

export interface ArticleAuthorAvatar {
  aspectRatio: number
  base64: string
  sizes: string
  src: string
  srcSet: string
}

export interface ArticleAuthor {
  firstName: string
  lastName: string
  id: string
  role: string
  avatar: ArticleAuthorAvatar
}

export interface ArticleTechnologyAvatar {
  aspectRatio: number
  base64: string
  sizes: string
  src: string
  srcSet: string
}

export interface ArticleTechnology {
  avatar: ArticleTechnologyAvatar
  id: string
}

export interface Article {
  author: ArticleAuthor
  stack: ArticleTechnology[]
  frontmatter: ArticleFrontmatter
  slug: string
  thumbnail: ArticleThumbnail
  body?: string
  isNew?: boolean
  lingReviewer: ArticleAuthor
  techReviewer: ArticleAuthor
}
