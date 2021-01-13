import React from "react"

import styled from "styled-components"

import ArticleTag from "../article-tag/ArticleTag"
import theme from "../../utils/theme"

const ArticleTags = styled.div`
  display: flex;
  align-items: center;
  flex-flow: wrap;

  & > div {
    display: flex;
    align-items: center;
    margin: 0 14px 14px 0;

    &:not(:last-of-type)::after {
      content: "";
      display: block;
      width: 7px;
      flex-shrink: 0;
      height: 7px;
      margin: 0 0 0 14px;
      border-radius: 50%;
      background: ${theme.secondary};
      opacity: 0.7;
    }
  }
`

export default function ({ items }) {
  return (
    <ArticleTags>
      {items.map((item, idx) => (
        <ArticleTag key={item}>{item}</ArticleTag>
      ))}
    </ArticleTags>
  )
}
