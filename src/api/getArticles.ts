import { Article, ArticleFrontmatter, Image } from "../models"
import authors from "../authors/authors.json"
import { getArticlesQuery } from "./getArticlesQuery"

export interface GetArticlesResponse {
  data: {
    technologiesAvatars: {
      nodes: {
        name: string
        relativePath: string
        childImageSharp: {
          fluid: Image
        }
      }[]
    }
    authorsAvatars: {
      nodes: {
        name: string
        relativePath: string
        childImageSharp: {
          fluid: Image
        }
      }[]
    }
    articles: {
      nodes: {
        slug: string
        body: string
        frontmatter: ArticleFrontmatter
      }[]
    }
    thumbnails: {
      nodes: {
        name: string
        relativePath: string
        childImageSharp: {
          fluid: Image
        }
      }[]
    }
  }
}

export const getArticles = ({ data }: GetArticlesResponse): Article[] => {
  const articles = getArticlesQuery({
    ...data,
    authors,
  })

  return articles
}
