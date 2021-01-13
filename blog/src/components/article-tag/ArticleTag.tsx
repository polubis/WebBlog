import React from "react"

import styled from "styled-components"

import theme from "../../utils/theme"

const ArticleTag = styled.div`
  text-transform: uppercase;
  color: ${theme.secondary};
  opacity: 0.7;
  font-size: 14px;
`

interface Props {
  children: string
}

export default function ({ children }: Props): React.ReactElement {
  return <ArticleTag>{children}</ArticleTag>
}
