import React from "react"

import styled from "styled-components"
import theme from "../../utils/theme"

const ArticleTitle = styled.h1`
  font-size: 28px;
  font-weight: bolder;
  color: ${theme.secondary};
`

interface Props {
  children: string
}

export default function ({ children }: Props): React.ReactElement {
  return <ArticleTitle>{children}</ArticleTitle>
}
