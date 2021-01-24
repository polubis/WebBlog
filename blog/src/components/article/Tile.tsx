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

interface Props {
  article: Article
}

const Tile = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  padding: 0 52px;
  box-sizing: border-box;
  max-width: 442px;

  & > a {
    margin: 0 auto 0 0;
  }

  ${XL} {
    margin: 10px 0 24px 0;
  }

  ${Details} {
    margin: 28px 0 42px 0;

    & > :nth-child(2) {
      margin: 0 28px 0 28px;
    }
  }
`

export default function ({ article }: Props): React.ReactElement {
  const { tags, title, description, slug } = article

  return (
    <Tile>
      <Tags tags={tags} />
      <XL>{title}</XL>
      <M normal>{description}</M>

      <Details>
        <AuthorBadge
          mini
          role={article.authorRole}
          name={article.author}
          avatar="https://mercomp.pl/wp-content/uploads/2018/05/user-avatar-1.png"
        />
        <ReadTimeBadge minutes={30} />
        <StarsBadge quantity={1230} />
      </Details>

      <Link to={slug}>
        <Button>READ ARTICLE</Button>
      </Link>
    </Tile>
  )
}
