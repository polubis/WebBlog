import React from "react"

import { LayoutProvider } from "../../providers/LayoutProvider"
import { CoursePageModel, Layout } from "../../core/models"
import { SEO } from "../../containers/SEO"
import { CoursePageProvider } from "./CoursePageProvider"
import { CourseView } from "./CourseView"

interface CoursePageProps {
  pageContext: {
    course: CoursePageModel
    layout: Layout
  }
}

const CoursePage = ({ pageContext }: CoursePageProps) => {
  const { course, layout } = pageContext

  return (
    <LayoutProvider initialState={layout}>
      <CoursePageProvider initialState={course}>
        <SEO
          ga_page={course.ga_page}
          url={course.url}
          title={course.title}
          type="website"
          image={layout.site_url + course.thumbnail.src}
          description={course.description}
        >
          <CourseView />
        </SEO>
      </CoursePageProvider>
    </LayoutProvider>
  )
}

export default CoursePage
