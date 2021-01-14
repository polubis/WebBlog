import React from "react"

import styled from "styled-components"

import theme from "../../utils/theme"
import ArticleReadTimeIcon from "../icons/ArticleReadTimeIcon"

const ArticleReadTimeBadge = styled.div`
  display: flex;
  align-items: center;
`

const ArticleReadTimeBadgeLabel = styled.span`
  font-weight: bolder;
  font-size: 14px;
  color: ${theme.secondary};
  margin-left: 7px;
`

interface Props {
    minutes: number
}

const getTime = (minutes: number): string => {
    const HOUR = 60;

    if (minutes < HOUR) {
        return `${minutes} M`
    }

    return `${Math.floor(minutes / HOUR)} H ${minutes % HOUR} M`
}

export default function ({ minutes }: Props): React.ReactElement {
    const time = getTime(minutes);

  return (
    <ArticleReadTimeBadge>
      <ArticleReadTimeIcon />
      <ArticleReadTimeBadgeLabel>{time}</ArticleReadTimeBadgeLabel>
    </ArticleReadTimeBadge>
  )
}
