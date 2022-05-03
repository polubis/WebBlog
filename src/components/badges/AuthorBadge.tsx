import React from "react"
import styled from "styled-components"
import { Link as GatsbyLink } from "gatsby"

import { M, S } from "../../ui"
import AuthorAvatar from "../article/AuthorAvatar"
import { ArticleAuthor } from "../../models/Article"

interface Props {
  author: ArticleAuthor
  mini?: boolean
}

const Badge = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  ${M} {
    text-transform: capitalize;
  }
`

const Personality = styled.div`
  display: flex;
  flex-flow: column;
  margin-left: 14px;
`

export const AuthorBadge = ({
  author: { role, avatar, firstName, lastName },
  mini,
}: Props) => {
  return (
    <GatsbyLink to="/authors">
      <Badge>
        <AuthorAvatar avatar={avatar} />
        {mini || (
          <Personality>
            <M bold>
              {firstName} {lastName}
            </M>
            <S>{role}</S>
          </Personality>
        )}
      </Badge>
    </GatsbyLink>
  )
}
