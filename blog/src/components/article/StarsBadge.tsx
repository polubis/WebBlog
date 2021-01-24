import React from "react"
import styled from "styled-components"

import StarsIcon from "./icons/StarsIcon"
import { S } from "./Text"

const StarsBadge = styled.div`
  display: flex;
  align-items: center;

  ${S} {
    margin-left: 7px;
  }
`

interface Props {
  quantity: number
}

export default function ({ quantity }: Props): React.ReactElement {
  return (
    <StarsBadge>
      <StarsIcon />
      <S bold>{quantity}</S>
    </StarsBadge>
  )
}
