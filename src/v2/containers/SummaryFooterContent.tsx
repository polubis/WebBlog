import React from "react"
import {
  ArticleBasedDataProvider,
  useArticleBasedDataProvider,
} from "../providers/ArticleBasedDataProvider"
import type { ArticleBasedDataProviderModel } from "../providers/models"

const Content = () => {
  const data = useArticleBasedDataProvider()

  console.log(data)

  return <div>Content</div>
}

const SummaryFooterContent = (props: ArticleBasedDataProviderModel) => {
  return (
    <ArticleBasedDataProvider initialState={props}>
      <Content />
    </ArticleBasedDataProvider>
  )
}

export { SummaryFooterContent }
