import React from "react"
import styled from "styled-components"

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

  ${M} {
    text-transform: capitalize;
  }

  ${S} {
    margin-top: 6px;
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
  )
}
