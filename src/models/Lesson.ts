export interface LessonFrontmatter {
  name: string
  duration: number
}

export interface Lesson {
  id: string
  name: string
  duration: number
  slug: string
  rawBody: string
  path: string
  gaPage: string
  body: string
  description: string
  nextLesson: Lesson | undefined
  prevLesson: Lesson | undefined
}
