import React, { useMemo } from "react"

import { ArticlePageProvider } from "./ArticlePageProvider"
import { ArticleView } from "./ArticleView"
import { LayoutProvider } from "../../providers/LayoutProvider"
import { ArticlePageModel, Layout } from "../../core/models"
import { SEO } from "../../containers/SEO"
import { ArticleProvider } from "../../providers/ArticleProvider"
import { ArticleProviderState } from "../../providers/models"

interface ArticlePageProps {
  pageContext: {
    article: ArticlePageModel
    layout: Layout
  }
}

const ArticlePage = ({ pageContext }: ArticlePageProps) => {
  const { article, layout } = pageContext

  const initialState = useMemo(
    (): ArticleProviderState => ({
      ...article,
      tags: article.tags.split(","),
      duration: article.read_time,
      vote: {
        is: "idle",
        vote: article?.vote ?? { positive: 0, negative: 0 },
      },
      comments: {
        is: "idle",
      },
    }),
    []
  )

  return (
    <LayoutProvider initialState={layout}>
      <ArticlePageProvider initialState={article}>
        <ArticleProvider initialState={initialState}>
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
      </ArticlePageProvider>
    </LayoutProvider>
  )
}

export default ArticlePage
