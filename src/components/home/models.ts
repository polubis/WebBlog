import { Image } from "../../models"
import { ArticleFrontmatter } from "../../models/Article"

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
  avatar: Image
}

export interface HomeProps {
  data: {
    authors: {
      edges: {
        node: {
          name: string
          childImageSharp: {
            fluid: Image
          }
        }
      }[]
    }
    thumbnails: {
      nodes: {
        relativePath: string
        childImageSharp: {
          fluid: Image
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
