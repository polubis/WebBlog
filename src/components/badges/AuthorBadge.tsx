import React from "react"
import styled from "styled-components"
import { Link as GatsbyLink } from "gatsby"

import { M, S } from "../../ui"
import AuthorAvatar from "../article/AuthorAvatar"
import { Author } from "../../models"

interface Props {
  author: Author
  mini?: boolean
}

const Badge = styled.div`
  cursor: pointer;

  ${M} {
    text-transform: capitalize;
  }
`

const Personality = styled.div`
  margin-left: 14px;
`

export const AuthorBadge = ({
  author: { role, avatar, firstName, lastName },
  mini,
}: Props) => {
  return (
    <GatsbyLink to="/authors/">
      <Badge className="row">
        <AuthorAvatar avatar={avatar.small.fixed} />
        {mini || (
          <Personality className="col">
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
