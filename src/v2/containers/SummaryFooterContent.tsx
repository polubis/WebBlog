import React from "react"
import {
  ArticleBasedDataProvider,
  useArticleBasedDataProvider,
} from "../providers/ArticleBasedDataProvider"
import type { ArticleBasedDataProviderModel } from "../providers/models"
import { AuthorSection } from "./AuthorSection"

const Content = () => {
  const data = useArticleBasedDataProvider()

  console.log(data)

  return <>
    <AuthorSection />
  </>
}

const SummaryFooterContent = (props: ArticleBasedDataProviderModel) => {
  return (
    <ArticleBasedDataProvider initialState={props}>
      <Content />
    </ArticleBasedDataProvider>
  )
}

export { SummaryFooterContent }
