import React from "react"

import Layout from "../components/layout/Layout"
import ArticleTitle from "../components/article-title/ArticleTitle"

export default function (): React.ReactElement {
  return (
    <Layout>
      <div>
        <ArticleTitle>
          Tdd o true example we writting our custom library
        </ArticleTitle>
      </div>
    </Layout>
  )
}
