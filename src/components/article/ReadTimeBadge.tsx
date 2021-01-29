import React from "react"
import styled from "styled-components"

import ReadTimeIcon from "./icons/ReadTimeIcon"
import { S } from "./Text"

const ReadTimeBadge = styled.div`
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

export default function ({ minutes }: Props): React.ReactElement {
  const time = getTime(minutes)

  return (
    <ReadTimeBadge>
      <ReadTimeIcon />
      <S bold>{time}</S>
    </ReadTimeBadge>
  )
}
