import React from "react"

import styled from "styled-components"

import theme from "../../utils/theme"

const ArticleTitle = styled.h1`
  color: ${theme.secondary};
  font-size: 34px;
  margin: 0;
  padding: 0;
`

interface Props {
  children: string
}

export default function ({ children }: Props): React.ReactElement {
  return <ArticleTitle>{children}</ArticleTitle>
}
