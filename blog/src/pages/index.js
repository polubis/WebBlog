import React from "react"

import Layout from "../components/layout/Layout"
import ArticleTags from "../components/article-tags/ArticleTags"

export default function () {
  return (
    <Layout>
      <div>
        <ArticleTags
          items={[
            "react",
            "angular",
            "vue",
            "angularjs",
            "javascript",
            "typescript",
            ".net",
            "php",
          ]}
        />
      </div>
    </Layout>
  )
}
