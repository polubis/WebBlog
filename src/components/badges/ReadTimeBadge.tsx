import React from "react"
import styled from "styled-components"

import { S, ReadTimeIcon } from "../../ui"

const Badge = styled.div`
  ${S} {
    margin-left: 7px;
    flex-shrink: 0;
  }
`

interface Props {
  minutes: number
}

const getTime = (minutes: number): string => {
  const HOUR = 60

  if (minutes < HOUR) {
    return `${minutes} M`
  }

  return `${Math.floor(minutes / HOUR)} H ${minutes % HOUR} M`
}

export const ReadTimeBadge = ({ minutes }: Props) => {
  const time = getTime(minutes)

  return (
    <Badge className="row">
      <ReadTimeIcon />
      <S bold>{time}</S>
    </Badge>
  )
}
