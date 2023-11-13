import React from "react"

import { LayoutProvider } from "../../providers/LayoutProvider"
import { Layout, MentorshipPageModel } from "../../core/models"
import { SEO } from "../../containers/SEO"
import { MentorshipView } from "./MentorshipView"
import { MentorshipPageProvider } from "./MentorshipPageProvider"

interface MentorshipPageProps {
  pageContext: {
    layout: Layout
    mentorship: MentorshipPageModel
  }
}

const MentorshipPage = ({ pageContext }: MentorshipPageProps) => {
  const { layout, mentorship } = pageContext

  return (
    <LayoutProvider initialState={layout}>
      <SEO
        ga_page={mentorship.ga_page}
        url={mentorship.url}
        title={mentorship.t.title}
        type="website"
        // image={layout.site_url + mentorship.thumbnail.full.src}
        description={mentorship.t.description}
      >
        <MentorshipPageProvider initialState={mentorship}>
          <MentorshipView />
        </MentorshipPageProvider>
      </SEO>
    </LayoutProvider>
  )
}

export default MentorshipPage
