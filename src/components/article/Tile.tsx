import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import Button from "../button/Button"
import Tags from "./Tags"
import { Article } from "../../models/Article"
import { XL, M } from "./Text"
import Details from "./Details"
import AuthorBadge from "./AuthorBadge"
import ReadTimeBadge from "./ReadTimeBadge"
import StarsBadge from "./StarsBadge"
import CommentsBadge from "./CommentsBadge"

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

  ${Details} {
    margin: 28px 0 42px 0;

    & > :not(:first-child) {
      margin-left: 28px;
    }

    & > :nth-child(2) {
      margin: 0 0 0 28px;
    }
  }
`

export default function ({ article }: Props): React.ReactElement {
  const {
    author,
    frontmatter: { tags, title, description, readTime },
    slug,
  } = article

  return (
    <Tile>
      <Tags tags={tags} />
      <XL>{title}</XL>
      <M normal>{description}</M>

      <Details>
        <AuthorBadge mini author={author} />
        <ReadTimeBadge minutes={readTime} />
        <StarsBadge quantity={0} />
        <CommentsBadge count={30} />
      </Details>

      <Link to={slug}>
        <Button>READ ARTICLE</Button>
      </Link>
    </Tile>
  )
}
