import React from "react"
import { SiteMeta } from "../../utils/SiteMeta"
import { removeEdgeSlashes } from "../../utils/removeEdgeSlashses"
import { Author, Chapter, Lesson } from "../../models"
import { LessonContent } from "./containers"

interface Props {
  pageContext: {
    lesson: Lesson
    chapters: Chapter[]
    author: Author
  }
}

export default function ({ pageContext: { lesson, chapters, author } }: Props) {
  return (
    <SiteMeta
      gaPage={removeEdgeSlashes(lesson.path)}
      url={lesson.path}
      robots="index,follow,max-image-preview:large"
      title={lesson.name}
      type="article"
      author={author.firstName + " " + author.lastName}
      description="TODO"
    >
      <LessonContent />
    </SiteMeta>
  )
}
