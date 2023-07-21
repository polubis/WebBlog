import React from "react"

import { ArticleProvider } from "./ArticleProvider"
import { ArticleView } from "./ArticleView"
import { SiteMeta } from "../../../utils/SiteMeta"
import {
  LayoutProvider,
} from "../../providers/LayoutProvider"
import { Article, Layout } from "../../core/models"

interface ArticlePageProps {
  pageContext: {
    article: Article
    layout: Layout
  }
}

const ArticlePage = ({ pageContext }: ArticlePageProps) => {
  const { article, layout } = pageContext

  return (
    <SiteMeta
      siteName={layout.site_name}
      siteLang={layout.lang.html}
      gaPage={article.ga_page}
      url={article.ga_page + "/"}
      robots="index,follow,max-image-preview:large"
      title={article.title}
      type="article"
      author={article.author.full_name}
      description={article.description}
      image={article.thumbnail.full.src}
    >
      <LayoutProvider initialState={layout}>
        <ArticleProvider initialState={article}>
          <ArticleView />
        </ArticleProvider>
      </LayoutProvider>
    </SiteMeta>
  )
}

export default ArticlePage
