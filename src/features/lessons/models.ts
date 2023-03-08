import { Chapter, Course, Lesson } from "../../models"

export interface LessonPageContext {
  lesson: Lesson
  chapter: Chapter
  course: Course
}
