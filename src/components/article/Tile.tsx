import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import Button from "../button/Button"
import Tags from "./Tags"
import { Article } from "../../models/Article"
import { XL, M } from "../../ui"
import Details from "./Details"
import { AuthorBadge, ReadTimeBadge } from "../badges"
import Badge from "./Badge"
import theme from "../../utils/theme"

interface Props {
  article: Article
}

const Tile = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  box-sizing: border-box;

  & > a {
    margin: 0 auto 0 0;
    text-decoration: none;
  }

  & > a:hover,
  & > a:active {
    text-decoration: underline ${theme.primary};
  }

  ${XL} {
    margin: 10px 0 24px 0;
  }

  ${M} {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  ${Details} {
    margin: 28px 0 42px 0;

    & > :nth-child(2) {
      margin: 0 28px 0 28px;
    }
  }
`

export default function ({ article }: Props): React.ReactElement {
  const { author, tags, title, description, readTime, isNew, path } = article

  return (
    <Tile>
      <Tags tags={tags} />
      <Link to={path}>
        <XL>{title}</XL>
      </Link>
      <M normal>{description}</M>

      <Details>
        <AuthorBadge mini author={author} />
        <ReadTimeBadge minutes={readTime} />
        {isNew && <Badge color={theme.green}>new</Badge>}
      </Details>
      <Link to={path}>
        <Button>READ ARTICLE</Button>
      </Link>
    </Tile>
  )
}
