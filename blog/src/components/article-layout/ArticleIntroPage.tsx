import React from "react"

import styled from "styled-components"

import theme from "../../utils/theme"
import ArticleTitle from "../article-title/ArticleTitle"
import { Article } from "../../models/Article"

const ArticleIntroPage = styled.section`
  display: flex;
  flex-flow: column;
`

const ArticleIntroPageHeader = styled.header`
  width: 100%;
  height: 182px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.39);
    z-index: 0;
  }

  & > h1 {
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.39);
  }

  & > * {
    z-index: 1;
  }
`

interface Props {
  article: Article
}

export default function ({ article }: Props): React.ReactElement {
  const { title, thumbnail } = article

  return (
    <ArticleIntroPage>
      <ArticleIntroPageHeader style={{ backgroundImage: `url(${thumbnail})` }}>
        <ArticleTitle>{title}</ArticleTitle>
      </ArticleIntroPageHeader>
    </ArticleIntroPage>
  )
}
