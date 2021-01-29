import React from "react"
import styled from "styled-components"

import AuthorAvatar from "./AuthorAvatar"
import { M, S } from "./Text"
import { ArticleAuthor } from "../../models/Article"

interface Props {
  author: ArticleAuthor
  mini?: boolean
}

const AuthorBadge = styled.div`
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

export default function ({
  author: { role, id, avatar, firstName, lastName },
  mini,
}: Props): React.ReactElement {
  return (
    <AuthorBadge>
      <AuthorAvatar avatar={avatar} />
      {mini || (
        <Personality>
          <M bold>{firstName} {lastName}</M>
          <S>{role}</S>
        </Personality>
      )}
    </AuthorBadge>
  )
}
