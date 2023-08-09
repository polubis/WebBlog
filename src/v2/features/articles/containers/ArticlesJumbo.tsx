import React from "react"
import styled from "styled-components"
import { useArticlesPageProvider } from "../ArticlesPageProvider"
import { useLayoutProvider } from "../../../providers/LayoutProvider"
import theme from "../../../../utils/theme"
import { FilterIcon, IconButton, Input, M, XXL } from "../../../../ui"
import { useArticlesFiltersProvider } from "../ArticlesFiltersProvider"
import Divider from "../../../../components/divider/Divider"
import Button, { SecondaryButton } from "../../../../components/button/Button"
import Badge from "../../../../components/article/Badge"
import { Link } from "gatsby"
import Image from "gatsby-image"
import { FiltersForm } from "./FiltersForm"

const Container = styled.figure`
  position: relative;
  align-items: center;
  padding: 80px 20px;
  margin: 0;
  background: ${theme.grayE};
  border-bottom: 1px solid ${theme.grayC};
`

const Footer = styled.div`
  justify-content: center;

  & > *:not(:last-child) {
    margin-right: 12px;
  }
`

const Wrapper = styled.div`
  max-width: 480px;
  z-index: 1;

  ${XXL}, ${M} {
    text-align: center;
  }

  ${XXL} {
    margin-bottom: 20px;
  }

  .divider {
    margin: 0 auto 32px auto;
  }

  .articles-jumbo-badges-section {
    justify-content: center;
    position: absolute;
    bottom: -13.5px;
    left: 0;
    right: 0;
    margin: 0 auto;

    & > *:not(:last-child) {
      margin-right: 12px;
    }
  }

  .filter-button.active {
    background: ${theme.greenA};
  }
`

const InputWrapper = styled.div`
  margin: 24px 0 40px 0;

  .ui-input {
    width: 100%;
    margin-right: 12px;
  }

  button {
    width: 44px;
    height: 44px;
  }
`

const thumbnailStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
}

const ArticlesJumbo = () => {
  const { t: layoutT, routes } = useLayoutProvider()
  const { thumbnail, t: articlesPageT } = useArticlesPageProvider()
  const {
    filters,
    changed,
    reset,
    filteredArticles,
    changeQuery,
  } = useArticlesFiltersProvider()

  return (
    <Container className="col">
      <Image fluid={thumbnail} alt={articlesPageT.heading} loading="eager" style={thumbnailStyle} />
      <Wrapper>
        <XXL>{articlesPageT.heading}</XXL>
        <M>{articlesPageT.heading_description}</M>
        <InputWrapper className="row">
          <Input
            placeholder={`🔍 ${articlesPageT.input_placeholder}`}
            value={filters.query}
            onChange={e => changeQuery(e.target.value)}
          />
          <FiltersForm
            trigger={modal => (
              <IconButton
                className={`filter-button${changed ? " active" : ""}`}
                onClick={modal.open}
              >
                <FilterIcon />
              </IconButton>
            )}
          />
        </InputWrapper>

        <Divider className="divider" horizontal />
        <Footer className="row">
          {changed && (
            <SecondaryButton onClick={reset}>
              {articlesPageT.clean_filters}
            </SecondaryButton>
          )}
          <Link to={routes.creator.to}>
            <Button>{layoutT.create_article}</Button>
          </Link>
        </Footer>

        <div className="articles-jumbo-badges-section row">
          <Badge color={theme.black} background={theme.secondary}>
            {articlesPageT.found}: {filteredArticles.length}
          </Badge>
          {changed && (
            <Badge color={theme.black} background={theme.greenA}>
              {articlesPageT.filters_active}
            </Badge>
          )}
        </div>
      </Wrapper>
    </Container>
  )
}

export { ArticlesJumbo }
