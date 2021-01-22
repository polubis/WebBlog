export interface ArticleFrontmatter {
  date: string
  author: string
  authorRole: string
  tags: string
  description: string
  thumbnail: string
  readTime: number
}

export interface Article extends Omit<ArticleFrontmatter, "tags"> {
  tags: string[]
  title: string
  slug: string
}
