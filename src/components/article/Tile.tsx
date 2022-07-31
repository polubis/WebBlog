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
  const {
    author,
    frontmatter: { tags, title, description, readTime },
    slug,
    isNew,
  } = article

  const formattedSlug = slug.substring(0, slug.length - 1)

  return (
    <Tile>
      <Tags tags={tags} />
      <XL>{title}</XL>
      <M normal>{description}</M>

      <Details>
        <AuthorBadge mini author={author} />
        <ReadTimeBadge minutes={readTime} />
        {isNew && <Badge color={theme.green}>new</Badge>}
      </Details>
      <Link to={`/articles/${formattedSlug}`}>
        <Button>READ ARTICLE</Button>
      </Link>
    </Tile>
  )
}
