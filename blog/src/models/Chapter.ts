import { Lesson } from "./Lesson"

export interface ChapterFrontmatter {
  name: string
}

export interface Chapter {
  id: string
  name: string
  slug: string
  path: string
  gaPage: string
  duration: number
  lessons: Lesson[]
}
