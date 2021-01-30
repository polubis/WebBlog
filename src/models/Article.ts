export interface ArticleFrontmatter {
  date: string
  authorId: string
  tags: string
  description: string
  readTime: number
  title: string
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

export interface Article {
  author: ArticleAuthor
  frontmatter: ArticleFrontmatter
  slug: string
  body?: string
}
