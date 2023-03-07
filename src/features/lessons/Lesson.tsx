import React from "react"
import { SiteMeta } from "../../utils/SiteMeta"
import { removeEdgeSlashes } from "../../utils/removeEdgeSlashses"
import { LessonContent } from "./containers"
import { LessonProvider } from "./LessonProvider"
import { LessonPageContext } from "./models"

interface Props {
  pageContext: LessonPageContext
}

export default function ({ pageContext: { lesson, course, chapter } }: Props) {
  return (
    <SiteMeta
      gaPage={removeEdgeSlashes(lesson.path)}
      url={lesson.path}
      robots="index,follow,max-image-preview:large"
      title={lesson.name}
      type="article"
      author={course.author.firstName + " " + course.author.lastName}
      description="TODO"
    >
      <LessonProvider lesson={lesson} course={course} chapter={chapter}>
        <LessonContent />
      </LessonProvider>
    </SiteMeta>
  )
}
