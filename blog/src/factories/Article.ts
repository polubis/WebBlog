import { Article, ArticleFrontmatter } from "../models/Article"

export const createArticleTitle = (slug: string): string => {
  return slug
    .replace(/\//g, " ")
    .replace(/-/g, " ")
    .replace(slug.charAt(0), slug.charAt(0).toUpperCase())
}

export const createArticleTags = (tags: string) => {
  return tags.split(",")
}

export const createArticle = ({
  slug,
  frontmatter,
}: {
  slug: string
  frontmatter: ArticleFrontmatter
}): Article => {
  return {
    ...frontmatter,
    slug,
    title: createArticleTitle(slug),
    tags: createArticleTags(frontmatter.tags),
  }
}
