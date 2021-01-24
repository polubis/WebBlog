import React from "react"

import styled from "styled-components"

import ArticleTitle from "../article-title/ArticleTitle"
import { Article } from "../../models/Article"
import ArticleSectionTitle from "../article-section-title/ArticleSectionTitle"
import ArticleTags from "../article-tags/ArticleTags"
import ArticleSectionText from "../article-section-text/ArticleSectionText"
import ArticleStarsBadge from "../article-stars-badge/ArticleStarsBadge"
import ArticleReadTimeBadge from "../article-read-time-badge/ArticleReadTimeBadge"
import ArticleAuthorBadge from "../article-author-badge/ArticleAuthorBadge"
import Button from "../button/Button"
import ArticleSpace from "../article-space/ArticleSpace"

const ArticleIntroPage = styled.section`
  display: flex;
  flex-flow: column;

  & > div:first-of-type {
    margin: 68px 0 28px 0;
  }

  & > button {
    margin-right: auto;
  }
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

const ArticleDetails = styled.div`
  display: flex;
  align-items: center;
  margin: 48px 0 82px 0;

  & > div:nth-of-type(2) {
    margin: 0 28px 0 54px;
  }
`

interface Props {
  article: Article
  onStartReadingClick(): void
}

export default function ({
  article,
  onStartReadingClick,
}: Props): React.ReactElement {
  const { title, thumbnail } = article

  return (
    <ArticleIntroPage>
      <ArticleIntroPageHeader style={{ backgroundImage: `url(${thumbnail})` }}>
        <ArticleTitle>{title}</ArticleTitle>
      </ArticleIntroPageHeader>

      <ArticleTags tags={article.tags} />

      <ArticleSectionTitle shifted>INTRO</ArticleSectionTitle>

      <ArticleSpace />

      <ArticleSectionText>{article.description}</ArticleSectionText>

      <ArticleDetails>
        <ArticleAuthorBadge
          avatar="https://mercomp.pl/wp-content/uploads/2018/05/user-avatar-1.png"
          name={article.author}
          role={article.authorRole}
        />
        <ArticleStarsBadge quantity={599} />
        <ArticleReadTimeBadge minutes={133} />
      </ArticleDetails>

      <Button onClick={onStartReadingClick}>start reading</Button>
    </ArticleIntroPage>
  )
}
