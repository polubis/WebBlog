import React from "react"

import { LayoutProvider } from "../../providers/LayoutProvider"
import { BlogCreatorPageModel, Layout } from "../../core/models"
import { SEO } from "../../containers/SEO"
import { BlogCreatorPageProvider } from "./BlogCreatorPageProvider"
import { BlogCreatorView } from "./BlogCreatorView"

interface BlogCreatorPageProps {
  pageContext: {
    creator: BlogCreatorPageModel
    layout: Layout
  }
}

const BlogCreatorPage = ({ pageContext }: BlogCreatorPageProps) => {
  const { creator, layout } = pageContext

  return (
    <LayoutProvider initialState={layout}>
      <BlogCreatorPageProvider initialState={creator}>
        <SEO
          ga_page={creator.ga_page}
          url={creator.url}
          title={`${layout.site_name} ${creator.t.page_title}`}
          type="website"
          image={layout.site_url + "/icon-192x192.png"}
          description={creator.t.page_description}
        >
          <BlogCreatorView />
        </SEO>
      </BlogCreatorPageProvider>
    </LayoutProvider>
  )
}

export default BlogCreatorPage
