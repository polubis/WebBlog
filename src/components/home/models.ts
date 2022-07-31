import { ArticleAuthorAvatar, ArticleFrontmatter } from "../../models/Article"

export interface Author {
  id: string
  name: string
  firstName: string
  lastName: string
  role: string
  bio: string
  githubURL?: string
  linkedinURL?: string
}

export interface AuthorWithAvatar extends Author {
  avatar: ArticleAuthorAvatar
}

export interface HomeProps {
  data: {
    authors: {
      edges: {
        node: {
          name: string
          childImageSharp: {
            fluid: ArticleAuthorAvatar
          }
        }
      }[]
    }
    thumbnails: {
      nodes: {
        relativePath: string
        childImageSharp: {
          fluid: ArticleAuthorAvatar
        }
      }[]
    }
    articles: {
      nodes: {
        frontmatter: ArticleFrontmatter
        slug: string
      }[]
    }
  }
}
