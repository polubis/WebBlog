import React from "react"
import { MDXProvider } from "@mdx-js/react"

import ArticleTitle from "./src/components/article-title/ArticleTitle"

const shortcodes = { ArticleTitle }

export const wrapRootElement = ({ element }) => {
  return <MDXProvider components={shortcodes}>{element}</MDXProvider>
}
