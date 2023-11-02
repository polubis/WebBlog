import React from "react"

import { ArticleView } from "./ArticleView"
import { LayoutProvider } from "../../providers/LayoutProvider"
import { ArticlePageModel, Layout } from "../../core/models"
import { SEO } from "../../containers/SEO"
import { ArticleProvider } from "../../providers/ArticleProvider"

interface ArticlePageProps {
  pageContext: {
    article: ArticlePageModel
    layout: Layout
  }
}

const ArticlePage = ({ pageContext }: ArticlePageProps) => {
  const { article, layout } = pageContext

  return (
    <LayoutProvider initialState={layout}>
      <ArticleProvider initialState={article}>
        <SEO
          ga_page={article.ga_page}
          url={article.url}
          title={article.title}
          type="article"
          description={article.description}
          image={layout.site_url + article.thumbnail.full.src}
          author={article.author.full_name}
        >
          <ArticleView />
        </SEO>
      </ArticleProvider>
    </LayoutProvider>
  )
}

export default ArticlePage
