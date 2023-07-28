import React from "react"

import { LayoutProvider } from "../../providers/LayoutProvider"
import { Layout, LessonPageModel } from "../../core/models"
import { SEO } from "../../containers/SEO"
import { LessonPageProvider } from "./LessonPageProvider"
import { LessonView } from "./LessonView"

interface LessonPageProps {
  pageContext: {
    lesson: LessonPageModel
    layout: Layout
  }
}

const LessonPage = ({ pageContext }: LessonPageProps) => {
  const { lesson, layout } = pageContext

  return (
    <LayoutProvider initialState={layout}>
      <LessonPageProvider initialState={lesson}>
        <SEO
          ga_page={lesson.ga_page}
          url={lesson.url}
          title={lesson.title}
          type="article"
          image={layout.site_url + lesson.thumbnail.src}
          description={lesson.description}
        >
          <LessonView />
        </SEO>
      </LessonPageProvider>
    </LayoutProvider>
  )
}

export default LessonPage
