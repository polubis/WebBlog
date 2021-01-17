import React from "react"

import styled from "styled-components"

import theme from "../../utils/theme"
import ArticleTags from "../article-tags/ArticleTags"
import ArticleAuthorAvatar from "../article-author-avatar/ArticleAuthorAvatar"
import ArticleReadTimeBadge from "../article-read-time-badge/ArticleReadTimeBadge"
import ArticleStarsBadge from "../article-stars-badge/ArticleStarsBadge"
import Button from "../button/Button"
import { Link } from "gatsby"
import { Article } from "../../models/Article"

interface Props {
  article: Article
}

const ArticleTile = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  padding: 0 52px;
  box-sizing: border-box;
  max-width: 442px;

  & > a {
    margin: 0 auto 0 -16px;
  }
`

const ArticleTitle = styled.h1`
  margin: 10px 0 24px 0;
  font-size: 28px;
  font-weight: bolder;
  color: ${theme.secondary};
`

const ArticleDescription = styled.span`
  font-size: 15px;
  color: ${theme.secondary};
  line-height: 28px;
`

const ArticleDetails = styled.div`
  display: flex;
  align-items: center;
  margin: 28px 0 52px 0;

  & > div:first-of-type {
    margin: 0 24px;
  }
`

export default function ({ article }: Props): React.ReactElement {
  const { tags, title, description, slug } = article

  return (
    <ArticleTile>
      <ArticleTags tags={tags} />
      <ArticleTitle>{title}</ArticleTitle>
      <ArticleDescription>{description}</ArticleDescription>

      <ArticleDetails>
        <ArticleAuthorAvatar src="https://mercomp.pl/wp-content/uploads/2018/05/user-avatar-1.png" />
        <ArticleStarsBadge quantity={599} />
        <ArticleReadTimeBadge minutes={133} />
      </ArticleDetails>

      <Link to={slug}>
        <Button>READ ARTICLE</Button>
      </Link>
    </ArticleTile>
  )
}
