import React from "react"

import { LayoutProvider } from "../../providers/LayoutProvider"
import { Layout, MentoringPageModel } from "../../core/models"
import { SEO } from "../../containers/SEO"
import { MentoringView } from "./MentoringView"
import { MentoringPageProvider } from "./MentoringPageProvider"

interface MentoringPageProps {
  pageContext: {
    layout: Layout
    mentoring: MentoringPageModel
  }
}

const MentoringPage = ({ pageContext }: MentoringPageProps) => {
  const { layout, mentoring } = pageContext

  return (
    <LayoutProvider initialState={layout}>
      <MentoringPageProvider initialState={mentoring}>
        <SEO
          ga_page={mentoring.ga_page}
          url={mentoring.url}
          title={mentoring.t.page_title}
          type="website"
          image={layout.site_url + mentoring.thumbnail.src}
          description={mentoring.t.page_description}
        >
          <MentoringView />
        </SEO>
      </MentoringPageProvider>
    </LayoutProvider>
  )
}

export default MentoringPage
