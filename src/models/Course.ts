import { Author } from "./Author"
import { Chapter } from "./Chapter"
import { Technology } from "./Technology"

export type CourseStatus = "SHEDULED" | "PENDING" | "FINISHED"

export interface CourseFrontmatter {
  authorId: string
  treviewerId: string
  lreviewerId: string
  stack: string
  tags: string
  description: string
  name: string
  status: CourseStatus
  cdate: string
  mdate: string
}

export interface Course {
  id: string
  name: string
  duration: number
  description: string
  status: CourseStatus
  author: Author
  lingReviewer: Author
  techReviewer: Author
  path: string
  chapters: Chapter[]
  createdAt: string
  stack: Technology[]
  modifiedAt: string
}
