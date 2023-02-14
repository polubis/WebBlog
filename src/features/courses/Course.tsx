import React from "react"
import { SiteMeta } from "../../utils/SiteMeta"
import { Course } from "../../models"
import { CourseContent } from "./CourseContent"
import { CourseProvider } from "./CourseProvider"

interface Props {
  pageContext: {
    course: Course
  }
}

export default function ({ pageContext: { course } }: Props) {
  return (
    <SiteMeta
      gaPage={`courses/${course.name}`}
      url={course.path}
      robots="index,follow,max-image-preview:large"
      title={course.name}
      type="article"
      author={course.author.firstName + " " + course.author.lastName}
      description={course.description}
    >
      <CourseProvider initialCourse={course}>
        <CourseContent />
      </CourseProvider>
    </SiteMeta>
  )
}
