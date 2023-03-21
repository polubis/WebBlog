import { GetArticlesResponse } from "../../api/getArticles"
import { CourseFrontmatter, Image, LessonFrontmatter } from "../../models"

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
  data: GetArticlesResponse["data"] & {
    courses: {
      nodes: {
        frontmatter: CourseFrontmatter
        slug: string
      }[]
    }
    lessons: {
      nodes: {
        slug: string
        frontmatter: LessonFrontmatter
      }[]
    }
  }
}
