import React from "react"

import styled from "styled-components"

import theme from "../../utils/theme"
import ArticleStarsIcon from "../icons/ArticleStarsIcon"

const ArticleStarsBadge = styled.div`
  display: flex;
  align-items: center;
`

const ArticleStarsBadgeLabel = styled.span`
  font-weight: bolder;
  font-size: 14px;
  color: ${theme.secondary};
  margin-left: 7px;
`

interface Props {
  quantity: number
}

export default function ({ quantity }: Props): React.ReactElement {
  return (
    <ArticleStarsBadge>
      <ArticleStarsIcon />
      <ArticleStarsBadgeLabel>{quantity}</ArticleStarsBadgeLabel>
    </ArticleStarsBadge>
  )
}
