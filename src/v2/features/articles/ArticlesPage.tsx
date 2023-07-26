import React from "react"

import { LayoutProvider } from "../../providers/LayoutProvider"
import type { ArticlesPageModel, Layout } from "../../core/models"
import { SEO } from "../../containers/SEO"
import { ArticlesPageProvider } from "./ArticlesPageProvider"
import { ArticlesView } from "./ArticlesView"
import { ArticlesFiltersProvider } from "./ArticlesFiltersProvider"

interface ArticlesPageProps {
  pageContext: {
    layout: Layout
    articles: ArticlesPageModel
  }
}

const ArticlesPage = ({ pageContext }: ArticlesPageProps) => {
  const { articles, layout } = pageContext

  return (
    <LayoutProvider initialState={layout}>
      <ArticlesPageProvider initialState={articles}>
        <ArticlesFiltersProvider>
          <SEO
            ga_page={articles.ga_page}
            url={articles.url}
            title={`${layout.site_name} ${articles.t.page_title}`}
            type="website"
            image={layout.site_url + articles.thumbnail.src}
            description={articles.t.page_description}
          >
            <ArticlesView />
          </SEO>
        </ArticlesFiltersProvider>
      </ArticlesPageProvider>
    </LayoutProvider>
  )
}

export default ArticlesPage
