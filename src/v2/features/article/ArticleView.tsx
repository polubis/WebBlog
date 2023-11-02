import React from "react"
import { Content } from "../../../ui"
import Layout from "../../containers/Layout"
import { ArticleBody } from "../../containers/ArticleBody"
import styled from "styled-components"
import { L_UP } from "../../../utils/viewport"
import { Link } from "gatsby"
import { useLayoutProvider } from "../../providers/LayoutProvider"
import { useArticleProvider } from "../../providers/ArticleProvider"

const Container = styled.main`
  margin: 24px auto;

  @media ${L_UP} {
    width: 920px;
  }
`

const ArticleView = () => {
  const layout = useLayoutProvider()
  const { state: article } = useArticleProvider()

  return (
    <Layout>
      <Content>
        <Container>
          <ArticleBody
            breadcrumbs={
              <>
                <Link to={layout.routes.home.to}>{layout.t.home}</Link>
                <Link to={layout.routes.articles.to}>{layout.t.articles}</Link>
                <span>{article.title}</span>
              </>
            }
          />
        </Container>
      </Content>
    </Layout>
  )
}

export { ArticleView }
