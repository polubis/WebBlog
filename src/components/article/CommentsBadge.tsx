import React from "react"
import styled from "styled-components"

import { S } from "./Text"
import CommentsIcon from "./icons/CommentsIcon"

const CommentsBadge = styled.div`
  display: flex;
  align-items: center;

  ${S} {
    margin-left: 7px;
  }
`

interface Props {
  count: number
}

export default function ({ count }: Props): React.ReactElement {
  return (
    <CommentsBadge>
      <CommentsIcon />
      <S bold>{count}</S>
    </CommentsBadge>
  )
}
