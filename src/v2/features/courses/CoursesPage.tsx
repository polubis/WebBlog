import React from "react"

import { LayoutProvider } from "../../providers/LayoutProvider"
import { CoursesPageModel, Layout } from "../../core/models"
import { SEO } from "../../containers/SEO"
import { CoursesPageProvider } from "./CoursesPageProvider"
import { CoursesView } from "./CoursesView"

interface CoursesPageProps {
  pageContext: {
    courses: CoursesPageModel
    layout: Layout
  }
}

const CoursesPage = ({ pageContext }: CoursesPageProps) => {
  const { courses, layout } = pageContext

  return (
    <LayoutProvider initialState={layout}>
      <CoursesPageProvider initialState={courses}>
        <SEO
          ga_page={courses.ga_page}
          url={courses.url}
          title={`${layout.site_name} ${courses.t.page_title}`}
          type="website"
          image={layout.site_url + "/icon-192x192.png"}
          description={courses.t.page_description}
        >
          <CoursesView />
        </SEO>
      </CoursesPageProvider>
    </LayoutProvider>
  )
}

export default CoursesPage
