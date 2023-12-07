import React from "react"

import { LayoutProvider } from "../../providers/LayoutProvider"
import { AuthorsPageModel, Layout } from "../../core/models"
import { SEO } from "../../containers/SEO"
import { AuthorsProvider } from "./AuthorsProvider"
import { AuthorsView } from "./AuthorsView"

interface ArticlePageProps {
  pageContext: {
    authors: AuthorsPageModel
    layout: Layout
  }
}

const ArticlePage = ({ pageContext }: ArticlePageProps) => {
  const { authors, layout } = pageContext

  return (
    <LayoutProvider initialState={layout}>
      <AuthorsProvider initialState={authors}>
        <SEO
          ga_page={authors.ga_page}
          url={authors.url}
          title={authors.t.page_title}
          type="website"
          image={layout.site_url + "/icon-192x192.png"}
          description={authors.t.page_description}
        >
          <AuthorsView />
        </SEO>
      </AuthorsProvider>
    </LayoutProvider>
  )
}

export default ArticlePage
