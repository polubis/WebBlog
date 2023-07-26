import React from "react"

import styled from "styled-components"
import Button from "../../../../components/button/Button"
import Section from "../../../../components/article/Section"
import { A, Hint, M, XL } from "../../../../ui"
import { useArticlesPageProvider } from "../ArticlesPageProvider"
import { useLayoutProvider } from "../../../providers/LayoutProvider"
import { useArticlesFiltersProvider } from "../ArticlesFiltersProvider"

const Container = styled.div`
  & > * {
    margin: 0 auto;
    max-width: 620px;
  }

  .no-articles-footer {
    margin: 20px 0 40px 0;
  }
`

const NoArticles = () => {
  const { discord_url, t: layoutT } = useLayoutProvider()
  const { t: articlesPageT } = useArticlesPageProvider()
  const { reset } = useArticlesFiltersProvider()

  return (
    <Container>
      <Section>
        <XL>{articlesPageT.no_articles_heading}</XL>
        <M>{articlesPageT.no_articles_description}</M>
        <footer className="no-articles-footer">
          <Button onClick={reset}>{articlesPageT.clean_filters}</Button>
        </footer>
        <Hint hasBg>
          {articlesPageT.no_articles_link}{" "}
          <A outside href={discord_url}>
            {layoutT.discord_channel}
          </A>
          !
        </Hint>
      </Section>
    </Container>
  )
}

export { NoArticles }
