import React from "react"

import { ArticleProvider, ArticleProviderState } from "./ArticleProvider"
import { ArticleView } from "./ArticleView"
import { SiteMeta } from "../../../utils/SiteMeta"
import {
  LayoutProvider,
  LayoutProviderState,
} from "../../providers/LayoutProvider"

interface ArticlePageProps {
  pageContext: {
    article: ArticleProviderState
    layout: LayoutProviderState
  }
}

const ArticlePage = ({ pageContext }: ArticlePageProps) => {
  const { article, layout } = pageContext
  const { article: articleData } = article

  return (
    <SiteMeta
      siteName={layout.meta.site_name}
      siteLang={layout.lang.html}
      gaPage={article.article.gaPage}
      url={articleData.gaPage + "/"}
      robots="index,follow,max-image-preview:large"
      title={articleData.title}
      type="article"
      author={article.author}
      description={articleData.description}
      image={articleData.thumbnail.src}
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
