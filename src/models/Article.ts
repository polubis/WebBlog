export interface ArticleFrontmatter {
  date: string
  authorId: string
  tags: string
  description: string
  readTime: number
  title: string
}

export interface ArticleAuthor {
  firstName: string
  lastName: string
  id: string
  role: string
  avatar: string
}

export interface Article {
  author: ArticleAuthor
  frontmatter: ArticleFrontmatter
  slug: string
}
