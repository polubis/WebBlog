import {
  ChapterFrontmatter,
  Course,
  CourseFrontmatter,
  Image,
  LessonFrontmatter,
} from "../models"
import authors from "../authors/authors.json"
import { getCoursesQuery } from "./getCoursesQuery"

export interface GetCoursesResponse {
  data: {
    avatars: {
      nodes: {
        name: string
        childImageSharp: {
          fluid: Image
        }
      }[]
    }
    courses: {
      nodes: {
        frontmatter: CourseFrontmatter
        slug: string
      }[]
    }
    chapters: {
      nodes: {
        slug: string
        frontmatter: ChapterFrontmatter
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

export const getCourses = ({ data }: GetCoursesResponse): Course[] => {
  const courses = getCoursesQuery({
    ...data,
    authors,
  })

  return courses
}
