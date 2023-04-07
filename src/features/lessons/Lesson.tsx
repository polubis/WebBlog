import React from "react"
import { SiteMeta } from "../../utils/SiteMeta"
import { LessonContent } from "./containers"
import { Chapter, Course, Lesson } from "../../models"
import { AllDataResponse } from "../../api"

interface Props {
  pageContext: AllDataResponse & {
    lesson: Lesson
    course: Course
    chapter: Chapter
  }
}

export default function ({
  pageContext: { lesson, course, chapter, articles, site },
}: Props) {
  return (
    <SiteMeta
      siteName={site.siteName}
      siteLang={site.siteLang}
      gaPage={lesson.gaPage}
      url={lesson.gaPage + "/"}
      robots="index,follow,max-image-preview:large"
      title={lesson.name}
      type="article"
      author={course.author.firstName + " " + course.author.lastName}
      description={lesson.description}
      image={course.thumbnail.src}
    >
      <LessonContent
        lesson={lesson}
        course={course}
        chapter={chapter}
        articles={articles}
      />
    </SiteMeta>
  )
}
