import React from "react"
import { useScrollToTop } from "../../../utils/useScrollToTop"
import Layout from "../../containers/Layout"
import { Content } from "../../../ui"
import { ArticlesJumbo } from "./containers/ArticlesJumbo"
import { useArticlesFiltersProvider } from "./ArticlesFiltersProvider"
import { NoArticles } from "./containers/NoArticles"
import { ArticlesGrid } from "./containers/ArticlesGrid"

const ArticlesView = () => {
  const { filteredArticles } = useArticlesFiltersProvider()

  useScrollToTop()

  return (
    <Layout>
      <ArticlesJumbo />
      <Content paddingY>
        {filteredArticles.length === 0 ? <NoArticles /> : <ArticlesGrid />}
      </Content>
    </Layout>
  )
}

export { ArticlesView }
