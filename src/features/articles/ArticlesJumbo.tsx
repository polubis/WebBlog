import React from "react"
import styled from "styled-components"
import theme from "../../utils/theme"
import { B, FilterIcon, IconButton, Input, M, XXL } from "../../ui"
import Button, { SecondaryButton } from "../../components/button/Button"
import Divider from "../../components/divider/Divider"
import Img from "gatsby-image"
import { Author, Image } from "../../models"
import { Link } from "gatsby"
import Badge from "../../components/article/Badge"
import { useArticlesProvider } from "./ArticlesProvider"
import { FiltersForm } from "./FiltersForm"

const Container = styled.figure`
  display: flex;
  position: relative;
  align-items: center;
  flex-flow: column;
  padding: 80px 20px;
  margin: 0;
  background: ${theme.grayE};
  border-bottom: 1px solid ${theme.grayC};
`

const Footer = styled.div`
  display: flex;
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
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: -10px;
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
  display: flex;
  align-items: center;
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

interface ArticlesJumboProps {
  bubblesImg: Image
  authors: Author[]
}

const ArticlesJumbo = ({ bubblesImg, authors }: ArticlesJumboProps) => {
  const {
    filters,
    changed,
    reset,
    filteredArticles,
    changeQuery,
  } = useArticlesProvider()

  return (
    <Container>
      <Img
        fluid={bubblesImg}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <Wrapper>
        <XXL>Find something interesting to read</XXL>
        <M>
          When writing our articles, we place great emphasis on the{" "}
          <B>quality</B> of their content and teaching materials. Thanks to this
          you will be able to find <B>meaningful materials</B> and understand{" "}
          <B>complex issues</B>.
        </M>
        <InputWrapper>
          <Input
            placeholder="🔍 Type to find an article..."
            value={filters.query}
            onChange={e => changeQuery(e.target.value)}
          />
          <FiltersForm
            authors={authors}
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
        <Footer>
          {changed && (
            <SecondaryButton onClick={reset}>Clean filters</SecondaryButton>
          )}
          <Link to="/blog-creator/">
            <Button>Create article</Button>
          </Link>
        </Footer>

        <div className="articles-jumbo-badges-section">
          <Badge color={theme.black} background={theme.secondary}>
            {filteredArticles.length} article
            {filteredArticles.length === 1 ? "" : "s"}
          </Badge>
          {changed && (
            <Badge color={theme.black} background={theme.greenA}>
              Filters active
            </Badge>
          )}
        </div>
      </Wrapper>
    </Container>
  )
}

export { ArticlesJumbo }
