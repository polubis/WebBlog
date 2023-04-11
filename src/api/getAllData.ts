import {
  Avatar,
  Article,
  ArticleFrontmatter,
  Author,
  Course,
  CourseFrontmatter,
  Image,
  LessonFrontmatter,
  Site,
  SiteMetadata,
} from "../models"
import authors from "../authors/authors.json"
import { getAllDataQuery } from "./getAllDataQuery"
import { TimelineData } from "../components/timeline"

interface AllDataPageProps {
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
    articleThumbnails: {
      nodes: {
        name: string
        relativePath: string
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
    lessons: {
      nodes: {
        slug: string
        frontmatter: LessonFrontmatter
      }[]
    }
    chapters: {
      nodes: {
        slug: string
        frontmatter: {
          name: string
        }
      }[]
    }
    coursesThumbnails: {
      nodes: {
        relativePath: string
        childImageSharp: {
          fluid: Image
        }
      }[]
    }
    animalsAvatars: {
      nodes: {
        relativePath: string
        childImageSharp: {
          fluid: Image
        }
      }[]
    }
    site: Site
  }
}

interface AllDataResponse {
  articles: Article[]
  authors: Author[]
  courses: Course[]
  totalLessons: number
  timeline: TimelineData
  site: SiteMetadata
  animalsAvatars: Avatar[]
}

const getAllData = (props: AllDataPageProps): AllDataResponse => {
  const result = getAllDataQuery({
    ...props.data,
    authors,
  }) as AllDataResponse

  return result
}

export type { AllDataPageProps, AllDataResponse }

export { getAllData }
