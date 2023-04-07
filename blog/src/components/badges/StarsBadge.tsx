import React from "react"
import styled from "styled-components"

import { S, StarsIcon } from "../../ui"

const Badge = styled.div`
  display: flex;
  align-items: center;

  ${S} {
    margin-left: 7px;
  }
`

interface Props {
  quantity: number
}

export const StarsBadge = ({ quantity }: Props) => {
  return (
    <Badge>
      <StarsIcon />
      <S bold>{quantity}</S>
    </Badge>
  )
}
