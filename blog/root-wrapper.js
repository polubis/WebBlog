import React from "react"
import { MDXProvider } from "@mdx-js/react"

import ArticleTitle from "./src/components/article-title/ArticleTitle"
import ArticleSectionTitle from "./src/components/article-section-title/ArticleSectionTitle"
import ArticleSectionText from "./src/components/article-section-text/ArticleSectionText"
import ArticleSectionLink from "./src/components/article-section-link/ArticleSectionLink"
import ArticleSpace from "./src/components/article-space/ArticleSpace"
import ArticleCode from "./src/components/article-code/ArticleCode"


const shortcodes = {
  ArticleTitle,
  ArticleSectionTitle,
  ArticleSectionText,
  ArticleSectionLink,
  ArticleSpace,
  ArticleCode
}

export const wrapRootElement = ({ element }) => {
  return <MDXProvider components={shortcodes}>{element}</MDXProvider>
}
