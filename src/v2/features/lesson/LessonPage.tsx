import React from "react"

import { LayoutProvider } from "../../providers/LayoutProvider"
import { ArticlePageModel, Layout } from "../../core/models"
import { SEO } from "../../containers/SEO"
import { LessonView } from "./LessonView"
import { ArticleProvider } from "../../providers/ArticleProvider"

interface LessonPageProps {
  pageContext: {
    article: ArticlePageModel
    layout: Layout
  }
}

const LessonPage = ({ pageContext }: LessonPageProps) => {
  const { article, layout } = pageContext

  return (
    <LayoutProvider initialState={layout}>
      <ArticleProvider initialState={article}>
        <SEO
          ga_page={article.ga_page}
          url={article.url}
          title={article.title}
          type="article"
          image={layout.site_url + article.thumbnail.full.src}
          description={article.description}
        >
          <LessonView />
        </SEO>
      </ArticleProvider>
    </LayoutProvider>
  )
}

export default LessonPage
