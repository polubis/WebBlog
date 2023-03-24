import React from "react"
import { SiteMeta } from "../../utils/SiteMeta"
import { Course } from "../../models"
import { CourseContent } from "./containers"
import { AllDataResponse } from "../../api"

interface Props {
  pageContext: AllDataResponse & {
    course: Course
  }
}

export default function ({ pageContext: { course, articles } }: Props) {
  return (
    <SiteMeta
      gaPage={course.gaPage}
      url={course.gaPage + "/"}
      robots="index,follow,max-image-preview:large"
      title={course.name}
      type="article"
      author={course.author.firstName + " " + course.author.lastName}
      description={course.description}
    >
      <CourseContent course={course} articles={articles} />
    </SiteMeta>
  )
}
