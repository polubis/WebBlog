import React from "react"
import styled from "styled-components"

import { S, ReadTimeIcon } from "../../ui"

const Badge = styled.div`
  display: flex;
  align-items: center;

  ${S} {
    margin-left: 7px;
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
    <Badge>
      <ReadTimeIcon />
      <S bold>{time}</S>
    </Badge>
  )
}
