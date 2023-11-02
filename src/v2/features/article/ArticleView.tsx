import React from "react"
import { Content } from "../../../ui"
import { useScrollToTop } from "../../../utils/useScrollToTop"
import Layout from "../../containers/Layout"
import { ArticleBody } from "../../containers/ArticleBody"
import styled from "styled-components"
import { L_UP } from "../../../utils/viewport"

const Container = styled.main`
  margin: 24px auto;

  @media ${L_UP} {
    width: 920px;
  }
`

const ArticleView = () => {
  useScrollToTop()

  return (
    <Layout>
      <Content>
        <Container>
          <ArticleBody />
        </Container>
      </Content>
    </Layout>
  )
}

export { ArticleView }
