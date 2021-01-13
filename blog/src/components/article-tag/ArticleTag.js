import React from "react"

import styled from "styled-components"

import theme from "../../utils/theme"

const ArticleTag = styled.div`
  text-transform: uppercase;
  color: ${theme.secondary};
  opacity: 0.7;
  font-size: 14px;
`

export default function ({ children }) {
  return <ArticleTag>{children}</ArticleTag>
}
