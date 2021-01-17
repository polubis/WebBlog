export interface ArticleFrontmatter {
  date: string
  image: string
  author: string
  tags: string
  description: string
  readTime: number
}

export interface Article extends Omit<ArticleFrontmatter, "tags"> {
  tags: string[]
  title: string
  slug: string
}
