import React from "react"
import styled from "styled-components"

import { S } from "./Text"

const Code = styled.div`
  margin-top: 24px;

  .deckgo-highlight-code-carbon {
    margin: 0;
  }

  ${S} {
    display: block;
    margin-top: 12px;
  }
`

interface Props {
  children: React.ReactNode
  description: string
}

export default function ({ children, description }: Props): React.ReactElement {
  return (
    <Code>
      {children}
      <S italic>{description}</S>
    </Code>
  )
}
