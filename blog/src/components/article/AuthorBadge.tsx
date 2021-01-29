import React from "react"
import styled from "styled-components"

import AuthorAvatar from "./AuthorAvatar"
import { M, S } from "./Text"

interface Props {
  role: string
  name: string
  avatar: string
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
  role,
  name,
  avatar,
  mini,
}: Props): React.ReactElement {
  return (
    <AuthorBadge>
      <AuthorAvatar src={avatar} />
      {mini || (
        <Personality>
          <M bold>{name}</M>
          <S>{role}</S>
        </Personality>
      )}
    </AuthorBadge>
  )
}
